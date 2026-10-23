-- ==============================================================================
-- HAI — HUMAN AGRI INTELLIGENCE
-- Production Relational Database Schema (PostgreSQL / Supabase Compatible)
-- Initial Geography: Tamil Nadu, India (Chandrapuram, Pethappampatti, Oddanchatram)
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. ENUMS
CREATE TYPE user_role AS ENUM (
  'visitor',
  'farmer',
  'buyer',
  'admin',
  'sourcing_officer',
  'qc_inspector',
  'logistics_driver'
);

CREATE TYPE sourcing_origin AS ENUM (
  'Local Farmer',
  'Wholesale Market',
  'Mixed'
);

CREATE TYPE quality_grade AS ENUM (
  'Grade A (Premium Retail)',
  'Grade B (Kitchen/Canteen)',
  'Standard Commercial'
);

CREATE TYPE order_status AS ENUM (
  'Submitted',
  'Sourcing Confirmed',
  'Collected & Weighed',
  'Quality Inspected',
  'Packed & Dispatched',
  'Delivered',
  'Completed',
  'Disputed'
);

CREATE TYPE payment_status AS ENUM (
  'Pending',
  'Paid (NEFT/UPI)',
  'Net-15 Invoice',
  'Reconciled'
);

-- 3. CORE ENTITIES

-- 1. Users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone VARCHAR(20) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE,
  full_name VARCHAR(150) NOT NULL,
  role user_role DEFAULT 'visitor',
  preferred_language VARCHAR(5) DEFAULT 'en', -- 'en' or 'ta'
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. FarmerProfiles
CREATE TABLE farmer_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  catchment_pin VARCHAR(10) NOT NULL, -- e.g. '641669' (Chandrapuram) or '642205' (Pethappampatti)
  village_name VARCHAR(100) NOT NULL,
  total_acreage NUMERIC(6, 2),
  primary_crops TEXT[], -- Array of crops, e.g. ['Tomato', 'Small Onion', 'Chilli']
  preferred_contact_method VARCHAR(30) DEFAULT 'Phone Call',
  bank_account_number VARCHAR(50),
  bank_ifsc VARCHAR(20),
  upi_vpa VARCHAR(100),
  verified_by_field_officer BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. BuyerProfiles
CREATE TABLE buyer_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  business_name VARCHAR(200) NOT NULL,
  business_type VARCHAR(50) NOT NULL, -- 'Restaurant', 'Supermarket', 'Hostel', 'Institution'
  gstin VARCHAR(20),
  delivery_address TEXT NOT NULL,
  city VARCHAR(100) DEFAULT 'Coimbatore',
  preferred_delivery_slot VARCHAR(50) DEFAULT 'Early Morning (05:00 - 07:00 IST)',
  credit_terms VARCHAR(30) DEFAULT 'Prepaid/Delivery COD',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Suppliers (Wholesale APMC buffer traders)
CREATE TABLE suppliers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  supplier_name VARCHAR(150) NOT NULL,
  mandi_location VARCHAR(100) NOT NULL, -- 'Oddanchatram', 'Tiruppur', 'Coimbatore'
  contact_phone VARCHAR(20) NOT NULL,
  trade_type VARCHAR(50) DEFAULT 'Wholesale Buffer',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. ProductCategories
CREATE TABLE product_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en VARCHAR(100) NOT NULL,
  name_ta VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  display_order INT DEFAULT 0
);

-- 6. Products (With dual English/Tamil and Exclusions Safeguard)
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES product_categories(id),
  name_en VARCHAR(150) NOT NULL,
  name_ta VARCHAR(150) NOT NULL,
  unit_of_sale VARCHAR(50) NOT NULL, -- 'kg', 'crate (25kg)', 'bag (50kg)', 'bunch', 'piece'
  default_grade quality_grade DEFAULT 'Grade A (Premium Retail)',
  sourcing_category sourcing_origin DEFAULT 'Local Farmer',
  benchmark_price NUMERIC(10, 2), -- Can be NULL for 'Price on Request'
  is_price_on_request BOOLEAN DEFAULT FALSE,
  min_order_qty NUMERIC(8, 2) DEFAULT 10,
  seasonality VARCHAR(50) DEFAULT 'Year-round',
  is_available BOOLEAN DEFAULT TRUE,
  is_excluded_from_local_catalogue BOOLEAN DEFAULT FALSE, -- Guards against Potato/Beans/Carrot
  description_en TEXT,
  description_ta TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. FarmerAvailability (Upcoming harvest submissions)
CREATE TABLE farmer_availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id UUID REFERENCES farmer_profiles(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  estimated_quantity_kg NUMERIC(10, 2) NOT NULL,
  harvest_date DATE NOT NULL,
  grade quality_grade DEFAULT 'Grade A (Premium Retail)',
  expected_price_per_kg NUMERIC(8, 2),
  status VARCHAR(40) DEFAULT 'Pending Verification', -- 'Accepted', 'Weighed', 'Cancelled'
  verified_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. MarketPriceRecords (Regulated Mandi daily bulletins)
CREATE TABLE market_price_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id),
  market_name VARCHAR(100) NOT NULL, -- e.g. 'Oddanchatram APMC', 'Coimbatore MGR'
  district VARCHAR(100) NOT NULL,
  price_date DATE NOT NULL,
  unit VARCHAR(20) DEFAULT 'kg',
  min_price NUMERIC(8, 2) NOT NULL,
  max_price NUMERIC(8, 2) NOT NULL,
  modal_price NUMERIC(8, 2) NOT NULL,
  data_source VARCHAR(150) NOT NULL,
  is_demo_data BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Orders
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number VARCHAR(50) UNIQUE NOT NULL, -- e.g. 'HAI-ORD-2026-108'
  buyer_id UUID REFERENCES buyer_profiles(id),
  delivery_address TEXT NOT NULL,
  delivery_slot VARCHAR(60) NOT NULL,
  scheduled_delivery_date DATE NOT NULL,
  subtotal_amount NUMERIC(12, 2) NOT NULL,
  logistics_fee NUMERIC(8, 2) DEFAULT 300,
  handling_fee NUMERIC(8, 2) DEFAULT 100,
  tax_amount NUMERIC(8, 2) DEFAULT 0, -- Fresh unprocessed produce exempt under GST
  total_landed_amount NUMERIC(12, 2) NOT NULL,
  status order_status DEFAULT 'Submitted',
  payment_status payment_status DEFAULT 'Pending',
  qc_passed BOOLEAN DEFAULT FALSE,
  notes TEXT,
  -- Unit economics auditing
  procurement_cost NUMERIC(12, 2),
  transport_cost NUMERIC(8, 2),
  packaging_cost NUMERIC(8, 2),
  labour_cost NUMERIC(8, 2),
  spoilage_buffer NUMERIC(8, 2),
  gross_contribution NUMERIC(12, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. OrderItems
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  grade quality_grade NOT NULL,
  quantity NUMERIC(10, 2) NOT NULL,
  unit_of_measure VARCHAR(30) NOT NULL,
  unit_price NUMERIC(10, 2) NOT NULL,
  total_price NUMERIC(12, 2) NOT NULL,
  sourcing_origin sourcing_origin NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. ProcurementRecords (Physical collection & weighing)
CREATE TABLE procurement_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id),
  farmer_availability_id UUID REFERENCES farmer_availability(id),
  supplier_id UUID REFERENCES suppliers(id),
  sourcing_type sourcing_origin NOT NULL,
  village_hub VARCHAR(100),
  gross_weight_kg NUMERIC(10, 2) NOT NULL,
  tare_weight_kg NUMERIC(10, 2) NOT NULL, -- Standard crate tare 2.0 kg
  net_weight_kg NUMERIC(10, 2) NOT NULL,
  agreed_rate_per_kg NUMERIC(8, 2) NOT NULL,
  total_farmer_payout NUMERIC(12, 2) NOT NULL,
  electronic_weigh_slip_id VARCHAR(50),
  collected_by UUID REFERENCES users(id),
  collected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 12. QualityInspections (Grading & Blemish QC)
CREATE TABLE quality_inspections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  procurement_record_id UUID REFERENCES procurement_records(id),
  inspector_id UUID REFERENCES users(id),
  certified_grade quality_grade NOT NULL,
  defect_percentage NUMERIC(5, 2) DEFAULT 0,
  crates_count INT NOT NULL,
  is_approved BOOLEAN DEFAULT TRUE,
  rejection_reason TEXT,
  inspected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 13. Deliveries
CREATE TABLE deliveries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id),
  driver_id UUID REFERENCES users(id),
  vehicle_number VARCHAR(30),
  dispatched_at TIMESTAMP WITH TIME ZONE,
  delivered_at TIMESTAMP WITH TIME ZONE,
  recipient_name VARCHAR(100),
  recipient_signature_url TEXT,
  delivery_notes TEXT
);

-- 14. Invoices
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_number VARCHAR(50) UNIQUE NOT NULL,
  order_id UUID REFERENCES orders(id),
  buyer_id UUID REFERENCES buyer_profiles(id),
  total_taxable_value NUMERIC(12, 2) NOT NULL,
  hsn_code VARCHAR(20) DEFAULT '0709', -- Edible vegetables & fresh roots
  gst_rate NUMERIC(4, 2) DEFAULT 0, -- Exempt
  final_amount NUMERIC(12, 2) NOT NULL,
  due_date DATE,
  pdf_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 15. Payments
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id),
  invoice_id UUID REFERENCES invoices(id),
  amount NUMERIC(12, 2) NOT NULL,
  payment_method VARCHAR(50), -- 'NEFT', 'UPI', 'Net Banking'
  transaction_ref VARCHAR(100),
  status VARCHAR(30) DEFAULT 'Completed',
  paid_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 16. Forecasts
CREATE TABLE forecasts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id),
  forecast_date DATE NOT NULL,
  predicted_demand_kg NUMERIC(10, 2) NOT NULL,
  predicted_modal_price NUMERIC(8, 2),
  confidence_score NUMERIC(5, 2), -- 0 to 100%
  admin_override BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 17. Notifications
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  channel VARCHAR(30) DEFAULT 'SMS', -- 'SMS', 'WhatsApp', 'Push'
  title VARCHAR(150) NOT NULL,
  content TEXT NOT NULL,
  is_sent BOOLEAN DEFAULT FALSE,
  sent_at TIMESTAMP WITH TIME ZONE
);

-- 18. SupportTickets (Disputes & Inquiries)
CREATE TABLE support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  order_id UUID REFERENCES orders(id),
  issue_category VARCHAR(60) NOT NULL,
  description TEXT NOT NULL,
  status VARCHAR(30) DEFAULT 'Open', -- 'Investigating', 'Credit Issued', 'Resolved'
  credit_adjustment_amount NUMERIC(8, 2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  resolved_at TIMESTAMP WITH TIME ZONE
);

-- 19. AuditLogs
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  action_type VARCHAR(100) NOT NULL, -- e.g. 'PRODUCT_PRICE_OVERRIDE', 'STATUS_CHANGE'
  entity_name VARCHAR(100) NOT NULL,
  entity_id UUID,
  details JSONB,
  ip_address VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE farmer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE buyer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Public can view available products
CREATE POLICY "Public products viewable" ON products
  FOR SELECT USING (is_available = true);

-- Authenticated admins have full privileges
CREATE POLICY "Admins full access on orders" ON orders
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Buyers can only view their own orders
CREATE POLICY "Buyers view own orders" ON orders
  FOR SELECT USING (auth.uid() = buyer_id);

-- Farmers can view their own availability batches
CREATE POLICY "Farmers view own availability" ON farmer_availability
  FOR ALL USING (auth.uid() = farmer_id);
