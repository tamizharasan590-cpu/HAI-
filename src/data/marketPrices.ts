import { MarketPriceRecord } from '../types';

export const CURRENT_MARKET_PRICES: MarketPriceRecord[] = [
  {
    id: 'pr-1',
    product: 'Tomato (Hybrid)',
    productTa: 'தக்காளி',
    marketName: 'Oddanchatram APMC Market',
    district: 'Dindigul',
    date: '2026-10-23',
    unit: 'kg',
    minPrice: 22,
    maxPrice: 32,
    modalPrice: 27,
    dataSource: 'Oddanchatram Regulated Market Daily Price Bulletin',
    updateStatus: 'Illustrative Demo Data'
  },
  {
    id: 'pr-2',
    product: 'Tomato (Country / Naatu)',
    productTa: 'நாட்டுத் தக்காளி',
    marketName: 'Coimbatore MGR Market',
    district: 'Coimbatore',
    date: '2026-10-23',
    unit: 'kg',
    minPrice: 24,
    maxPrice: 35,
    modalPrice: 29,
    dataSource: 'Coimbatore Regulated Market Bulletin',
    updateStatus: 'Illustrative Demo Data'
  },
  {
    id: 'pr-3',
    product: 'Small Onion (Shallots)',
    productTa: 'சின்ன வெங்காயம்',
    marketName: 'Tiruppur Thennampalayam Market',
    district: 'Tiruppur',
    date: '2026-10-23',
    unit: 'kg',
    minPrice: 50,
    maxPrice: 65,
    modalPrice: 58,
    dataSource: 'Tiruppur Agri Marketing Feed',
    updateStatus: 'Illustrative Demo Data'
  },
  {
    id: 'pr-4',
    product: 'Green Chilli (Samba / Jwala)',
    productTa: 'பச்சை மிளகாய்',
    marketName: 'Coimbatore MGR Market',
    district: 'Coimbatore',
    date: '2026-10-23',
    unit: 'kg',
    minPrice: 38,
    maxPrice: 50,
    modalPrice: 44,
    dataSource: 'Daily Mandi Board Dispatch',
    updateStatus: 'Illustrative Demo Data'
  },
  {
    id: 'pr-5',
    product: 'Brinjal (Green Striped)',
    productTa: 'கத்தரிக்காய்',
    marketName: 'Oddanchatram APMC Market',
    district: 'Dindigul',
    date: '2026-10-23',
    unit: 'kg',
    minPrice: 26,
    maxPrice: 38,
    modalPrice: 32,
    dataSource: 'Oddanchatram Regulated Market Daily Price Bulletin',
    updateStatus: 'Illustrative Demo Data'
  },
  {
    id: 'pr-6',
    product: 'Okra (Lady’s Finger)',
    productTa: 'வெண்டைக்காய்',
    marketName: 'Coimbatore Anna Market',
    district: 'Coimbatore',
    date: '2026-10-23',
    unit: 'kg',
    minPrice: 30,
    maxPrice: 42,
    modalPrice: 36,
    dataSource: 'Coimbatore Regulated Market Bulletin',
    updateStatus: 'Illustrative Demo Data'
  },
  {
    id: 'pr-7',
    product: 'Drumstick Pods',
    productTa: 'முருங்கைக்காய்',
    marketName: 'Oddanchatram APMC Market',
    district: 'Dindigul',
    date: '2026-10-23',
    unit: 'kg',
    minPrice: 40,
    maxPrice: 55,
    modalPrice: 48,
    dataSource: 'Oddanchatram Regulated Market Daily Price Bulletin',
    updateStatus: 'Illustrative Demo Data'
  },
  {
    id: 'pr-8',
    product: 'Ash Gourd',
    productTa: 'வெள்ளைப் பூசணி',
    marketName: 'Tiruppur Thennampalayam Market',
    district: 'Tiruppur',
    date: '2026-10-23',
    unit: 'kg',
    minPrice: 15,
    maxPrice: 22,
    modalPrice: 18,
    dataSource: 'Tiruppur Agri Marketing Feed',
    updateStatus: 'Illustrative Demo Data'
  }
];

export const HISTORICAL_TOMATO_PRICE_TREND = [
  { week: 'Week 1', oddanchatram: 18, coimbatore: 21, chennai: 25 },
  { week: 'Week 2', oddanchatram: 20, coimbatore: 23, chennai: 27 },
  { week: 'Week 3', oddanchatram: 22, coimbatore: 25, chennai: 29 },
  { week: 'Week 4', oddanchatram: 28, coimbatore: 31, chennai: 36 },
  { week: 'Week 5', oddanchatram: 35, coimbatore: 38, chennai: 45 },
  { week: 'Week 6', oddanchatram: 42, coimbatore: 46, chennai: 54 },
  { week: 'Week 7', oddanchatram: 38, coimbatore: 41, chennai: 48 },
  { week: 'Week 8', oddanchatram: 30, coimbatore: 33, chennai: 39 },
  { week: 'Week 9', oddanchatram: 25, coimbatore: 28, chennai: 32 },
  { week: 'Week 10', oddanchatram: 24, coimbatore: 27, chennai: 30 },
  { week: 'Week 11', oddanchatram: 26, coimbatore: 29, chennai: 33 },
  { week: 'Week 12 (Current)', oddanchatram: 27, coimbatore: 29, chennai: 34 }
];

export const DEMAND_SUPPLY_CALENDAR = [
  { day: 'Mon', confirmedDemandKg: 1450, localSupplyKg: 1300, wholesaleBufferKg: 150, gapKg: 0 },
  { day: 'Tue', confirmedDemandKg: 1200, localSupplyKg: 1250, wholesaleBufferKg: 0, gapKg: -50 },
  { day: 'Wed', confirmedDemandKg: 1600, localSupplyKg: 1400, wholesaleBufferKg: 200, gapKg: 0 },
  { day: 'Thu', confirmedDemandKg: 1350, localSupplyKg: 1350, wholesaleBufferKg: 0, gapKg: 0 },
  { day: 'Fri', confirmedDemandKg: 1800, localSupplyKg: 1550, wholesaleBufferKg: 250, gapKg: 0 },
  { day: 'Sat', confirmedDemandKg: 2100, localSupplyKg: 1750, wholesaleBufferKg: 350, gapKg: 0 },
  { day: 'Sun', confirmedDemandKg: 1950, localSupplyKg: 1650, wholesaleBufferKg: 300, gapKg: 0 }
];

export const FORECAST_PREVIEW = [
  { crop: 'Tomato', currentAvgPrice: 28, forecastedNextWeekPrice: 31, trend: 'up', confidence: '82%', note: 'Seasonal transition in Dindigul belt' },
  { crop: 'Small Onion', currentAvgPrice: 58, forecastedNextWeekPrice: 54, trend: 'down', confidence: '88%', note: 'Fresh harvest arrivals from Kundadam' },
  { crop: 'Green Chilli', currentAvgPrice: 45, forecastedNextWeekPrice: 46, trend: 'stable', confidence: '75%', note: 'Balanced regional arrival rates' },
  { crop: 'Drumstick Pods', currentAvgPrice: 48, forecastedNextWeekPrice: 52, trend: 'up', confidence: '79%', note: 'Pre-festival institutional demand spike' }
];
