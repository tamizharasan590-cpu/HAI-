import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HaiLogo } from '../components/common/HaiLogo';
import { MAIN_CATALOGUE } from '../data/catalogue';
import { SOURCING_CATCHMENTS } from '../data/sourcingNetwork';
import { RESEARCH_EVIDENCE } from '../data/researchEvidence';
import { CURRENT_MARKET_PRICES } from '../data/marketPrices';
import {
  ArrowRight,
  TrendingDown,
  AlertTriangle,
  Scale,
  ShieldCheck,
  CheckCircle2,
  Users,
  Store,
  MapPin,
  ExternalLink,
  ChevronRight,
  Sprout,
  Truck,
  LineChart,
  Layers,
  Sparkles
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { language, setActiveTab, addToCart, setIsCartOpen } = useApp();
  const [activeTabBenefit, setActiveTabBenefit] = useState<'farmer' | 'buyer'>('farmer');

  // Take 6 featured products for preview
  const featuredProducts = MAIN_CATALOGUE.slice(0, 6);

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-hai-leaf/40 via-white to-hai-offwhite pt-12 pb-20 border-b border-hai-border">
        {/* Subtle decorative mesh */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-hai-leaf/50 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-hai-earth/10 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Official Brand Emblem Badge */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-2xl border border-hai-agri/30 shadow-soft inline-flex items-center">
                  <HaiLogo size="lg" showTagline={true} />
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-hai-leaf border border-hai-agri/30 text-hai-forest text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-hai-agri animate-ping"></span>
                  <span>Tamil Nadu Agritech Pilot</span>
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-hai-forest tracking-tight leading-[1.12]">
                {language === 'en' ? (
                  <>
                    Connecting Farmers to a <span className="text-hai-agri underline decoration-hai-earth/60 decoration-wavy decoration-2">Better Market</span>.
                  </>
                ) : (
                  <>
                    விவசாயிகளை <span className="text-hai-agri">சிறந்த சந்தையோடு</span> இணைக்கும் நுண்ணறிவு தளம்.
                  </>
                )}
              </h1>

              <p className="text-lg sm:text-xl text-hai-charcoal/80 max-w-2xl font-normal leading-relaxed">
                {language === 'en'
                  ? 'Fresh agricultural produce, reliable procurement, and smarter farm-to-market connections across Chandrapuram, Pethappampatti, and Western Tamil Nadu.'
                  : 'புதிய விளைபொருட்கள், நம்பகமான மொத்த கொள்முதல், மற்றும் உழவர்களுக்கான வெளிப்படையான சந்தை வாய்ப்புகள்.'}
              </p>

              {/* Primary Call-to-Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setActiveTab('farmers')}
                  className="px-6 py-3.5 rounded-lg bg-hai-forest text-white font-bold text-sm hover:bg-hai-agri transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <Sprout className="w-4 h-4 text-hai-leaf" />
                  <span>{language === 'en' ? 'Join as a Farmer' : 'உழவராக பதிவு செய்க'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setActiveTab('buyers')}
                  className="px-6 py-3.5 rounded-lg bg-white border-2 border-hai-forest text-hai-forest font-bold text-sm hover:bg-hai-leaf/50 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <Store className="w-4 h-4 text-hai-agri" />
                  <span>{language === 'en' ? 'Source for Your Business' : 'வணிக கொள்முதல் பதிவு'}</span>
                </button>

                <button
                  onClick={() => setActiveTab('catalogue')}
                  className="px-4 py-3.5 rounded-lg text-hai-forest font-semibold text-sm hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>{language === 'en' ? 'Explore Catalogue' : 'பொருட்களை பார்க்க'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Pilot catchments tag */}
              <div className="pt-4 flex flex-wrap items-center gap-4 text-xs text-hai-muted border-t border-hai-border/60">
                <span className="flex items-center gap-1 font-medium text-hai-forest">
                  <MapPin className="w-3.5 h-3.5 text-hai-earth" />
                  Initial Operational Catchments:
                </span>
                <span className="bg-white px-2.5 py-1 rounded border border-hai-border">
                  Chandrapuram (PIN 641669) — 29 Villages
                </span>
                <span className="bg-white px-2.5 py-1 rounded border border-hai-border">
                  Pethappampatti (PIN 642205) — 40 Villages
                </span>
              </div>
            </div>

            {/* Hero Right: Interactive Farm-to-Market Visual Node Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl p-6 shadow-lift border border-hai-border/80 relative">
                <div className="flex items-center justify-between pb-4 border-b border-hai-border">
                  <div className="flex items-center gap-2.5">
                    <HaiLogo size="sm" showTagline={false} />
                    <h3 className="font-bold text-xs sm:text-sm text-hai-forest uppercase tracking-wider">
                      Farm-to-Market Supply Pipeline
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono bg-hai-leaf text-hai-forest px-2 py-0.5 rounded font-bold">
                    OPERATING FLOW
                  </span>
                </div>

                <div className="mt-5 space-y-3.5 relative">
                  {/* Step 1 */}
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-hai-offwhite border border-hai-border/60">
                    <div className="w-8 h-8 rounded-lg bg-hai-forest text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-hai-forest">Local Village Harvest</h4>
                      <p className="text-[11px] text-hai-charcoal/80">
                        Farmer enters harvest date, crops & expected quantities via mobile/WhatsApp.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-hai-leaf/40 border border-hai-agri/30">
                    <div className="w-8 h-8 rounded-lg bg-hai-agri text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-hai-forest">HAI Procurement & Intelligence</h4>
                      <p className="text-[11px] text-hai-charcoal/80">
                        Demand aggregation, transparent benchmark pricing, and collection route scheduling.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-hai-offwhite border border-hai-border/60">
                    <div className="w-8 h-8 rounded-lg bg-hai-earth text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-hai-forest">Weighing, QC & Crating</h4>
                      <p className="text-[11px] text-hai-charcoal/80">
                        On-site certified electronic weighing, Grade A/B sorting, and aerated crate packaging.
                      </p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-hai-offwhite border border-hai-border/60">
                    <div className="w-8 h-8 rounded-lg bg-hai-forest text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      4
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-hai-forest">Direct Buyer Distribution</h4>
                      <p className="text-[11px] text-hai-charcoal/80">
                        Consolidated early-morning delivery to hotels, supermarkets, canteens, and shops.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sourcing Origin note */}
                <div className="mt-4 pt-3 border-t border-hai-border flex items-center justify-between text-[11px] text-hai-muted">
                  <span>* Wholesale market buffer supports local supply when demand surges.</span>
                  <button
                    onClick={() => setActiveTab('how-it-works')}
                    className="text-hai-forest font-bold hover:underline shrink-0 ml-2 cursor-pointer"
                  >
                    View Full Flow →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Core Problems HAI Aims to Address */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-hai-agri">
            Agricultural Realities in Tamil Nadu
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-hai-forest">
            Three Key Challenges We Seek to Address
          </h2>
          <p className="text-sm sm:text-base text-hai-muted">
            Published research and ground realities highlight fundamental structural frictions between smallholder farmers and commercial buyers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Problem 1 */}
          <div className="bg-white p-7 rounded-2xl border border-hai-border shadow-soft flex flex-col justify-between hover:border-hai-agri transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-red-50 text-red-700 flex items-center justify-center font-bold">
                <TrendingDown className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-hai-forest">
                1. Vegetable Price Uncertainty
              </h3>
              <p className="text-xs sm:text-sm text-hai-charcoal/80 leading-relaxed">
                Weekly tomato and vegetable prices in Tamil Nadu (documented across Coimbatore, Chennai, and Oddanchatram) swing drastically within days, exposing farmers to distressed liquidation and buyers to erratic food costs.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-hai-border/60">
              <span className="text-[11px] text-hai-muted block mb-1">HAI Response:</span>
              <p className="text-xs font-semibold text-hai-forest">
                Transparent market benchmark prices and confirmed procurement commitments before harvesting.
              </p>
            </div>
          </div>

          {/* Problem 2 */}
          <div className="bg-white p-7 rounded-2xl border border-hai-border shadow-soft flex flex-col justify-between hover:border-hai-agri transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-hai-forest">
                2. Limited Access to Market Information
              </h3>
              <p className="text-xs sm:text-sm text-hai-charcoal/80 leading-relaxed">
                Academic studies documented that nearly 47% of studied growers lacked awareness of formal ICT market-intelligence tools, remaining dependent on fragmented village-level middlemen with limited price transparency.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-hai-border/60">
              <span className="text-[11px] text-hai-muted block mb-1">HAI Response:</span>
              <p className="text-xs font-semibold text-hai-forest">
                Vernacular Tamil interfaces, phone/WhatsApp workflows, and transparent daily price bulletins.
              </p>
            </div>
          </div>

          {/* Problem 3 */}
          <div className="bg-white p-7 rounded-2xl border border-hai-border shadow-soft flex flex-col justify-between hover:border-hai-agri transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-700 flex items-center justify-center font-bold">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-hai-forest">
                3. Post-Harvest Handling & Losses
              </h3>
              <p className="text-xs sm:text-sm text-hai-charcoal/80 leading-relaxed">
                Historical research on perishables like tomatoes recorded post-harvest losses of up to 25–32% across harvesting, rough transit, loose bagging, and delayed wholesale market clearance.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-hai-border/60">
              <span className="text-[11px] text-hai-muted block mb-1">HAI Response:</span>
              <p className="text-xs font-semibold text-hai-forest">
                Standardized rigid plastic crates, immediate village weighing, and scheduled direct routing to buyers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HAI Solution Section */}
      <section className="bg-hai-forest text-hai-offwhite py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-hai-leaf">
                The HAI Solution Architecture
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                Not Merely an Online Shop.<br />
                A Coordinated Farm-to-Market Network.
              </h2>
              <p className="text-sm sm:text-base text-hai-offwhite/80 leading-relaxed">
                HAI operates as a technology-assisted procurement, fulfillment, and market intelligence bridge. We bring commercial buyers and local village clusters together, backed by verifiable quality control and transparent unit economics.
              </p>

              <div className="space-y-3.5 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-hai-agri shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-hai-offwhite/90">
                    <strong>Cluster-Based Procurement:</strong> Focusing initially on Chandrapuram (641669) and Pethappampatti (642205) agricultural clusters.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-hai-agri shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-hai-offwhite/90">
                    <strong>Certified Electronic Weighing:</strong> Accurate village collection points ensure zero deduction for tare fraud or opaque weigh scales.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-hai-agri shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-hai-offwhite/90">
                    <strong>Wholesale Buffer Resilience:</strong> Integrated with Oddanchatram, Tiruppur, and Coimbatore markets when local supply faces seasonal shortfalls.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white/5 p-6 sm:p-8 rounded-2xl border border-white/10 backdrop-blur-sm space-y-6">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-hai-agri" />
                <span>Transparent Operating Commitments</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <h4 className="font-bold text-hai-leaf mb-1">For Local Farmers</h4>
                  <p className="text-hai-offwhite/70 leading-relaxed">
                    Clear purchase orders before cutting crops, formal weighing slips, and documented digital payment records. No unverified promises of guaranteed riches.
                  </p>
                </div>

                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <h4 className="font-bold text-hai-leaf mb-1">For Commercial Buyers</h4>
                  <p className="text-hai-offwhite/70 leading-relaxed">
                    Scheduled early morning delivery slots, specified Grade A/B sorting, consolidated single billing, and direct 2-hour issue resolution.
                  </p>
                </div>

                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <h4 className="font-bold text-hai-leaf mb-1">Unit Economics</h4>
                  <p className="text-hai-offwhite/70 leading-relaxed">
                    Transparent logistics, packaging, and handling charges disclosed on every transaction rather than hidden within inflated margins.
                  </p>
                </div>

                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <h4 className="font-bold text-hai-leaf mb-1">Ground Truth First</h4>
                  <p className="text-hai-offwhite/70 leading-relaxed">
                    All data in this platform is grounded in field reality. No fake live counts, simulated transactions are clearly demarcated.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Comparison Tabs: Farmer vs Buyer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-hai-border p-6 sm:p-10 shadow-soft">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8 border-b border-hai-border">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-hai-agri">
                Mutual Value Proposition
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-hai-forest mt-1">
                Designed for Both Sides of the Market
              </h2>
            </div>

            {/* Toggle Tabs */}
            <div className="flex items-center p-1 bg-hai-offwhite rounded-lg border border-hai-border">
              <button
                onClick={() => setActiveTabBenefit('farmer')}
                className={`px-4 py-2 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  activeTabBenefit === 'farmer'
                    ? 'bg-hai-forest text-white shadow-sm'
                    : 'text-hai-charcoal hover:text-hai-forest'
                }`}
              >
                {language === 'en' ? 'Farmer Benefits' : 'உழவர் நன்மைகள்'}
              </button>
              <button
                onClick={() => setActiveTabBenefit('buyer')}
                className={`px-4 py-2 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  activeTabBenefit === 'buyer'
                    ? 'bg-hai-forest text-white shadow-sm'
                    : 'text-hai-charcoal hover:text-hai-forest'
                }`}
              >
                {language === 'en' ? 'Buyer Benefits' : 'வணிக வாங்குபவர் நன்மைகள்'}
              </button>
            </div>
          </div>

          <div className="pt-8">
            {activeTabBenefit === 'farmer' ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-xl bg-hai-offwhite border border-hai-border">
                  <h4 className="font-bold text-sm text-hai-forest mb-2">Direct Commercial Buyer Demand</h4>
                  <p className="text-xs text-hai-charcoal/80 leading-relaxed">
                    Access steady demand from restaurants, canteens, and supermarkets without relying exclusively on volatile commission agent auctions.
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-hai-offwhite border border-hai-border">
                  <h4 className="font-bold text-sm text-hai-forest mb-2">Transparent Digital Weighing</h4>
                  <p className="text-xs text-hai-charcoal/80 leading-relaxed">
                    Certified weigh scales at village collection nodes eliminate arbitrary deductions (padi / thallupadi) common in traditional mandis.
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-hai-offwhite border border-hai-border">
                  <h4 className="font-bold text-sm text-hai-forest mb-2">Prompt Documented Payments</h4>
                  <p className="text-xs text-hai-charcoal/80 leading-relaxed">
                    Receive transparent transaction slips with payment status tracked via SMS or direct bank credit (NEFT/UPI).
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-xl bg-hai-offwhite border border-hai-border">
                  <h4 className="font-bold text-sm text-hai-forest mb-2">Consolidated Single-Point Sourcing</h4>
                  <p className="text-xs text-hai-charcoal/80 leading-relaxed">
                    Order 30+ vegetable varieties in one consolidated cart instead of dealing with multiple fragmented wholesale vendors at 4 AM.
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-hai-offwhite border border-hai-border">
                  <h4 className="font-bold text-sm text-hai-forest mb-2">Planned Morning Deliveries</h4>
                  <p className="text-xs text-hai-charcoal/80 leading-relaxed">
                    Reliable early morning delivery windows directly to your hotel kitchen or supermarket store before morning operations begin.
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-hai-offwhite border border-hai-border">
                  <h4 className="font-bold text-sm text-hai-forest mb-2">Defined Quality Grading</h4>
                  <p className="text-xs text-hai-charcoal/80 leading-relaxed">
                    Choose Grade A for premium retail display or Grade B for institutional cooking with transparent price differentiation and zero surprises.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Produce Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-hai-agri">
              Fresh Harvest Catalogue
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-hai-forest mt-1">
              Main Sourcing Vegetables
            </h2>
            <p className="text-xs sm:text-sm text-hai-muted">
              Direct from Chandrapuram & Pethappampatti farmers (Excluded: potato, beans, carrot).
            </p>
          </div>

          <button
            onClick={() => setActiveTab('catalogue')}
            className="text-xs font-bold text-hai-forest hover:text-hai-agri flex items-center gap-1 cursor-pointer"
          >
            <span>View All 39+ Products</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-xl border border-hai-border p-5 shadow-soft hover:shadow-lift transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-base text-hai-forest">{p.nameEn}</h3>
                    <p className="text-xs text-hai-agri font-tamil font-semibold">{p.nameTa}</p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded font-semibold bg-green-100 text-green-800">
                    {p.sourcingCategory}
                  </span>
                </div>

                <p className="text-xs text-hai-charcoal/70 mt-3 line-clamp-2 leading-relaxed">
                  {p.descriptionEn}
                </p>

                <div className="mt-4 pt-3 border-t border-hai-border flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-hai-muted block">Demo Benchmark</span>
                    <span className="font-bold font-mono text-hai-forest text-sm">
                      ₹{p.demoPrice}/kg
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-hai-muted block">Unit of Sale</span>
                    <span className="font-medium text-hai-charcoal">{p.unit}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-hai-border flex items-center justify-between gap-2">
                <span className="text-[10px] text-hai-muted">Min Qty: {p.minOrderQty} kg</span>
                <button
                  onClick={() => addToCart(p, 1)}
                  className="px-3 py-1.5 rounded bg-hai-forest text-white text-xs font-semibold hover:bg-hai-agri transition-colors cursor-pointer"
                >
                  + Add to Basket
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sourcing Network Preview */}
      <section className="bg-hai-leaf/30 py-16 border-y border-hai-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-hai-agri">
                Geographic Footprint
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-hai-forest">
                Two Operational Catchments in Western Tamil Nadu
              </h2>
              <p className="text-xs sm:text-sm text-hai-charcoal/80 leading-relaxed">
                Rather than sprawling statewide too early, HAI concentrates on dense, hyper-local village clusters with established horticulture traditions.
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-4 rounded-xl bg-white border border-hai-border">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-hai-forest">Catchment 1: Chandrapuram (PIN 641669)</h4>
                    <span className="text-xs bg-hai-leaf px-2 py-0.5 rounded font-mono text-hai-forest">
                      29 Villages
                    </span>
                  </div>
                  <p className="text-xs text-hai-muted mt-1">
                    Sultanpet, Varapatti, Selakkarichal, Bogampatti, Panapatti, Kethanur...
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-hai-border">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-hai-forest">Catchment 2: Pethappampatti (PIN 642205)</h4>
                    <span className="text-xs bg-hai-leaf px-2 py-0.5 rounded font-mono text-hai-forest">
                      40 Villages
                    </span>
                  </div>
                  <p className="text-xs text-hai-muted mt-1">
                    Kongalnagaram, Iluppanagaram, Pukkulam, Kottamangalam, Somavarapatti...
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setActiveTab('sourcing-network')}
                  className="px-5 py-2.5 rounded-lg bg-hai-forest text-white text-xs font-bold hover:bg-hai-agri transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Explore Interactive Catchment Map & Village Directory</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-hai-border shadow-lift space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-hai-border">
                <h4 className="text-xs font-bold uppercase tracking-wider text-hai-forest">
                  Supplementary Wholesale Hubs
                </h4>
                <span className="text-[10px] text-hai-muted">Emergency Buffers</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-3 rounded-lg bg-hai-offwhite border border-hai-border">
                  <div>
                    <span className="font-bold text-hai-forest block">Oddanchatram APMC Market</span>
                    <span className="text-[11px] text-hai-muted">Dindigul District (70–90 min transit)</span>
                  </div>
                  <span className="text-[10px] bg-white border border-hai-border px-2 py-1 rounded font-medium">
                    Tomato & Vegetable Hub
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-hai-offwhite border border-hai-border">
                  <div>
                    <span className="font-bold text-hai-forest block">Tiruppur Thennampalayam Market</span>
                    <span className="text-[11px] text-hai-muted">Tiruppur District (45–60 min transit)</span>
                  </div>
                  <span className="text-[10px] bg-white border border-hai-border px-2 py-1 rounded font-medium">
                    Small Onion & Daily Staples
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-hai-offwhite border border-hai-border">
                  <div>
                    <span className="font-bold text-hai-forest block">Coimbatore MGR / Anna Market</span>
                    <span className="text-[11px] text-hai-muted">Coimbatore District (50–70 min transit)</span>
                  </div>
                  <span className="text-[10px] bg-white border border-hai-border px-2 py-1 rounded font-medium">
                    Greens, Roots & Exotics
                  </span>
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-[11px] text-amber-900 leading-relaxed">
                <strong>Sourcing Rule:</strong> Local farmer supply is always prioritized. Wholesale markets serve as secondary backup to ensure 100% order fulfillment for commercial clients.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research & Evidence Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-hai-agri">
              Scientific Rigour & Policy Context
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-hai-forest mt-1">
              Evidence-Based Problem Definition
            </h2>
            <p className="text-xs sm:text-sm text-hai-muted">
              Referencing peer-reviewed studies on Tamil Nadu horticulture and official department benchmarks.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('research')}
            className="text-xs font-bold text-hai-forest hover:text-hai-agri flex items-center gap-1 cursor-pointer"
          >
            <span>View All Citations & DOIs</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {RESEARCH_EVIDENCE.slice(0, 2).map((ev) => (
            <div
              key={ev.id}
              className="bg-white rounded-xl border border-hai-border p-6 shadow-soft hover:border-hai-agri transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono font-bold bg-hai-leaf text-hai-forest px-2 py-0.5 rounded">
                    Evidence {ev.number} ({ev.publicationYear})
                  </span>
                  <span className="text-[11px] text-hai-muted font-mono">{ev.doiOrRef}</span>
                </div>

                <h3 className="font-bold text-sm text-hai-forest">{ev.title}</h3>
                <p className="text-xs text-hai-charcoal/80 leading-relaxed">{ev.keyFinding}</p>
              </div>

              <div className="mt-5 pt-3 border-t border-hai-border flex items-center justify-between text-xs">
                <span className="text-[11px] text-hai-muted">Scope: {ev.geographicalScope}</span>
                <a
                  href={ev.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-hai-forest hover:text-hai-agri inline-flex items-center gap-1"
                >
                  <span>Source Study</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Clear Transparent CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-hai-forest to-hai-charcoal rounded-2xl p-8 sm:p-12 text-white shadow-lift flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-left">
            <HaiLogo size="lg" theme="dark" showTagline={true} className="mb-1" />
            <span className="text-xs uppercase font-bold tracking-widest text-hai-leaf block">
              Ready to Collaborate?
            </span>
            <h2 className="text-2xl sm:text-3xl font-black">
              Connect with HAI for Field Testing & Sourcing
            </h2>
            <p className="text-xs sm:text-sm text-hai-offwhite/80 leading-relaxed">
              Whether you are an agricultural grower in our catchment villages or an institutional buyer seeking reliable daily supplies, join our preliminary pilot rollout.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => setActiveTab('farmers')}
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-hai-agri text-white font-bold text-xs sm:text-sm hover:bg-emerald-600 transition-colors shadow-sm cursor-pointer"
            >
              Join as a Farmer
            </button>
            <button
              onClick={() => setActiveTab('buyers')}
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-white text-hai-forest font-bold text-xs sm:text-sm hover:bg-hai-leaf transition-colors cursor-pointer"
            >
              Source for Your Business
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
