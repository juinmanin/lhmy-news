import React from 'react';
import { Heart, Users, Target, Award, Lightbulb, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSiteSettings } from '../hooks/useSiteSettings';

const About: React.FC = () => {
  const { t } = useLanguage();
  const settings = useSiteSettings();

  const values = [
    {
      icon: Heart,
      titleKey: 'about.values.love',
      descKey: 'about.values.love.desc',
    },
    {
      icon: Target,
      titleKey: 'about.values.practical',
      descKey: 'about.values.practical.desc',
    },
    {
      icon: Users,
      titleKey: 'about.values.inclusion',
      descKey: 'about.values.inclusion.desc',
    },
    {
      icon: Lightbulb,
      titleKey: 'about.values.innovation',
      descKey: 'about.values.innovation.desc',
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('about.hero.title')}</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            {t('about.hero.subtitle')}
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-blue-800 mb-6">{t('about.mission.title')}</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                {t('about.mission.description')}
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">{t('about.mission.point1')}</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">{t('about.mission.point2')}</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">{t('about.mission.point3')}</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/8926626/pexels-photo-8926626.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="아시아 청소년들이 함께 공부하는 모습"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full w-20 h-20 flex items-center justify-center shadow-lg">
                <Heart className="h-10 w-10 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img
                src="https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="희망의 미래"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-blue-800 mb-6">{t('about.vision.title')}</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                {t('about.vision.description')}
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Globe className="h-6 w-6 text-blue-600" />
                  <span className="text-gray-700">{t('about.vision.point1')}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="h-6 w-6 text-blue-600" />
                  <span className="text-gray-700">{t('about.vision.point2')}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Lightbulb className="h-6 w-6 text-blue-600" />
                  <span className="text-gray-700">{t('about.vision.point3')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">{t('about.values.title')}</h2>
            <p className="text-xl text-gray-600">{t('about.values.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-6 group-hover:scale-110 transition-transform duration-200">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-blue-800 mb-4">{t(value.titleKey)}</h3>
                <p className="text-gray-600 leading-relaxed">{t(value.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">{t('about.journey.title')}</h2>
            <p className="text-xl text-gray-600">{t('about.journey.subtitle')}</p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200"></div>
            {settings.milestones.map((milestone, index) => (
              <div key={milestone.id} className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
                    <span className="inline-block bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-2">
                      {milestone.year}
                    </span>
                    <p className="text-gray-700 leading-relaxed">{milestone.title}</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">{t('about.team.title')}</h2>
            <p className="text-xl text-gray-600">{t('about.team.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {settings.team.map((member) => (
              <div key={member.id} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-24 h-24 rounded-full mx-auto shadow-lg group-hover:shadow-xl transition-all duration-200 border-4 border-white bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-4xl">
                    {member.emoji}
                  </div>
                </div>
                <h3 className="text-base font-semibold text-blue-800 mb-2">{member.name}</h3>
                <p className="text-amber-600 font-medium mb-2 text-xs">{member.role}</p>
                <p className="text-gray-600 text-xs leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-blue-800 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">{t('about.cta.title')}</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            {t('about.cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/support"
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              {t('about.cta.join')}
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-800 transition-all duration-200"
            >
              {t('about.cta.contact')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
