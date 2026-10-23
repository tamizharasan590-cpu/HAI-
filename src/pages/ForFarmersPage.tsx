import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CHANDRAPURAM_VILLAGES, PETHAPPAMPATTI_VILLAGES } from '../data/sourcingNetwork';
import { QualityGrade } from '../types';
import {
  Sprout,
  CheckCircle2,
  Scale,
  Calendar,
  PhoneCall,
  Clock,
  ArrowRight,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  MessageSquare,
  ShieldCheck
} from 'lucide-react';

export const ForFarmersPage: React.FC = () => {
  const { language, farmerBatches, addFarmerBatch, showToast } = useApp();

  // Farmer registration & produce submission state
  const [farmerName, setFarmerName] = useState('');
  const [phone, setPhone] = useState('');
  const [catchment, setCatchment] = useState('Chandrapuram Catchment (641669)');
  const [village, setVillage] = useState(CHANDRAPURAM_VILLAGES[0]);
  const [cropEn, setCropEn] = useState('Tomato (நாட்டுத் தக்காளி)');
  const [cropTa, setCropTa] = useState('தக்காளி');
  const [estimatedQuantityKg, setEstimatedQuantityKg] = useState<number>(300);
  const [harvestDate, setHarvestDate] = useState(
    new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]
  );
  const [grade, setGrade] = useState<QualityGrade>('Grade A (Premium Retail)');
  const [expectedPricePerKg, setExpectedPricePerKg] = useState<number>(26);
  const [preferredContact, setPreferredContact] = useState<
    'Phone Call' | 'WhatsApp' | 'Field Coordinator Visit'
  >('Phone Call');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const villageOptions =
    catchment.includes('641669') ? CHANDRAPURAM_VILLAGES : PETHAPPAMPATTI_VILLAGES;

  const handleSubmitBatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!farmerName.trim() || !phone.trim()) {
      alert(language === 'en' ? 'Please provide your name and contact phone.' : 'தயவுசெய்து உங்கள் பெயர் மற்றும் தொலைபேசி எண்ணை உள்ளிடவும்.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      addFarmerBatch({
        farmerName,
        phone,
        catchment,
        village,
        cropEn,
        cropTa,
        estimatedQuantityKg: Number(estimatedQuantityKg),
        harvestDate,
        grade,
        expectedPricePerKg: Number(expectedPricePerKg),
        preferredContact
      });
      setIsSubmitting(false);
      setFarmerName('');
      setPhone('');
      showToast('Harvest availability recorded. Our local coordinator will reach out.');
    }, 500);
  };

  const faqs = [
    {
      qEn: 'Does HAI guarantee a fixed purchase price or minimum income?',
      qTa: 'HAI நிறுவனம் நிலையான விலை அல்லது குறைந்தபட்ச வருமானத்திற்கு உத்தரவாதம் அளிக்கிறதா?',
      aEn: 'No. HAI does not guarantee fixed prices or artificial minimum incomes. HAI provides transparent market benchmark prices, confirmed purchase orders before harvest, and documented transaction slips so farmers are never blind to current market rates.',
      aTa: 'இல்லை. HAI நிலையான விலைக்கு உத்தரவாதம் அளிக்காது. ஆனால் அறுவடைக்கு முன்பே தெளிவான சந்தை விலை மற்றும் கொள்முதல் ஒப்பந்தத்தை வெளிப்படையாக உறுதி செய்கிறது.'
    },
    {
      qEn: 'How does weighing take place at the village collection hub?',
      qTa: 'கிராம கொள்முதல் மையத்தில் எடை எப்படி போடப்படுகிறது?',
      aEn: 'HAI field teams use government-certified electronic digital platform scales. Weighing is conducted in full presence of the farmer, with instant printed/SMS weigh slips and zero arbitrary commission cuts or tare manipulation.',
      aTa: 'அரசு முத்திரை பெற்ற மின்னணு எடைக் கருவிகள் மூலம் உங்கள் முன்னிலையிலேயே துல்லியமாக எடை போடப்பட்டு உடனே ரசீது வழங்கப்படும்.'
    },
    {
      qEn: 'When and how do farmers receive payment?',
      qTa: 'விவசாயிகளுக்கு எப்போது பணம் கிடைக்கும்?',
      aEn: 'Once quality verification is signed at the collection node, payment is initiated directly into the farmer’s bank account via NEFT/UPI or instant bank transfer within 24 to 48 hours, fully recorded in our system.',
      aTa: 'தரம் சரிபார்க்கப்பட்ட 24 முதல் 48 மணி நேரத்திற்குள் உழவரின் வங்கிக் கணக்கிற்கு (NEFT/UPI) நேரடியாக பணம் வரவு வைக்கப்படும்.'
    },
    {
      qEn: 'Can I register if I have a basic feature phone or low internet connectivity?',
      qTa: 'சாதாரண போன் அல்லது குறைந்த இணைய வசதி உள்ளவர்கள் பதிவு செய்ய முடியுமா?',
      aEn: 'Yes. Our local field coordinators in Chandrapuram and Pethappampatti register farmers directly via phone call or WhatsApp voice notes. You do not need an app or high-speed data to trade with HAI.',
      aTa: 'ஆம். எங்கள் கள ஒருங்கிணைப்பாளர்கள் தொலைபேசி அழைப்பு அல்லது வாட்ஸ்அப் மூலம் உங்களுக்கு நேரடியாக உதவி செய்வார்கள்.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Page Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-hai-leaf text-hai-forest text-xs font-semibold">
          <Sprout className="w-3.5 h-3.5" />
          <span>{language === 'en' ? 'Farmer Partnership Portal' : 'உழவர் கூட்டு தளம்'}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-hai-forest tracking-tight">
          {language === 'en'
            ? 'Transparent Access to Commercial Buyers'
            : 'வணிக வாங்குபவர்களுடன் வெளிப்படையான சந்தை இணைப்பு'}
        </h1>
        <p className="text-sm sm:text-base text-hai-charcoal/80 leading-relaxed">
          {language === 'en'
            ? 'Submit your upcoming harvest, receive clear purchase orders before harvesting, and experience fair digital weighing at your local village cluster.'
            : 'உங்கள் அறுவடை விவரங்களை பதிவு செய்யுங்கள்; அறுவடைக்கு முன்பே கொள்முதலை உறுதி செய்து நேர்மையான டிஜிட்டல் எடை முறையை அனுபவியுங்கள்.'}
        </p>

        {/* Operating disclaimer alert */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 text-xs text-amber-900 leading-relaxed">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p>
            <strong>Transparent Principle:</strong> HAI connects farmers to genuine buyer demand and provides transparent weighing and records. HAI does not guarantee higher prices, minimum incomes, or assured purchase quantities before commercial inspection.
          </p>
        </div>
      </div>

      {/* Main Grid: Registration & Produce Submission + Live Batches Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Harvest Availability Submission Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-hai-border shadow-soft space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-hai-border">
            <div>
              <h2 className="text-xl font-bold text-hai-forest">
                {language === 'en' ? 'Register Harvest Availability' : 'அறுவடை இருப்பு பதிவு படிவம்'}
              </h2>
              <p className="text-xs text-hai-muted mt-0.5">
                {language === 'en'
                  ? 'Tell us what you are harvesting so we can plan cluster collection.'
                  : 'அறுவடை செய்ய உள்ள பயிர் மற்றும் தேதியை பதிவு செய்யுங்கள்.'}
              </p>
            </div>
            <span className="text-[11px] font-mono bg-hai-leaf text-hai-forest px-2 py-1 rounded font-bold">
              DEMO FORM
            </span>
          </div>

          <form onSubmit={handleSubmitBatch} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-hai-charcoal font-semibold mb-1">
                  Farmer Full Name (உழவர் பெயர்) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. K. Muthusamy"
                  value={farmerName}
                  onChange={(e) => setFarmerName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-hai-border focus:border-hai-agri focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-hai-charcoal font-semibold mb-1">
                  Mobile Phone Number (தொலைபேசி எண்) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 9XXXX XXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-hai-border focus:border-hai-agri focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-hai-charcoal font-semibold mb-1">
                  Catchment Area (கொள்முதல் வட்டம்)
                </label>
                <select
                  value={catchment}
                  onChange={(e) => {
                    setCatchment(e.target.value);
                    setVillage(e.target.value.includes('641669') ? CHANDRAPURAM_VILLAGES[0] : PETHAPPAMPATTI_VILLAGES[0]);
                  }}
                  className="w-full px-3 py-2.5 rounded-lg border border-hai-border focus:border-hai-agri focus:outline-none bg-white"
                >
                  <option value="Chandrapuram Catchment (641669)">
                    Chandrapuram Catchment (PIN 641669)
                  </option>
                  <option value="Pethappampatti Catchment (642205)">
                    Pethappampatti Catchment (PIN 642205)
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-hai-charcoal font-semibold mb-1">
                  Village / Collection Hub (கிராமம்) *
                </label>
                <select
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-hai-border focus:border-hai-agri focus:outline-none bg-white"
                >
                  {villageOptions.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-hai-charcoal font-semibold mb-1">
                  Crop Name (பயிர்) *
                </label>
                <select
                  value={cropEn}
                  onChange={(e) => {
                    setCropEn(e.target.value);
                    if (e.target.value.includes('Tomato')) setCropTa('தக்காளி');
                    else if (e.target.value.includes('Small Onion')) setCropTa('சின்ன வெங்காயம்');
                    else if (e.target.value.includes('Chilli')) setCropTa('பச்சை மிளகாய்');
                    else if (e.target.value.includes('Drumstick')) setCropTa('முருங்கைக்காய்');
                    else setCropTa('காய்கறி');
                  }}
                  className="w-full px-3 py-2.5 rounded-lg border border-hai-border focus:border-hai-agri focus:outline-none bg-white"
                >
                  <option value="Tomato (Hybrid / Naatu)">Tomato (தக்காளி)</option>
                  <option value="Small Onion (Shallots)">Small Onion (சின்ன வெங்காயம்)</option>
                  <option value="Green Chilli">Green Chilli (பச்சை மிளகாய்)</option>
                  <option value="Brinjal (Kathiri)">Brinjal (கத்தரிக்காய்)</option>
                  <option value="Okra / Lady’s Finger">Okra (வெண்டைக்காய்)</option>
                  <option value="Drumstick Pods">Drumstick (முருங்கைக்காய்)</option>
                  <option value="Greens (Palak / Arai)">Greens (கீரை வகைகள்)</option>
                  <option value="Bottle Gourd / Gourds">Gourds (சுரை / பூசணி)</option>
                </select>
              </div>

              <div>
                <label className="block text-hai-charcoal font-semibold mb-1">
                  Est. Quantity in Kg (எதிர்பார்க்கும் அளவு) *
                </label>
                <input
                  type="number"
                  min="25"
                  step="25"
                  required
                  value={estimatedQuantityKg}
                  onChange={(e) => setEstimatedQuantityKg(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-lg border border-hai-border focus:border-hai-agri focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-hai-charcoal font-semibold mb-1">
                  Target Harvest Date (அறுவடை தேதி) *
                </label>
                <input
                  type="date"
                  required
                  value={harvestDate}
                  onChange={(e) => setHarvestDate(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-hai-border focus:border-hai-agri focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-hai-charcoal font-semibold mb-1">
                  Expected Price / kg (எதிர்பார்ப்பு விலை)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-hai-muted">₹</span>
                  <input
                    type="number"
                    min="5"
                    step="0.5"
                    value={expectedPricePerKg}
                    onChange={(e) => setExpectedPricePerKg(Number(e.target.value))}
                    className="w-full pl-7 pr-3 py-2.5 rounded-lg border border-hai-border focus:border-hai-agri focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-hai-charcoal font-semibold mb-1">
                  Preferred Contact Method (தொடர்பு வழி)
                </label>
                <select
                  value={preferredContact}
                  onChange={(e) => setPreferredContact(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-lg border border-hai-border focus:border-hai-agri focus:outline-none bg-white"
                >
                  <option value="Phone Call">Phone Call (நேரடி தொலைபேசி அழைப்பு)</option>
                  <option value="WhatsApp">WhatsApp Message (வாட்ஸ்அப்)</option>
                  <option value="Field Coordinator Visit">Field Coordinator Visit (கள உதவியாளர் நேரில் வருகை)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-hai-forest text-white rounded-lg font-bold text-xs sm:text-sm hover:bg-hai-agri transition-colors shadow-sm disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
            >
              <Sprout className="w-4 h-4 text-hai-leaf" />
              <span>{isSubmitting ? 'Registering Harvest...' : 'Submit Harvest Details (அறுவடை பதிவு செய்க)'}</span>
            </button>
          </form>

          {/* Low-connectivity assistance */}
          <div className="pt-4 border-t border-hai-border flex items-center justify-between text-xs text-hai-muted">
            <span className="flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-hai-agri" />
              Toll-Free Support Helpline: +91 1800-HAI-AGRI (Demo Placeholder)
            </span>
            <span className="text-hai-forest font-semibold">Tamil & English Assisted</span>
          </div>
        </div>

        {/* Right Column: Live Tracked Farmer Batches & Transparent Weighing Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-hai-border shadow-soft space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-hai-border">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-hai-agri" />
                <h3 className="font-bold text-sm text-hai-forest uppercase tracking-wider">
                  Recent Batch Submissions
                </h3>
              </div>
              <span className="text-[10px] text-hai-muted font-mono">Demo Registry</span>
            </div>

            <div className="space-y-3">
              {farmerBatches.map((batch) => (
                <div
                  key={batch.id}
                  className="p-3.5 rounded-xl bg-hai-offwhite border border-hai-border space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-hai-forest text-sm">{batch.farmerName}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                        batch.status === 'Payment Processed'
                          ? 'bg-green-100 text-green-800'
                          : batch.status === 'Weighed & Received'
                          ? 'bg-blue-100 text-blue-800'
                          : batch.status === 'Accepted for Collection'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {batch.status}
                    </span>
                  </div>

                  <div className="text-hai-charcoal/80 flex justify-between">
                    <span>
                      {batch.cropEn} ({batch.cropTa})
                    </span>
                    <span className="font-semibold">{batch.estimatedQuantityKg} kg</span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-hai-muted pt-1 border-t border-hai-border/60">
                    <span>
                      Village: <strong>{batch.village}</strong>
                    </span>
                    <span>Date: {batch.harvestDate}</span>
                  </div>

                  {batch.paymentRef && (
                    <div className="pt-1 text-[11px] text-green-800 font-mono bg-green-50 p-1.5 rounded">
                      Disbursed: ₹{batch.paymentAmount} via {batch.paymentRef}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Weighing & Grading Transparency Box */}
          <div className="bg-hai-forest text-hai-offwhite rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-hai-leaf" />
              <h3 className="font-bold text-sm text-white uppercase tracking-wider">
                Weighing Transparency Protocol
              </h3>
            </div>
            <p className="text-xs text-hai-offwhite/80 leading-relaxed">
              In traditional markets, farmers frequently suffer 3% to 8% deduction due to unstandardized spring balances, bag tare inflation, and customary 'mandiram/sample' subtractions.
            </p>
            <div className="space-y-2 text-xs pt-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-hai-agri shrink-0" />
                <span>Zero deduction for sampling (கமிஷன் பிடித்தம் இல்லை)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-hai-agri shrink-0" />
                <span>Certified standard tare weight for empty crates (2.0 kg exact)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-hai-agri shrink-0" />
                <span>Printed electronic slip handed on the spot</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="bg-white rounded-2xl p-6 sm:p-10 border border-hai-border shadow-soft space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-hai-agri">
            Farmer Inquiries
          </span>
          <h2 className="text-2xl font-black text-hai-forest">Frequently Asked Questions</h2>
        </div>

        <div className="divide-y divide-hai-border">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={index} className="py-4">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full flex items-center justify-between text-left font-bold text-sm sm:text-base text-hai-forest hover:text-hai-agri transition-colors cursor-pointer"
                >
                  <span>{language === 'en' ? faq.qEn : faq.qTa}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-hai-agri shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-hai-muted shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <p className="mt-3 text-xs sm:text-sm text-hai-charcoal/80 leading-relaxed pr-6">
                    {language === 'en' ? faq.aEn : faq.aTa}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
