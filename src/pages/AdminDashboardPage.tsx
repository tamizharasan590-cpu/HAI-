import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { OrderStatus, QualityGrade, UserRole } from '../types';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Truck,
  Scale,
  Receipt,
  FileSpreadsheet,
  Users,
  Store,
  DollarSign,
  AlertTriangle,
  RotateCcw,
  Sliders,
  Filter,
  Eye,
  Key
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const {
    activeRole,
    setActiveRole,
    orders,
    updateOrderStatus,
    farmerBatches,
    updateFarmerBatchStatus,
    products,
    toggleProductAvailability,
    setSelectedOrderForInvoice,
    showToast
  } = useApp();

  const [activeAdminSubtab, setActiveAdminSubtab] = useState<
    'overview' | 'orders' | 'farmers' | 'catalogue' | 'qc' | 'economics'
  >('overview');

  // KPI Calculations from active demo data
  const totalVolumeKg = orders.reduce((sum, o) => {
    return sum + o.items.reduce((iSum, i) => iSum + i.quantity * (i.unit.includes('25kg') ? 25 : i.unit.includes('50kg') ? 50 : 1), 0);
  }, 0);

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalContribution = orders.reduce((sum, o) => sum + (o.grossContribution || 0), 0);
  const pendingFarmerBatches = farmerBatches.filter((b) => b.status === 'Pending Verification').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Admin Top Header & Role Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-hai-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-hai-agri">
              HAI Operational Console
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-hai-forest mt-1">
            Platform Operations & Sourcing Hub
          </h1>
          <p className="text-xs text-hai-muted">
            Managing farmer collections, quality grading, buyer dispatch, and unit economics.
          </p>
        </div>

        {/* Role Selector & Security Indicator */}
        <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-hai-border shadow-sm text-xs">
          <Key className="w-4 h-4 text-hai-forest" />
          <span className="text-hai-muted font-medium">Logged Role:</span>
          <select
            aria-label="Switch staff role for dashboard operations"
            value={activeRole}
            onChange={(e) => {
              setActiveRole(e.target.value as UserRole);
              showToast(`Switched active view to ${e.target.value}`);
            }}
            className="px-2.5 py-1 rounded bg-hai-offwhite border border-hai-border font-bold text-hai-forest focus:outline-none"
          >
            <option value="admin">Platform Super Admin</option>
            <option value="sourcing_officer">Sourcing Officer (Chandrapuram / Pethappampatti)</option>
            <option value="qc_inspector">Quality Inspector (Sorting & Grading)</option>
          </select>
        </div>
      </div>

      {/* Subtab Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-hai-border text-xs">
        <button
          onClick={() => setActiveAdminSubtab('overview')}
          className={`px-4 py-2 rounded-lg font-bold transition-all cursor-pointer ${
            activeAdminSubtab === 'overview'
              ? 'bg-hai-forest text-white'
              : 'text-hai-charcoal hover:bg-hai-offwhite'
          }`}
        >
          KPI Overview
        </button>
        <button
          onClick={() => setActiveAdminSubtab('orders')}
          className={`px-4 py-2 rounded-lg font-bold transition-all cursor-pointer ${
            activeAdminSubtab === 'orders'
              ? 'bg-hai-forest text-white'
              : 'text-hai-charcoal hover:bg-hai-offwhite'
          }`}
        >
          Incoming Orders & Dispatch ({orders.length})
        </button>
        <button
          onClick={() => setActiveAdminSubtab('farmers')}
          className={`px-4 py-2 rounded-lg font-bold transition-all cursor-pointer ${
            activeAdminSubtab === 'farmers'
              ? 'bg-hai-forest text-white'
              : 'text-hai-charcoal hover:bg-hai-offwhite'
          }`}
        >
          Farmer Harvest Batches ({farmerBatches.length})
        </button>
        <button
          onClick={() => setActiveAdminSubtab('catalogue')}
          className={`px-4 py-2 rounded-lg font-bold transition-all cursor-pointer ${
            activeAdminSubtab === 'catalogue'
              ? 'bg-hai-forest text-white'
              : 'text-hai-charcoal hover:bg-hai-offwhite'
          }`}
        >
          Product Availability Manager ({products.length})
        </button>
        <button
          onClick={() => setActiveAdminSubtab('economics')}
          className={`px-4 py-2 rounded-lg font-bold transition-all cursor-pointer ${
            activeAdminSubtab === 'economics'
              ? 'bg-hai-forest text-white'
              : 'text-hai-charcoal hover:bg-hai-offwhite'
          }`}
        >
          Unit Economics & Margin Audit
        </button>
      </div>

      {/* Overview Subtab */}
      {activeAdminSubtab === 'overview' && (
        <div className="space-y-8">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-hai-border shadow-soft space-y-2">
              <span className="text-xs text-hai-muted font-bold uppercase tracking-wider">
                Total Orders Value
              </span>
              <p className="text-2xl font-black font-mono text-hai-forest">
                ₹{totalRevenue.toLocaleString('en-IN')}
              </p>
              <span className="text-[11px] text-green-700 font-semibold block">
                {orders.length} orders in pipeline
              </span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-hai-border shadow-soft space-y-2">
              <span className="text-xs text-hai-muted font-bold uppercase tracking-wider">
                Procurement Volume
              </span>
              <p className="text-2xl font-black font-mono text-hai-forest">
                {totalVolumeKg.toLocaleString('en-IN')} kg
              </p>
              <span className="text-[11px] text-hai-muted font-medium block">
                Across 39+ catalogue lines
              </span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-hai-border shadow-soft space-y-2">
              <span className="text-xs text-hai-muted font-bold uppercase tracking-wider">
                Pending Farmer Batches
              </span>
              <p className="text-2xl font-black font-mono text-hai-earth">
                {pendingFarmerBatches} Batches
              </p>
              <span className="text-[11px] text-amber-700 font-semibold block">
                Awaiting field verification
              </span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-hai-border shadow-soft space-y-2">
              <span className="text-xs text-hai-muted font-bold uppercase tracking-wider">
                Gross Contribution Margin
              </span>
              <p className="text-2xl font-black font-mono text-hai-agri">
                ₹{totalContribution.toLocaleString('en-IN')}
              </p>
              <span className="text-[11px] text-hai-muted font-medium block">
                After transit, crating & labour
              </span>
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="bg-white rounded-2xl border border-hai-border shadow-soft p-6 space-y-4">
            <h3 className="font-bold text-base text-hai-forest">
              Operational Field Actions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <button
                onClick={() => setActiveAdminSubtab('farmers')}
                className="p-4 rounded-xl bg-hai-offwhite border border-hai-border hover:border-hai-agri transition-all text-left space-y-1 cursor-pointer"
              >
                <span className="font-bold text-hai-forest block">
                  Verify Farmer Harvest Batches →
                </span>
                <span className="text-hai-muted text-[11px]">
                  Confirm village collection times in Chandrapuram or Pethappampatti.
                </span>
              </button>

              <button
                onClick={() => setActiveAdminSubtab('orders')}
                className="p-4 rounded-xl bg-hai-offwhite border border-hai-border hover:border-hai-agri transition-all text-left space-y-1 cursor-pointer"
              >
                <span className="font-bold text-hai-forest block">
                  Dispatch & Quality Certifications →
                </span>
                <span className="text-hai-muted text-[11px]">
                  Advance orders from Sourcing Confirmed to Quality Inspected & Dispatched.
                </span>
              </button>

              <button
                onClick={() => setActiveAdminSubtab('catalogue')}
                className="p-4 rounded-xl bg-hai-offwhite border border-hai-border hover:border-hai-agri transition-all text-left space-y-1 cursor-pointer"
              >
                <span className="font-bold text-hai-forest block">
                  Toggle Live Product Status →
                </span>
                <span className="text-hai-muted text-[11px]">
                  Switch produce to Limited Availability or Price on Request.
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Orders Subtab */}
      {activeAdminSubtab === 'orders' && (
        <div className="bg-white rounded-2xl border border-hai-border shadow-soft p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-hai-border">
            <h3 className="font-bold text-base text-hai-forest">
              Order Pipeline & Status Controller
            </h3>
            <span className="text-xs text-hai-muted">Click dropdowns to advance workflow stages</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-hai-border bg-hai-offwhite text-hai-forest font-bold">
                  <th className="py-2.5 px-3">Order ID</th>
                  <th className="py-2.5 px-3">Buyer</th>
                  <th className="py-2.5 px-3">Delivery Slot</th>
                  <th className="py-2.5 px-3">Total Amount</th>
                  <th className="py-2.5 px-3">Fulfillment Status</th>
                  <th className="py-2.5 px-3">QC Pass</th>
                  <th className="py-2.5 px-3 text-center">Invoice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hai-border">
                {orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-hai-offwhite/50">
                    <td className="py-3 px-3 font-mono font-bold text-hai-forest">
                      {ord.id}
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-semibold text-hai-charcoal block">{ord.buyerName}</span>
                      <span className="text-[11px] text-hai-muted">{ord.businessType}</span>
                    </td>
                    <td className="py-3 px-3 text-hai-muted">{ord.deliverySlot}</td>
                    <td className="py-3 px-3 font-mono font-bold">₹{ord.totalAmount}</td>
                    <td className="py-3 px-3">
                      <select
                        aria-label="Update order status"
                        value={ord.status}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                        className="px-2 py-1 rounded bg-hai-offwhite border border-hai-border font-bold text-xs focus:outline-none"
                      >
                        <option value="Submitted">Submitted</option>
                        <option value="Sourcing Confirmed">Sourcing Confirmed</option>
                        <option value="Collected & Weighed">Collected & Weighed</option>
                        <option value="Quality Inspected">Quality Inspected</option>
                        <option value="Packed & Dispatched">Packed & Dispatched</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Completed">Completed</option>
                        <option value="Disputed">Disputed</option>
                      </select>
                    </td>
                    <td className="py-3 px-3">
                      <button
                        onClick={() => updateOrderStatus(ord.id, ord.status, !ord.qcPassed)}
                        className={`text-[10px] font-bold px-2 py-0.5 rounded cursor-pointer ${
                          ord.qcPassed
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {ord.qcPassed ? 'QC Passed ✓' : 'QC Pending'}
                      </button>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => setSelectedOrderForInvoice(ord)}
                        className="p-1 text-hai-forest hover:text-hai-agri cursor-pointer"
                        title="View Tax Invoice"
                      >
                        <Eye className="w-4 h-4 mx-auto" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Farmer Batches Subtab */}
      {activeAdminSubtab === 'farmers' && (
        <div className="bg-white rounded-2xl border border-hai-border shadow-soft p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-hai-border">
            <h3 className="font-bold text-base text-hai-forest">
              Village Harvest Availability Management
            </h3>
            <span className="text-xs text-hai-muted">
              Approve collections and log electronic weighing results
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {farmerBatches.map((b) => (
              <div
                key={b.id}
                className="p-5 rounded-xl bg-hai-offwhite border border-hai-border space-y-3 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-hai-forest">{b.id}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                      b.status === 'Payment Processed'
                        ? 'bg-green-100 text-green-800'
                        : b.status === 'Weighed & Received'
                        ? 'bg-blue-100 text-blue-800'
                        : b.status === 'Accepted for Collection'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {b.status}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-sm text-hai-charcoal">{b.farmerName}</h4>
                  <p className="text-hai-muted">
                    Phone: {b.phone} • Village: <strong>{b.village}</strong>
                  </p>
                  <p className="text-hai-muted text-[11px]">{b.catchment}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 bg-white p-2.5 rounded border border-hai-border text-[11px]">
                  <div>
                    <span className="text-hai-muted block">Crop & Grade:</span>
                    <span className="font-semibold text-hai-forest">
                      {b.cropEn} ({b.cropTa})
                    </span>
                  </div>
                  <div>
                    <span className="text-hai-muted block">Quantity:</span>
                    <span className="font-semibold">{b.estimatedQuantityKg} kg</span>
                  </div>
                  <div>
                    <span className="text-hai-muted block">Harvest Date:</span>
                    <span className="font-semibold">{b.harvestDate}</span>
                  </div>
                  <div>
                    <span className="text-hai-muted block">Expected / kg:</span>
                    <span className="font-semibold font-mono">₹{b.expectedPricePerKg}</span>
                  </div>
                </div>

                {/* Status action buttons */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => updateFarmerBatchStatus(b.id, 'Accepted for Collection')}
                    className="flex-1 py-1.5 bg-hai-forest text-white font-bold rounded hover:bg-hai-agri transition-colors text-center cursor-pointer"
                  >
                    Accept Collection
                  </button>
                  <button
                    onClick={() => updateFarmerBatchStatus(b.id, 'Weighed & Received')}
                    className="flex-1 py-1.5 bg-blue-700 text-white font-bold rounded hover:bg-blue-800 transition-colors text-center cursor-pointer"
                  >
                    Mark Weighed
                  </button>
                  <button
                    onClick={() => updateFarmerBatchStatus(b.id, 'Payment Processed')}
                    className="flex-1 py-1.5 bg-emerald-700 text-white font-bold rounded hover:bg-emerald-800 transition-colors text-center cursor-pointer"
                  >
                    Disburse Pay
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Catalogue Subtab */}
      {activeAdminSubtab === 'catalogue' && (
        <div className="bg-white rounded-2xl border border-hai-border shadow-soft p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-hai-border">
            <h3 className="font-bold text-base text-hai-forest">
              Live Product Availability & Origin Matrix
            </h3>
            <span className="text-xs text-hai-muted">
              Toggle availability instantly without code changes
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            {products.map((p) => (
              <div
                key={p.id}
                className="p-3.5 rounded-xl border border-hai-border bg-hai-offwhite flex items-center justify-between gap-3"
              >
                <div>
                  <h4 className="font-bold text-hai-forest">{p.nameEn}</h4>
                  <span className="text-[11px] text-hai-agri font-tamil">{p.nameTa}</span>
                  <div className="flex items-center gap-2 mt-1 text-[10px] text-hai-muted">
                    <span>{p.sourcingCategory}</span>
                    <span>•</span>
                    <span className="font-mono">₹{p.demoPrice || 'Req'}/kg</span>
                  </div>
                </div>

                <button
                  onClick={() => toggleProductAvailability(p.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    p.status === 'Available'
                      ? 'bg-green-100 text-green-800 hover:bg-red-100 hover:text-red-800'
                      : 'bg-amber-100 text-amber-800 hover:bg-green-100 hover:text-green-800'
                  }`}
                >
                  {p.status}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Unit Economics Subtab */}
      {activeAdminSubtab === 'economics' && (
        <div className="bg-white rounded-2xl border border-hai-border shadow-soft p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-hai-border">
            <div>
              <h3 className="font-bold text-base text-hai-forest">
                Order-Level Unit Economics & Contribution Margins
              </h3>
              <p className="text-xs text-hai-muted mt-0.5">
                Every transaction accounts for farmer procurement cost, transport, rigid crating, and labour.
              </p>
            </div>
            <span className="text-[10px] bg-hai-leaf text-hai-forest font-mono px-2 py-1 rounded font-bold">
              AUDITED MARGINS
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-hai-border bg-hai-offwhite text-hai-forest font-bold">
                  <th className="py-2.5 px-3">Order ID</th>
                  <th className="py-2.5 px-3">Buyer Revenue</th>
                  <th className="py-2.5 px-3">Farm Cost</th>
                  <th className="py-2.5 px-3">Transport</th>
                  <th className="py-2.5 px-3">Crates & Packing</th>
                  <th className="py-2.5 px-3">Labour / Handling</th>
                  <th className="py-2.5 px-3 text-right">Contribution (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hai-border font-mono">
                {orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-hai-offwhite/50">
                    <td className="py-3 px-3 font-bold text-hai-forest">{ord.id}</td>
                    <td className="py-3 px-3 font-bold">₹{ord.totalAmount}</td>
                    <td className="py-3 px-3 text-hai-muted">₹{ord.procurementCost}</td>
                    <td className="py-3 px-3 text-hai-muted">₹{ord.transportCost}</td>
                    <td className="py-3 px-3 text-hai-muted">₹{ord.packagingCost}</td>
                    <td className="py-3 px-3 text-hai-muted">₹{ord.labourCost}</td>
                    <td className="py-3 px-3 text-right font-black text-hai-agri text-sm">
                      +₹{ord.grossContribution}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
