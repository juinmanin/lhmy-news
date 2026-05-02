import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSiteSettings } from '../hooks/useSiteSettings';

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const settings = useSiteSettings();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('contact.hero.title')}</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            {t('contact.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">{t('contact.info.title')}</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Details */}
            <div className="space-y-8">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full p-3">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-800 mb-2">{t('contact.address.title')}</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t('contact.address.detail')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-3">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-800 mb-2">{t('contact.phone.title')}</h3>
                    <p className="text-gray-700 font-mono text-lg mb-2">{t('contact.phone.number')}</p>
                    <p className="text-gray-500 text-sm">{t('contact.phone.hours')}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-3">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-800 mb-2">{t('contact.email.title')}</h3>
                    <p className="text-gray-700 font-mono text-lg">{t('contact.email.address')}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-full p-3">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-800 mb-2">{t('contact.hours.title')}</h3>
                    <div className="text-gray-600 space-y-1">
                      <p>{settings.contact.weekdays || t('contact.hours.weekdays')}</p>
                      <p>{settings.contact.field || t('contact.hours.field')}</p>
                      <p>{settings.contact.closed || t('contact.hours.closed')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Inquiry Information */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-blue-800 mb-8">{t('contact.inquiry.title')}</h2>
              
              <div className="mb-8">
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  {t('contact.inquiry.info')}
                </p>
                
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6 border border-blue-200 mb-6">
                  <pre className="text-gray-700 whitespace-pre-line font-sans leading-relaxed">
                    {t('contact.inquiry.methods')}
                  </pre>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-blue-800 mb-4">{t('contact.inquiry.include')}</h3>
                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg p-6 border border-yellow-200">
                  <pre className="text-gray-700 whitespace-pre-line font-sans leading-relaxed">
                    {t('contact.inquiry.requirements')}
                  </pre>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
                <div className="flex items-center mb-3">
                  <MessageCircle className="h-6 w-6 text-green-600 mr-3" />
                  <h3 className="text-lg font-semibold text-green-800">응답 시간</h3>
                </div>
                <p className="text-gray-700 font-medium">{t('contact.response')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">{t('contact.location.title')}</h2>
            <p className="text-xl text-gray-600">{t('contact.location.subtitle')}</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <MapPin className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-blue-800 mb-4">등대 말레이시아 센터</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                15-1F, Jalan Perubatan 4,<br />
                Taman Pandan Indah,<br />
                55100 Kuala Lumpur, Selangor, Malaysia
              </p>
            </div>
            
            <div className="text-center">
              <a
                href="https://maps.google.com/?q=15-1F,+Jalan+Perubatan+4,+Taman+Pandan+Indah,+55100+Kuala+Lumpur,+Selangor,+Malaysia"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Google Maps에서 보기
              </a>
            </div>
          </div>

          {/* Transportation Info */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">대중교통</h3>
              <p className="text-gray-600 text-sm">
                LRT Pandan Indah역에서 도보 10분
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">자가용</h3>
              <p className="text-gray-600 text-sm">
                무료 주차 공간 이용 가능
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">택시/그랩</h3>
              <p className="text-gray-600 text-sm">
                KL 시내에서 약 20분 소요
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">자주 묻는 질문</h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg shadow-md p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                교육비가 정말 무료인가요?
              </h3>
              <p className="text-gray-600">
                네, 등대 말레이시아의 모든 교육 프로그램은 완전 무료로 제공됩니다. 교재비나 추가 비용도 없습니다.
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg shadow-md p-6 border border-green-200">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                신청은 어떻게 하나요?
              </h3>
              <p className="text-gray-600">
                위에 안내된 연락처로 필요한 정보를 포함하여 연락주시면 됩니다. 이메일이나 전화 모두 가능합니다.
              </p>
            </div>

            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg shadow-md p-6 border border-amber-200">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                나이 제한이 있나요?
              </h3>
              <p className="text-gray-600">
                주로 {settings.contact.studentAge} 청소년을 대상으로 하지만, 개별 상황에 따라 유연하게 고려합니다.
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg shadow-md p-6 border border-purple-200">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                자원봉사는 어떻게 참여하나요?
              </h3>
              <p className="text-gray-600">
                자원봉사 신청 정보를 포함하여 연락주시면 면담 후 적합한 봉사 활동을 안내해드립니다.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
