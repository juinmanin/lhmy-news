import type { Config } from '@netlify/functions';
import {
  generateNewsletterDraft,
  isFirstDayInMalaysia,
  previousMalaysiaMonthToken,
} from './_shared/newsletterGenerator.mjs';

export default async () => {
  if (!isFirstDayInMalaysia()) {
    console.log('Skipping newsletter generation because it is not the first day in Malaysia.');
    return;
  }

  const month = previousMalaysiaMonthToken();
  const result = await generateNewsletterDraft(month);
  console.log('Generated newsletter draft:', result);
};

export const config: Config = {
  schedule: '5 16 * * *',
};
