import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HaiLogo } from '../common/HaiLogo';
import {
  ShoppingBag,
  Menu,
  X,
  Globe,
  ShieldCheck,
  Sprout,
  Store,
  Compass,
  LineChart,
  FileText,
  PhoneCall,
  Activity
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    language,
    setLanguage,
    activeTab,
    setActiveTab,
    cartItemCount,
    setIsCartOpen,
    activeRole,
    setActiveRole
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', labelEn: 'Home', labelTa: 'முகப்பு', icon: Compass },
    { id: 'how-it-works', labelEn: 'How It Works', labelTa: 'எப்படி இயங்குகிறது', icon: Activity },
    { id: 'farmers', labelEn: 'For Farmers', labelTa: 'உழவர்களுக்கு', icon: Sprout },
    { id: 'buyers', labelEn: 'For Businesses', labelTa: 'வணிகங்களுக்கு', icon: Store },
    { id: 'catalogue', labelEn: 'Produce Catalogue', labelTa: 'காய்கறி பட்டியல்', icon: ShoppingBag },
    { id: 'market-intel', labelEn: 'Market Intelligence', labelTa: 'சந்தை நிலவரம்', icon: LineChart },
    { id: 'sourcing-network', labelEn: 'Sourcing Catchments', labelTa: 'கொள்முதல் பகுதிகள்', icon: Compass },
    { id: 'research', labelEn: 'Research & Evidence', labelTa: 'ஆய்வுத் தரவுகள்', icon: FileText },
    { id: 'about', labelEn: 'About HAI', labelTa: 'எங்களை பற்றி', icon: ShieldCheck },
    { id: 'pilot', labelEn: '90-Day Pilot', labelTa: 'கள முன்னோட்டம்', icon: Activity },
    { id: 'contact', labelEn: 'Contact', labelTa: 'தொடர்புக்கு', icon: PhoneCall },
    { id: 'admin', labelEn: 'Admin Portal', labelTa: 'நிர்வாகம்', icon: ShieldCheck, badge: 'Staff' }
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-hai-border shadow-sm">
      {/* Top Banner: Transparency & Region Notice */}
      <div className="bg-hai-forest text-hai-offwhite text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-hai-agri animate-pulse"></span>
            <span>
              {language === 'en'
                ? 'Target Catchments: Chandrapuram (641669) & Pethappampatti (642205), Tamil Nadu • Demo Environment'
                : 'செயல்பாட்டு பகுதிகள்: சந்திராபுரம் (641669) & பெத்தப்பம்பட்டி (642205) • மாதிரி தளம்'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Quick Role Switcher for easy testing */}
            <div className="flex items-center gap-1.5 text-[11px] bg-white/10 px-2 py-0.5 rounded">
              <span className="text-hai-leaf/80">Role View:</span>
              <select
                aria-label="Select demo role view"
                value={activeRole}
                onChange={(e) => setActiveRole(e.target.value as any)}
                className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
              >
                <option value="visitor" className="text-gray-900">General Visitor</option>
                <option value="farmer" className="text-gray-900">Farmer</option>
                <option value="buyer" className="text-gray-900">Business Buyer</option>
                <option value="admin" className="text-gray-900">Platform Admin</option>
              </select>
            </div>

            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'ta' : 'en')}
              className="flex items-center gap-1 font-semibold text-hai-leaf hover:text-white transition-colors cursor-pointer"
              title="Toggle Language / மொழி மாற்றுக"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'தமிழ் (TA)' : 'English (EN)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 text-left cursor-pointer focus:outline-none"
          >
            <HaiLogo size="md" />
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors relative cursor-pointer ${
                    isActive
                      ? 'bg-hai-leaf text-hai-forest font-bold'
                      : 'text-hai-charcoal/80 hover:text-hai-forest hover:bg-hai-offwhite'
                  }`}
                >
                  {language === 'en' ? item.labelEn : item.labelTa}
                  {item.badge && (
                    <span className="ml-1 text-[9px] px-1 py-0.2 bg-hai-forest text-white rounded font-mono">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs & Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Direct Join CTAs (Desktop) */}
            <button
              onClick={() => handleNavClick('farmers')}
              className="hidden md:inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-md border border-hai-agri text-hai-forest hover:bg-hai-leaf transition-colors cursor-pointer"
            >
              <Sprout className="w-3.5 h-3.5 text-hai-agri" />
              <span>{language === 'en' ? 'Join as Farmer' : 'உழவர் பதிவு'}</span>
            </button>

            <button
              onClick={() => handleNavClick('buyers')}
              className="hidden sm:inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold rounded-md bg-hai-forest text-white hover:bg-hai-agri transition-colors shadow-sm cursor-pointer"
            >
              <Store className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Source for Business' : 'வணிக கொள்முதல்'}</span>
            </button>

            {/* Cart / Order Basket Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-lg bg-hai-offwhite border border-hai-border text-hai-charcoal hover:text-hai-forest hover:border-hai-agri transition-all cursor-pointer"
              title="View Procurement Basket"
            >
              <ShoppingBag className="w-5 h-5 text-hai-forest" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-hai-earth text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-hai-charcoal hover:bg-hai-offwhite cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-hai-border bg-white px-4 pt-3 pb-6 shadow-lg max-h-[85vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-left transition-colors ${
                    isActive
                      ? 'bg-hai-leaf text-hai-forest font-bold'
                      : 'text-hai-charcoal hover:bg-hai-offwhite'
                  }`}
                >
                  <Icon className="w-4 h-4 text-hai-agri" />
                  <span>{language === 'en' ? item.labelEn : item.labelTa}</span>
                  {item.badge && (
                    <span className="ml-auto text-[9px] px-1.5 py-0.5 bg-hai-forest text-white rounded">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-hai-border flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('farmers')}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold rounded-lg border border-hai-agri text-hai-forest bg-hai-leaf/40"
            >
              <Sprout className="w-4 h-4 text-hai-agri" />
              <span>{language === 'en' ? 'Join as a Farmer (விவசாயிகள் சேர்க்கை)' : 'உழவர் சேர்க்கை'}</span>
            </button>
            <button
              onClick={() => handleNavClick('buyers')}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold rounded-lg bg-hai-forest text-white shadow-sm"
            >
              <Store className="w-4 h-4" />
              <span>{language === 'en' ? 'Source for Your Business (வணிக கொள்முதல்)' : 'வணிக கொள்முதல் பதிவு'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
