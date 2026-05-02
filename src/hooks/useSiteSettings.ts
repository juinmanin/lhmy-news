import { useEffect, useState } from 'react';
import { cmsService } from '../lib/cms';
import { defaultSiteSettings, resolveSiteSettings } from '../lib/siteSettings';
import type { SiteSettings } from '../lib/siteSettings';

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSiteSettings);

  useEffect(() => {
    let isMounted = true;

    cmsService
      .listSiteSections()
      .then((sections) => {
        if (isMounted) setSettings(resolveSiteSettings(sections));
      })
      .catch(() => {
        if (isMounted) setSettings(defaultSiteSettings);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return settings;
}
