import { createClient } from '@supabase/supabase-js';

type FormPayload = Record<string, string | number | boolean | null | undefined>;

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const isSupabaseConfigured = Boolean(supabase);

function requireSupabase() {
  if (!supabase) {
    throw new Error('Supabase is not configured. Add the public Supabase URL and anon key in the deployment environment.');
  }

  return supabase;
}

async function insertAndReturn(table: string, data: FormPayload) {
  const client = requireSupabase();
  const { data: result, error } = await client
    .from(table)
    .insert([data])
    .select()
    .single();

  if (error) throw error;
  return result;
}

async function selectRecent(table: string) {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from(table)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export const dbService = {
  createStudentApplication(data: FormPayload) {
    return insertAndReturn('student_applications', data);
  },

  createVolunteerApplication(data: FormPayload) {
    return insertAndReturn('volunteer_applications', data);
  },

  createPartnerApplication(data: FormPayload) {
    return insertAndReturn('partner_applications', data);
  },

  createDonation(data: FormPayload) {
    return insertAndReturn('donations', data);
  },

  getStudentApplications() {
    return selectRecent('student_applications');
  },

  getVolunteerApplications() {
    return selectRecent('volunteer_applications');
  },

  getPartnerApplications() {
    return selectRecent('partner_applications');
  },

  getDonations() {
    return selectRecent('donations');
  },

  async updateStatus(table: string, id: string, status: string) {
    const client = requireSupabase();
    const { error } = await client
      .from(table)
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw error;
  },
};
