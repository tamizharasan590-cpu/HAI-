import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Activity,
  Calendar,
  CheckCircle2,
  Clock,
  Scale,
  TrendingUp,
  AlertCircle,
  FileCheck,
  ShieldCheck,
  Layers
} from 'lucide-react';

export const PilotOperationsPage: React.FC = () => {
  const { language } = useApp();
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0);

  const pilotPhases = [
    {
      range: 'Days 1–15',
      title: 'Discovery & Field Baseline',
      status: 'Current Operational Stage',
      focus: 'Field interviews, local baseline measurement, and catchment mapping in Chandrapuram & Pethappampatti.',
      tasks: [
        'Conduct structured face-to-face interviews with 40+ vegetable farmers across Sultanpet, Varapatti, and Somavarapatti',
        'Interview 25 commercial kitchen buyers (hotels, canteens, hostels) in Coimbatore & Tiruppur to document current landed costs',
        'Map local cluster road access, collection point travel times, and mobile connectivity constraints',
        'Collect 14 consecutive days of farmgate price quotes versus local Uzhavar Sandhai and APMC mandi bulletins',
        'Select the initial 15-product core pilot crop list and finalize Grade A/B specifications',
        'Define transparent 24-48 hour electronic payment and dispute procedures'
      ]
    },
    {
      range: 'Days 16–30',
      title: 'Setup & Infrastructure Mobilization',
      status: 'Scheduled Ahead',
      focus: 'Supplier onboarding, crate staging, driver route testing, and wholesale backup confirmation.',
      tasks: [
        'Formally register 25 anchor farmers with certified weigh slip profiles',
        'Sign procurement MoUs with 8 repeat commercial buyers (hotel kitchens and college canteens)',
        'Stage 300 standardized rigid aerated crates at Chandrapuram collection hub',
        'Conduct dry-run logistics routes measuring travel durations during early morning hours (04:30 – 07:00 IST)',
        'Establish direct supplier linkages with wholesale traders at Oddanchatram & Tiruppur APMCs for emergency buffer volumes'
      ]
    },
    {
      range: 'Days 31–60',
      title: 'Controlled Trading & Live Order Fulfillment',
      status: 'Scheduled Ahead',
      focus: 'Executing repeated live commercial orders with zero compromise on digital recording.',
      tasks: [
        'Fulfil 15 to 25 confirmed commercial orders weekly within strict 2-hour morning windows',
        'Record every single purchase weight, certified deduction (0%), and electronic payment timestamp',
        'Track all shortage occurrences and test same-day replacement from wholesale buffers',
        'Calculate true order-level costs (crate wash, loading, driver fuel, transit damage)',
        'Log all customer quality rejection reports within the 2-hour window'
      ]
    },
    {
      range: 'Days 61–90',
      title: 'Evaluation, Unit Economics & Pilot Report',
      status: 'Scheduled Ahead',
      focus: 'Empirical comparison against baseline metrics to guide expansion viability.',
      tasks: [
        'Compare farmer net realization against their documented historical baseline alternatives',
        'Compare buyer landed costs against previous mandi procurement invoices',
        'Measure fill rate (Target: >98%) and on-time morning delivery rate (Target: >95%)',
        'Measure documented transit spoilage & downgrade rates against the 25%+ historical benchmark',
        'Publish transparent Pilot Findings Report before scaling to additional catchments'
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Page Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-hai-leaf text-hai-forest text-xs font-semibold">
          <Activity className="w-3.5 h-3.5" />
          <span>Operational Validation Framework</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-hai-forest tracking-tight">
          90-Day Controlled Pilot Protocol
        </h1>
        <p className="text-sm sm:text-base text-hai-charcoal/80 leading-relaxed">
          HAI relies on rigorous empirical validation rather than speculative expansion. This 90-day protocol outlines how we baseline, test, and measure our supply-chain economics in Chandrapuram and Pethappampatti.
        </p>
      </div>

      {/* Honest Rigour Banner */}
      <div className="bg-white rounded-2xl border border-hai-border p-6 shadow-soft flex items-start gap-3 text-xs text-hai-charcoal/80">
        <AlertCircle className="w-5 h-5 text-hai-earth shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Baseline Rule:</strong> Target performance indicators are deliberately not fabricated in advance. Real targets are established only after completing the initial 15-day discovery interviews with actual growers and commercial kitchen operators.
        </p>
      </div>

      {/* Phase Cards Timeline Navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {pilotPhases.map((phase, idx) => (
          <button
            key={idx}
            onClick={() => setActivePhaseIndex(idx)}
            className={`p-5 rounded-2xl text-left border transition-all cursor-pointer ${
              activePhaseIndex === idx
                ? 'bg-hai-forest text-white border-hai-forest shadow-md scale-105'
                : 'bg-white text-hai-charcoal border-hai-border hover:border-hai-agri'
            }`}
          >
            <span
              className={`text-xs font-mono font-bold block ${
                activePhaseIndex === idx ? 'text-hai-leaf' : 'text-hai-agri'
              }`}
            >
              {phase.range}
            </span>
            <h3 className="font-bold text-sm sm:text-base mt-1">{phase.title}</h3>
            <span
              className={`inline-block mt-2 text-[10px] px-2 py-0.5 rounded font-bold ${
                activePhaseIndex === idx
                  ? 'bg-white/20 text-white'
                  : 'bg-hai-offwhite text-hai-muted border border-hai-border'
              }`}
            >
              {phase.status}
            </span>
          </button>
        ))}
      </div>

      {/* Active Phase Deep Dive */}
      <div className="bg-white rounded-2xl border border-hai-border shadow-soft p-6 sm:p-10 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-hai-border">
          <div>
            <span className="text-xs font-mono font-bold text-hai-agri">
              {pilotPhases[activePhaseIndex].range} Operations
            </span>
            <h2 className="text-2xl font-black text-hai-forest mt-0.5">
              {pilotPhases[activePhaseIndex].title}
            </h2>
            <p className="text-xs sm:text-sm text-hai-muted mt-1">
              {pilotPhases[activePhaseIndex].focus}
            </p>
          </div>
          <span className="text-xs bg-hai-leaf text-hai-forest px-3 py-1 rounded font-bold font-mono">
            Phase {activePhaseIndex + 1} of 4
          </span>
        </div>

        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-hai-forest">
            Scheduled Key Deliverables & Activities:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {pilotPhases[activePhaseIndex].tasks.map((task, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-hai-offwhite border border-hai-border/60"
              >
                <CheckCircle2 className="w-4 h-4 text-hai-agri shrink-0 mt-0.5" />
                <span className="text-hai-charcoal/90 leading-relaxed">{task}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 8 Primary Evaluation Metrics */}
      <div className="bg-white rounded-2xl border border-hai-border shadow-soft p-6 sm:p-8 space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-hai-agri">
            Accountability Matrix
          </span>
          <h2 className="text-2xl font-black text-hai-forest mt-1">
            Core Evaluation Metrics (Days 61–90)
          </h2>
          <p className="text-xs sm:text-sm text-hai-muted">
            The pilot will be deemed viable only if the following 8 indicators demonstrate superior performance compared to traditional mandi supply chains:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-hai-offwhite border border-hai-border space-y-1">
            <span className="font-bold text-hai-forest block">1. Farmer Realization</span>
            <p className="text-hai-charcoal/70">
              Net payout after weighing vs. commission agent deduction baseline.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-hai-offwhite border border-hai-border space-y-1">
            <span className="font-bold text-hai-forest block">2. Buyer Landed Cost</span>
            <p className="text-hai-charcoal/70">
              Delivered total including logistics vs. 4 AM mandi wholesale cash outlay.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-hai-offwhite border border-hai-border space-y-1">
            <span className="font-bold text-hai-forest block">3. Order Fill Rate</span>
            <p className="text-hai-charcoal/70">
              Percentage of ordered line items and kilograms delivered completely.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-hai-offwhite border border-hai-border space-y-1">
            <span className="font-bold text-hai-forest block">4. On-Time Arrival</span>
            <p className="text-hai-charcoal/70">
              Delivery completed strictly within buyer’s confirmed morning window.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-hai-offwhite border border-hai-border space-y-1">
            <span className="font-bold text-hai-forest block">5. Spoilage & Rejection</span>
            <p className="text-hai-charcoal/70">
              Physical weight loss from field cutting through transit and receipt.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-hai-offwhite border border-hai-border space-y-1">
            <span className="font-bold text-hai-forest block">6. Payment Speed</span>
            <p className="text-hai-charcoal/70">
              Average elapsed hours from village weighing to farmer bank credit.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-hai-offwhite border border-hai-border space-y-1">
            <span className="font-bold text-hai-forest block">7. Repeat Order Ratio</span>
            <p className="text-hai-charcoal/70">
              Percentage of weekly recurring orders sustained by commercial buyers.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-hai-offwhite border border-hai-border space-y-1">
            <span className="font-bold text-hai-forest block">8. Unit Contribution</span>
            <p className="text-hai-charcoal/70">
              Gross margin remaining after driver fuel, crate maintenance & labour.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
