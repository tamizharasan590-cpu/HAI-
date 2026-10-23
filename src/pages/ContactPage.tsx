import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  PhoneCall,
  Mail,
  MapPin,
  MessageSquare,
  ShieldCheck,
  Send,
  HelpCircle,
  FileText,
  AlertCircle
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { language, showToast } = useApp();

  const [contactType, setContactType] = useState<
    'farmer' | 'business' | 'partner' | 'general'
  >('business');
  const [name, setName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [message, setMessage] = useState('');
  const [activeLegalPolicy, setActiveLegalPolicy] = useState<
    'dispute' | 'privacy' | 'terms' | null
  >(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !emailOrPhone.trim()) {
      alert('Please fill in your name and contact info.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setName('');
      setEmailOrPhone('');
      setMessage('');
      showToast('Enquiry received in Demo Mode. Our pilot team will respond.');
    }, 500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Page Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-hai-leaf text-hai-forest text-xs font-semibold">
          <PhoneCall className="w-3.5 h-3.5" />
          <span>Onboarding, Inquiries & Operational Centers</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-hai-forest tracking-tight">
          Connect with the HAI Team
        </h1>
        <p className="text-sm sm:text-base text-hai-charcoal/80 leading-relaxed">
          Whether you are a farmer looking to register your upcoming harvest, a business buyer exploring consolidated daily sourcing, or an institution seeking supply collaboration.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Segmented Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-hai-border shadow-soft p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-hai-border">
            <h2 className="text-xl font-bold text-hai-forest">Send an Enquiry</h2>
            {/* Contact Type Pills */}
            <div className="flex items-center p-1 bg-hai-offwhite rounded-lg border border-hai-border text-xs">
              <button
                type="button"
                onClick={() => setContactType('business')}
                className={`px-3 py-1.5 rounded-md font-bold transition-all cursor-pointer ${
                  contactType === 'business'
                    ? 'bg-hai-forest text-white'
                    : 'text-hai-charcoal hover:text-hai-forest'
                }`}
              >
                Business
              </button>
              <button
                type="button"
                onClick={() => setContactType('farmer')}
                className={`px-3 py-1.5 rounded-md font-bold transition-all cursor-pointer ${
                  contactType === 'farmer'
                    ? 'bg-hai-forest text-white'
                    : 'text-hai-charcoal hover:text-hai-forest'
                }`}
              >
                Farmer
              </button>
              <button
                type="button"
                onClick={() => setContactType('partner')}
                className={`px-3 py-1.5 rounded-md font-bold transition-all cursor-pointer ${
                  contactType === 'partner'
                    ? 'bg-hai-forest text-white'
                    : 'text-hai-charcoal hover:text-hai-forest'
                }`}
              >
                Partner
              </button>
              <button
                type="button"
                onClick={() => setContactType('general')}
                className={`px-3 py-1.5 rounded-md font-bold transition-all cursor-pointer ${
                  contactType === 'general'
                    ? 'bg-hai-forest text-white'
                    : 'text-hai-charcoal hover:text-hai-forest'
                }`}
              >
                General
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-hai-charcoal font-semibold mb-1">
                  Full Name / Organization *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. S. Karthik / Hotel Annapoorna"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-hai-border focus:border-hai-agri focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-hai-charcoal font-semibold mb-1">
                  Phone Number or Email *
                </label>
                <input
                  type="text"
                  required
                  placeholder="+91 9XXXX XXXXX / buyer@domain.com"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-hai-border focus:border-hai-agri focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-hai-charcoal font-semibold mb-1">
                Message / Procurement Requirements *
              </label>
              <textarea
                rows={4}
                required
                placeholder={
                  contactType === 'business'
                    ? 'Specify daily produce volume, delivery location in Coimbatore/Tiruppur, and timing...'
                    : contactType === 'farmer'
                    ? 'Specify your village name, crops grown, and upcoming harvest dates...'
                    : 'Share details of your partnership or general inquiry...'
                }
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-hai-border focus:border-hai-agri focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-hai-forest text-white rounded-lg font-bold text-xs sm:text-sm hover:bg-hai-agri transition-colors shadow-sm disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 text-hai-leaf" />
              <span>{isSubmitting ? 'Sending Enquiry...' : 'Submit Contact Enquiry'}</span>
            </button>
          </form>

          <p className="text-[11px] text-hai-muted text-center pt-2">
            * This form operates in demo mode. All submissions are stored locally in the demo state.
          </p>
        </div>

        {/* Right Column: Operating Hub Placeholders & Operating Policies */}
        <div className="lg:col-span-5 space-y-6">
          {/* Operating Hubs */}
          <div className="bg-white rounded-2xl border border-hai-border shadow-soft p-6 space-y-4 text-xs">
            <h3 className="font-bold text-sm text-hai-forest uppercase tracking-wider">
              Field Coordination Nodes
            </h3>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-hai-offwhite border border-hai-border space-y-1">
                <span className="font-bold text-hai-forest block">
                  Chandrapuram Hub (PIN 641669)
                </span>
                <p className="text-hai-muted">
                  Sultanpet Junction Coordination Node, Coimbatore / Tiruppur Border
                </p>
                <p className="text-[10px] text-hai-agri font-mono font-semibold">
                  Field Helpline: [Placeholder +91 94420 XXXXX]
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-hai-offwhite border border-hai-border space-y-1">
                <span className="font-bold text-hai-forest block">
                  Pethappampatti Hub (PIN 642205)
                </span>
                <p className="text-hai-muted">
                  Pethappampatti Center Sorting Center, Tiruppur District
                </p>
                <p className="text-[10px] text-hai-agri font-mono font-semibold">
                  Field Helpline: [Placeholder +91 98430 XXXXX]
                </p>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-hai-muted leading-relaxed">
              <strong>Official Notice:</strong> Phone numbers and specific building addresses above are preliminary placeholders until commercial licensing and pilot field offices are formalized.
            </div>
          </div>

          {/* Legal Policies Modal Triggers */}
          <div className="bg-hai-offwhite rounded-2xl border border-hai-border p-6 space-y-3 text-xs">
            <h3 className="font-bold text-sm text-hai-forest uppercase tracking-wider">
              Legal, Privacy & Operating Policies
            </h3>
            <p className="text-hai-charcoal/80 leading-relaxed text-[11px]">
              HAI maintains clear, auditable operational rules to protect all participants:
            </p>

            <div className="space-y-2 pt-1">
              <button
                onClick={() => setActiveLegalPolicy('dispute')}
                className="w-full text-left p-2.5 rounded-lg bg-white border border-hai-border hover:border-hai-agri transition-colors flex items-center justify-between cursor-pointer"
              >
                <span className="font-semibold text-hai-forest">
                  Return, Rejection & Quality Dispute Policy
                </span>
                <span className="text-[10px] text-hai-agri font-bold">Read →</span>
              </button>

              <button
                onClick={() => setActiveLegalPolicy('privacy')}
                className="w-full text-left p-2.5 rounded-lg bg-white border border-hai-border hover:border-hai-agri transition-colors flex items-center justify-between cursor-pointer"
              >
                <span className="font-semibold text-hai-forest">
                  Privacy & Farmer Data Protection Policy
                </span>
                <span className="text-[10px] text-hai-agri font-bold">Read →</span>
              </button>

              <button
                onClick={() => setActiveLegalPolicy('terms')}
                className="w-full text-left p-2.5 rounded-lg bg-white border border-hai-border hover:border-hai-agri transition-colors flex items-center justify-between cursor-pointer"
              >
                <span className="font-semibold text-hai-forest">
                  Terms of Trade & Logistics Conditions
                </span>
                <span className="text-[10px] text-hai-agri font-bold">Read →</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Policy Drawer / Modal */}
      {activeLegalPolicy && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-4 border border-hai-border shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-hai-border">
              <h3 className="font-bold text-base text-hai-forest">
                {activeLegalPolicy === 'dispute'
                  ? 'Return, Rejection & Dispute Resolution Policy'
                  : activeLegalPolicy === 'privacy'
                  ? 'Farmer & Buyer Data Privacy Commitment'
                  : 'Terms of Trade & Operating Rules'}
              </h3>
              <button
                onClick={() => setActiveLegalPolicy(null)}
                className="p-1 rounded hover:bg-gray-100 cursor-pointer font-bold"
              >
                ✕
              </button>
            </div>

            <div className="text-xs text-hai-charcoal/80 space-y-3 leading-relaxed max-h-96 overflow-y-auto pr-2">
              {activeLegalPolicy === 'dispute' && (
                <>
                  <p>
                    <strong>1. Immediate Delivery Check:</strong> Commercial buyers must inspect sealed crates upon physical delivery and report visible transit crushing or weight shortages within 2 hours.
                  </p>
                  <p>
                    <strong>2. Photo Evidence & Verification:</strong> Batch photos submitted through the buyer portal are verified by the assigned HAI QC Officer.
                  </p>
                  <p>
                    <strong>3. Credit Note Issuance:</strong> Confirmed damaged or rejected produce is credited on the next invoice without delaying primary delivery schedules.
                  </p>
                </>
              )}

              {activeLegalPolicy === 'privacy' && (
                <>
                  <p>
                    <strong>1. Protection of Farmer Identifiers:</strong> Individual farmer landholding surveys, bank details, and personal phone numbers are never shared publicly or resold to third-party marketing entities.
                  </p>
                  <p>
                    <strong>2. Transaction Confidentiality:</strong> Commercial buyer order quantities and price contract terms are protected under role-based authentication.
                  </p>
                </>
              )}

              {activeLegalPolicy === 'terms' && (
                <>
                  <p>
                    <strong>1. Fresh Produce GST Exemption:</strong> In accordance with Indian GST statutes (HSN 0709), fresh unprocessed vegetables are zero-rated.
                  </p>
                  <p>
                    <strong>2. Sourcing Priorities:</strong> Local farmer supply takes priority. Wholesale markets act strictly as supplemental buffers during documented volume shortages.
                  </p>
                </>
              )}
            </div>

            <div className="pt-3 border-t border-hai-border text-right">
              <button
                onClick={() => setActiveLegalPolicy(null)}
                className="px-4 py-2 bg-hai-forest text-white rounded font-bold text-xs hover:bg-hai-agri"
              >
                Close Policy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
