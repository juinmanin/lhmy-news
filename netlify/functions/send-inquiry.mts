import type { Config, Context } from '@netlify/functions';
import { jsonResponse, readJson } from './_shared/http.mjs';
import { sendAdminEmail } from './_shared/mailer.mjs';
import { createSupabaseAdmin } from './_shared/supabaseAdmin.mjs';

interface InquiryPayload {
  name?: string;
  phone?: string;
  email?: string;
  inquiryType?: string;
  message?: string;
}

export default async (req: Request, _context: Context) => {
  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  const payload = await readJson(req) as InquiryPayload;

  if (!payload.name || !payload.message) {
    return jsonResponse({ error: 'Name and message are required.' }, 400);
  }

  try {
    const supabase = createSupabaseAdmin();
    if (supabase) {
      const { error } = await supabase.from('contact_inquiries').insert({
        name: payload.name,
        phone: payload.phone || null,
        email: payload.email || null,
        inquiry_type: payload.inquiryType || 'general',
        message: payload.message,
        status: 'pending',
      });
      if (error) throw error;
    }

    const mail = await sendAdminEmail({
      subject: `[LHMY] 새 문의: ${payload.name}`,
      replyTo: payload.email,
      text: [
        `Name: ${payload.name}`,
        `Phone: ${payload.phone || '-'}`,
        `Email: ${payload.email || '-'}`,
        `Type: ${payload.inquiryType || 'general'}`,
        '',
        payload.message,
      ].join('\n'),
    });

    return jsonResponse({ ok: true, mail });
  } catch (error) {
    return jsonResponse({ ok: false, error: error instanceof Error ? error.message : 'Failed to send inquiry.' }, 500);
  }
};

export const config: Config = {
  path: '/api/send-inquiry',
};
