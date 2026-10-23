import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  Product,
  CartItem,
  Order,
  FarmerAvailabilityBatch,
  UserRole,
  QualityGrade,
  OrderStatus
} from '../types';
import { ALL_PRODUCTS } from '../data/catalogue';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  products: Product[];
  toggleProductAvailability: (productId: string) => void;
  updateProductPrice: (productId: string, newPrice: number | null) => void;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, grade?: QualityGrade) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartItemCount: number;
  cartTotalDemo: number;
  orders: Order[];
  createOrder: (orderData: Partial<Order>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, qcPassed?: boolean) => void;
  farmerBatches: FarmerAvailabilityBatch[];
  addFarmerBatch: (batch: Omit<FarmerAvailabilityBatch, 'id' | 'submittedAt' | 'status'>) => void;
  updateFarmerBatchStatus: (batchId: string, status: FarmerAvailabilityBatch['status']) => void;
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  selectedOrderForInvoice: Order | null;
  setSelectedOrderForInvoice: (order: Order | null) => void;
  toastMessage: string | null;
  showToast: (message: string) => void;
}

const INITIAL_ORDERS: Order[] = [
  {
    id: 'HAI-ORD-2026-108',
    buyerName: 'Sri Krishna Sweets & Restaurant Kitchen',
    businessType: 'Restaurant',
    contactPhone: '+91 94432 XXXXX',
    deliveryLocation: 'R.S. Puram, Coimbatore - 641002',
    deliverySlot: 'Early Morning (05:00 - 07:00 IST)',
    deliveryDate: '2026-10-23',
    items: [
      {
        productId: 'prod-tomato',
        productName: 'Tomato (Hybrid)',
        productNameTa: 'தக்காளி',
        unit: 'crate (25kg)',
        grade: 'Grade A (Premium Retail)',
        quantity: 4,
        unitPrice: 28 * 25, // 700 per crate
        totalPrice: 2800,
        sourcingOrigin: 'Local Farmer'
      },
      {
        productId: 'prod-shallots',
        productName: 'Small Onion / Shallots',
        productNameTa: 'சின்ன வெங்காயம்',
        unit: 'bag (50kg)',
        grade: 'Grade A (Premium Retail)',
        quantity: 2,
        unitPrice: 58 * 50, // 2900 per bag
        totalPrice: 5800,
        sourcingOrigin: 'Local Farmer'
      },
      {
        productId: 'prod-green-chilli',
        productName: 'Green Chilli',
        productNameTa: 'பச்சை மிளகாய்',
        unit: 'kg',
        grade: 'Grade A (Premium Retail)',
        quantity: 20,
        unitPrice: 45,
        totalPrice: 900,
        sourcingOrigin: 'Local Farmer'
      },
      {
        productId: 'supp-curry-leaves',
        productName: 'Curry Leaves',
        productNameTa: 'கறிவேப்பிலை',
        unit: 'kg',
        grade: 'Grade A (Premium Retail)',
        quantity: 5,
        unitPrice: 35,
        totalPrice: 175,
        sourcingOrigin: 'Wholesale Market'
      }
    ],
    subtotal: 9675,
    logisticsFee: 350,
    handlingFee: 120,
    tax: 0, // Fresh agricultural produce exempt under GST
    totalAmount: 10145,
    status: 'Delivered',
    paymentStatus: 'Paid (NEFT/UPI)',
    createdAt: '2026-10-22 18:40 IST',
    qcPassed: true,
    procurementCost: 8350,
    transportCost: 320,
    packagingCost: 180,
    labourCost: 220,
    spoilageBuffer: 95,
    grossContribution: 980
  },
  {
    id: 'HAI-ORD-2026-109',
    buyerName: 'PSG Institute Central Hostel Mess',
    businessType: 'Hostels and canteens',
    contactPhone: '+91 98941 XXXXX',
    deliveryLocation: 'Peelamedu, Coimbatore - 641004',
    deliverySlot: 'Morning Slot (06:30 - 08:30 IST)',
    deliveryDate: '2026-10-23',
    items: [
      {
        productId: 'prod-onion',
        productName: 'Onion (Bellary)',
        productNameTa: 'வெங்காயம்',
        unit: 'bag (50kg)',
        grade: 'Grade B (Kitchen/Canteen)',
        quantity: 4,
        unitPrice: 42 * 50,
        totalPrice: 8400,
        sourcingOrigin: 'Mixed'
      },
      {
        productId: 'prod-cabbage',
        productName: 'Cabbage',
        productNameTa: 'முட்டைக்கோஸ்',
        unit: 'kg',
        grade: 'Standard Commercial',
        quantity: 150,
        unitPrice: 20,
        totalPrice: 3000,
        sourcingOrigin: 'Mixed'
      },
      {
        productId: 'prod-bottle-gourd',
        productName: 'Bottle Gourd',
        productNameTa: 'சுரைக்காய்',
        unit: 'piece',
        grade: 'Standard Commercial',
        quantity: 40,
        unitPrice: 20,
        totalPrice: 800,
        sourcingOrigin: 'Local Farmer'
      }
    ],
    subtotal: 12200,
    logisticsFee: 450,
    handlingFee: 180,
    tax: 0,
    totalAmount: 12830,
    status: 'Packed & Dispatched',
    paymentStatus: 'Net-15 Invoice',
    createdAt: '2026-10-23 04:15 IST',
    qcPassed: true,
    procurementCost: 10600,
    transportCost: 400,
    packagingCost: 210,
    labourCost: 250,
    spoilageBuffer: 120,
    grossContribution: 1250
  },
  {
    id: 'HAI-ORD-2026-110',
    buyerName: 'Green Mart Organic & Fresh Store',
    businessType: 'Supermarkets',
    contactPhone: '+91 97899 XXXXX',
    deliveryLocation: 'Avinashi Road, Tiruppur - 641602',
    deliverySlot: 'Afternoon Slot (13:00 - 15:00 IST)',
    deliveryDate: '2026-10-23',
    items: [
      {
        productId: 'prod-spinach',
        productName: 'Spinach (Palak)',
        productNameTa: 'பசலைக்கீரை',
        unit: 'bunch',
        grade: 'Grade A (Premium Retail)',
        quantity: 60,
        unitPrice: 12,
        totalPrice: 720,
        sourcingOrigin: 'Local Farmer'
      },
      {
        productId: 'prod-amaranth-greens',
        productName: 'Amaranth Greens',
        productNameTa: 'அரைக்கீரை',
        unit: 'bunch',
        grade: 'Grade A (Premium Retail)',
        quantity: 50,
        unitPrice: 10,
        totalPrice: 500,
        sourcingOrigin: 'Local Farmer'
      },
      {
        productId: 'prod-drumstick',
        productName: 'Drumstick Pods',
        productNameTa: 'முருங்கைக்காய்',
        unit: 'kg',
        grade: 'Grade A (Premium Retail)',
        quantity: 30,
        unitPrice: 48,
        totalPrice: 1440,
        sourcingOrigin: 'Local Farmer'
      }
    ],
    subtotal: 2660,
    logisticsFee: 180,
    handlingFee: 60,
    tax: 0,
    totalAmount: 2900,
    status: 'Quality Inspected',
    paymentStatus: 'Pending',
    createdAt: '2026-10-23 06:10 IST',
    qcPassed: true,
    procurementCost: 2280,
    transportCost: 150,
    packagingCost: 90,
    labourCost: 80,
    spoilageBuffer: 30,
    grossContribution: 270
  }
];

const INITIAL_FARMER_BATCHES: FarmerAvailabilityBatch[] = [
  {
    id: 'FARM-BATCH-501',
    farmerName: 'K. Muthusamy',
    phone: '+91 98421 XXXXX',
    catchment: 'Chandrapuram Catchment (641669)',
    village: 'Varapatti',
    cropEn: 'Tomato (Country variety)',
    cropTa: 'நாட்டுத் தக்காளி',
    estimatedQuantityKg: 650,
    harvestDate: '2026-10-24',
    grade: 'Grade A (Premium Retail)',
    expectedPricePerKg: 24,
    preferredContact: 'Phone Call',
    status: 'Accepted for Collection',
    submittedAt: '2026-10-23 07:15 IST'
  },
  {
    id: 'FARM-BATCH-502',
    farmerName: 'S. Ramasamy Gounder',
    phone: '+91 97873 XXXXX',
    catchment: 'Pethappampatti Catchment (642205)',
    village: 'Somavarapatti',
    cropEn: 'Small Onion / Shallots',
    cropTa: 'சின்ன வெங்காயம்',
    estimatedQuantityKg: 1200,
    harvestDate: '2026-10-25',
    grade: 'Grade A (Premium Retail)',
    expectedPricePerKg: 52,
    preferredContact: 'WhatsApp',
    status: 'Pending Verification',
    submittedAt: '2026-10-23 08:30 IST'
  },
  {
    id: 'FARM-BATCH-503',
    farmerName: 'P. Selvi & Family',
    phone: '+91 99440 XXXXX',
    catchment: 'Chandrapuram Catchment (641669)',
    village: 'Sultanpet',
    cropEn: 'Amaranth & Palak Greens',
    cropTa: 'கீரை வகைகள்',
    estimatedQuantityKg: 350,
    harvestDate: '2026-10-23',
    grade: 'Grade A (Premium Retail)',
    expectedPricePerKg: 8.5,
    preferredContact: 'Field Coordinator Visit',
    status: 'Weighed & Received',
    submittedAt: '2026-10-23 05:45 IST',
    weighedQuantityKg: 342,
    paymentAmount: 2907,
    paymentRef: 'UPI-NEFT-90218'
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [products, setProducts] = useState<Product[]>(ALL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [farmerBatches, setFarmerBatches] = useState<FarmerAvailabilityBatch[]>(INITIAL_FARMER_BATCHES);
  const [activeRole, setActiveRole] = useState<UserRole>('visitor');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [selectedOrderForInvoice, setSelectedOrderForInvoice] = useState<Order | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Show Toast helper
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Toggle product availability in memory
  const toggleProductAvailability = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const newStatus = p.status === 'Available' ? 'Limited Availability' : 'Available';
          return { ...p, status: newStatus, lastUpdated: 'Just now (Admin)' };
        }
        return p;
      })
    );
    showToast('Product availability updated.');
  };

  // Update product price
  const updateProductPrice = (productId: string, newPrice: number | null) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          return {
            ...p,
            demoPrice: newPrice,
            status: newPrice === null ? 'Price on Request' : p.status,
            lastUpdated: 'Just now (Admin Override)'
          };
        }
        return p;
      })
    );
    showToast('Product price benchmark updated.');
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1, grade: QualityGrade = 'Grade A (Premium Retail)') => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id && item.selectedGrade === grade);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.selectedGrade === grade
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, selectedGrade: grade }];
    });
    showToast(`Added ${product.nameEn} to your procurement basket.`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartTotalDemo = cart.reduce((sum, item) => {
    const unitPrice = item.product.demoPrice || 0;
    // Calculate approximate weight or unit multiplier
    let multiplier = 1;
    if (item.product.unit.includes('25kg')) multiplier = 25;
    if (item.product.unit.includes('50kg')) multiplier = 50;
    return sum + unitPrice * multiplier * item.quantity;
  }, 0);

  // Order submission
  const createOrder = (orderData: Partial<Order>): Order => {
    const newId = `HAI-ORD-2026-${Math.floor(100 + Math.random() * 900)}`;
    const subtotal = orderData.subtotal || cartTotalDemo;
    const logistics = 300;
    const handling = 100;
    const totalAmount = subtotal + logistics + handling;

    const newOrder: Order = {
      id: newId,
      buyerName: orderData.buyerName || 'Demo Commercial Buyer',
      businessType: orderData.businessType || 'Restaurant',
      contactPhone: orderData.contactPhone || '+91 90000 00000',
      deliveryLocation: orderData.deliveryLocation || 'Coimbatore Central Hub',
      deliverySlot: orderData.deliverySlot || 'Morning Slot (06:00 - 08:00 IST)',
      deliveryDate: orderData.deliveryDate || new Date().toISOString().split('T')[0],
      items:
        orderData.items ||
        cart.map((c) => ({
          productId: c.product.id,
          productName: c.product.nameEn,
          productNameTa: c.product.nameTa,
          unit: c.product.unit,
          grade: c.selectedGrade,
          quantity: c.quantity,
          unitPrice: (c.product.demoPrice || 25) * (c.product.unit.includes('25kg') ? 25 : c.product.unit.includes('50kg') ? 50 : 1),
          totalPrice:
            (c.product.demoPrice || 25) *
            (c.product.unit.includes('25kg') ? 25 : c.product.unit.includes('50kg') ? 50 : 1) *
            c.quantity,
          sourcingOrigin: c.product.sourcingCategory
        })),
      subtotal,
      logisticsFee: logistics,
      handlingFee: handling,
      tax: 0,
      totalAmount,
      status: 'Submitted',
      paymentStatus: 'Pending',
      createdAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
      qcPassed: false,
      procurementCost: Math.round(subtotal * 0.82),
      transportCost: 260,
      packagingCost: 110,
      labourCost: 140,
      spoilageBuffer: Math.round(subtotal * 0.02),
      grossContribution: Math.round(totalAmount - subtotal * 0.82 - 260 - 110 - 140)
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    showToast(`Order #${newId} placed successfully!`);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, qcPassed?: boolean) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          return {
            ...ord,
            status,
            qcPassed: qcPassed !== undefined ? qcPassed : ord.qcPassed
          };
        }
        return ord;
      })
    );
    showToast(`Order ${orderId} updated to ${status}.`);
  };

  // Farmer batches
  const addFarmerBatch = (batch: Omit<FarmerAvailabilityBatch, 'id' | 'submittedAt' | 'status'>) => {
    const newBatch: FarmerAvailabilityBatch = {
      ...batch,
      id: `FARM-BATCH-${Math.floor(600 + Math.random() * 400)}`,
      submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
      status: 'Pending Verification'
    };
    setFarmerBatches((prev) => [newBatch, ...prev]);
    showToast('Harvest availability recorded. Our field officer will contact you.');
  };

  const updateFarmerBatchStatus = (batchId: string, status: FarmerAvailabilityBatch['status']) => {
    setFarmerBatches((prev) =>
      prev.map((b) => (b.id === batchId ? { ...b, status } : b))
    );
    showToast(`Batch ${batchId} status updated to ${status}.`);
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        activeTab,
        setActiveTab,
        products,
        toggleProductAvailability,
        updateProductPrice,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartItemCount,
        cartTotalDemo,
        orders,
        createOrder,
        updateOrderStatus,
        farmerBatches,
        addFarmerBatch,
        updateFarmerBatchStatus,
        activeRole,
        setActiveRole,
        isCartOpen,
        setIsCartOpen,
        selectedOrderForInvoice,
        setSelectedOrderForInvoice,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
