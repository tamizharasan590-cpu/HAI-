import React from 'react';
import { useApp } from '../context/AppContext';
import { HaiLogo } from '../components/common/HaiLogo';
import {
  ShieldCheck,
  Target,
  Compass,
  CheckCircle2,
  Users,
  Layers,
  Sprout,
  Store,
  HeartHandshake,
  TrendingUp,
  Scale
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { language, setActiveTab } = useApp();

  const values = [
    { title: 'Trust and Transparency', desc: 'Accurate weighing, open transaction slips, and visible unit economics without hidden broker commissions.' },
    { title: 'Fair Market Access', desc: 'Connecting smallholder growers directly with consistent commercial demand from restaurants, canteens, and stores.' },
    { title: 'Freshness and Quality', desc: 'Direct same-day morning routing minimizing post-harvest handling delays and heat damage.' },
    { title: 'Efficient Cluster Logistics', desc: 'Hyper-local village aggregation hubs in Chandrapuram and Pethappampatti reducing empty transit miles.' },
    { title: 'Data-Informed Decisions', desc: 'Daily market price benchmarking and predictive demand forecasting replacing guesswork.' },
    { title: 'Long-Term Relationships', desc: 'Fostering sustained commercial partnerships rather than adversarial daily auction exploitation.' },
    { title: 'Reduced Avoidable Waste', desc: 'Rigid aerated crates and planned procurement preventing 25%+ historical transit and dumping losses.' }
  ];

  const services = [
    'Farmer & supplier cluster onboarding',
    'Bulk commercial procurement & aggregation',
    'Certified electronic village weighing',
    'Physical sorting, Grade A/B grading & crating',
    'Direct refrigerated/aerated transit coordination',
    'Hotel, supermarket & institutional order management',
    'Daily regulated market price intelligence',
    'Predictive seasonal demand forecasting',
    'Audited supplier & buyer transaction records',
    'Future expansion into dry staples & compliant export linkages'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header & Positioning */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-hai-leaf text-hai-forest text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Startup Identity & Strategic Positioning</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-hai-forest tracking-tight">
          About HAI — Human Agri Intelligence
        </h1>
        <p className="text-sm sm:text-base text-hai-charcoal/80 leading-relaxed">
          HAI is not merely an online vegetable shop or delivery app. We are an agritech procurement, fulfillment, and market intelligence bridge engineered for the realities of Indian agriculture.
        </p>
      </div>

      {/* Mission & Vision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl border border-hai-border shadow-soft space-y-3">
          <div className="w-10 h-10 rounded-xl bg-hai-forest text-white flex items-center justify-center">
            <Target className="w-5 h-5 text-hai-leaf" />
          </div>
          <h2 className="text-xl font-bold text-hai-forest">Our Mission</h2>
          <p className="text-xs sm:text-sm text-hai-charcoal/80 leading-relaxed">
            Build a more connected agricultural supply chain by helping farmers reach buyers reliably, helping commercial buyers source fresh produce predictably, and using market intelligence to coordinate supply with demand across Western Tamil Nadu.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-hai-border shadow-soft space-y-3">
          <div className="w-10 h-10 rounded-xl bg-hai-agri text-white flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-hai-forest">Our Vision</h2>
          <p className="text-xs sm:text-sm text-hai-charcoal/80 leading-relaxed">
            Create a trusted, intelligent farm-to-market network starting in the Coimbatore–Tiruppur agricultural heartland and systematically expanding across Tamil Nadu and peninsular India.
          </p>
        </div>
      </div>

      {/* Core Brand Values */}
      <div className="space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-hai-agri">
            Guiding Philosophy
          </span>
          <h2 className="text-2xl font-black text-hai-forest">Core Brand Values</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-xl border border-hai-border shadow-soft space-y-2 hover:border-hai-agri transition-all"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-hai-agri"></span>
                <h3 className="font-bold text-sm text-hai-forest">{v.title}</h3>
              </div>
              <p className="text-xs text-hai-charcoal/70 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Comprehensive Services Spectrum */}
      <div className="bg-hai-forest text-hai-offwhite rounded-2xl p-8 sm:p-12 space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-hai-leaf">
            End-to-End Capabilities
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Platform Services Spectrum
          </h2>
          <p className="text-xs sm:text-sm text-hai-offwhite/80 leading-relaxed">
            From cluster mobilization to electronic remittance, HAI supports each operational node of the fresh procurement pipeline.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {services.map((s, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 bg-white/5 p-3.5 rounded-xl border border-white/10"
            >
              <CheckCircle2 className="w-4 h-4 text-hai-agri shrink-0 mt-0.5" />
              <span className="text-hai-offwhite/90 leading-snug">{s}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Value Propositions for Farmers, Businesses, Consumers */}
      <div className="space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-hai-agri">
            Stakeholder Alignment
          </span>
          <h2 className="text-2xl font-black text-hai-forest">Who Benefits from HAI?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-hai-border shadow-soft space-y-3">
            <div className="w-8 h-8 rounded-lg bg-hai-leaf text-hai-forest flex items-center justify-center font-bold">
              <Sprout className="w-4 h-4 text-hai-forest" />
            </div>
            <h3 className="font-bold text-base text-hai-forest">For Farmers</h3>
            <ul className="space-y-2 text-xs text-hai-charcoal/80 leading-relaxed">
              <li>• Direct access to commercial buyer orders</li>
              <li>• Electronic digital weighing without sample deductions</li>
              <li>• Documented harvest records & prompt digital payment</li>
              <li>• Advance visibility into upcoming buyer demand</li>
            </ul>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-hai-border shadow-soft space-y-3">
            <div className="w-8 h-8 rounded-lg bg-hai-leaf text-hai-forest flex items-center justify-center font-bold">
              <Store className="w-4 h-4 text-hai-forest" />
            </div>
            <h3 className="font-bold text-base text-hai-forest">For Businesses</h3>
            <ul className="space-y-2 text-xs text-hai-charcoal/80 leading-relaxed">
              <li>• Consolidated 30+ produce basket ordering</li>
              <li>• Guaranteed early morning arrival slots</li>
              <li>• Grade A/B sorting tailored to kitchen/retail needs</li>
              <li>• Auditable tax-compliant delivery invoices</li>
            </ul>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-hai-border shadow-soft space-y-3">
            <div className="w-8 h-8 rounded-lg bg-hai-leaf text-hai-forest flex items-center justify-center font-bold">
              <HeartHandshake className="w-4 h-4 text-hai-forest" />
            </div>
            <h3 className="font-bold text-base text-hai-forest">For Consumers</h3>
            <ul className="space-y-2 text-xs text-hai-charcoal/80 leading-relaxed">
              <li>• Fresh harvest produce with minimal transit handling</li>
              <li>• Transparent origin traceability to Tamil Nadu clusters</li>
              <li>• Clean, unadulterated farm freshness in meals</li>
              <li>• Supporting local agricultural community livelihoods</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
