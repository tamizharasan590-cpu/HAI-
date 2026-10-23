# HAI — Human Agri Intelligence
> **"Connecting Farmers to a Better Market."**  
> *Farm-to-Market Agricultural Supply Chain, Procurement & Market Intelligence Platform*

---

## 1. Startup Identity & Executive Overview
- **Brand Name**: HAI
- **Full Form**: Human Agri Intelligence
- **Industry**: Agritech, B2B & Bulk Agricultural Marketplace, Supply Chain Coordination & Intelligence
- **Initial Geography**: Tamil Nadu, India (Focus: Chandrapuram PIN `641669` and Pethappampatti PIN `642205`)
- **Supplementary Wholesale Hubs**: Oddanchatram, Tiruppur, Coimbatore
- **Primary Value Proposition**: Connects nearby farmers directly with commercial buyers (restaurants, supermarkets, canteens, hostels, and shops) through coordinated aggregation, certified digital weighing, defined Grade A/B sorting, and market price benchmarking.

---

## 2. Official Brand Logo Integration
The official HAI logo provided by the brand has been integrated across all assets:
- **Primary Logo**: [`public/hai-logo.png`](file:///d:/hai/public/hai-logo.png)
- **Favicon**: Configured in [`index.html`](file:///d:/hai/index.html)
- **Component**: [`src/components/common/HaiLogo.tsx`](file:///d:/hai/src/components/common/HaiLogo.tsx) featuring responsive sizing (`sm`, `md`, `lg`, `xl`) and adaptive contrast for both light headers and dark footers/cards.

---

## 3. Technology Stack
- **Framework**: React 18 + Vite + TypeScript (ESNext)
- **Styling**: Tailwind CSS with custom HAI palette:
  - Forest Green: `#174A32`
  - Fresh Agri Green: `#2E8B57`
  - Soft Leaf Green: `#E8F3E8`
  - Warm Off-White: `#FAFAF5`
  - Charcoal: `#26332D`
  - Earth Accent: `#B77A43`
- **Iconography**: Lucide React
- **Typography**: Google Fonts — *Inter* (English) and *Noto Sans Tamil* (Tamil script)
- **Database Schema**: PostgreSQL / Supabase Relational Schema in [`supabase/schema.sql`](file:///d:/hai/supabase/schema.sql) covering 19 entities with Row-Level Security (RLS).

---

## 4. Key Pages & Features

1. **Home Page (`/`)**:
   - Hero: *"Connecting Farmers to a Better Market."*
   - Visual 4-step farm-to-market operational timeline.
   - Three core challenges: Vegetable price uncertainty, limited ICT market information, and post-harvest losses.
   - HAI solution architecture & mutual benefits comparison tabs.
   - Featured produce preview with dual English/Tamil titles and live availability tags.
   - Evidence preview citing 5 peer-reviewed studies and government frameworks.

2. **How It Works**:
   - Visual 8-step operating sequence from buyer requirement submission to demand planning.
   - Clear protocol for wholesale market buffering (Oddanchatram / Tiruppur / Coimbatore) during seasonal shortages.
   - Grade A (Retail display) vs. Grade B (Kitchen prep) grading specifications.

3. **For Farmers**:
   - Simple mobile-friendly vernacular interface with Tamil language toggle (`தமிழ்`).
   - Harvest availability registration form with village selector from 69 local clusters.
   - Electronic weighing protocol: certified digital platform scales, zero tare deduction, printed/SMS weigh slips.
   - Live batch tracker with disbursement statuses (NEFT/UPI).
   - Low-connectivity phone/WhatsApp workflow.
   - Comprehensive FAQ accordion.

4. **For Business Buyers (Procurement Portal)**:
   - Dedicated portal for restaurants, supermarkets, canteens, hostels, and institutions.
   - Multi-item consolidated basket builder with unit selection (`kg`, `crate 25kg`, `bag 50kg`).
   - Morning delivery slot selection and recurring order preferences.
   - Live order lifecycle tracker (`Submitted` → `Sourcing Confirmed` → `Weighed` → `QC Certified` → `Dispatched` → `Delivered`).
   - One-click printable tax invoice preview.
   - Shortage, damage, and quality dispute reporting workflow (2-hour check window).

5. **Vegetable Catalogue**:
   - Searchable and filterable catalogue covering **39 main sourcing products** plus wholesale supplements.
   - Dual English and Tamil names for all items.
   - Real-time availability toggles and benchmark price editing for administrators.
   - **Crucial Sourcing Exclusions Safeguard**: Explicitly excludes Potato, Beans, and Carrot as non-indigenous to the local lowland clusters.

6. **Market Intelligence Dashboard**:
   - Regulated market price table with Min, Max, and Modal prices from Oddanchatram, Coimbatore, and Tiruppur.
   - Interactive 12-week Tomato seasonal volatility bar chart.
   - Demand vs. Supply comparison calendar showing buffer balancing.
   - 7-day predictive demand forecasting module with admin confidence threshold overrides.
   - Daily WhatsApp price alert subscription simulator.
   - One-click CSV export of market price data.

7. **Sourcing Network & Operating Geography**:
   - **Catchment 1: Chandrapuram (PIN 641669)** — 29 agricultural villages directory.
   - **Catchment 2: Pethappampatti (PIN 642205)** — 40 agricultural villages directory.
   - Sourcing rules: local farmer priority, wholesale buffer resilience, transparent origin labeling.
   - Illustrative transit topology diagram.

8. **Research & Evidence Base**:
   - 5 academic citations with DOIs and direct links:
     - *Evidence 1*: Tomato price instability in Tamil Nadu (2026, [doi:10.4238/debw1v73](https://doi.org/10.4238/debw1v73))
     - *Evidence 2*: Farmer ICT market intelligence awareness (2014, [doi:10.5958/0974-0279.2014.00011.1](https://doi.org/10.5958/0974-0279.2014.00011.1))
     - *Evidence 3*: Historical tomato post-harvest losses (1998, [indianjournals.com](https://indianjournals.com/article/aet-22-5and6-005))
     - *Evidence 4*: Tamil Nadu Dept of Agricultural Marketing & Agri Business ([agrimark.tn.gov.in](https://www.agrimark.tn.gov.in/))
     - *Evidence 5*: Uzhavar Sandhai direct farmer marketing initiative (1999, [agrimark.tn.gov.in](https://www.agrimark.tn.gov.in/index.php/Infra/us_details))
   - Explicit "What this means for HAI" and epistemic caveats.

9. **About HAI**:
   - Mission, vision, 7 core brand values, and 10 platform services.
   - Stakeholder value propositions for farmers, businesses, and consumers.

10. **90-Day Pilot Operations**:
    - Structured operational timeline: Discovery (Days 1–15), Setup (Days 16–30), Controlled Trading (Days 31–60), Evaluation (Days 61–90).
    - 8 core evaluation indicators: farmer net realization, buyer landed cost, fill rate, on-time delivery, spoilage, payment speed, repeat orders, unit contribution.

11. **Admin Portal**:
    - KPI cards: active orders, procurement volume (kg), pending farmer batches, gross contribution margin.
    - Live order status pipeline updater.
    - Village harvest availability approval system.
    - Product catalogue manager with in-memory status toggling.
    - Order-level unit economics and margin audit table.

12. **Contact & Policies**:
    - Segmented contact forms for businesses, farmers, partners, and general inquiries.
    - Return, rejection & quality dispute policy.
    - Privacy and farmer data protection commitment.
    - Terms of trade & GST exemption rules.

---

## 5. Running the Application Locally

### Prerequisites
- Node.js (v18+) & npm

### Development Server
```bash
# Install dependencies
npm install

# Start Vite dev server on port 3000
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
# Type check and build bundle
npm run build

# Preview build locally
npm run preview
```

---

## 6. Demo Environment vs. Production Integration Matrix

| Feature | Current State | Production Path |
| :--- | :--- | :--- |
| **HAI Official Logo** | Fully Integrated (`public/hai-logo.png`) | Production-ready vector & raster assets |
| **Order Creation** | Interactive via Basket Modal & AppContext | Connect to Supabase `orders` & `order_items` tables |
| **Farmer Harvest Submissions** | Active form writing to local session state | Connect to Supabase `farmer_availability` table |
| **Market Prices & Forecasting** | Illustrative demo data based on APMC bulletins | Connect to e-NAM / TN Agri Marketing API feeds |
| **Electronic Weighing** | Protocol documented with sample weigh slips | Bluetooth digital scale hardware integration |
| **Payment Tracking** | Demo NEFT/UPI reference tracking | Connect to Razorpay Route / Cashfree payouts API |
| **WhatsApp Price Alerts** | Interactive subscription simulator | Connect to WhatsApp Business API via Twilio / Gupshup |

---

*HAI — Human Agri Intelligence. Built with care for Tamil Nadu Agriculture.*
