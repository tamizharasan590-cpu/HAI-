export type Language = 'en' | 'ta';

export type UserRole = 'visitor' | 'farmer' | 'buyer' | 'admin' | 'sourcing_officer' | 'qc_inspector';

export type SourcingCategory = 'Local Farmer' | 'Wholesale Market' | 'Mixed';

export type ProductStatus = 'Available' | 'Limited Availability' | 'Season Ending' | 'Upcoming Harvest' | 'Price on Request';

export type QualityGrade = 'Grade A (Premium Retail)' | 'Grade B (Kitchen/Canteen)' | 'Standard Commercial';

export interface Product {
  id: string;
  nameEn: string;
  nameTa: string;
  category: 'Vegetables' | 'Greens / Keerai' | 'Roots & Tubers' | 'Gourds' | 'Wholesale Supplementary';
  unit: 'kg' | 'crate (25kg)' | 'bunch' | 'piece' | 'bag (50kg)';
  grade: QualityGrade;
  status: ProductStatus;
  sourcingCategory: SourcingCategory;
  demoPrice: number | null; // null represents 'Price on Request'
  lastUpdated: string;
  minOrderQty: number;
  seasonality: 'Year-round' | 'Peak (Winter)' | 'Peak (Monsoon)' | 'Peak (Summer)' | 'Seasonal';
  isExcludedCheck?: boolean; // safeguard
  descriptionEn: string;
  descriptionTa: string;
}

export interface Village {
  name: string;
  tamilName?: string;
  status: 'Proposed Catchment' | 'Field Survey Pending' | 'Active Collection Point';
  distanceKm: number;
  soilOrProduceNotes?: string;
}

export interface CatchmentArea {
  id: string;
  name: string;
  pinCode: string;
  district: string;
  hubLocation: string;
  villages: Village[];
  description: string;
}

export interface WholesaleMarketHub {
  id: string;
  name: string;
  location: string;
  district: string;
  type: 'Wholesale APMC / Daily Market';
  estimatedTransitTime: string;
  role: 'Emergency Buffer & Variety Fulfilment';
}

export interface MarketPriceRecord {
  id: string;
  product: string;
  productTa: string;
  marketName: string;
  district: string;
  date: string;
  unit: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  dataSource: string;
  updateStatus: 'Verified Market Committee Feed' | 'Illustrative Demo Data';
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedGrade: QualityGrade;
  targetPriceNote?: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productNameTa: string;
  unit: string;
  grade: QualityGrade;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  sourcingOrigin: SourcingCategory;
}

export type OrderStatus =
  | 'Submitted'
  | 'Sourcing Confirmed'
  | 'Collected & Weighed'
  | 'Quality Inspected'
  | 'Packed & Dispatched'
  | 'Delivered'
  | 'Completed'
  | 'Disputed';

export interface Order {
  id: string;
  buyerName: string;
  businessType: string;
  contactPhone: string;
  deliveryLocation: string;
  deliverySlot: string;
  deliveryDate: string;
  items: OrderItem[];
  subtotal: number;
  logisticsFee: number;
  handlingFee: number;
  tax: number;
  totalAmount: number;
  status: OrderStatus;
  paymentStatus: 'Pending' | 'Paid (NEFT/UPI)' | 'Net-15 Invoice' | 'Reconciled';
  createdAt: string;
  qcPassed: boolean;
  notes?: string;
  // Unit economics breakdown
  procurementCost?: number;
  transportCost?: number;
  packagingCost?: number;
  labourCost?: number;
  spoilageBuffer?: number;
  grossContribution?: number;
}

export interface FarmerAvailabilityBatch {
  id: string;
  farmerName: string;
  phone: string;
  catchment: string;
  village: string;
  cropEn: string;
  cropTa: string;
  estimatedQuantityKg: number;
  harvestDate: string;
  grade: QualityGrade;
  expectedPricePerKg: number;
  preferredContact: 'Phone Call' | 'WhatsApp' | 'Field Coordinator Visit';
  status: 'Pending Verification' | 'Accepted for Collection' | 'Weighed & Received' | 'Payment Processed';
  submittedAt: string;
  weighedQuantityKg?: number;
  paymentAmount?: number;
  paymentRef?: string;
}

export interface ResearchStudy {
  id: string;
  number: number;
  title: string;
  publicationYear: number;
  authorsOrOrg: string;
  sourceUrl: string;
  doiOrRef: string;
  geographicalScope: string;
  keyFinding: string;
  whatThisMeansForHai: string;
  caveatNote: string;
  category: 'Price Instability' | 'ICT Access' | 'Post-Harvest Losses' | 'Government Initiatives' | 'Direct Marketing';
}
