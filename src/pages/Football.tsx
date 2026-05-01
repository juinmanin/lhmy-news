import React from 'react';
import { Trophy, Users, Calendar, Star, Target, Heart, Shield, Globe, Lightbulb, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSiteSettings } from '../hooks/useSiteSettings';

const Football: React.FC = () => {
  const { t } = useLanguage();
  const settings = useSiteSettings();
  const goalsSubtitle = `${settings.football.goalsTargetYear}년까지 달성하고자 하는 구체적인 목표들`;

  const impactStats = [
    { icon: Users, number: settings.football.currentPlayers, labelKey: 'football.stats.players' },
    { icon: Heart, number: '200,000+', labelKey: 'football.stats.refugees' },
    { icon: Star, number: '10,000+', labelKey: 'football.stats.youth' },
    { icon: Target, number: settings.football.foundedYear, labelKey: 'football.stats.founded' },
  ];

  const visionPoints = [
    {
      icon: Heart,
      titleKey: 'football.vision.healing',
      descKey: 'football.vision.healing.desc'
    },
    {
      icon: Users,
      titleKey: 'football.vision.integration',
      descKey: 'football.vision.integration.desc'
    },
    {
      icon: Star,
      titleKey: 'football.vision.hope',
      descKey: 'football.vision.hope.desc'
    },
    {
      icon: Globe,
      titleKey: 'football.vision.unity',
      descKey: 'football.vision.unity.desc'
    }
  ];

  const goals = [
    {
      titleKey: 'football.goals.team',
      descKey: 'football.goals.team.desc',
      desc: `${settings.football.currentPlayers} 규모의 정식 청소년 축구팀을 구성하여 정기적인 훈련과 경기를 진행합니다.`,
      icon: Users
    },
    {
      titleKey: 'football.goals.health',
      descKey: 'football.goals.health.desc',
      icon: Heart
    },
    {
      titleKey: 'football.goals.community',
      descKey: 'football.goals.community.desc',
      icon: Globe
    },
    {
      titleKey: 'football.goals.potential',
      descKey: 'football.goals.potential.desc',
      icon: Star
    }
  ];

  const expectedEffects = [
    'football.effects.healing',
    'football.effects.capacity',
    'football.effects.social',
    'football.effects.identity',
    'football.effects.awareness'
  ];

  const supportTypes = [
    {
      titleKey: 'football.support.financial',
      descKey: 'football.support.financial.desc',
      icon: Heart,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      titleKey: 'football.support.equipment',
      descKey: 'football.support.equipment.desc',
      icon: Trophy,
      color: 'from-green-500 to-emerald-500'
    },
    {
      titleKey: 'football.support.prayer',
      descKey: 'football.support.prayer.desc',
      icon: Star,
      color: 'from-purple-500 to-pink-500'
    },
    {
      titleKey: 'football.support.volunteer',
      descKey: 'football.support.volunteer.desc',
      icon: Users,
      color: 'from-amber-500 to-orange-500'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-900 via-blue-800 to-green-800 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-10 right-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mb-6">
              <Trophy className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
            Lighthouse FC
          </h1>
          <h2 className="text-2xl md:text-4xl font-semibold mb-8 text-green-100">
            {t('football.hero.subtitle')}
          </h2>
          <p className="text-xl text-green-100 mb-12 max-w-4xl mx-auto leading-relaxed">
            {t('football.hero.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/support"
              className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-10 py-4 rounded-full font-semibold text-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
            >
              {t('football.hero.join')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <a
              href="/donate"
              className="border-2 border-white text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-green-800 transition-all duration-200 flex items-center justify-center"
            >
              {t('football.hero.support')}
              <Heart className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-800 mb-4">{t('football.impact.title')}</h2>
            <p className="text-xl text-gray-600">{t('football.impact.subtitle')}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-4 group-hover:scale-110 transition-transform duration-200">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-green-800 mb-2">{stat.number}</div>
                <div className="text-gray-600 text-sm md:text-base">{t(stat.labelKey)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-6">
              {t('football.vision.title')}
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              {t('football.vision.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {visionPoints.map((point, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-4">
                  <point.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-green-800 mb-3">{t(point.titleKey)}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{t(point.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Goals */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-6">
              {t('football.goals.title')}
            </h2>
            <p className="text-xl text-gray-600">{goalsSubtitle || t('football.goals.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {goals.map((goal, index) => (
              <div key={index} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 border border-green-200">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-3 mr-4">
                    <goal.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-green-800">{t(goal.titleKey)}</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">{goal.desc || t(goal.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expected Effects */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-6">
              {t('football.effects.title')}
            </h2>
            <p className="text-xl text-gray-600">{t('football.effects.subtitle')}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {expectedEffects.map((effect, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                  <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700 font-medium">{t(effect)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Training Program */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-6">
                {t('football.program.title')}
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                {t('football.program.description')}
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-6 w-6 text-green-600" />
                  <span className="text-gray-700">{settings.football.trainingSchedule || t('football.program.schedule')}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-6 w-6 text-green-600" />
                  <span className="text-gray-700">{t('football.program.coaching')}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Target className="h-6 w-6 text-green-600" />
                  <span className="text-gray-700">{t('football.program.league')}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Heart className="h-6 w-6 text-green-600" />
                  <span className="text-gray-700">{t('football.program.support')}</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="축구 훈련"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center shadow-lg">
                <Shield className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Opportunities */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-6">
              {t('football.support.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('football.support.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {supportTypes.map((support, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200">
                <div className={`h-32 bg-gradient-to-br ${support.color} flex items-center justify-center`}>
                  <support.icon className="h-16 w-16 text-white" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-green-800 mb-3">{t(support.titleKey)}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{t(support.descKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Opportunities */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-green-800 mb-4">{t('football.volunteer.title')}</h2>
            <p className="text-xl text-gray-600">{t('football.volunteer.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 border border-blue-200">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-4">{t('football.volunteer.longterm')}</h3>
              <p className="text-gray-600 mb-4">{t('football.volunteer.longterm.desc')}</p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• {t('football.volunteer.longterm.duration')}</li>
                <li>• {t('football.volunteer.longterm.commitment')}</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-8 border border-amber-200">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-4">{t('football.volunteer.shortterm')}</h3>
              <p className="text-gray-600 mb-4">{t('football.volunteer.shortterm.desc')}</p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• {t('football.volunteer.shortterm.training')}</li>
                <li>• {t('football.volunteer.shortterm.cultural')}</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 border border-purple-200">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Lightbulb className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-4">{t('football.volunteer.online')}</h3>
              <p className="text-gray-600 mb-4">{t('football.volunteer.online.desc')}</p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• {t('football.volunteer.online.promotion')}</li>
                <li>• {t('football.volunteer.online.mentoring')}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-green-800 to-emerald-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <Heart className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            {t('football.cta.title')}
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-4xl mx-auto leading-relaxed">
            {t('football.cta.description')}
          </p>
          <div className="bg-white bg-opacity-10 rounded-lg p-6 mb-8 max-w-2xl mx-auto">
            <p className="text-lg italic text-green-100">
              "{t('football.cta.quote')}"
            </p>
            <p className="text-sm text-green-200 mt-2">{t('football.cta.verse')}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/support"
              className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-10 py-4 rounded-full font-semibold text-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              {t('football.cta.join')}
            </a>
            <a
              href="/donate"
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-10 py-4 rounded-full font-semibold text-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              {t('football.cta.support')}
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-green-800 transition-all duration-200"
            >
              {t('football.cta.contact')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Football;
