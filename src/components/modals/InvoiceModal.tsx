import React from 'react';
import { useApp } from '../../context/AppContext';
import { HaiLogo } from '../common/HaiLogo';
import { X, Printer, ShieldCheck, Download, CheckCircle, Clock } from 'lucide-react';

export const InvoiceModal: React.FC = () => {
  const { selectedOrderForInvoice, setSelectedOrderForInvoice, language } = useApp();

  if (!selectedOrderForInvoice) return null;

  const order = selectedOrderForInvoice;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden border border-hai-border animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Controls Bar (Non-printable) */}
        <div className="no-print bg-hai-offwhite px-6 py-3 border-b border-hai-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-hai-forest">
              {language === 'en' ? 'Official Transaction Invoice Preview' : 'பரிவர்த்தனை ரசீது பார்வை'}
            </span>
            <span className="text-[10px] bg-hai-forest text-white px-2 py-0.5 rounded-full font-mono">
              {order.id}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 text-xs font-semibold rounded-md bg-hai-forest text-white hover:bg-hai-agri transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Print / Save PDF' : 'அச்சிடு / PDF'}</span>
            </button>
            <button
              onClick={() => setSelectedOrderForInvoice(null)}
              className="p-1 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5 text-hai-charcoal" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Area */}
        <div className="print-area p-8 text-hai-charcoal space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-hai-border pb-6">
            <div>
              <HaiLogo size="md" />
              <p className="text-xs text-hai-muted mt-2">
                Tamil Nadu Farm-to-Market Supply Chain Network
              </p>
              <p className="text-[11px] text-hai-muted">
                Catchment Nodes: Chandrapuram (641669) & Pethappampatti (642205)
              </p>
            </div>

            <div className="sm:text-right">
              <span className="inline-block text-xs uppercase font-bold tracking-widest text-hai-agri">
                Tax Invoice / Delivery Bill
              </span>
              <h2 className="text-lg font-black font-mono text-hai-forest mt-0.5">{order.id}</h2>
              <p className="text-xs text-hai-muted">Date: {order.createdAt}</p>
              <div className="mt-1.5">
                <span
                  className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded ${
                    order.paymentStatus.includes('Paid')
                      ? 'bg-green-100 text-green-800'
                      : order.paymentStatus.includes('Net')
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {order.paymentStatus.includes('Paid') ? (
                    <CheckCircle className="w-3 h-3 text-green-700" />
                  ) : (
                    <Clock className="w-3 h-3" />
                  )}
                  {order.paymentStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Billed To / Logistics details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-hai-offwhite p-4 rounded-lg border border-hai-border text-xs">
            <div>
              <h4 className="font-bold text-hai-forest uppercase tracking-wider text-[11px] mb-1">
                Billed To (Buyer Profile):
              </h4>
              <p className="font-semibold text-sm text-hai-charcoal">{order.buyerName}</p>
              <p className="text-hai-muted">{order.businessType}</p>
              <p className="text-hai-muted">{order.deliveryLocation}</p>
              <p className="text-hai-muted">Phone: {order.contactPhone}</p>
            </div>

            <div>
              <h4 className="font-bold text-hai-forest uppercase tracking-wider text-[11px] mb-1">
                Logistics & Dispatch:
              </h4>
              <p>
                <span className="text-hai-muted">Delivery Slot:</span>{' '}
                <span className="font-semibold">{order.deliverySlot}</span>
              </p>
              <p>
                <span className="text-hai-muted">Scheduled Date:</span>{' '}
                <span className="font-semibold">{order.deliveryDate}</span>
              </p>
              <p>
                <span className="text-hai-muted">Quality Check:</span>{' '}
                <span className="font-semibold text-hai-agri">
                  {order.qcPassed ? 'Certified Grade Pass' : 'Pending Verification'}
                </span>
              </p>
              <p>
                <span className="text-hai-muted">Fulfillment Status:</span>{' '}
                <span className="font-semibold text-hai-forest">{order.status}</span>
              </p>
            </div>
          </div>

          {/* Line items table */}
          <div>
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-hai-forest text-hai-forest font-bold">
                  <th className="py-2">Item Description</th>
                  <th className="py-2">Grade</th>
                  <th className="py-2">Origin</th>
                  <th className="py-2 text-center">Qty / Unit</th>
                  <th className="py-2 text-right">Unit Price (₹)</th>
                  <th className="py-2 text-right">Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hai-border">
                {order.items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-hai-offwhite/50">
                    <td className="py-2.5 font-semibold text-hai-charcoal">
                      {item.productName}{' '}
                      <span className="text-hai-muted text-[11px]">({item.productNameTa})</span>
                    </td>
                    <td className="py-2.5 text-hai-muted text-[11px]">{item.grade}</td>
                    <td className="py-2.5">
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                          item.sourcingOrigin === 'Local Farmer'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {item.sourcingOrigin}
                      </span>
                    </td>
                    <td className="py-2.5 text-center font-medium">
                      {item.quantity} {item.unit}
                    </td>
                    <td className="py-2.5 text-right font-mono">₹{item.unitPrice}</td>
                    <td className="py-2.5 text-right font-bold font-mono text-hai-forest">
                      ₹{item.totalPrice.toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary totals */}
          <div className="flex justify-end pt-2">
            <div className="w-full sm:w-72 space-y-2 text-xs">
              <div className="flex justify-between text-hai-charcoal">
                <span>Produce Value:</span>
                <span className="font-mono font-medium">₹{order.subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-hai-muted">
                <span>Cluster Logistics & Transit:</span>
                <span className="font-mono font-medium">₹{order.logisticsFee}</span>
              </div>
              <div className="flex justify-between text-hai-muted">
                <span>Grading, Sorting & Crating:</span>
                <span className="font-mono font-medium">₹{order.handlingFee}</span>
              </div>
              <div className="flex justify-between text-hai-muted">
                <span>GST (Fresh Unprocessed Produce):</span>
                <span className="font-mono font-medium">₹0.00 (Nil Exempt)</span>
              </div>
              <div className="flex justify-between text-sm font-black text-hai-forest pt-2 border-t-2 border-hai-forest">
                <span>Total Payable:</span>
                <span className="font-mono">₹{order.totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Notes and signatures */}
          <div className="pt-4 border-t border-hai-border text-[11px] text-hai-muted flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1 max-w-sm">
              <p>
                <strong>Terms:</strong> Standard inspection on delivery. Any shortage or physical damage must be reported within 2 hours of delivery receipt.
              </p>
              <p>Fresh vegetables are zero-rated under Indian GST law (HSN Code 0709).</p>
            </div>
            <div className="text-center sm:text-right">
              <div className="h-10 border-b border-dashed border-gray-400 w-36 mb-1"></div>
              <span className="text-[10px] uppercase font-bold text-hai-forest">
                For HAI Procurement Hub
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
