import React from 'react';
import { useApp } from '../context/AppContext';
import { RESEARCH_EVIDENCE } from '../data/researchEvidence';
import {
  FileText,
  ExternalLink,
  ShieldAlert,
  Calendar,
  MapPin,
  Lightbulb,
  CheckCircle2,
  Info
} from 'lucide-react';

export const ResearchEvidencePage: React.FC = () => {
  const { language } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Page Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-hai-leaf text-hai-forest text-xs font-semibold">
          <FileText className="w-3.5 h-3.5" />
          <span>Academic Citations & Government Precedents</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-hai-forest tracking-tight">
          Research Evidence & Scientific Foundations
        </h1>
        <p className="text-sm sm:text-base text-hai-charcoal/80 leading-relaxed">
          HAI was not conceived in a vacuum. Our platform design directly responds to documented structural inefficiencies in Tamil Nadu horticultural supply chains, referencing published literature, empirical surveys, and state marketing frameworks.
        </p>
      </div>

      {/* Mandatory Rigour & Epistemic Caveat Banner */}
      <div className="bg-white rounded-2xl border-2 border-hai-forest/20 p-6 sm:p-8 shadow-soft space-y-4">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-hai-forest" />
          <h2 className="text-base font-bold text-hai-forest">
            Epistemic Integrity & Operational Boundaries
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-hai-charcoal/80 leading-relaxed">
          <p>
            • <strong>No Claim of Endorsement:</strong> None of the cited authors, academic journals, or government departments have evaluated, commissioned, or endorsed HAI. Citations establish the background problem landscape only.
          </p>
          <p>
            • <strong>Field Validation Required:</strong> Published statewide or sample findings provide hypotheses. Direct farmer and buyer interviews in Chandrapuram and Pethappampatti are conducted to ground-truth localized realities.
          </p>
          <p>
            • <strong>No Guaranteed Economic Incomes:</strong> These studies do not constitute proof that HAI will raise individual farm incomes or eliminate waste. Performance must be empirically measured through our pilot operations.
          </p>
          <p>
            • <strong>Historical Figures Disclosed:</strong> Where figures date from 1998 or 2014, they are explicitly framed as historical benchmarks rather than unexamined modern statewide proxies.
          </p>
        </div>
      </div>

      {/* Evidence Cards Stack */}
      <div className="space-y-8">
        {RESEARCH_EVIDENCE.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-hai-border p-6 sm:p-8 shadow-soft hover:border-hai-agri transition-all space-y-6"
          >
            {/* Card Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-hai-border">
              <div className="flex flex-wrap items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-hai-forest text-white font-mono font-bold text-xs flex items-center justify-center">
                  #{item.number}
                </span>
                <span className="text-xs font-mono font-bold bg-hai-leaf text-hai-forest px-2.5 py-0.5 rounded">
                  {item.category}
                </span>
                <span className="text-xs font-mono text-hai-muted">
                  Year of Publication: {item.publicationYear}
                </span>
              </div>

              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-hai-forest hover:text-hai-agri transition-colors bg-hai-offwhite px-3 py-1.5 rounded-md border border-hai-border"
              >
                <span>View Original Source ({item.doiOrRef})</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Title & Metadata */}
            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl font-bold text-hai-forest leading-snug">
                {item.title}
              </h3>
              <div className="flex flex-wrap items-center gap-4 text-xs text-hai-muted">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-hai-earth" />
                  Source: {item.authorsOrOrg}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-hai-earth" />
                  Geographical Scope: {item.geographicalScope}
                </span>
              </div>
            </div>

            {/* Key Finding */}
            <div className="bg-hai-offwhite p-4 rounded-xl border border-hai-border text-xs sm:text-sm text-hai-charcoal leading-relaxed">
              <span className="font-bold text-hai-forest block text-xs uppercase tracking-wider mb-1">
                Published Key Finding:
              </span>
              {item.keyFinding}
            </div>

            {/* What This Means for HAI & Caveat Box */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
              <div className="md:col-span-7 space-y-2 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-hai-forest text-sm">
                  <Lightbulb className="w-4 h-4 text-hai-agri" />
                  <span>What This Means for HAI:</span>
                </div>
                <p className="text-hai-charcoal/80 leading-relaxed bg-hai-leaf/30 p-3.5 rounded-lg border border-hai-agri/20">
                  {item.whatThisMeansForHai}
                </p>
              </div>

              <div className="md:col-span-5 space-y-2 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-hai-charcoal text-xs uppercase tracking-wider">
                  <Info className="w-3.5 h-3.5 text-hai-earth" />
                  <span>Analytical Caveat & Context:</span>
                </div>
                <p className="text-hai-muted leading-relaxed bg-gray-50 p-3.5 rounded-lg border border-gray-200">
                  {item.caveatNote}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
