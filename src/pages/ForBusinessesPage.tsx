import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Order, OrderStatus } from '../types';
import {
  Store,
  Clock,
  CheckCircle,
  AlertTriangle,
  Receipt,
  FileText,
  Calendar,
  Truck,
  RotateCcw,
  Sparkles,
  ShoppingBag,
  ExternalLink
} from 'lucide-react';

export const ForBusinessesPage: React.FC = () => {
  const {
    language,
    orders,
    setSelectedOrderForInvoice,
    setIsCartOpen,
    setActiveTab,
    showToast
  } = useApp();

  // Dispute / Quality Issue state
  const [selectedOrderIdForDispute, setSelectedOrderIdForDispute] = useState<string>('');
  const [issueType, setIssueType] = useState('Quality Damage / Transit Bruise');
  const [issueDesc, setIssueDesc] = useState('');
  const [isSubmittingDispute, setIsSubmittingDispute] = useState(false);

  const businessTypes = [
    { label: 'Hotels & Restaurants', desc: 'Daily bulk supplies graded for commercial kitchen prep & early dispatch' },
    { label: 'Supermarkets & Modern Retail', desc: 'Grade A premium unblemished crates for fresh vegetable display' },
    { label: 'Local Vegetable Stalls', desc: 'Consistent morning arrivals with lower market volatility' },
    { label: 'College & Factory Canteens', desc: 'High-volume staples (onions, tomatoes, cabbage, gourds) on monthly credit terms' },
    { label: 'Apartment Gated Communities', desc: 'Consolidated weekend deliveries for residents' }
  ];

  const handleDisputeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrderIdForDispute || !issueDesc.trim()) {
      alert('Please select an order and describe the issue.');
      return;
    }
    setIsSubmittingDispute(true);
    setTimeout(() => {
      setIsSubmittingDispute(false);
      setIssueDesc('');
      showToast('Quality issue report logged. Our QC officer will inspect and process credit adjustment.');
    }, 500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Page Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-hai-leaf text-hai-forest text-xs font-semibold">
          <Store className="w-3.5 h-3.5" />
          <span>B2B Commercial Procurement Portal</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-hai-forest tracking-tight">
          Commercial Sourcing for Kitchens, Retailers & Institutions
        </h1>
        <p className="text-sm sm:text-base text-hai-charcoal/80 leading-relaxed">
          Consolidate your daily produce orders into a single, scheduled morning delivery. Certified Grade A/B sorting, digital invoicing, and zero 4 AM mandi chaos.
        </p>

        <div className="pt-2 flex flex-wrap gap-3">
          <button
            onClick={() => setActiveTab('catalogue')}
            className="px-5 py-3 rounded-lg bg-hai-forest text-white font-bold text-xs sm:text-sm hover:bg-hai-agri transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Build Multi-Item Procurement Basket</span>
          </button>
          <button
            onClick={() => setIsCartOpen(true)}
            className="px-5 py-3 rounded-lg border-2 border-hai-forest text-hai-forest font-bold text-xs sm:text-sm hover:bg-hai-leaf transition-colors cursor-pointer"
          >
            Open Current Basket
          </button>
        </div>
      </div>

      {/* Target Buyer Categories Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {businessTypes.map((b, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-white border border-hai-border shadow-soft space-y-2 hover:border-hai-agri transition-all"
          >
            <div className="w-8 h-8 rounded-lg bg-hai-leaf text-hai-forest flex items-center justify-center font-bold text-xs">
              0{idx + 1}
            </div>
            <h3 className="font-bold text-sm sm:text-base text-hai-forest">{b.label}</h3>
            <p className="text-xs text-hai-charcoal/70 leading-relaxed">{b.desc}</p>
          </div>
        ))}
      </div>

      {/* Order History & Tracking Section */}
      <div className="bg-white rounded-2xl border border-hai-border shadow-soft p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-hai-border">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-hai-forest">
              Commercial Order Tracking & Invoices
            </h2>
            <p className="text-xs text-hai-muted mt-0.5">
              Live tracking through aggregation, electronic weighing, QC verification, and morning dispatch.
            </p>
          </div>
          <span className="text-[11px] font-mono bg-hai-leaf text-hai-forest px-2.5 py-1 rounded font-bold">
            {orders.length} Active & Recent Orders
          </span>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-hai-border bg-hai-offwhite text-hai-forest font-bold">
                <th className="py-3 px-4">Order ID & Date</th>
                <th className="py-3 px-4">Buyer & Destination</th>
                <th className="py-3 px-4">Items / Volumes</th>
                <th className="py-3 px-4">Landed Total (₹)</th>
                <th className="py-3 px-4">Fulfillment Status</th>
                <th className="py-3 px-4 text-center">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hai-border">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-hai-offwhite/50 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-mono font-bold text-hai-forest block text-sm">
                      {order.id}
                    </span>
                    <span className="text-[11px] text-hai-muted">{order.createdAt}</span>
                    <span className="text-[10px] text-hai-agri block mt-0.5">
                      Slot: {order.deliverySlot}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 max-w-xs">
                    <span className="font-bold text-hai-charcoal block">{order.buyerName}</span>
                    <span className="text-[11px] text-hai-muted block truncate">
                      {order.deliveryLocation}
                    </span>
                    <span className="text-[10px] text-hai-muted">Type: {order.businessType}</span>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="space-y-0.5">
                      {order.items.slice(0, 3).map((item, i) => (
                        <div key={i} className="text-[11px] text-hai-charcoal">
                          • {item.productName} ({item.quantity} {item.unit})
                        </div>
                      ))}
                      {order.items.length > 3 && (
                        <span className="text-[10px] text-hai-muted font-medium">
                          +{order.items.length - 3} more items...
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-mono font-bold text-sm text-hai-forest block">
                      ₹{order.totalAmount.toLocaleString('en-IN')}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-1.5 py-0.5 rounded inline-block mt-0.5 ${
                        order.paymentStatus.includes('Paid')
                          ? 'bg-green-100 text-green-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-bold inline-flex items-center gap-1 ${
                        order.status === 'Delivered'
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'Packed & Dispatched'
                          ? 'bg-blue-100 text-blue-800'
                          : order.status === 'Quality Inspected'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {order.status === 'Delivered' ? (
                        <CheckCircle className="w-3.5 h-3.5 text-green-700" />
                      ) : (
                        <Truck className="w-3.5 h-3.5" />
                      )}
                      <span>{order.status}</span>
                    </span>
                    {order.qcPassed && (
                      <span className="text-[10px] text-hai-agri block font-semibold mt-1">
                        ✓ QC Certified
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => setSelectedOrderForInvoice(order)}
                      className="px-3 py-1.5 bg-hai-offwhite hover:bg-hai-leaf text-hai-forest font-bold rounded border border-hai-border transition-colors flex items-center gap-1 mx-auto cursor-pointer"
                      title="View & Print Official Invoice"
                    >
                      <Receipt className="w-3.5 h-3.5 text-hai-agri" />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Shortage, Substitution & Quality Issue Reporting Workflow */}
      <div className="bg-white rounded-2xl border border-hai-border shadow-soft p-6 sm:p-8">
        <div className="max-w-2xl space-y-4">
          <div className="flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-red-600" />
            <h3 className="font-bold text-lg text-hai-forest">
              Shortage, Damage or Quality Dispute Reporting
            </h3>
          </div>
          <p className="text-xs text-hai-charcoal/80 leading-relaxed">
            HAI adheres to a strict 2-hour delivery check window. If produce delivered to your kitchen or supermarket exhibits transit bruising, grade mismatches, or crate shortages, submit the claim below for immediate credit note issuance.
          </p>

          <form onSubmit={handleDisputeSubmit} className="space-y-3 pt-2 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-hai-charcoal font-semibold mb-1">
                  Select Order ID *
                </label>
                <select
                  required
                  value={selectedOrderIdForDispute}
                  onChange={(e) => setSelectedOrderIdForDispute(e.target.value)}
                  className="w-full px-3 py-2 rounded border border-hai-border focus:border-hai-agri focus:outline-none bg-white"
                >
                  <option value="">-- Choose Order --</option>
                  {orders.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.id} — {o.buyerName} (₹{o.totalAmount})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-hai-charcoal font-semibold mb-1">
                  Issue Classification *
                </label>
                <select
                  value={issueType}
                  onChange={(e) => setIssueType(e.target.value)}
                  className="w-full px-3 py-2 rounded border border-hai-border focus:border-hai-agri focus:outline-none bg-white"
                >
                  <option value="Quality Damage / Transit Bruise">Quality Damage / Transit Bruise</option>
                  <option value="Grade Mismatch (A vs B)">Grade Mismatch (Requested A, got B)</option>
                  <option value="Weight Shortage in Crate">Weight Shortage in Sealed Crate</option>
                  <option value="Packaging Defect">Packaging / Contamination Defect</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-hai-charcoal font-semibold mb-1">
                Description of Defect & Batch Photo Note *
              </label>
              <textarea
                rows={2}
                required
                placeholder="Explain the specific crate numbers, damaged weight, or condition upon arrival..."
                value={issueDesc}
                onChange={(e) => setIssueDesc(e.target.value)}
                className="w-full px-3 py-2 rounded border border-hai-border focus:border-hai-agri focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmittingDispute}
              className="px-4 py-2.5 bg-red-700 text-white font-bold rounded-lg hover:bg-red-800 transition-colors cursor-pointer disabled:opacity-50"
            >
              {isSubmittingDispute ? 'Submitting Report...' : 'Log Quality Dispute Ticket'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
