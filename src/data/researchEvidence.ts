import { ResearchStudy } from '../types';

export const RESEARCH_EVIDENCE: ResearchStudy[] = [
  {
    id: 'evidence-1',
    number: 1,
    title: 'Tomato Price Instability and Seasonal Volatility in Key Tamil Nadu Markets (2022–2025)',
    publicationYear: 2026,
    authorsOrOrg: 'Agricultural Economics & Market Intelligence Analysis',
    sourceUrl: 'https://doi.org/10.4238/debw1v73',
    doiOrRef: 'doi.org/10.4238/debw1v73',
    geographicalScope: 'Coimbatore, Chennai, Dindigul, and Krishnagiri, Tamil Nadu',
    category: 'Price Instability',
    keyFinding: 'Weekly market price analysis over a four-year window (2022–2025) documented steep seasonal variation and weekly price fluctuations across the four primary consumption and production hubs, creating severe unpredictability for both growers and bulk institutional buyers.',
    whatThisMeansForHai: 'HAI develops time-stamped market price intelligence, transparent pricing references, and forward demand visibility so farmers and commercial buyers are not forced to make daily harvesting or purchasing decisions blind to broader regional supply swings.',
    caveatNote: 'This published study analysed specific selected markets during 2022–2025. Market dynamics fluctuate based on monsoon patterns, pest pressures, and interstate supply arrivals.'
  },
  {
    id: 'evidence-2',
    number: 2,
    title: 'Farmer Awareness and Utilization of ICT-Based Market Intelligence Services',
    publicationYear: 2014,
    authorsOrOrg: 'Empirical Study on Agricultural Information Systems',
    sourceUrl: 'https://doi.org/10.5958/0974-0279.2014.00011.1',
    doiOrRef: 'doi.org/10.5958/0974-0279.2014.00011.1',
    geographicalScope: 'Sample of 200 tomato growers across Salem, Dindigul, and Krishnagiri districts, Tamil Nadu',
    category: 'ICT Access',
    keyFinding: '47% of the surveyed tomato growers were unaware of formal ICT-based market intelligence and price dissemination services, relying instead on informal intermediaries, village commission agents, or peers for pricing information.',
    whatThisMeansForHai: 'Digital platforms alone fail if they require complex smartphone apps or high data bandwidth. HAI implements simple vernacular (Tamil) mobile interfaces, automated WhatsApp/SMS notifications, and field collection coordinators to bridge the digital gap.',
    caveatNote: 'The 47% unawareness metric applies specifically to the 200 surveyed tomato growers in the 2014 study sample and period, not to all current farmers across modern Tamil Nadu.'
  },
  {
    id: 'evidence-3',
    number: 3,
    title: 'Harvesting Practices and Post-Harvest Losses in Tomato Supply Chains in Tamil Nadu',
    publicationYear: 1998,
    authorsOrOrg: 'Post-Harvest Technology & Agricultural Engineering Research',
    sourceUrl: 'https://indianjournals.com/article/aet-22-5and6-005',
    doiOrRef: 'indianjournals.com/article/aet-22-5and6-005',
    geographicalScope: 'Selected tomato production belts in Tamil Nadu',
    category: 'Post-Harvest Losses',
    keyFinding: 'Cumulative post-harvest losses across studied harvesting, handling, field stacking, sorting, and short-distance transport stages reached 32.8% for improved varieties and 25.3% for hybrid cultivars.',
    whatThisMeansForHai: 'Physical losses are driven by rough handling, over-stacking in non-rigid containers, and delayed aggregation. HAI emphasizes village-level weighing, standardized rigid aerated crates, gentle sorting, and rapid same-day transit to minimize physical damage.',
    caveatNote: 'These figures are historical academic research findings from 1998 under specific field test conditions, not contemporary statewide averages. Current logistics and seed cultivars have evolved.'
  },
  {
    id: 'evidence-4',
    number: 4,
    title: 'Tamil Nadu Department of Agricultural Marketing & Agri Business (Official Framework)',
    publicationYear: 2026,
    authorsOrOrg: 'Government of Tamil Nadu',
    sourceUrl: 'https://www.agrimark.tn.gov.in/',
    doiOrRef: 'agrimark.tn.gov.in',
    geographicalScope: 'Statewide Tamil Nadu',
    category: 'Government Initiatives',
    keyFinding: 'The Department operates institutional infrastructure for regulated market committees, direct purchase centres, cold storages, drying yards, daily price dissemination, and supply-chain logistics support across all districts of Tamil Nadu.',
    whatThisMeansForHai: 'HAI aligns with the state’s agricultural marketing objectives by complementing formal regulated markets, adhering to transparent weighing norms, utilizing official APMC daily price feeds as reference benchmarks, and fostering direct farm linkages.',
    caveatNote: 'Reference to official government marketing services does not imply any government endorsement, partnership, or regulatory evaluation of HAI.'
  },
  {
    id: 'evidence-5',
    number: 5,
    title: 'Uzhavar Sandhai (Farmers’ Market) Direct Marketing Initiative (1999–Present)',
    publicationYear: 1999,
    authorsOrOrg: 'Government of Tamil Nadu, Agricultural Marketing Board',
    sourceUrl: 'https://www.agrimark.tn.gov.in/index.php/Infra/us_details',
    doiOrRef: 'agrimark.tn.gov.in/Infra/us_details',
    geographicalScope: 'Over 100+ Urban and Semi-Urban Centres in Tamil Nadu',
    category: 'Direct Marketing',
    keyFinding: 'Launched in 1999, the Uzhavar Sandhai initiative created physical direct-to-consumer marketplaces where certified farmers sell fresh vegetables directly to retail consumers without commission agents or middlemen fees, establishing fair pricing benchmarks.',
    whatThisMeansForHai: 'Uzhavar Sandhai demonstrated that direct farmer-to-buyer relationships yield superior freshness and mutual trust. HAI translates this foundational principle into a digital-and-physical B2B & bulk institutional procurement network for hotels, canteens, shops, and institutions.',
    caveatNote: 'HAI is an independent private agritech startup concept and is not affiliated with or part of the government Uzhavar Sandhai administration.'
  }
];
