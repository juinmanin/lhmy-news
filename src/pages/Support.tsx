import React from 'react';
import { User, Users, Heart, Mail, Phone, Clock, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Support: React.FC = () => {
  const { t } = useLanguage();

  const supportTypes = [
    {
      icon: User,
      titleKey: 'support.student.title',
      infoKey: 'support.student.info',
      requirementsKey: 'support.student.requirements',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
      borderColor: 'border-blue-200'
    },
    {
      icon: Users,
      titleKey: 'support.volunteer.title',
      infoKey: 'support.volunteer.info',
      requirementsKey: 'support.volunteer.requirements',
      color: 'from-amber-500 to-orange-500',
      bgColor: 'from-amber-50 to-orange-50',
      borderColor: 'border-amber-200'
    },
    {
      icon: Heart,
      titleKey: 'support.partner.title',
      infoKey: 'support.partner.info',
      requirementsKey: 'support.partner.requirements',
      color: 'from-green-500 to-teal-500',
      bgColor: 'from-green-50 to-teal-50',
      borderColor: 'border-green-200'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('support.hero.title')}</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            {t('support.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Support Information */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">{t('support.info.title')}</h2>
          </div>

          <div className="space-y-12">
            {supportTypes.map((support, index) => (
              <div key={index} className={`bg-gradient-to-r ${support.bgColor} rounded-xl p-8 border ${support.borderColor}`}>
                <div className="flex items-center mb-6">
                  <div className={`bg-gradient-to-r ${support.color} rounded-full p-4 mr-4`}>
                    <support.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-blue-800">{t(support.titleKey)}</h3>
                </div>
                
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  {t(support.infoKey)}
                </p>
                
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <pre className="text-gray-700 whitespace-pre-line font-sans leading-relaxed">
                    {t(support.requirementsKey)}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">{t('support.contact.methods')}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6 border border-blue-200">
                <div className="flex items-center mb-4">
                  <Mail className="h-8 w-8 text-blue-600 mr-3" />
                  <h3 className="text-xl font-semibold text-blue-800">이메일</h3>
                </div>
                <p className="text-gray-700 font-mono text-lg mb-2">lhmy.kr@gmail.com</p>
                <p className="text-gray-600 text-sm">가장 확실한 연락 방법</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
                <div className="flex items-center mb-4">
                  <Phone className="h-8 w-8 text-green-600 mr-3" />
                  <h3 className="text-xl font-semibold text-blue-800">전화/문자</h3>
                </div>
                <p className="text-gray-700 font-mono text-lg mb-2">+60 11-2079-8850</p>
                <p className="text-gray-600 text-sm">긴급시 24시간 가능</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg p-6 border border-yellow-200">
              <div className="flex items-center mb-4">
                <Clock className="h-6 w-6 text-amber-600 mr-3" />
                <h3 className="text-lg font-semibold text-blue-800">{t('support.contact.hours')}</h3>
              </div>
              <p className="text-gray-700 mb-4">{t('support.contact.response')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Visit Information */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-8 border border-blue-200">
            <div className="text-center mb-8">
              <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-blue-800">직접 방문</h2>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-blue-300">
              <div className="text-center">
                <p className="text-lg font-semibold text-blue-800 mb-2">등대 말레이시아 센터</p>
                <p className="text-gray-700 mb-4">
                  15-1F, Jalan Perubatan 4,<br />
                  Taman Pandan Indah,<br />
                  55100 Kuala Lumpur, Selangor, Malaysia
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                  <p><strong>월-금:</strong> 오전 9시 - 오후 6시</p>
                  <p><strong>토:</strong> 오전 9시 - 오후 2시</p>
                  <p><strong>일:</strong> 휴무</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Support;