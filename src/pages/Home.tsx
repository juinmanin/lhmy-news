import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Code,
  Coffee,
  GraduationCap,
  HandHeart,
  Heart,
  Lightbulb as Lighthouse,
  Monitor,
  Music,
  Palette,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSiteSettings } from '../hooks/useSiteSettings';
import { cmsService } from '../lib/cms';
import type { SiteSection } from '../types/cms';

const brandPhotos = {
  hero: '/lhmy-photos/hero-community.jpg',
  computer: '/lhmy-photos/computer-class.jpg',
  creative: '/lhmy-photos/creative-studio.jpg',
  learning: '/lhmy-photos/learning-table.jpg',
  session: '/lhmy-photos/community-session.jpg',
  football: '/lhmy-photos/football-awards.jpg',
  family: '/lhmy-photos/big-family.jpg',
  meal: '/lhmy-photos/shared-meal.jpg',
  presentation: '/lhmy-photos/presentation.jpg',
};

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
  const heroBackgroundImage = heroSection?.image_url || brandPhotos.hero;

  const stats = [
    { number: settings.homeStats.students, labelKey: 'home.stats.students', icon: GraduationCap },
    { number: settings.homeStats.programs, labelKey: 'home.stats.programs', icon: BookOpen },
    { number: settings.homeStats.volunteers, labelKey: 'home.stats.volunteers', icon: Users },
    { number: settings.homeStats.years, labelKey: 'home.stats.years', icon: CalendarDays },
  ];

  const programs = [
    {
      title: t('home.programs.basic'),
      description: t('home.programs.basic.desc'),
      image: brandPhotos.learning,
      icon: BookOpen,
      accent: 'bg-[#F7C600]',
    },
    {
      title: settings.programs.homePractical,
      description: t('home.programs.practical.desc'),
      image: brandPhotos.creative,
      icon: Coffee,
      accent: 'bg-[#EF6C52]',
    },
    {
      title: t('home.programs.it'),
      description: t('home.programs.it.desc'),
      image: brandPhotos.computer,
      icon: Code,
      accent: 'bg-[#2F80ED]',
    },
    {
      title: t('home.programs.arts'),
      description: t('home.programs.arts.desc'),
      image: brandPhotos.session,
      icon: Palette,
      accent: 'bg-[#4CCDB7]',
    },
  ];

  const focusAreas = [
    {
      title: '축구',
      description: '팀 훈련과 공동체 활동을 통해 몸과 마음의 회복을 돕습니다.',
      icon: Trophy,
      image: brandPhotos.football,
    },
    {
      title: '언어',
      description: '한글과 영어 수업으로 더 넓은 배움의 문을 엽니다.',
      icon: BookOpen,
      image: brandPhotos.learning,
    },
    {
      title: '컴퓨터',
      description: '디지털 기초와 실무 감각을 함께 익힙니다.',
      icon: Monitor,
      image: brandPhotos.computer,
    },
    {
      title: '피아노와 예술',
      description: '음악과 미술 활동으로 표현과 자신감을 키웁니다.',
      icon: Music,
      image: brandPhotos.creative,
    },
  ];

  const gallery = [
    { image: brandPhotos.family, title: '함께 모이는 날' },
    { image: brandPhotos.football, title: '라이트하우스 FC' },
    { image: brandPhotos.meal, title: '나누는 식탁' },
    { image: brandPhotos.presentation, title: '배움과 발표' },
  ];

  return (
    <div className="min-h-screen bg-[#F8F6EF] text-[#17213C]">
      <section className="relative isolate overflow-hidden bg-[#17213C] text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBackgroundImage})` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[#111933]/75" aria-hidden="true" />
        <div
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(23,33,60,0.98)_0%,rgba(23,33,60,0.78)_42%,rgba(23,33,60,0.35)_100%)]"
          aria-hidden="true"
        />

        <div className="relative mx-auto grid min-h-[calc(100svh-8rem)] max-w-7xl grid-cols-1 items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.02fr_0.78fr] lg:px-8 lg:py-16">
          <div className="w-full max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-[#F7C600] backdrop-blur">
              <Lighthouse className="h-4 w-4" />
              Lighthouse Malaysia
            </div>
            <h1 className="text-4xl font-bold leading-[1.08] text-white sm:text-6xl lg:text-7xl">
              {heroSection?.title || t('home.hero.title')}
            </h1>
            <p className="mt-5 text-xl font-semibold text-[#F7C600] sm:text-2xl">
              {heroSubtitleSection?.title || heroSubtitleSection?.body || t('home.hero.subtitle')}
            </p>
            <p className="mt-6 max-w-[21rem] whitespace-pre-line break-words text-base leading-8 text-white/88 sm:max-w-2xl sm:text-xl">
              {heroSection?.body || t('home.hero.description')}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/programs"
                className="inline-flex w-full items-center justify-center gap-2 bg-[#F7C600] px-6 py-3 font-bold text-[#17213C] shadow-[0_18px_45px_rgba(0,0,0,0.28)] transition hover:bg-[#FFD84D] sm:w-auto"
              >
                {t('home.hero.programs')}
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/support"
                className="inline-flex w-full items-center justify-center gap-2 border border-white/70 px-6 py-3 font-bold text-white transition hover:bg-white hover:text-[#17213C] sm:w-auto"
              >
                {t('home.hero.support')}
                <Heart className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="ml-auto max-w-sm border border-white/15 bg-white/12 p-5 backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F7C600]">
                Open center
              </p>
              <p className="mt-3 text-2xl font-bold leading-tight text-white">
                난민 청소년이 다시 배우고, 뛰고, 꿈꾸는 공간
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {stats.slice(0, 2).map((stat) => (
                  <div key={stat.labelKey} className="border border-white/15 bg-white/10 p-4">
                    <div className="text-3xl font-bold text-[#F7C600]">{stat.number}</div>
                    <div className="mt-1 text-sm text-white/80">{t(stat.labelKey)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#17213C]/10 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
          {stats.map((stat) => (
            <div key={stat.labelKey} className="flex min-h-32 items-center gap-4 border-[#17213C]/10 py-6 md:border-l md:first:border-l-0">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#17213C] text-[#F7C600]">
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <div className="text-3xl font-bold text-[#17213C]">{stat.number}</div>
                <div className="text-sm font-medium text-[#5D6474]">{t(stat.labelKey)}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#F8F6EF] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#2F80ED]">What we do</p>
              <h2 className="mt-4 text-4xl font-bold leading-tight text-[#17213C] sm:text-5xl">
                {missionSection?.title || t('home.mission.title')}
              </h2>
              <p className="mt-6 text-lg leading-8 text-[#4A5262]">
                {missionSection?.body || t('home.mission.description')}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { icon: ShieldCheck, text: t('home.mission.point1') },
                { icon: Sparkles, text: t('home.mission.point2') },
                { icon: HandHeart, text: t('home.mission.point3') },
              ].map((item, index) => (
                <div key={item.text} className="bg-white p-6 shadow-sm">
                  <div
                    className={`mb-5 flex h-12 w-12 items-center justify-center ${
                      index === 0 ? 'bg-[#F7C600]' : index === 1 ? 'bg-[#4CCDB7]' : 'bg-[#EF6C52]'
                    } text-[#17213C]`}
                  >
                    <item.icon className="h-6 w-6" />
                  </div>
                  <p className="font-semibold leading-7 text-[#17213C]">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#EF6C52]">Programs</p>
              <h2 className="mt-4 text-4xl font-bold text-[#17213C] sm:text-5xl">{t('home.programs.title')}</h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-[#5D6474]">{t('home.programs.subtitle')}</p>
            </div>
            <Link
              to="/programs"
              className="inline-flex items-center justify-center gap-2 border border-[#17213C] px-5 py-3 font-bold text-[#17213C] transition hover:bg-[#17213C] hover:text-white"
            >
              {t('home.programs.viewall')}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {programs.map((program) => (
              <article key={program.title} className="group overflow-hidden bg-[#F8F6EF]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className={`absolute left-4 top-4 flex h-12 w-12 items-center justify-center ${program.accent} text-[#17213C]`}>
                    <program.icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#17213C]">{program.title}</h3>
                  <p className="mt-3 leading-7 text-[#5D6474]">{program.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#17213C] py-20 text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#F7C600]">Daily lighthouse</p>
            <h2 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
              교실과 운동장, 식탁에서 이어지는 배움
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/78">
              LHMY의 하루는 수업 하나로 끝나지 않습니다. 함께 배우고, 운동하고, 나누는 경험이 청소년의 다음 선택을 바꿉니다.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {focusAreas.map((area) => (
              <article key={area.title} className="grid min-h-56 grid-cols-[0.95fr_1.05fr] overflow-hidden bg-white text-[#17213C]">
                <img src={area.image} alt={area.title} className="h-full w-full object-cover" />
                <div className="flex flex-col justify-between p-5">
                  <div className="flex h-10 w-10 items-center justify-center bg-[#F7C600]">
                    <area.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{area.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#5D6474]">{area.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F8F6EF] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#4CCDB7]">Photo story</p>
            <h2 className="mt-4 text-4xl font-bold text-[#17213C] sm:text-5xl">사진으로 보는 등대 말레이시아</h2>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-4 md:grid-rows-[260px_260px]">
            {gallery.map((item, index) => (
              <figure
                key={item.title}
                className={`relative overflow-hidden bg-[#17213C] ${
                  index === 0 ? 'md:col-span-2 md:row-span-2' : index === 1 ? 'md:col-span-2' : ''
                }`}
              >
                <img src={item.image} alt={item.title} className="h-full min-h-64 w-full object-cover" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,rgba(23,33,60,0)_0%,rgba(23,33,60,0.86)_100%)] p-5 pt-16 text-lg font-bold text-white">
                  {item.title}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
          <div className="min-h-[420px]">
            <img src={brandPhotos.family} alt="등대 말레이시아 공동체 사진" className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col justify-center bg-[#F7C600] px-6 py-14 text-[#17213C] sm:px-10 lg:px-14">
            <p className="text-sm font-bold uppercase tracking-[0.18em]">Join the light</p>
            <h2 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">{t('home.cta.title')}</h2>
            <p className="mt-6 text-lg leading-8 text-[#283150]">{t('home.cta.subtitle')}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/donate"
                className="inline-flex items-center justify-center bg-[#17213C] px-6 py-3 font-bold text-white transition hover:bg-[#283150]"
              >
                {t('nav.donate')}
              </Link>
              <Link
                to="/support"
                className="inline-flex items-center justify-center border border-[#17213C] px-6 py-3 font-bold text-[#17213C] transition hover:bg-white"
              >
                {t('nav.support')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
