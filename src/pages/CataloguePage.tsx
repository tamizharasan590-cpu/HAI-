import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product, SourcingCategory, QualityGrade } from '../types';
import { EXCLUDED_PRODUCTS } from '../data/catalogue';
import {
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Plus,
  ShoppingBag,
  Sparkles,
  Info,
  SlidersHorizontal,
  Edit2
} from 'lucide-react';

export const CataloguePage: React.FC = () => {
  const {
    products,
    toggleProductAvailability,
    updateProductPrice,
    addToCart,
    language,
    activeRole,
    setIsCartOpen
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSourcing, setSelectedSourcing] = useState<string>('All');
  const [selectedGrade, setSelectedGrade] = useState<QualityGrade>('Grade A (Premium Retail)');
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<string>('');

  const categories = [
    'All',
    'Vegetables',
    'Greens / Keerai',
    'Roots & Tubers',
    'Gourds',
    'Wholesale Supplementary'
  ];

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.nameTa.includes(searchTerm);
    const matchesCategory =
      selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSourcing =
      selectedSourcing === 'All' || p.sourcingCategory === selectedSourcing;
    return matchesSearch && matchesCategory && matchesSourcing;
  });

  const handlePriceSave = (productId: string) => {
    const parsed = tempPrice === '' ? null : Number(tempPrice);
    updateProductPrice(productId, parsed);
    setEditingPriceId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-hai-border">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-hai-leaf text-hai-forest text-xs font-semibold">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Farm & Wholesale Sourcing Catalogue</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-hai-forest tracking-tight">
            Vegetables & Fresh Horticultural Produce
          </h1>
          <p className="text-sm sm:text-base text-hai-charcoal/80 leading-relaxed">
            All produce entries feature dual English & Tamil vernacular titles, transparent sourcing origin (Local Farmer vs Wholesale Buffer), and confirmed harvest validity.
          </p>
        </div>

        <button
          onClick={() => setIsCartOpen(true)}
          className="px-5 py-3 rounded-lg bg-hai-forest text-white font-bold text-xs sm:text-sm hover:bg-hai-agri transition-colors flex items-center gap-2 cursor-pointer shadow-sm self-start lg:self-auto"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>View Procurement Basket</span>
        </button>
      </div>

      {/* Exclusions Notice Banner */}
      <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 flex items-start gap-3 text-xs text-amber-950">
        <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold">
            Important Geographic Sourcing Scope & Exclusions:
          </p>
          <p className="leading-relaxed text-amber-900/90">
            Per operational criteria, <strong>Potato (உருளைக்கிழங்கு)</strong>,{' '}
            <strong>Beans (பீன்ஸ்)</strong>, and <strong>Carrot (கேரட்)</strong> are{' '}
            <span className="underline decoration-red-500 font-bold">strictly excluded</span> from the current HAI sourcing catalogue as they are not indigenous to the Chandrapuram / Pethappampatti plains clusters.
          </p>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white p-5 rounded-2xl border border-hai-border shadow-soft space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search Box */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-hai-muted absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search by English or Tamil name (e.g. Tomato, தக்காளி, முருங்கை)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-hai-border text-xs sm:text-sm focus:border-hai-agri focus:outline-none"
            />
          </div>

          {/* Sourcing Method Filter */}
          <div className="md:col-span-4 flex items-center gap-2 text-xs">
            <span className="text-hai-muted font-medium shrink-0">Origin:</span>
            <select
              aria-label="Filter by sourcing method"
              value={selectedSourcing}
              onChange={(e) => setSelectedSourcing(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-hai-border bg-white text-xs focus:border-hai-agri focus:outline-none"
            >
              <option value="All">All Sourcing Types</option>
              <option value="Local Farmer">Local Farmer Direct</option>
              <option value="Mixed">Mixed (Farmer + Buffer)</option>
              <option value="Wholesale Market">Wholesale Supplementary</option>
            </select>
          </div>

          {/* Target Grade Selector */}
          <div className="md:col-span-3 flex items-center gap-2 text-xs">
            <span className="text-hai-muted font-medium shrink-0">Grade:</span>
            <select
              aria-label="Select quality grade for basket additions"
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value as any)}
              className="w-full px-3 py-2.5 rounded-lg border border-hai-border bg-white text-xs focus:border-hai-agri focus:outline-none"
            >
              <option value="Grade A (Premium Retail)">Grade A (Premium Retail)</option>
              <option value="Grade B (Kitchen/Canteen)">Grade B (Kitchen/Canteen)</option>
              <option value="Standard Commercial">Standard Commercial</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 text-xs">
          <span className="text-hai-muted font-medium shrink-0 flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-hai-forest text-white font-bold'
                  : 'bg-hai-offwhite text-hai-charcoal hover:bg-hai-leaf'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((p) => {
          const isPriceOnReq = p.demoPrice === null;
          const isEditing = editingPriceId === p.id;

          return (
            <div
              key={p.id}
              className="bg-white rounded-2xl border border-hai-border p-5 shadow-soft hover:shadow-lift transition-all flex flex-col justify-between"
            >
              <div>
                {/* Card Header */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-base text-hai-forest">{p.nameEn}</h3>
                    <p className="text-xs text-hai-agri font-tamil font-bold">{p.nameTa}</p>
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                      p.sourcingCategory === 'Local Farmer'
                        ? 'bg-green-100 text-green-800'
                        : p.sourcingCategory === 'Mixed'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {p.sourcingCategory}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-hai-charcoal/80 mt-2.5 leading-relaxed line-clamp-2">
                  {language === 'en' ? p.descriptionEn : p.descriptionTa}
                </p>

                {/* Meta details */}
                <div className="mt-4 pt-3 border-t border-hai-border/60 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-hai-muted block">Availability Status</span>
                    <span
                      className={`font-semibold inline-flex items-center gap-1 text-[11px] ${
                        p.status === 'Available'
                          ? 'text-green-700'
                          : p.status === 'Limited Availability'
                          ? 'text-amber-700'
                          : 'text-hai-forest'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                      {p.status}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-hai-muted block">Unit of Sale</span>
                    <span className="font-medium text-hai-charcoal">{p.unit}</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-hai-muted block">Min Order Qty</span>
                    <span className="font-medium text-hai-charcoal">{p.minOrderQty} kg</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-hai-muted block">Price Benchmark</span>
                    {isEditing ? (
                      <div className="flex items-center gap-1 mt-0.5">
                        <input
                          type="number"
                          placeholder="Price"
                          value={tempPrice}
                          onChange={(e) => setTempPrice(e.target.value)}
                          className="w-16 px-1 py-0.5 border text-xs rounded"
                        />
                        <button
                          onClick={() => handlePriceSave(p.id)}
                          className="text-[10px] bg-hai-forest text-white px-1.5 py-0.5 rounded font-bold"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold font-mono text-sm text-hai-forest">
                          {isPriceOnReq ? 'Price on Request' : `₹${p.demoPrice}/kg`}
                        </span>
                        {/* Admin quick price edit */}
                        {activeRole === 'admin' && (
                          <button
                            onClick={() => {
                              setEditingPriceId(p.id);
                              setTempPrice(p.demoPrice ? String(p.demoPrice) : '');
                            }}
                            className="text-gray-400 hover:text-hai-forest cursor-pointer"
                            title="Edit Benchmark Price"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-2 text-[10px] text-hai-muted">
                  Last verified: {p.lastUpdated}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-3 border-t border-hai-border flex items-center justify-between gap-2">
                {activeRole === 'admin' ? (
                  <button
                    onClick={() => toggleProductAvailability(p.id)}
                    className="text-[11px] font-semibold text-hai-forest hover:underline cursor-pointer"
                  >
                    Toggle Status (Admin)
                  </button>
                ) : (
                  <span className="text-[10px] text-hai-muted">
                    Preset: {selectedGrade.split(' ')[0]}
                  </span>
                )}

                <button
                  onClick={() => addToCart(p, 1, selectedGrade)}
                  className="px-3.5 py-1.5 bg-hai-forest hover:bg-hai-agri text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to Basket</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-hai-border p-8">
          <p className="text-hai-charcoal font-bold text-base">
            No produce items match your current filter criteria.
          </p>
          <p className="text-xs text-hai-muted mt-1">
            Try adjusting your search terms or clearing the category filter.
          </p>
        </div>
      )}
    </div>
  );
};
