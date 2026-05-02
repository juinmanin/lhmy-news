import React, { useEffect, useMemo, useState } from 'react';
import { Heart, Building, Gift, Users, DollarSign, Mail, Phone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSiteSettings } from '../hooks/useSiteSettings';
import { cmsService } from '../lib/cms';
import type { SiteSection } from '../types/cms';

const Donate: React.FC = () => {
  const { t, language } = useLanguage();
  const settings = useSiteSettings();
  const [siteSections, setSiteSections] = useState<SiteSection[]>([]);

  useEffect(() => {
    let isMounted = true;

    cmsService
      .listSiteSections()
      .then((sections) => {
        if (isMounted) setSiteSections(sections);
      })
      .catch(() => {
        if (isMounted) setSiteSections([]);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const sectionMap = useMemo(() => {
    const map = new Map<string, SiteSection>();
    siteSections.forEach((section) => {
      if (section.locale === language) map.set(section.section_key, section);
    });
    return map;
  }, [language, siteSections]);

  const heroSection = sectionMap.get('donate.hero');
  const heroImage = heroSection?.image_url;

  const impactStats = [
    { icon: Users, number: settings.homeStats.students, labelKey: 'donate.impact.students' },
    { icon: Gift, number: settings.donate.meals, labelKey: 'donate.impact.meals' },
    { icon: Heart, number: settings.donate.programs, labelKey: 'donate.impact.programs' },
    { icon: Building, number: settings.donate.volunteers, labelKey: 'donate.impact.volunteers' },
  ];

  const donationAmounts = [
    { text: settings.donate.amount10000, className: 'from-green-50 to-emerald-50 border-green-200' },
    { text: settings.donate.amount50000, className: 'from-blue-50 to-cyan-50 border-blue-200' },
    { text: settings.donate.amount200000, className: 'from-purple-50 to-pink-50 border-purple-200' },
    { text: settings.donate.amount500000, className: 'from-amber-50 to-orange-50 border-amber-200' },
    { text: settings.donate.amount1000000, className: 'from-red-50 to-pink-50 border-red-200' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-800 to-blue-900 text-white py-20">
        {heroImage && (
          <>
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }} aria-hidden="true" />
            <div className="absolute inset-0 bg-blue-950/75" aria-hidden="true" />
          </>
        )}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="relative text-4xl md:text-5xl font-bold mb-6">{heroSection?.title || t('donate.hero.title')}</h1>
          <p className="relative text-xl text-blue-100 max-w-3xl mx-auto">
            {heroSection?.body || t('donate.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">{t('donate.impact.title')}</h2>
            <p className="text-xl text-gray-600">{t('donate.impact.subtitle')}</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-4 group-hover:scale-110 transition-transform duration-200">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-blue-800 mb-2">{stat.number}</div>
                <div className="text-gray-600">{t(stat.labelKey)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Information */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">{t('donate.info.title')}</h2>
            
            {/* Donation Types */}
            <div className="mb-12">
              <h3 className="text-2xl font-semibold text-blue-800 mb-6">{t('donate.types.title')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6 border border-blue-200">
                  <div className="flex items-center mb-4">
                    <Heart className="h-8 w-8 text-blue-600 mr-3" />
                    <h4 className="text-xl font-semibold text-blue-800">{t('donate.types.monthly')}</h4>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{t('donate.types.monthly.desc')}</p>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-6 border border-amber-200">
                  <div className="flex items-center mb-4">
                    <Gift className="h-8 w-8 text-amber-600 mr-3" />
                    <h4 className="text-xl font-semibold text-blue-800">{t('donate.types.onetime')}</h4>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{t('donate.types.onetime.desc')}</p>
                </div>
              </div>
            </div>

            {/* Donation Amounts */}
            <div className="mb-12">
              <h3 className="text-2xl font-semibold text-blue-800 mb-6">{t('donate.amounts.title')}</h3>
              <div className="space-y-4">
                {donationAmounts.map((amount) => (
                  <div key={amount.text} className={`bg-gradient-to-r rounded-lg p-4 border ${amount.className}`}>
                    <p className="text-gray-700 font-medium">{amount.text}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-4 border border-gray-200">
                <p className="text-gray-700 font-medium text-center">{settings.donate.amountCustom}</p>
              </div>
            </div>

            {/* How to Donate */}
            <div className="mb-12">
              <h3 className="text-2xl font-semibold text-blue-800 mb-6">{t('donate.how.title')}</h3>
              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg p-6 border border-yellow-200">
                <p className="text-gray-700 mb-4 text-lg">{t('donate.how.info')}</p>
                <div className="bg-white rounded-lg p-4 border border-yellow-300">
                  <pre className="text-gray-700 whitespace-pre-line font-sans">{t('donate.how.requirements')}</pre>
                </div>
              </div>
            </div>

            {/* Bank Accounts */}
            <div className="mb-12">
              <h3 className="text-2xl font-semibold text-blue-800 mb-6">{t('donate.accounts.title')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
                  <div className="flex items-center mb-3">
                    <Building className="h-6 w-6 text-green-600 mr-2" />
                    <h4 className="text-lg font-semibold text-green-800">KakaoBank</h4>
                  </div>
                  <p className="text-gray-700 font-mono text-lg">333342985064</p>
                  <p className="text-gray-600 text-sm">(등대말레이시아)</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
                  <div className="flex items-center mb-3">
                    <DollarSign className="h-6 w-6 text-purple-600 mr-2" />
                    <h4 className="text-lg font-semibold text-purple-800">PayPal</h4>
                  </div>
                  <p className="text-gray-700 font-mono text-lg">lhmy.kr@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6 border border-blue-200">
              <h3 className="text-2xl font-semibold text-blue-800 mb-6">{t('donate.contact.title')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center">
                  <Mail className="h-6 w-6 text-blue-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-800">{t('donate.contact.email')}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="h-6 w-6 text-blue-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-800">{t('donate.contact.phone')}</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <p className="text-lg text-blue-800 font-semibold">{t('donate.thanks')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alternative Support */}
    </div>
  );
};

export default Donate;
