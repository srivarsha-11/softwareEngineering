import React, { useState } from 'react';
import { Sidebar, Navbar } from './components/Navigation';
import { Dashboard } from './pages/Dashboard';
import { PreprocessingPage } from './pages/PreprocessingPage';
import { ClusteringPage } from './pages/ClusteringPage';
import { AnomalyPage } from './pages/AnomalyPage';
import { PredictionsPage } from './pages/PredictionsPage';
import { TimeSeriesPage } from './pages/TimeSeriesPage';
import { MLLabPage } from './pages/MLLabPage';
import { ModelEvaluationPage } from './pages/ModelEvaluationPage';
import { FeatureImportancePage } from './pages/FeatureImportancePage';
import { AIInsightsPage } from './pages/AIInsightsPage';
import { ModelComparisonPage } from './pages/ModelComparisonPage';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard setActiveTab={setActiveTab} />;
      case 'preprocessing':
        return <PreprocessingPage />;
      case 'clustering':
        return <ClusteringPage />;
      case 'anomaly':
        return <AnomalyPage />;
      case 'predictions':
        return <PredictionsPage />;
      case 'timeseries':
        return <TimeSeriesPage />;
      case 'mllab':
        return <MLLabPage />;
      case 'evaluation':
        return <ModelEvaluationPage />;
      case 'importance':
        return <FeatureImportancePage />;
      case 'insights':
        return <AIInsightsPage />;
      case 'comparison':
        return <ModelComparisonPage />;
      default:
        return <Dashboard setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#0b0f19] text-gray-100 overflow-hidden font-sans">
      {/* Left Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <Navbar activeTab={activeTab} />

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto px-6 py-6">
          <div className="max-w-7xl mx-auto">
            {renderTabContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
