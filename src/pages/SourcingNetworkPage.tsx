import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  SOURCING_CATCHMENTS,
  WHOLESALE_HUBS,
  SOURCING_POLICY_RULES,
  CHANDRAPURAM_VILLAGES,
  PETHAPPAMPATTI_VILLAGES
} from '../data/sourcingNetwork';
import {
  MapPin,
  Compass,
  Search,
  Layers,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Info,
  Building2,
  ArrowRight
} from 'lucide-react';

export const SourcingNetworkPage: React.FC = () => {
  const { language, setActiveTab } = useApp();

  const [activeCatchmentId, setActiveCatchmentId] = useState<string>('catchment-1');
  const [villageSearch, setVillageSearch] = useState<string>('');

  const currentCatchment =
    SOURCING_CATCHMENTS.find((c) => c.id === activeCatchmentId) || SOURCING_CATCHMENTS[0];

  const filteredVillages = currentCatchment.villages.filter((v) =>
    v.name.toLowerCase().includes(villageSearch.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Page Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-hai-leaf text-hai-forest text-xs font-semibold">
          <Compass className="w-3.5 h-3.5" />
          <span>Operational Geography & Village Catchments</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-hai-forest tracking-tight">
          Western Tamil Nadu Sourcing Corridors
        </h1>
        <p className="text-sm sm:text-base text-hai-charcoal/80 leading-relaxed">
          HAI builds dense, cluster-based village aggregation networks across Chandrapuram (PIN 641669) and Pethappampatti (PIN 642205), supplemented by regional wholesale trading nodes.
        </p>
      </div>

      {/* Ground Truth Caveat Notice */}
      <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 flex items-start gap-3 text-xs text-amber-950">
        <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Operational Demarcation Note:</strong> The 29 villages in Chandrapuram and 40 villages in Pethappampatti represent preliminary working catchments for pilot field surveying, logistics planning, and farmer mobilization. They are not closed geographic monopolies, nor are all villages claimed as fully active concurrent supplier nodes.
        </p>
      </div>

      {/* Sourcing Catchment Selector & Village Directory */}
      <div className="bg-white rounded-2xl border border-hai-border shadow-soft p-6 sm:p-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-hai-border">
          {/* Catchment Switcher Tabs */}
          <div className="flex items-center p-1 bg-hai-offwhite rounded-xl border border-hai-border">
            {SOURCING_CATCHMENTS.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setActiveCatchmentId(c.id);
                  setVillageSearch('');
                }}
                className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeCatchmentId === c.id
                    ? 'bg-hai-forest text-white shadow-sm'
                    : 'text-hai-charcoal hover:text-hai-forest'
                }`}
              >
                {c.name} ({c.pinCode})
              </button>
            ))}
          </div>

          <div className="text-xs text-hai-muted">
            Total Villages in Catchment:{' '}
            <strong className="text-hai-forest font-mono">
              {currentCatchment.villages.length}
            </strong>
          </div>
        </div>

        {/* Catchment Details & Hub */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-hai-offwhite p-5 rounded-xl border border-hai-border text-xs">
          <div>
            <span className="text-[10px] text-hai-muted uppercase font-bold tracking-wider block">
              Catchment Hub Location
            </span>
            <span className="text-sm font-bold text-hai-forest mt-0.5 block">
              {currentCatchment.hubLocation}
            </span>
            <span className="text-hai-charcoal/70 mt-1 block">{currentCatchment.district}</span>
          </div>

          <div className="md:col-span-2">
            <span className="text-[10px] text-hai-muted uppercase font-bold tracking-wider block">
              Operational Scope & Agronomy
            </span>
            <p className="text-hai-charcoal/80 mt-1 leading-relaxed">
              {currentCatchment.description}
            </p>
          </div>
        </div>

        {/* Village Search & List */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h3 className="font-bold text-sm sm:text-base text-hai-forest">
              Village Collection Nodes Directory ({filteredVillages.length} shown)
            </h3>

            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-hai-muted absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search village name..."
                value={villageSearch}
                onChange={(e) => setVillageSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-2 rounded-lg border border-hai-border text-xs focus:border-hai-agri focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-96 overflow-y-auto pr-1">
            {filteredVillages.map((v, i) => (
              <div
                key={i}
                className="p-3 rounded-lg border border-hai-border bg-white hover:border-hai-agri transition-all text-xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-hai-forest truncate">{v.name}</span>
                  <span className="text-[10px] font-mono text-hai-muted">
                    ~{v.distanceKm} km
                  </span>
                </div>
                <div className="flex items-center justify-between text-[10px]">
                  <span
                    className={`px-1.5 py-0.5 rounded font-semibold ${
                      v.status === 'Active Collection Point'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {v.status}
                  </span>
                  <span className="text-hai-muted truncate max-w-28">{v.soilOrProduceNotes}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Illustrative Sourcing Network Map & Node Topology */}
      <div className="bg-white rounded-2xl border border-hai-border shadow-soft p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-hai-border">
          <div>
            <h3 className="text-xl font-bold text-hai-forest">
              Illustrative Sourcing & Transit Topology
            </h3>
            <p className="text-xs text-hai-muted mt-0.5">
              Visualizing the aggregation triangle connecting local village clusters and wholesale buffer markets.
            </p>
          </div>
          <span className="text-[10px] font-mono bg-amber-100 text-amber-900 px-2 py-1 rounded font-bold">
            ILLUSTRATIVE MAP
          </span>
        </div>

        {/* Visual Topology Diagram */}
        <div className="bg-hai-offwhite rounded-xl border border-hai-border p-6 sm:p-10 relative overflow-hidden">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center">
            {/* Wholesale Buffer Nodes */}
            <div className="space-y-4">
              <div className="inline-flex p-3 rounded-2xl bg-amber-100 text-amber-900 border border-amber-300">
                <Building2 className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-hai-forest">Wholesale APMC Buffers</h4>
                <p className="text-xs text-hai-muted mt-1">Oddanchatram • Tiruppur • Coimbatore</p>
                <span className="text-[10px] text-amber-800 font-semibold block mt-1">
                  Volume Shortfall & Variety Buffer
                </span>
              </div>
            </div>

            {/* Central Aggregation Hub */}
            <div className="space-y-4 bg-white p-6 rounded-2xl border-2 border-hai-forest shadow-md">
              <div className="inline-flex p-3.5 rounded-2xl bg-hai-forest text-white">
                <Truck className="w-8 h-8 text-hai-leaf" />
              </div>
              <div>
                <h4 className="font-bold text-base text-hai-forest">HAI Cluster Sorting Nodes</h4>
                <p className="text-xs text-hai-charcoal/80 mt-1">
                  Chandrapuram & Pethappampatti Sorting Centers
                </p>
                <div className="flex flex-wrap items-center justify-center gap-1.5 mt-2 text-[10px]">
                  <span className="bg-hai-leaf text-hai-forest px-2 py-0.5 rounded font-bold">
                    Electronic Weighing
                  </span>
                  <span className="bg-hai-leaf text-hai-forest px-2 py-0.5 rounded font-bold">
                    Grade A/B Sorting
                  </span>
                  <span className="bg-hai-leaf text-hai-forest px-2 py-0.5 rounded font-bold">
                    Aerated Crates
                  </span>
                </div>
              </div>
            </div>

            {/* Primary Village Catchments */}
            <div className="space-y-4">
              <div className="inline-flex p-3 rounded-2xl bg-green-100 text-green-900 border border-green-300">
                <MapPin className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-hai-forest">69 Village Farming Clusters</h4>
                <p className="text-xs text-hai-muted mt-1">
                  29 Villages (Chandrapuram) + 40 Villages (Pethappampatti)
                </p>
                <span className="text-[10px] text-green-800 font-semibold block mt-1">
                  Direct Farmgate Sourcing Priority
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sourcing Operating Policy Rules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SOURCING_POLICY_RULES.map((rule, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-white border border-hai-border shadow-soft space-y-2"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-hai-agri" />
              <h3 className="font-bold text-sm text-hai-forest">{rule.title}</h3>
            </div>
            <p className="text-xs text-hai-charcoal/80 leading-relaxed">{rule.rule}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
