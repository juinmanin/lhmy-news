import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage, type Language } from '../contexts/LanguageContext';
import LighthouseIcon from './LighthouseIcon';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const navigation = [
    { name: 'nav.home', href: '/' },
    { name: 'nav.programs', href: '/programs' },
    { name: 'nav.football', href: '/football' },
    { name: 'nav.news', href: '/news' },
    { name: 'nav.newsletter', href: '/newsletter' },
    { name: 'nav.support', href: '/support' },
    { name: 'nav.about', href: '/about' },
    { name: 'nav.contact', href: '/contact' },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="relative flex items-center">
              <LighthouseIcon className="h-10 w-10" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-blue-800 leading-tight">등대 말레이시아</span>
              <span className="text-sm text-gray-600 block leading-tight">Lighthouse Malaysia</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`${
                  location.pathname === item.href
                    ? 'text-blue-800 font-semibold border-b-2 border-blue-800'
                    : 'text-gray-700 hover:text-blue-800'
                } px-2 py-2 text-sm transition-all duration-200`}
              >
                {t(item.name)}
              </Link>
            ))}
            
            {/* Language Selector */}
            <div className="relative">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="appearance-none bg-white border border-gray-300 rounded-md px-2 py-1 pr-6 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ko">한국어</option>
                <option value="en">English</option>
                <option value="my">Bahasa</option>
              </select>
              <Globe className="absolute right-1 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400 pointer-events-none" />
            </div>

            {/* Donate Button */}
            <Link
              to="/donate"
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-sm"
            >
              {t('nav.donate')}
            </Link>
          </div>

          {/* Mobile Language Selector and Menu */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Language Selector */}
            <div className="relative">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="appearance-none bg-white border border-gray-300 rounded-md px-2 py-1 pr-6 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ko">한국어</option>
                <option value="en">English</option>
                <option value="my">Bahasa</option>
              </select>
              <Globe className="absolute right-1 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400 pointer-events-none" />
            </div>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-800 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            {navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`${
                  location.pathname === item.href
                    ? 'text-blue-800 font-semibold bg-blue-50'
                    : 'text-gray-700'
                } block px-4 py-2 hover:bg-blue-50 hover:text-blue-800 transition-colors duration-200`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t(item.name)}
              </Link>
            ))}
            <div className="px-4 py-2 border-t border-gray-200 mt-2">
              <Link
                to="/donate"
                className="block w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-center px-6 py-2 rounded-full font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.donate')}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
