import React from 'react';
import { BookOpen, Coffee, Music, Users, Clock, Award, Target, Calculator, Monitor, Play } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// Custom Korean text icon component
const KoreanIcon = ({ className }: { className?: string }) => (
  <div className={`${className} flex items-center justify-center font-bold text-white`}>
    한글
  </div>
);

// Custom English text icon component  
const EnglishIcon = ({ className }: { className?: string }) => (
  <div className={`${className} flex items-center justify-center font-bold text-white`}>
    ABC
  </div>
);

type ProgramIcon = LucideIcon | React.FC<{ className?: string }>;

interface ProgramItem {
  titleKey: string;
  descKey: string;
  duration: string;
  durationKey?: string;
  level: string;
  levelKey?: string;
  icon: ProgramIcon;
  features: string[];
}

const Programs: React.FC = () => {
  const { t } = useLanguage();
  const [showVideo, setShowVideo] = React.useState(false);

  const academicPrograms = [
    {
      titleKey: 'programs.korean.title',
      descKey: 'programs.korean.desc',
      duration: '6개월',
      durationKey: 'programs.duration.6months',
      level: '초급-고급',
      levelKey: 'programs.level.beginner-advanced',
      icon: KoreanIcon,
      features: [
        'programs.korean.feature1',
        'programs.korean.feature2', 
        'programs.korean.feature3',
        'programs.korean.feature4'
      ]
    },
    {
      titleKey: 'programs.english.title',
      descKey: 'programs.english.desc',
      duration: '3개월',
      durationKey: 'programs.duration.3months',
      level: '초급-중급',
      levelKey: 'programs.level.beginner-intermediate',
      icon: EnglishIcon,
      features: [
        'programs.english.feature1',
        'programs.english.feature2', 
        'programs.english.feature3',
        'programs.english.feature4'
      ]
    },
    {
      titleKey: 'programs.math.title',
      descKey: 'programs.math.desc',
      duration: '4개월',
      durationKey: 'programs.duration.4months',
      level: '기초-고급',
      levelKey: 'programs.level.basic-advanced',
      icon: Calculator,
      features: [
        'programs.math.feature1',
        'programs.math.feature2',
        'programs.math.feature3',
        'programs.math.feature4'
      ]
    },
    {
      titleKey: 'programs.computer.title',
      descKey: 'programs.computer.desc',
      duration: '2개월',
      durationKey: 'programs.duration.2months',
      level: '초급',
      levelKey: 'programs.level.beginner',
      icon: Monitor,
      features: [
        'programs.computer.feature1',
        'programs.computer.feature2',
        'programs.computer.feature3',
        'programs.computer.feature4'
      ]
    }
  ];

  const vocationalPrograms = [
    {
      titleKey: 'programs.barista.title',
      descKey: 'programs.barista.desc',
      duration: '3개월',
      durationKey: 'programs.duration.3months',
      level: '초급-전문',
      levelKey: 'programs.level.beginner-professional',
      icon: Coffee,
      features: [
        'programs.barista.feature1',
        'programs.barista.feature2',
        'programs.barista.feature3',
        'programs.barista.feature4'
      ]
    },
    {
      titleKey: 'programs.baking.title',
      descKey: 'programs.baking.desc',
      duration: '4개월',
      durationKey: 'programs.duration.4months',
      level: '초급-중급',
      levelKey: 'programs.level.beginner-intermediate',
      icon: Award,
      features: [
        'programs.baking.feature1',
        'programs.baking.feature2',
        'programs.baking.feature3',
        'programs.baking.feature4'
      ]
    },
    {
      titleKey: 'programs.hair.title',
      descKey: 'programs.hair.desc',
      duration: '3개월',
      durationKey: 'programs.duration.3months',
      level: '초급-중급',
      levelKey: 'programs.level.beginner-intermediate',
      icon: Award,
      features: [
        'programs.hair.feature1',
        'programs.hair.feature2',
        'programs.hair.feature3',
        'programs.hair.feature4'
      ]
    },
    {
      titleKey: 'programs.nursing.title',
      descKey: 'programs.nursing.desc',
      duration: '4개월',
      durationKey: 'programs.duration.4months',
      level: '초급-중급',
      levelKey: 'programs.level.beginner-intermediate',
      icon: Users,
      features: [
        'programs.nursing.feature1',
        'programs.nursing.feature2',
        'programs.nursing.feature3',
        'programs.nursing.feature4'
      ]
    },
    {
      titleKey: 'programs.cuisine.title',
      descKey: 'programs.cuisine.desc',
      duration: '3개월',
      durationKey: 'programs.duration.3months',
      level: '초급-중급',
      levelKey: 'programs.level.beginner-intermediate',
      icon: Coffee,
      features: [
        'programs.cuisine.feature1',
        'programs.cuisine.feature2',
        'programs.cuisine.feature3',
        'programs.cuisine.feature4'
      ]
    },
    {
      titleKey: 'programs.marketing.title',
      descKey: 'programs.marketing.desc',
      duration: '2개월',
      durationKey: 'programs.duration.2months',
      level: '초급-중급',
      levelKey: 'programs.level.beginner-intermediate',
      icon: Target,
      features: [
        'programs.marketing.feature1',
        'programs.marketing.feature2',
        'programs.marketing.feature3',
        'programs.marketing.feature4'
      ]
    }
  ];

  const enrichmentPrograms = [
    {
      titleKey: 'programs.music.title',
      descKey: 'programs.music.desc',
      duration: '상시',
      durationKey: 'programs.duration.ongoing',
      level: '전 수준',
      levelKey: 'programs.level.all',
      icon: Music,
      features: [
        'programs.music.feature1',
        'programs.music.feature2',
        'programs.music.feature3',
        'programs.music.feature4'
      ]
    },
    {
      titleKey: 'programs.sports.title',
      descKey: 'programs.sports.desc',
      duration: '상시',
      durationKey: 'programs.duration.ongoing',
      level: '전 수준',
      levelKey: 'programs.level.all',
      icon: Users,
      features: [
        'programs.sports.feature1',
        'programs.sports.feature2',
        'programs.sports.feature3',
        'programs.sports.feature4'
      ]
    }
  ];

  const ProgramCard = ({ program, category }: { program: ProgramItem, category: string }) => {
    const Icon = program.icon;

    return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
      <div className={`h-20 flex items-center justify-center ${
        category === 'academic' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
        category === 'vocational' ? 'bg-gradient-to-r from-amber-500 to-orange-500' :
        'bg-gradient-to-r from-green-500 to-teal-500'
      }`}>
        <Icon className="h-10 w-10 text-white" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-blue-800 mb-2">
          {t(program.titleKey)}
        </h3>
        <p className="text-gray-600 mb-4">
          {t(program.descKey)}
        </p>
        
        <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {program.durationKey ? t(program.durationKey) : program.duration}
          </div>
          <div className="flex items-center">
            <Award className="h-4 w-4 mr-1" />
            {program.levelKey ? t(program.levelKey) : program.level}
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold text-gray-800 text-sm">{t('common.features')}:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {program.features.map((featureKey: string, index: number) => (
              <li key={index} className="flex items-center">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2"></div>
                {t(featureKey)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('programs.hero.title')}</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            {t('programs.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Academic Programs */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">{t('programs.academic.title')}</h2>
            <p className="text-xl text-gray-600">{t('programs.academic.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {academicPrograms.map((program, index) => (
              <ProgramCard key={index} program={program} category="academic" />
            ))}
          </div>
        </div>
      </section>

      {/* Vocational Programs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">{t('programs.vocational.title')}</h2>
            <p className="text-xl text-gray-600">{t('programs.vocational.subtitle')}</p>
          </div>

          {/* Promotional Video */}
          <div className="mb-16">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-amber-800 mb-2">{t('programs.video.title')}</h3>
                <p className="text-gray-700">{t('programs.video.subtitle')}</p>
              </div>
              <div className="max-w-2xl mx-auto">
                {!showVideo ? (
                  <div 
                    className="relative cursor-pointer group"
                    onClick={() => setShowVideo(true)}
                  >
                    <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
                      <img
                        src="https://img.youtube.com/vi/LzkZ4fkB0f0/maxresdefault.jpg"
                        alt="등대 말레이시아 직업학교 홍보영상 썸네일"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-200"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-red-600 rounded-full p-4 group-hover:scale-110 transition-transform duration-200 shadow-lg">
                          <Play className="h-8 w-8 text-white ml-1" />
                        </div>
                      </div>
                    </div>
                    <div className="text-center mt-3">
                      <p className="text-sm text-gray-600">{t('programs.video.click')}</p>
                    </div>
                  </div>
                ) : (
                  <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
                    <iframe
                      src="https://www.youtube.com/embed/LzkZ4fkB0f0?autoplay=1"
                      title="등대 말레이시아 직업학교 홍보영상"
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
                </div>
                <div className="text-center mt-4">
                  <p className="text-sm text-gray-600">{t('programs.video.date')}</p>
                  <a
                    href="https://youtu.be/LzkZ4fkB0f0?si=QF_IgUm9dMmYpzeb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center mt-3 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-700 transition-colors duration-200"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    {t('programs.video.youtube')}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {vocationalPrograms.map((program, index) => (
              <ProgramCard key={index} program={program} category="vocational" />
            ))}
          </div>
      </section>

      {/* Enrichment Programs */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">{t('programs.enrichment.title')}</h2>
            <p className="text-xl text-gray-600">{t('programs.enrichment.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {enrichmentPrograms.map((program, index) => (
              <ProgramCard key={index} program={program} category="enrichment" />
            ))}
          </div>
        </div>
      </section>

      {/* Program Benefits */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">{t('programs.benefits.title')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-blue-800 mb-2">{t('programs.benefits.free')}</h3>
              <p className="text-gray-600">{t('programs.benefits.free.desc')}</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-blue-800 mb-2">{t('programs.benefits.certificate')}</h3>
              <p className="text-gray-600">{t('programs.benefits.certificate.desc')}</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-blue-800 mb-2">{t('programs.benefits.job')}</h3>
              <p className="text-gray-600">{t('programs.benefits.job.desc')}</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-blue-800 mb-2">{t('programs.benefits.mentoring')}</h3>
              <p className="text-gray-600">{t('programs.benefits.mentoring.desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-800 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">{t('programs.cta.title')}</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            {t('programs.cta.subtitle')}
          </p>
          <a
            href="/support"
            className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            {t('programs.cta.apply')}
          </a>
        </div>
      </section>
    </div>
  );
};

export default Programs;
