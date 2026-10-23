import React from 'react';
import { useApp } from '../../context/AppContext';
import { HaiLogo } from '../common/HaiLogo';
import { ShieldCheck, MapPin, ExternalLink, Mail, Phone, Info } from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, setActiveTab } = useApp();

  return (
    <footer className="bg-hai-forest text-hai-offwhite border-t border-hai-forest/60 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <HaiLogo theme="dark" size="lg" />
            <p className="text-sm text-hai-offwhite/80 max-w-sm leading-relaxed">
              {language === 'en'
                ? 'HAI (Human Agri Intelligence) connects local farmers, transparent market intelligence, and bulk buyers to build a coordinated, reliable farm-to-market agricultural supply chain across Tamil Nadu.'
                : 'மனித வேளாண் நுண்ணறிவு (HAI): உழவர்கள், சந்தை நிலவரம் மற்றும் வணிகங்களை ஒருங்கிணைத்து நம்பகமான பண்ணை-சந்தை விநியோகச் சங்கிலியை உருவாக்குகிறது.'}
            </p>
            <div className="text-xs text-hai-leaf/80 space-y-1">
              <p className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-hai-agri" />
                <span>Working Catchments: Chandrapuram (641669) & Pethappampatti (642205)</span>
              </p>
              <p className="flex items-center gap-1.5 pl-5">
                <span>Wholesale Regional Hubs: Oddanchatram • Tiruppur • Coimbatore</span>
              </p>
            </div>
          </div>

          {/* Core Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-hai-leaf mb-4">
              {language === 'en' ? 'Platform' : 'தளம்'}
            </h4>
            <ul className="space-y-2.5 text-xs text-hai-offwhite/80">
              <li>
                <button
                  onClick={() => { setActiveTab('how-it-works'); window.scrollTo(0, 0); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {language === 'en' ? 'How HAI Works' : 'எப்படி இயங்குகிறது'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('catalogue'); window.scrollTo(0, 0); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {language === 'en' ? 'Vegetable Catalogue' : 'காய்கறி பட்டியல்'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('market-intel'); window.scrollTo(0, 0); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {language === 'en' ? 'Market Intelligence' : 'சந்தை நுண்ணறிவு'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('sourcing-network'); window.scrollTo(0, 0); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {language === 'en' ? 'Sourcing Network Map' : 'கொள்முதல் வரைபடம்'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('pilot'); window.scrollTo(0, 0); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {language === 'en' ? '90-Day Pilot Operations' : '90-நாள் கள முன்னோட்டம்'}
                </button>
              </li>
            </ul>
          </div>

          {/* Portals & Users */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-hai-leaf mb-4">
              {language === 'en' ? 'Portals & Roles' : 'பயனர்கள்'}
            </h4>
            <ul className="space-y-2.5 text-xs text-hai-offwhite/80">
              <li>
                <button
                  onClick={() => { setActiveTab('farmers'); window.scrollTo(0, 0); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {language === 'en' ? 'For Local Farmers' : 'உழவர்களுக்கு'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('buyers'); window.scrollTo(0, 0); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {language === 'en' ? 'For Business Buyers' : 'வணிக வாங்குபவர்களுக்கு'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('admin'); window.scrollTo(0, 0); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {language === 'en' ? 'Admin Dashboard' : 'நிர்வாகக் கட்டுப்பாட்டு தளம்'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('research'); window.scrollTo(0, 0); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {language === 'en' ? 'Research & Evidence Base' : 'ஆராய்ச்சி மற்றும் சான்றுகள்'}
                </button>
              </li>
            </ul>
          </div>

          {/* Transparency & Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-hai-leaf mb-4">
              {language === 'en' ? 'Trust & Policies' : 'கொள்கைகள்'}
            </h4>
            <ul className="space-y-2.5 text-xs text-hai-offwhite/80">
              <li>
                <button
                  onClick={() => { setActiveTab('contact'); window.scrollTo(0, 0); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {language === 'en' ? 'Quality & Dispute Policy' : 'தரக் கட்டுப்பாடு கொள்கை'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('contact'); window.scrollTo(0, 0); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {language === 'en' ? 'Privacy Policy' : 'தனியுரிமை கொள்கை'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('contact'); window.scrollTo(0, 0); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {language === 'en' ? 'Terms & Operating Rules' : 'விதிமுறைகள்'}
                </button>
              </li>
              <li className="pt-2 text-hai-leaf/70 text-[11px] leading-snug">
                Official Government Reference:{' '}
                <a
                  href="https://www.agrimark.tn.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-0.5 text-hai-leaf hover:underline"
                >
                  agrimark.tn.gov.in <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Operating Disclaimer & Ground Truth */}
        <div className="pt-8 text-xs text-hai-offwhite/60 space-y-3">
          <div className="flex items-start gap-2 bg-white/5 p-3 rounded-lg border border-white/10">
            <Info className="w-4 h-4 text-hai-earth shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Transparency Note & Demo Disclosure:</strong> HAI is an early-stage agritech concept and operating model design for Tamil Nadu. 
              The metrics, prices, and village locations shown on this platform are structured demo data for pilot validation and testing. 
              HAI does not make unsupported performance claims, does not invent live transaction numbers, and does not claim official government endorsement. 
              Actual procurement is subject to verified local farmer availability, physical grading, and confirmed commercial terms.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <p>© 2026 HAI — Human Agri Intelligence. All rights reserved. Designed for Tamil Nadu Agriculture.</p>
            <p className="text-[11px] text-hai-offwhite/50">
              Core Stack: Next.js / React / TypeScript • Relational Architecture: PostgreSQL (Supabase)
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
