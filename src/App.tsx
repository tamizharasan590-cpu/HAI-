import React from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/modals/CartDrawer';
import { InvoiceModal } from './components/modals/InvoiceModal';

// Pages
import { HomePage } from './pages/HomePage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { ForFarmersPage } from './pages/ForFarmersPage';
import { ForBusinessesPage } from './pages/ForBusinessesPage';
import { CataloguePage } from './pages/CataloguePage';
import { MarketIntelligencePage } from './pages/MarketIntelligencePage';
import { SourcingNetworkPage } from './pages/SourcingNetworkPage';
import { ResearchEvidencePage } from './pages/ResearchEvidencePage';
import { AboutPage } from './pages/AboutPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { PilotOperationsPage } from './pages/PilotOperationsPage';
import { ContactPage } from './pages/ContactPage';

import { CheckCircle2 } from 'lucide-react';

export const App: React.FC = () => {
  const { activeTab, toastMessage } = useApp();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'how-it-works':
        return <HowItWorksPage />;
      case 'farmers':
        return <ForFarmersPage />;
      case 'buyers':
        return <ForBusinessesPage />;
      case 'catalogue':
        return <CataloguePage />;
      case 'market-intel':
        return <MarketIntelligencePage />;
      case 'sourcing-network':
        return <SourcingNetworkPage />;
      case 'research':
        return <ResearchEvidencePage />;
      case 'about':
        return <AboutPage />;
      case 'pilot':
        return <PilotOperationsPage />;
      case 'admin':
        return <AdminDashboardPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-hai-offwhite text-hai-charcoal font-sans selection:bg-hai-agri selection:text-white">
      {/* Navigation Bar */}
      <Navbar />

      {/* Main Page Content */}
      <main className="flex-1">
        {renderActiveView()}
      </main>

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <InvoiceModal />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-hai-forest text-white px-4 py-3 rounded-xl shadow-2xl border border-hai-agri/40 flex items-center gap-3 animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-5 h-5 text-hai-agri shrink-0" />
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Global Footer */}
      <Footer />
    </div>
  );
};
