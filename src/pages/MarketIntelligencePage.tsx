import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  CURRENT_MARKET_PRICES,
  HISTORICAL_TOMATO_PRICE_TREND,
  DEMAND_SUPPLY_CALENDAR,
  FORECAST_PREVIEW
} from '../data/marketPrices';
import {
  LineChart,
  Calendar,
  Download,
  Bell,
  Sliders,
  TrendingUp,
  TrendingDown,
  Info,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const MarketIntelligencePage: React.FC = () => {
  const { language, showToast } = useApp();

  const [selectedMarketFilter, setSelectedMarketFilter] = useState<string>('All');
  const [selectedCropForecast, setSelectedCropForecast] = useState<string>('Tomato');
  const [forecastConfidenceOverride, setForecastConfidenceOverride] = useState<number>(85);
  const [alertPhone, setAlertPhone] = useState('');
  const [alertCrop, setAlertCrop] = useState('Tomato');

  const filteredPrices = CURRENT_MARKET_PRICES.filter(
    (p) => selectedMarketFilter === 'All' || p.marketName.includes(selectedMarketFilter)
  );

  const handleDownloadCsv = () => {
    const headers = ['Product', 'Tamil Name', 'Market', 'District', 'Date', 'Min Price', 'Max Price', 'Modal Price', 'Source'];
    const rows = CURRENT_MARKET_PRICES.map((p) => [
      p.product,
      p.productTa,
      p.marketName,
      p.district,
      p.date,
      p.minPrice,
      p.maxPrice,
      p.modalPrice,
      p.dataSource
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `HAI_Market_Price_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Market intelligence CSV export downloaded.');
  };

  const handleSubscribeAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertPhone.trim()) {
      alert('Please enter your WhatsApp or mobile number.');
      return;
    }
    showToast(`Price alerts configured for ${alertCrop} via WhatsApp/SMS.`);
    setAlertPhone('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-hai-border">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-hai-leaf text-hai-forest text-xs font-semibold">
            <LineChart className="w-3.5 h-3.5" />
            <span>Market Trends, Prices & Predictive Intelligence</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-hai-forest tracking-tight">
            Tamil Nadu Horticultural Market Intelligence
          </h1>
          <p className="text-sm sm:text-base text-hai-charcoal/80 leading-relaxed">
            Time-stamped price benchmarks across Coimbatore, Oddanchatram, and Tiruppur regulated markets. Designed to eliminate information asymmetry for both farmers and buyers.
          </p>
        </div>

        <button
          onClick={handleDownloadCsv}
          className="px-4 py-2.5 rounded-lg bg-hai-forest text-white font-bold text-xs hover:bg-hai-agri transition-colors flex items-center gap-2 cursor-pointer shadow-sm self-start lg:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Export Price Bulletin (CSV)</span>
        </button>
      </div>

      {/* Demo Disclosure Box */}
      <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 flex items-start gap-3 text-xs text-amber-950">
        <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Transparency Notice:</strong> All market price records and charts in this section represent 
          <strong> Illustrative Demo Data</strong> modeled after historical regulated market committee patterns. 
          HAI does not present simulated figures as real-time live feeds without active API/Mandi board connectors.
        </p>
      </div>

      {/* Current Daily Price Benchmarks Table */}
      <div className="bg-white rounded-2xl border border-hai-border shadow-soft p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-hai-border">
          <div>
            <h2 className="text-xl font-bold text-hai-forest">
              Daily Regulated Market Benchmark Prices
            </h2>
            <p className="text-xs text-hai-muted mt-0.5">
              Reference modal prices (₹/kg) across key regional wholesale trading corridors.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-hai-muted font-medium">Filter Market:</span>
            <select
              aria-label="Filter prices by wholesale market"
              value={selectedMarketFilter}
              onChange={(e) => setSelectedMarketFilter(e.target.value)}
              className="px-3 py-1.5 rounded-md border border-hai-border bg-white text-xs focus:outline-none"
            >
              <option value="All">All Markets</option>
              <option value="Oddanchatram">Oddanchatram APMC</option>
              <option value="Coimbatore">Coimbatore MGR / Anna</option>
              <option value="Tiruppur">Tiruppur Thennampalayam</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-hai-border bg-hai-offwhite text-hai-forest font-bold">
                <th className="py-3 px-4">Commodity / Crop</th>
                <th className="py-3 px-4">Market & District</th>
                <th className="py-3 px-4">Min (₹)</th>
                <th className="py-3 px-4">Max (₹)</th>
                <th className="py-3 px-4">Modal Price (₹/kg)</th>
                <th className="py-3 px-4">Source & Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hai-border">
              {filteredPrices.map((rec) => (
                <tr key={rec.id} className="hover:bg-hai-offwhite/50 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-hai-forest text-sm block">{rec.product}</span>
                    <span className="text-hai-agri font-tamil font-semibold text-xs">{rec.productTa}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-hai-charcoal block">{rec.marketName}</span>
                    <span className="text-hai-muted text-[11px]">{rec.district} District</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono">₹{rec.minPrice}</td>
                  <td className="py-3.5 px-4 font-mono">₹{rec.maxPrice}</td>
                  <td className="py-3.5 px-4">
                    <span className="font-mono font-black text-sm text-hai-forest bg-hai-leaf/60 px-2.5 py-1 rounded">
                      ₹{rec.modalPrice}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 max-w-xs">
                    <span className="text-[11px] text-hai-charcoal block leading-tight truncate">
                      {rec.dataSource}
                    </span>
                    <span className="text-[10px] text-hai-muted font-medium block mt-0.5">
                      {rec.updateStatus} • {rec.date}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Historical Seasonal Trend & Volatility Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white rounded-2xl border border-hai-border shadow-soft p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-hai-border">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-hai-agri">
                Historical Multi-Market Series
              </span>
              <h3 className="text-lg font-bold text-hai-forest mt-0.5">
                Tomato Price Trend (12-Week Volatility Cycle)
              </h3>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-hai-forest"></span> Oddanchatram
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-hai-agri"></span> Coimbatore
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-hai-earth"></span> Chennai
              </span>
            </div>
          </div>

          {/* Pure SVG Line Chart */}
          <div className="h-64 w-full relative flex items-end justify-between pt-6 pb-4 px-2">
            {/* Horizontal Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20 text-[10px] text-hai-charcoal font-mono">
              <div className="border-b border-gray-400 w-full flex justify-between">
                <span>₹50/kg</span>
              </div>
              <div className="border-b border-gray-400 w-full flex justify-between">
                <span>₹35/kg</span>
              </div>
              <div className="border-b border-gray-400 w-full flex justify-between">
                <span>₹20/kg</span>
              </div>
              <div className="border-b border-gray-400 w-full flex justify-between">
                <span>₹0/kg</span>
              </div>
            </div>

            {/* Visual Bars / Columns representing weekly price swing */}
            <div className="relative w-full h-full flex items-end justify-between gap-2 z-10 pt-4">
              {HISTORICAL_TOMATO_PRICE_TREND.map((item, idx) => {
                const oddHeight = (item.oddanchatram / 55) * 100;
                const cbeHeight = (item.coimbatore / 55) * 100;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group">
                    <div className="w-full flex items-end justify-center gap-1 h-full">
                      {/* Oddanchatram Bar */}
                      <div
                        style={{ height: `${oddHeight}%` }}
                        className="w-2 sm:w-3 bg-hai-forest rounded-t transition-all group-hover:bg-hai-forest/80"
                        title={`Oddanchatram: ₹${item.oddanchatram}`}
                      ></div>
                      {/* Coimbatore Bar */}
                      <div
                        style={{ height: `${cbeHeight}%` }}
                        className="w-2 sm:w-3 bg-hai-agri rounded-t transition-all group-hover:bg-hai-agri/80"
                        title={`Coimbatore: ₹${item.coimbatore}`}
                      ></div>
                    </div>
                    <span className="text-[9px] text-hai-muted font-mono mt-2 truncate w-full text-center">
                      W{idx + 1}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-hai-offwhite border border-hai-border text-xs text-hai-charcoal/80 flex items-center justify-between">
            <span>
              Observation: Peak seasonal swing observed between Weeks 5–7 due to monsoon transition in Krishnagiri & Dindigul belts.
            </span>
            <span className="text-hai-forest font-bold shrink-0 ml-4">
              Volatility Index: High (38.4%)
            </span>
          </div>
        </div>

        {/* Demand Forecasting Engine Preview */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-hai-border shadow-soft p-6 sm:p-8 space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-hai-agri">
              Predictive Logistics
            </span>
            <h3 className="text-lg font-bold text-hai-forest mt-0.5">
              7-Day Demand Forecast
            </h3>
            <p className="text-xs text-hai-muted mt-1 leading-relaxed">
              Synthesizing historical orders, day-of-week consumption, and harvest notifications.
            </p>
          </div>

          <div className="space-y-3">
            {FORECAST_PREVIEW.map((f, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-hai-offwhite border border-hai-border space-y-1.5 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-hai-forest">{f.crop}</span>
                  <span
                    className={`inline-flex items-center gap-0.5 text-[11px] font-bold ${
                      f.trend === 'up'
                        ? 'text-red-700'
                        : f.trend === 'down'
                        ? 'text-green-700'
                        : 'text-hai-charcoal'
                    }`}
                  >
                    {f.trend === 'up' ? (
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    ) : f.trend === 'down' ? (
                      <ArrowDownRight className="w-3.5 h-3.5" />
                    ) : null}
                    ₹{f.forecastedNextWeekPrice} est.
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-hai-muted">
                  <span>Current: ₹{f.currentAvgPrice}/kg</span>
                  <span className="font-semibold text-hai-agri">Confidence: {f.confidence}</span>
                </div>
                <p className="text-[10px] text-hai-charcoal/70 leading-snug pt-0.5">{f.note}</p>
              </div>
            ))}
          </div>

          {/* Admin Override Controls simulation */}
          <div className="pt-2 border-t border-hai-border text-xs space-y-2">
            <span className="font-semibold text-hai-forest block">
              Adjust Forecast Confidence Threshold: {forecastConfidenceOverride}%
            </span>
            <input
              type="range"
              min="50"
              max="95"
              value={forecastConfidenceOverride}
              onChange={(e) => setForecastConfidenceOverride(Number(e.target.value))}
              className="w-full accent-hai-forest"
            />
          </div>
        </div>
      </div>

      {/* Demand vs. Supply Calendar */}
      <div className="bg-white rounded-2xl border border-hai-border shadow-soft p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-hai-border">
          <div>
            <h3 className="text-xl font-bold text-hai-forest">
              Weekly Cluster Demand vs. Farmer Supply Comparison
            </h3>
            <p className="text-xs text-hai-muted mt-0.5">
              Visualizing how HAI utilizes wholesale buffers to ensure 100% order fill rate without shortages.
            </p>
          </div>
          <span className="text-xs font-mono bg-hai-leaf text-hai-forest px-3 py-1 rounded font-bold">
            Simulated 7-Day Cycle (kg)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-7 gap-3 text-xs">
          {DEMAND_SUPPLY_CALENDAR.map((d) => (
            <div
              key={d.day}
              className="p-3.5 rounded-xl bg-hai-offwhite border border-hai-border space-y-2 flex flex-col justify-between"
            >
              <div>
                <span className="font-bold text-hai-forest block text-sm border-b border-hai-border pb-1">
                  {d.day}
                </span>
                <div className="space-y-1 pt-2">
                  <div className="text-[11px] flex justify-between">
                    <span className="text-hai-muted">Demand:</span>
                    <span className="font-bold">{d.confirmedDemandKg} kg</span>
                  </div>
                  <div className="text-[11px] flex justify-between text-green-800">
                    <span>Local:</span>
                    <span>{d.localSupplyKg} kg</span>
                  </div>
                  <div className="text-[11px] flex justify-between text-amber-800">
                    <span>Wholesale:</span>
                    <span>{d.wholesaleBufferKg} kg</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-hai-border text-[10px] text-hai-muted text-center font-medium">
                Fill Rate: 100%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Price Alert Subscription Form */}
      <div className="bg-gradient-to-r from-hai-forest to-hai-charcoal text-white rounded-2xl p-8 sm:p-10 shadow-lift flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="space-y-3 max-w-lg">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-hai-leaf" />
            <h3 className="font-bold text-xl">Daily WhatsApp Price Alerts</h3>
          </div>
          <p className="text-xs sm:text-sm text-hai-offwhite/80 leading-relaxed">
            Farmers and commercial buyers can subscribe to daily 07:00 AM WhatsApp broadcasts of verified benchmark prices for specific produce in Oddanchatram, Coimbatore, and Tiruppur.
          </p>
        </div>

        <form onSubmit={handleSubscribeAlert} className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto text-xs">
          <select
            aria-label="Select commodity for price alert"
            value={alertCrop}
            onChange={(e) => setAlertCrop(e.target.value)}
            className="px-3 py-2.5 rounded-lg bg-white text-hai-charcoal font-medium focus:outline-none"
          >
            <option value="Tomato">Tomato (தக்காளி)</option>
            <option value="Small Onion">Small Onion (சின்ன வெங்காயம்)</option>
            <option value="Green Chilli">Green Chilli (பச்சை மிளகாய்)</option>
            <option value="Drumstick">Drumstick (முருங்கைக்காய்)</option>
          </select>

          <input
            type="tel"
            required
            placeholder="+91 WhatsApp Mobile Number"
            value={alertPhone}
            onChange={(e) => setAlertPhone(e.target.value)}
            className="px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:bg-white/20 min-w-56"
          />

          <button
            type="submit"
            className="px-5 py-2.5 bg-hai-agri text-white font-bold rounded-lg hover:bg-emerald-600 transition-colors shadow-sm cursor-pointer whitespace-nowrap"
          >
            Subscribe Alert
          </button>
        </form>
      </div>
    </div>
  );
};
