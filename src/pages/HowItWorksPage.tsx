import React from 'react';
import { useApp } from '../context/AppContext';
import {
  FileCheck,
  Search,
  CheckCircle2,
  Scale,
  Sparkles,
  Truck,
  Receipt,
  LineChart,
  Layers,
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const { language, setActiveTab } = useApp();

  const steps = [
    {
      num: 1,
      titleEn: '1. Requirement Submission by Buyers',
      titleTa: '1. வணிக வாங்குபவர் தேவைகள் பதிவு',
      icon: FileCheck,
      descEn: 'Hotels, supermarkets, canteens, and shops specify daily vegetable quantities, desired quality grades (Grade A or B), and morning delivery slots.',
      descTa: 'ஹோட்டல்கள் மற்றும் கடைகள் தங்களுக்குத் தேவையான காய்கறிகள், தரம் மற்றும் டெலிவரி நேரத்தை பதிவு செய்கின்றன.'
    },
    {
      num: 2,
      titleEn: '2. Local Farmer Supply Matching',
      titleTa: '2. உள்ளூர் உழவர் இருப்பு ஆய்வு',
      icon: Search,
      descEn: 'HAI cross-references buyer demands with farmer harvest schedules in Chandrapuram (641669) and Pethappampatti (642205) catchments.',
      descTa: 'பதிவு செய்யப்பட்ட உழவர்களின் அறுவடை விவரங்களுடன் வாங்குபவர்களின் தேவைகள் ஒப்பிடப்படுகின்றன.'
    },
    {
      num: 3,
      titleEn: '3. Harvest Confirmation & Benchmark Terms',
      titleTa: '3. அறுவடை உறுதி மற்றும் விலை நிர்ணயம்',
      icon: CheckCircle2,
      descEn: 'Farmer quantities, pickup times, quality grades, and transparent market benchmark prices are confirmed prior to harvesting.',
      descTa: 'அறுவடைக்கு முன்பே உழவருடன் அளவு, நேரம் மற்றும் வெளிப்படையான சந்தை விலை உறுதி செய்யப்படுகிறது.'
    },
    {
      num: 4,
      titleEn: '4. Village Collection & Certified Weighing',
      titleTa: '4. கிராம அளவில் எடை போடுதல்',
      icon: Scale,
      descEn: 'Field coordinators visit village collection hubs with certified digital scales. Immediate weighing slips are issued with zero tare deductions.',
      descTa: 'டிஜிட்டல் எடைக் கருவிகள் மூலம் வெளிப்படையாக எடை போடப்பட்டு உடனடியாக ரசீது வழங்கப்படுகிறது.'
    },
    {
      num: 5,
      titleEn: '5. Quality Inspection, Sorting & Crating',
      titleTa: '5. தரப் பரிசோதனை மற்றும் பெட்டி அடுக்குதல்',
      icon: Sparkles,
      descEn: 'Produce is inspected for blemishes, size, and maturity, then packed into standardized rigid aerated crates to prevent transit bruising.',
      descTa: 'சேதம் மற்றும் தரம் பரிசோதிக்கப்பட்டு, காற்றோட்டமான பிளாஸ்டிக் பெட்டிகளில் பத்திரமாக அடுக்கப்படுகிறது.'
    },
    {
      num: 6,
      titleEn: '6. Route-Optimized Dispatch & Delivery',
      titleTa: '6. அதிகாலை விரைவு விநியோகம்',
      icon: Truck,
      descEn: 'Consolidated vehicles dispatch early morning deliveries to hotel kitchens, supermarkets, and commercial premises before daily trade begins.',
      descTa: 'வணிகங்கள் திறப்பதற்கு முன்பே அதிகாலையில் திட்டமிட்ட வாகனங்கள் மூலம் விநியோகம் செய்யப்படுகிறது.'
    },
    {
      num: 7,
      titleEn: '7. Digital Invoicing, Payments & Feedback',
      titleTa: '7. டிஜிட்டல் ரசீது மற்றும் பணப்பரிவர்த்தனை',
      icon: Receipt,
      descEn: 'Buyers verify crates, sign delivery confirmation, and receive digital invoices. Farmers receive direct digital payment tracking (NEFT/UPI).',
      descTa: 'வாங்குபவர் சரிபார்த்து ரசீது பெறுகிறார்; உழவருக்கு வங்கிக் கணக்கில் வெளிப்படையாக பணம் செலுத்தப்படுகிறது.'
    },
    {
      num: 8,
      titleEn: '8. Demand Forecasting & Adaptive Planning',
      titleTa: '8. எதிர்கால தேவை முன்கணிப்பு',
      icon: LineChart,
      descEn: 'Historical order trends, seasonal calendars, and harvest yields update HAI’s predictive demand models to guide next week’s planting and sourcing.',
      descTa: 'முந்தைய ஆர்டர்கள் மற்றும் பருவ கால விவரங்களை அடிப்படையாக கொண்டு அடுத்த வாரத்திற்கான திட்டமிடல் செய்யப்படுகிறது.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Page Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-hai-leaf text-hai-forest text-xs font-semibold">
          <Layers className="w-3.5 h-3.5" />
          <span>Operational Architecture & Workflow</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-hai-forest tracking-tight">
          How HAI Coordinates the Farm-to-Market Supply Chain
        </h1>
        <p className="text-sm sm:text-base text-hai-charcoal/80 leading-relaxed">
          From the smallholder field plot in Tamil Nadu to commercial kitchen prep tables, our 8-stage operational sequence ensures product traceability, fair weighing, and reliable logistics.
        </p>
      </div>

      {/* 8-Step Timeline */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-white p-6 rounded-2xl border border-hai-border shadow-soft flex items-start gap-4 hover:border-hai-agri transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-hai-forest text-white flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-hai-leaf" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm sm:text-base text-hai-forest">
                      {language === 'en' ? step.titleEn : step.titleTa}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-hai-charcoal/80 leading-relaxed">
                    {language === 'en' ? step.descEn : step.descTa}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Supplementary Wholesale Procurement Explanation */}
      <div className="bg-hai-offwhite rounded-2xl p-8 border border-hai-border space-y-6">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-hai-earth" />
          <h2 className="text-xl sm:text-2xl font-black text-hai-forest">
            Role of Wholesale Markets in HAI’s Operating Model
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-hai-charcoal/80 leading-relaxed">
          HAI is rooted in local farmer empowerment, but agricultural realities dictate that weather anomalies, pest outbreaks, and sudden bulk institutional orders can create localized supply deficits.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="bg-white p-5 rounded-xl border border-hai-border">
            <h3 className="font-bold text-sm text-hai-forest mb-2">1. Local Farmers First</h3>
            <p className="text-xs text-hai-charcoal/80 leading-relaxed">
              100% of confirmed local harvest batches from Chandrapuram and Pethappampatti take priority whenever quality benchmarks and landed logistics align.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-hai-border">
            <h3 className="font-bold text-sm text-hai-forest mb-2">2. Regulated Market Buffers</h3>
            <p className="text-xs text-hai-charcoal/80 leading-relaxed">
              HAI procures supplementary volume from regional wholesale APMCs (Oddanchatram, Tiruppur, Coimbatore) to protect buyers against 0% fill-rate stockouts.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-hai-border">
            <h3 className="font-bold text-sm text-hai-forest mb-2">3. Full Origin Transparency</h3>
            <p className="text-xs text-hai-charcoal/80 leading-relaxed">
              Every crate and order record clearly indicates whether it came directly from a local grower or from a wholesale buffer. No misleading claims.
            </p>
          </div>
        </div>
      </div>

      {/* Quality Grading Criteria */}
      <div className="bg-white rounded-2xl p-8 border border-hai-border shadow-soft space-y-6">
        <h2 className="text-xl sm:text-2xl font-black text-hai-forest">
          Quality Inspection & Grading Standards
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
          <div className="p-4 rounded-xl border border-green-200 bg-green-50/50 space-y-2">
            <span className="font-bold text-green-900 block text-base">Grade A (Premium Retail)</span>
            <p className="text-green-800/80 text-xs">
              Uniform size, unblemished surface, optimal maturity, maximum shelf life. Intended for supermarket displays, boutique grocery stores, and premium hotel dining.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50 space-y-2">
            <span className="font-bold text-blue-900 block text-base">Grade B (Kitchen / Canteen)</span>
            <p className="text-blue-800/80 text-xs">
              Minor cosmetic shape irregularities or slight surface marks, but 100% fresh, sound interior. Ideal for restaurant gravy preparation, hostel mess catering, and processing.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-gray-200 bg-gray-50 space-y-2">
            <span className="font-bold text-gray-900 block text-base">Standard Commercial</span>
            <p className="text-gray-700 text-xs">
              Mixed size distribution, bulk crating, lowest landed cost. Sourced for large-scale institutional canteens, temple feasts, and daily mass catering.
            </p>
          </div>
        </div>
      </div>

      {/* Next Steps CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-hai-forest rounded-xl text-white">
        <div>
          <h3 className="font-bold text-base">Ready to test the workflow?</h3>
          <p className="text-xs text-hai-leaf mt-0.5">
            Register as a grower or build a trial order basket to see how orders move through our pipeline.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('farmers')}
            className="px-4 py-2 bg-hai-agri rounded-md text-xs font-bold hover:bg-emerald-600 transition-colors"
          >
            For Farmers
          </button>
          <button
            onClick={() => setActiveTab('buyers')}
            className="px-4 py-2 bg-white text-hai-forest rounded-md text-xs font-bold hover:bg-hai-leaf transition-colors"
          >
            For Buyers
          </button>
        </div>
      </div>
    </div>
  );
};
