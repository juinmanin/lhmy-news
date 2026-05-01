import type { Config, Context } from '@netlify/functions';
import { jsonResponse } from './_shared/http.mjs';
import { generateNewsletterDraft, previousMalaysiaMonthToken } from './_shared/newsletterGenerator.mjs';

export default async (req: Request, _context: Context) => {
  if (!['GET', 'POST'].includes(req.method)) {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  const url = new URL(req.url);
  const month = url.searchParams.get('month') || previousMalaysiaMonthToken();

  try {
    const result = await generateNewsletterDraft(month);
    return jsonResponse({ ok: true, ...result });
  } catch (error) {
    return jsonResponse({ ok: false, error: error instanceof Error ? error.message : 'Newsletter generation failed.' }, 500);
  }
};

export const config: Config = {
  path: '/api/newsletters/generate',
};
