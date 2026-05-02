import type { Config, Context } from '@netlify/functions';
import { jsonResponse, readJson } from './_shared/http.mjs';
import { sendAdminEmail } from './_shared/mailer.mjs';
import { createSupabaseAdmin } from './_shared/supabaseAdmin.mjs';

interface DonationPayload {
  donationType?: string;
  amount?: number;
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
}

export default async (req: Request, _context: Context) => {
  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  const payload = await readJson(req) as DonationPayload;

  if (!payload.name || !payload.phone || !payload.amount) {
    return jsonResponse({ error: 'Name, phone, and amount are required.' }, 400);
  }

  try {
    const supabase = createSupabaseAdmin();
    if (supabase) {
      const { error } = await supabase.from('donations').insert({
        name: payload.name,
        phone: payload.phone,
        email: payload.email || null,
        amount: payload.amount,
        donation_type: payload.donationType || 'one-time',
        message: payload.message || null,
        status: 'pending',
      });
      if (error) throw error;
    }

    const mail = await sendAdminEmail({
      subject: `[LHMY] 새 후원 신청: ${payload.name}`,
      replyTo: payload.email,
      text: [
        `Name: ${payload.name}`,
        `Phone: ${payload.phone}`,
        `Email: ${payload.email || '-'}`,
        `Donation type: ${payload.donationType || 'one-time'}`,
        `Amount: ${payload.amount}`,
        '',
        payload.message || '',
      ].join('\n'),
    });

    return jsonResponse({ ok: true, mail });
  } catch (error) {
    return jsonResponse({ ok: false, error: error instanceof Error ? error.message : 'Failed to send donation request.' }, 500);
  }
};

export const config: Config = {
  path: '/api/send-donation',
};
