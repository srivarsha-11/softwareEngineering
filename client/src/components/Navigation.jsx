import React from 'react';
import { 
  LayoutDashboard, 
  Database, 
  Share2, 
  AlertTriangle, 
  ShieldCheck, 
  TrendingUp, 
  FlaskConical, 
  FileSpreadsheet, 
  BarChart3, 
  Lightbulb, 
  GitCompare,
  Cpu
} from 'lucide-react';

export const navItems = [
  { id: 'dashboard', label: 'Executive Dashboard', icon: LayoutDashboard, category: 'Overview' },
  { id: 'preprocessing', label: '1. Data Preprocessing', icon: Database, category: 'Data Pipeline' },
  { id: 'clustering', label: '2. Crime Clustering', icon: Share2, category: 'Unsupervised ML' },
  { id: 'anomaly', label: '3. Anomaly Detection', icon: AlertTriangle, category: 'Unsupervised ML' },
  { id: 'predictions', label: '4 & 5. Severity & Type Predictor', icon: ShieldCheck, category: 'Supervised ML' },
  { id: 'timeseries', label: '6. Time-Series Trends', icon: TrendingUp, category: 'Forecasting' },
  { id: 'mllab', label: '7. ML Lab (Model Trainer)', icon: FlaskConical, category: 'Interactive Lab' },
  { id: 'evaluation', label: '8. Model Evaluation', icon: FileSpreadsheet, category: 'Metrics' },
  { id: 'importance', label: '9. Feature Importance', icon: BarChart3, category: 'Metrics' },
  { id: 'insights', label: '10. AI Insights Engine', icon: Lightbulb, category: 'Intelligence' },
  { id: 'comparison', label: '11. Model Comparison', icon: GitCompare, category: 'Benchmarks' },
];

export function Sidebar({ activeTab, setActiveTab }) {
  return (
    <aside className="w-64 bg-slate-900/90 border-r border-slate-800 flex flex-col h-screen sticky top-0 z-30">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800 flex items-center space-x-3">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
          <Cpu className="w-5 h-5 text-white animate-pulse" />
        </div>
        <div>
          <h1 className="font-bold text-white tracking-wide text-sm flex items-center gap-1.5">
            AEGIS <span className="text-cyan-400 font-extrabold">ML</span>
          </h1>
          <p className="text-xs text-slate-400">Digital Crime ML Pipeline</p>
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-md shadow-cyan-500/10'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Microservice Status Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/40">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
          <span>Python Service</span>
          <span className="flex items-center text-emerald-400 font-semibold gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            Active
          </span>
        </div>
        <div className="text-[11px] text-slate-500">Scikit-Learn • Pandas • NumPy</div>
      </div>
    </aside>
  );
}

export function Navbar({ activeTab }) {
  const currentItem = navItems.find(i => i.id === activeTab) || navItems[0];
  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900/60 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center space-x-3">
        <h2 className="text-base font-semibold text-white tracking-wide">
          {currentItem.label}
        </h2>
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium badge-cyan">
          {currentItem.category}
        </span>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 text-xs text-slate-400 bg-slate-950 px-3 py-1.5 rounded-full border border-slate-800">
          <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
          <span>Dataset: <strong>1,000 Digital Crime Incidents</strong></span>
        </div>
      </div>
    </header>
  );
}
