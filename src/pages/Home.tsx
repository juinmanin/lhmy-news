import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Heart, ArrowRight, Lightbulb as Lighthouse, Globe, Target, Star, GraduationCap, Coffee, Code, Palette } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSiteSettings } from '../hooks/useSiteSettings';
import { cmsService } from '../lib/cms';
import type { SiteSection } from '../types/cms';

// Custom Korean text icon component
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const KoreanIcon = ({ className }: { className?: string }) => (
  <div className={`${className} flex items-center justify-center font-bold text-white text-lg`}>
    한글
  </div>
);

// Custom English text icon component  
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const EnglishIcon = ({ className }: { className?: string }) => (
  <div className={`${className} flex items-center justify-center font-bold text-white text-lg`}>
    ABC
  </div>
);

const Home: React.FC = () => {
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

  const heroSection = sectionMap.get('home.hero');
  const heroSubtitleSection = sectionMap.get('home.hero.subtitle');
  const missionSection = sectionMap.get('home.mission');
  const heroBackgroundImage = heroSection?.image_url || '/image.png';

  const stats = [
    { number: settings.homeStats.students, labelKey: 'home.stats.students', icon: GraduationCap },
    { number: settings.homeStats.programs, labelKey: 'home.stats.programs', icon: BookOpen },
    { number: settings.homeStats.volunteers, labelKey: 'home.stats.volunteers', icon: Users },
    { number: settings.homeStats.years, labelKey: 'home.stats.years', icon: Star },
  ];

  const programs = [
    {
      titleKey: 'home.programs.basic',
      descKey: 'home.programs.basic.desc', 
      icon: BookOpen,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      titleKey: 'home.programs.practical',
      title: settings.programs.homePractical,
      descKey: 'home.programs.practical.desc',
      icon: Coffee,
      color: 'from-amber-500 to-orange-500'
    },
    {
      titleKey: 'home.programs.it',
      descKey: 'home.programs.it.desc',
      icon: Code,
      color: 'from-purple-500 to-pink-500'
    },
    {
      titleKey: 'home.programs.arts',
      descKey: 'home.programs.arts.desc',
      icon: Palette,
      color: 'from-green-500 to-teal-500'
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${heroBackgroundImage})`
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-blue-700/80"></div>
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-amber-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-10 right-10 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              {heroSection?.title || t('home.hero.title')}
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-blue-100">
              {heroSubtitleSection?.title || heroSubtitleSection?.body || t('home.hero.subtitle')}
            </h2>
            <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed whitespace-pre-line">
              {heroSection?.body || t('home.hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/programs"
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
              >
                {t('home.hero.programs')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/support"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-800 transition-all duration-200 flex items-center justify-center"
              >
                {t('home.hero.support')}
                <Heart className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
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

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6">
                {missionSection?.title || t('home.mission.title')}
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                {missionSection?.body || t('home.mission.description')}
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span className="text-gray-700">{t('home.mission.point1')}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span className="text-gray-700">{t('home.mission.point2')}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span className="text-gray-700">{t('home.mission.point3')}</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-2xl">
                <img
                  src="/teaching.jpg"
                  alt="난민 청소년 교육"
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
                <Lighthouse className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">
              {t('home.programs.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('home.programs.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {programs.map((program, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                  <div className={`h-32 bg-gradient-to-br ${program.color} flex items-center justify-center`}>
                    <program.icon className="h-16 w-16 text-white" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-blue-800 mb-3">{program.title || t(program.titleKey)}</h3>
                    <p className="text-gray-600 leading-relaxed">{t(program.descKey)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/programs"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {t('home.programs.viewall')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">
              {t('home.values.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-6 group-hover:scale-110 transition-transform duration-200">
                <Globe className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-blue-800 mb-4">{t('home.values.inclusion')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('home.values.inclusion.desc')}
              </p>
            </div>

            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mb-6 group-hover:scale-110 transition-transform duration-200">
                <Target className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-blue-800 mb-4">{t('home.values.practical')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('home.values.practical.desc')}
              </p>
            </div>

            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-teal-500 rounded-full mb-6 group-hover:scale-110 transition-transform duration-200">
                <Heart className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-blue-800 mb-4">{t('home.values.love')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('home.values.love.desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-800 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('home.cta.title')}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            {t('home.cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/donate"
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              {t('nav.donate')}
            </Link>
            <Link
              to="/support"
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-800 transition-all duration-200"
            >
              {t('nav.support')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
