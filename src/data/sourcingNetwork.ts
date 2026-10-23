import { CatchmentArea, WholesaleMarketHub } from '../types';

export const CHANDRAPURAM_VILLAGES: string[] = [
  'Chandrapuram',
  'Sultanpet',
  'Varapatti',
  'Selakkarichal',
  'Bogampatti',
  'Panapatti',
  'Kethanur',
  'Elavanthi',
  'Jallipatti',
  'Pappampatti',
  'Appanaickenpatti',
  'Kallapalayam',
  'Kammalapatti',
  'Edayarpalayam',
  'J. Krishnapuram',
  'Pachapalayam',
  'Poorandampalayam',
  'Senjeri Ayyampalayam',
  'Senjeriputhur',
  'Thalakkarai',
  'Vadambacheri',
  'Vadavalli',
  'Vadavedampatti',
  'Kumarapalayam',
  'Malaipalayam',
  'Senjeri',
  'Velappanaickenpalayam',
  'Puliamarathupalayam',
  'Malayadipalayam'
];

export const PETHAPPAMPATTI_VILLAGES: string[] = [
  'Pethappampatti',
  'Kongalnagaram',
  'Iluppanagaram',
  'Pukkulam',
  'Kottamangalam',
  'Somavarapatti',
  'Mungiltholuvu',
  'Kosevampalayam',
  'Vagathozhuvu',
  'Veedampatti',
  'Anikadavu',
  'Virugalpatti',
  'Pudupalayam',
  'Thottampatti',
  'Pannaikinar',
  'Mukoodu Jallipatti',
  'Poolavadi',
  'Athukinathupatti',
  'Kondampatti',
  'Periyapatti',
  'Kuppampalayam',
  'Amanthakadavu',
  'Vadugapalayam',
  'Gudimangalam',
  'Ponneri',
  'Devanurpudur',
  'Ganapathipalayam',
  'Kodangiam',
  'Erisinampatti',
  'Ravanapuram',
  'Periyavalavadi',
  'Chinnavalavadi',
  'Sarkarpudur',
  'Rettipalayam',
  'Arasur',
  'Krishnapuram',
  'Modakkupatti',
  'Jallipatti',
  'Kuralkuttai',
  'Andiyur'
];

export const SOURCING_CATCHMENTS: CatchmentArea[] = [
  {
    id: 'catchment-1',
    name: 'Chandrapuram Catchment',
    pinCode: '641669',
    district: 'Coimbatore / Tiruppur Border',
    hubLocation: 'Sultanpet / Chandrapuram Junction Hub',
    description: 'Preliminary operational catchment covering 29 agricultural villages with strong clusters in tomato, chilli, drumstick, greens, and gourds.',
    villages: CHANDRAPURAM_VILLAGES.map((name, index) => ({
      name,
      status: index < 5 ? 'Active Collection Point' : 'Proposed Catchment',
      distanceKm: 4 + (index % 12) * 1.8,
      soilOrProduceNotes: index % 3 === 0 ? 'Tomato & Chilli belt' : index % 3 === 1 ? 'Greens & Gourds' : 'Moringa & Vegetables'
    }))
  },
  {
    id: 'catchment-2',
    name: 'Pethappampatti Catchment',
    pinCode: '642205',
    district: 'Tiruppur (Udumalpet / Gudimangalam belt)',
    hubLocation: 'Pethappampatti Center Sorting Node',
    description: 'Preliminary operational catchment covering 40 agricultural villages known for intensive small onion (shallot), tomato, coconut, and root crops.',
    villages: PETHAPPAMPATTI_VILLAGES.map((name, index) => ({
      name,
      status: index < 6 ? 'Active Collection Point' : 'Proposed Catchment',
      distanceKm: 3 + (index % 15) * 1.6,
      soilOrProduceNotes: index % 3 === 0 ? 'Small Onion & Tomato core' : index % 3 === 1 ? 'Vegetables & Tubers' : 'Horticulture & Coconut'
    }))
  }
];

export const WHOLESALE_HUBS: WholesaleMarketHub[] = [
  {
    id: 'hub-oddanchatram',
    name: 'Ottanchathiram (Oddanchatram) Vegetable Market',
    location: 'Oddanchatram, Dindigul District',
    district: 'Dindigul',
    type: 'Wholesale APMC / Daily Market',
    estimatedTransitTime: '70 - 90 mins (via NH 83)',
    role: 'Emergency Buffer & Variety Fulfilment'
  },
  {
    id: 'hub-tiruppur',
    name: 'Tiruppur Thennampalayam Wholesale Market',
    location: 'Palladam Road, Tiruppur',
    district: 'Tiruppur',
    type: 'Wholesale APMC / Daily Market',
    estimatedTransitTime: '45 - 60 mins',
    role: 'Emergency Buffer & Variety Fulfilment'
  },
  {
    id: 'hub-coimbatore',
    name: 'Coimbatore MGR Wholesale Market / Anna Market',
    location: 'Mettupalayam Road / Saibaba Colony, Coimbatore',
    district: 'Coimbatore',
    type: 'Wholesale APMC / Daily Market',
    estimatedTransitTime: '50 - 70 mins',
    role: 'Emergency Buffer & Variety Fulfilment'
  }
];

export const SOURCING_POLICY_RULES = [
  {
    title: 'Local Farmer Priority',
    rule: 'HAI prioritizes direct collection from registered local farmers in Chandrapuram and Pethappampatti whenever quality, availability, timing, and total landed cost meet criteria.'
  },
  {
    title: 'Wholesale Buffer Strategy',
    rule: 'When sudden buyer volume spikes or adverse weather causes local shortages, HAI procures supplementary produce from Ottanchathiram, Tiruppur, or Coimbatore wholesale markets to guarantee 100% order fill rate.'
  },
  {
    title: 'Transparent Origin Labelling',
    rule: 'Every order record and internal dispatch sheet explicitly distinguishes between Local Farmer supply and Wholesale supplementary sourcing.'
  },
  {
    title: 'No False Claims Safeguard',
    rule: 'Catchment boundaries and village lists represent preliminary operational catchments for field planning, not verified exclusive geographic monopolies or confirmed active supply contracts.'
  }
];
