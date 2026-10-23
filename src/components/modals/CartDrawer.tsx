import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { QualityGrade } from '../../types';
import { X, Trash2, ArrowRight, ShieldCheck, Truck, ShoppingCart, Store } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartTotalDemo,
    createOrder,
    setActiveTab,
    language
  } = useApp();

  const [buyerName, setBuyerName] = useState('');
  const [businessType, setBusinessType] = useState('Restaurant');
  const [phone, setPhone] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [deliverySlot, setDeliverySlot] = useState('Early Morning (05:30 - 07:30 IST)');
  const [deliveryDate, setDeliveryDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [targetPriceNote, setTargetPriceNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCartOpen) return null;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    if (!buyerName.trim() || !phone.trim() || !deliveryLocation.trim()) {
      alert(language === 'en' ? 'Please complete required buyer contact fields.' : 'தயவுசெய்து அனைத்து விவரங்களையும் பூர்த்தி செய்யவும்.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const order = createOrder({
        buyerName,
        businessType,
        contactPhone: phone,
        deliveryLocation,
        deliverySlot,
        deliveryDate,
        notes: targetPriceNote
      });
      setIsSubmitting(false);
      setIsCartOpen(false);
      setActiveTab('buyers');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-hai-border flex items-center justify-between bg-hai-offwhite">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-hai-forest" />
            <h3 className="font-bold text-lg text-hai-forest">
              {language === 'en' ? 'Consolidated Procurement Basket' : 'ஒருங்கிணைந்த கொள்முதல் கூடை'}
            </h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-hai-charcoal" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <ShoppingCart className="w-12 h-12 text-hai-muted/40 mx-auto" />
              <p className="text-hai-charcoal font-medium">
                {language === 'en' ? 'Your basket is currently empty.' : 'கூடை தற்போது காலியாக உள்ளது.'}
              </p>
              <p className="text-xs text-hai-muted max-w-xs mx-auto">
                {language === 'en'
                  ? 'Browse the produce catalogue to select fresh farm produce or wholesale supplements.'
                  : 'காய்கறி பட்டியலிலிருந்து புதிய விளைபொருட்களை தேர்வு செய்து சேர்க்கவும்.'}
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setActiveTab('catalogue');
                }}
                className="mt-4 px-4 py-2 bg-hai-forest text-white text-xs font-semibold rounded-md hover:bg-hai-agri transition-colors"
              >
                {language === 'en' ? 'Explore Catalogue' : 'பட்டியலை பார்க்க'}
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                {cart.map((item) => {
                  const unitPrice = item.product.demoPrice || 0;
                  const unitMultiplier = item.product.unit.includes('25kg')
                    ? 25
                    : item.product.unit.includes('50kg')
                    ? 50
                    : 1;
                  const lineTotal = unitPrice * unitMultiplier * item.quantity;

                  return (
                    <div
                      key={item.product.id}
                      className="p-3.5 bg-hai-offwhite rounded-lg border border-hai-border flex items-center justify-between gap-3"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-hai-forest truncate">
                            {item.product.nameEn}
                          </h4>
                          <span className="text-xs text-hai-muted">({item.product.nameTa})</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-hai-charcoal mt-1">
                          <span className="bg-white px-2 py-0.5 rounded border border-hai-border text-[11px]">
                            {item.selectedGrade}
                          </span>
                          <span className="text-hai-muted">
                            Unit: {item.product.unit} @ ₹{unitPrice || 'Request'}/kg
                          </span>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center border border-hai-border bg-white rounded-md overflow-hidden">
                          <button
                            type="button"
                            onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                            className="px-2.5 py-1 text-sm font-bold text-hai-charcoal hover:bg-hai-leaf cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-2.5 py-1 text-xs font-semibold min-w-7 text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                            className="px-2.5 py-1 text-sm font-bold text-hai-charcoal hover:bg-hai-leaf cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-right min-w-18">
                          <p className="text-xs font-bold text-hai-forest">₹{lineTotal.toLocaleString('en-IN')}</p>
                          <span className="text-[10px] text-hai-muted">demo est.</span>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Order Checkout Form */}
              <form onSubmit={handleCheckout} className="pt-4 border-t border-hai-border space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-hai-forest">
                  {language === 'en' ? 'Buyer & Delivery Logistics' : 'டெலிவரி மற்றும் வாங்குபவர் விவரங்கள்'}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-hai-charcoal font-medium mb-1">
                      Business or Buyer Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Annapoorna Kitchen / Green Supermarket"
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      className="w-full px-3 py-2 rounded border border-hai-border focus:border-hai-agri focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-hai-charcoal font-medium mb-1">
                      Business Type *
                    </label>
                    <select
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value)}
                      className="w-full px-3 py-2 rounded border border-hai-border focus:border-hai-agri focus:outline-none bg-white"
                    >
                      <option value="Restaurant">Hotel / Restaurant</option>
                      <option value="Supermarket">Supermarket / Retail Store</option>
                      <option value="Vegetable Shop">Local Vegetable Shop</option>
                      <option value="Hostels and canteens">Hostel / Canteen / Institution</option>
                      <option value="Apartment Community">Apartment / Gated Community</option>
                      <option value="Household">Individual Household Buyer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-hai-charcoal font-medium mb-1">
                      Contact Phone (for delivery SMS/Call) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 9XXXX XXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded border border-hai-border focus:border-hai-agri focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-hai-charcoal font-medium mb-1">
                      Requested Delivery Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="w-full px-3 py-2 rounded border border-hai-border focus:border-hai-agri focus:outline-none"
                    />
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block text-hai-charcoal font-medium mb-1">
                    Delivery Slot *
                  </label>
                  <select
                    value={deliverySlot}
                    onChange={(e) => setDeliverySlot(e.target.value)}
                    className="w-full px-3 py-2 rounded border border-hai-border focus:border-hai-agri focus:outline-none bg-white"
                  >
                    <option value="Early Morning (05:00 - 07:00 IST)">
                      Early Morning Slot (05:00 - 07:00 IST) — Recommended for Hotels & Kitchens
                    </option>
                    <option value="Morning Slot (07:30 - 09:30 IST)">
                      Morning Slot (07:30 - 09:30 IST) — Retail & Supermarkets
                    </option>
                    <option value="Afternoon Slot (13:00 - 15:00 IST)">
                      Afternoon Slot (13:00 - 15:00 IST) — Evening Prep
                    </option>
                  </select>
                </div>

                <div className="text-xs">
                  <label className="block text-hai-charcoal font-medium mb-1">
                    Delivery Location / Full Address *
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Enter store/kitchen address in Coimbatore, Tiruppur, or nearby hubs"
                    value={deliveryLocation}
                    onChange={(e) => setDeliveryLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded border border-hai-border focus:border-hai-agri focus:outline-none"
                  />
                </div>

                <div className="text-xs">
                  <label className="block text-hai-charcoal font-medium mb-1">
                    Target Budget / Quality Notes (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Need firm tomatoes for slicing; prefer Kundadam small onions"
                    value={targetPriceNote}
                    onChange={(e) => setTargetPriceNote(e.target.value)}
                    className="w-full px-3 py-2 rounded border border-hai-border focus:border-hai-agri focus:outline-none"
                  />
                </div>

                {/* Price Breakdown */}
                <div className="bg-hai-leaf/40 p-3 rounded-lg border border-hai-border space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-hai-charcoal">Produce Subtotal (Demo Prices):</span>
                    <span className="font-semibold">₹{cartTotalDemo.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-hai-muted">
                    <span>Cluster Logistics Fee:</span>
                    <span>₹300</span>
                  </div>
                  <div className="flex justify-between text-hai-muted">
                    <span>Quality Grading & Packing:</span>
                    <span>₹100</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm text-hai-forest pt-1.5 border-t border-hai-border">
                    <span>Estimated Total Landed:</span>
                    <span>₹{(cartTotalDemo + 400).toLocaleString('en-IN')}</span>
                  </div>
                  <p className="text-[10px] text-hai-muted pt-1">
                    * Fresh agricultural produce is exempt from GST. Final invoice reflects confirmed harvest weighing.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-hai-forest text-white rounded-lg font-bold text-sm hover:bg-hai-agri transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Processing Order...</span>
                  ) : (
                    <>
                      <span>Submit Consolidated Order</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
