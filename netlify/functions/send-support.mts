import type { Config, Context } from '@netlify/functions';
import { jsonResponse, readJson } from './_shared/http.mjs';
import { sendAdminEmail } from './_shared/mailer.mjs';
import { createSupabaseAdmin } from './_shared/supabaseAdmin.mjs';

interface SupportPayload {
  formType?: string;
  name?: string;
  age?: number;
  phone?: string;
  email?: string;
  address?: string;
  message?: string;
}

const tableByType: Record<string, string> = {
  student: 'student_applications',
  volunteer: 'volunteer_applications',
  partner: 'partner_applications',
};

export default async (req: Request, _context: Context) => {
  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  const payload = await readJson(req) as SupportPayload;
  const table = tableByType[payload.formType || 'student'] || tableByType.student;

  if (!payload.name || !payload.phone) {
    return jsonResponse({ error: 'Name and phone are required.' }, 400);
  }

  try {
    const supabase = createSupabaseAdmin();
    if (supabase) {
      const { error } = await supabase.from(table).insert({
        name: payload.name,
        age: payload.age || null,
        phone: payload.phone,
        email: payload.email || null,
        address: payload.address || null,
        message: payload.message || null,
        status: 'pending',
      });
      if (error) throw error;
    }

    const mail = await sendAdminEmail({
      subject: `[LHMY] 새 ${payload.formType || 'student'} 신청: ${payload.name}`,
      replyTo: payload.email,
      text: [
        `Type: ${payload.formType || 'student'}`,
        `Name: ${payload.name}`,
        `Age: ${payload.age || '-'}`,
        `Phone: ${payload.phone}`,
        `Email: ${payload.email || '-'}`,
        `Address: ${payload.address || '-'}`,
        '',
        payload.message || '',
      ].join('\n'),
    });

    return jsonResponse({ ok: true, mail });
  } catch (error) {
    return jsonResponse({ ok: false, error: error instanceof Error ? error.message : 'Failed to send support request.' }, 500);
  }
};

export const config: Config = {
  path: '/api/send-support',
};
