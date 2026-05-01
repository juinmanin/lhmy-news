import React from 'react';
import { Mail, Phone, MapPin, Heart, Facebook, Instagram, Youtube } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LighthouseIcon from './LighthouseIcon';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gradient-to-r from-blue-900 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Mission */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <LighthouseIcon className="h-10 w-10" />
              <div>
                <span className="text-xl font-bold leading-tight">등대 말레이시아</span>
                <span className="text-sm text-blue-200 block leading-tight">Lighthouse Malaysia Youth Center</span>
              </div>
            </div>
            <p className="text-blue-100 mb-4 leading-relaxed">
              {t('footer.mission')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-200 hover:text-white transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors duration-200">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.quicklinks')}</h3>
            <ul className="space-y-2">
              <li><a href="/programs" className="text-blue-200 hover:text-white transition-colors duration-200">{t('nav.programs')}</a></li>
              <li><a href="/football" className="text-blue-200 hover:text-white transition-colors duration-200">{t('nav.football')}</a></li>
              <li><a href="/support" className="text-blue-200 hover:text-white transition-colors duration-200">{t('nav.support')}</a></li>
              <li><a href="/about" className="text-blue-200 hover:text-white transition-colors duration-200">{t('nav.about')}</a></li>
              <li><a href="/donate" className="text-blue-200 hover:text-white transition-colors duration-200">{t('nav.donate')}</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.contact')}</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <span className="text-blue-100 text-sm">
                  15-1F, Jalan Perubatan 4,<br />
                  Taman Pandan Indah,<br />
                  55100 Kuala Lumpur,<br />
                  Selangor, Malaysia
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-amber-400" />
                <span className="text-blue-100 text-sm">lhmy.kr@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-amber-400" />
                <span className="text-blue-100 text-sm">+60 11-2079-8850</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-blue-200 text-sm mb-4 md:mb-0">
            {t('footer.copyright')}
          </div>
          <div className="flex items-center space-x-1 text-blue-200 text-sm">
            <span>{t('footer.madewith')}</span>
            <Heart className="h-4 w-4 text-red-400" />
            <span>{t('footer.foryouth')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;