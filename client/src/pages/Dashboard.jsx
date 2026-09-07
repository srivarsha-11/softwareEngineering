import React from 'react';
import { 
  Database, 
  Share2, 
  AlertTriangle, 
  ShieldCheck, 
  TrendingUp, 
  FlaskConical, 
  GitCompare,
  ArrowRight,
  Sparkles,
  Layers
} from 'lucide-react';

export function Dashboard({ setActiveTab }) {
  const kpis = [
    { title: "Total Crime Records", value: "1,000", sub: "25 duplicates cleaned", color: "from-blue-500 to-cyan-500", icon: Database },
    { title: "Discovered Clusters", value: "3 Clusters", sub: "K-Means (Silhouette: 0.64)", color: "from-purple-500 to-indigo-500", icon: Share2 },
    { title: "Anomaly Detection", value: "7.6% (76 Inc)", sub: "Isolation Forest Model", color: "from-rose-500 to-amber-500", icon: AlertTriangle },
    { title: "Severity Model Acc.", value: "91.2%", sub: "Random Forest Classifier", color: "from-emerald-500 to-teal-500", icon: ShieldCheck },
  ];

  const modules = [
    { id: 'preprocessing', title: '1. Data Preprocessing', desc: 'Missing value imputation, duplicate removal, LabelEncoding, & StandardScaler.', icon: Database, color: 'text-cyan-400' },
    { id: 'clustering', title: '2. Crime Clustering', desc: 'Unsupervised K-Means grouping with 2D PCA spatial visualization.', icon: Share2, color: 'text-purple-400' },
    { id: 'anomaly', title: '3. Anomaly Detection', desc: 'Isolation Forest identifying high-risk outlier digital crime records.', icon: AlertTriangle, color: 'text-rose-400' },
    { id: 'predictions', title: '4 & 5. Severity & Crime Predictor', desc: 'Supervised Random Forest predicting incident severity & crime type.', icon: ShieldCheck, color: 'text-emerald-400' },
    { id: 'timeseries', title: '6. Time-Series Trends', desc: 'Incident moving average trends & 3-month forecast model estimates.', icon: TrendingUp, color: 'text-amber-400' },
    { id: 'mllab', title: '7. ML Lab (Model Trainer)', icon: FlaskConical, desc: 'Interactive step-by-step model training pipeline with custom parameters.', color: 'text-cyan-300' },
    { id: 'importance', title: '9. Feature Importance', desc: 'Ranked breakdown of top factors influencing crime severity models.', icon: Layers, color: 'text-indigo-400' },
    { id: 'comparison', title: '11. Model Comparison', desc: 'Benchmarking Random Forest vs Decision Tree vs Logistic Regression.', icon: GitCompare, color: 'text-purple-300' },
  ];

  return (
    <div className="space-y-6 pb-8">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl glass-panel p-6 border border-cyan-500/30 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">Cyber Forensics AI/ML Module</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Digital Crime Machine Learning Intelligence
            </h1>
            <p className="text-sm text-slate-400 max-w-2xl mt-1 leading-relaxed">
              End-to-end analytical machine learning pipeline for cyber crime incident datasets: preprocessing, K-Means clustering, Isolation Forest anomaly scoring, Random Forest classification, time-series forecasting, and interactive model training.
            </p>
          </div>
          <button 
            onClick={() => setActiveTab('mllab')}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.02]"
          >
            <FlaskConical className="w-4 h-4" />
            <span>Launch ML Lab</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="glass-panel p-5 relative overflow-hidden group hover:border-slate-700 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">{kpi.title}</span>
                <div className={`p-2.5 rounded-lg bg-gradient-to-br ${kpi.color} text-white shadow-md`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3">
                <div className="text-2xl font-bold text-white tracking-tight">{kpi.value}</div>
                <div className="text-[11px] text-slate-400 mt-1">{kpi.sub}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Architectural Flow Visualizer */}
      <div className="glass-panel p-6 border border-slate-800">
        <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          End-to-End System Architecture (Req 12)
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 text-center text-xs">
          {[
            { name: "Frontend", sub: "React + Recharts", color: "bg-cyan-500/10 border-cyan-500/30 text-cyan-300" },
            { name: "Express API", sub: "Node Gateway", color: "bg-indigo-500/10 border-indigo-500/30 text-indigo-300" },
            { name: "Python Service", sub: "Flask Microservice", color: "bg-purple-500/10 border-purple-500/30 text-purple-300" },
            { name: "Data Clean", sub: "Pandas Imputer", color: "bg-emerald-500/10 border-emerald-500/30 text-emerald-300" },
            { name: "ML Models", sub: "Scikit-Learn", color: "bg-amber-500/10 border-amber-500/30 text-amber-300" },
            { name: "Predictions", sub: "Inference Engine", color: "bg-rose-500/10 border-rose-500/30 text-rose-300" },
            { name: "Database", sub: "Dataset Store", color: "bg-blue-500/10 border-blue-500/30 text-blue-300" },
            { name: "Dashboard", sub: "Analytics UI", color: "bg-teal-500/10 border-teal-500/30 text-teal-300" },
          ].map((item, idx) => (
            <div key={idx} className={`p-3 rounded-lg border ${item.color} flex flex-col justify-center items-center`}>
              <span className="font-semibold text-xs">{item.name}</span>
              <span className="text-[10px] opacity-75 mt-0.5">{item.sub}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Module Grid */}
      <div>
        <h2 className="text-sm font-semibold text-white mb-3">AI / ML Pipeline Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {modules.map((mod) => {
            const Icon = mod.icon;
            return (
              <button
                key={mod.id}
                onClick={() => setActiveTab(mod.id)}
                className="glass-panel p-5 text-left group hover:border-cyan-500/40 hover:bg-slate-800/80 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Icon className={`w-6 h-6 ${mod.color}`} />
                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="font-bold text-sm text-white mb-1">{mod.title}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2">{mod.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-cyan-400 font-semibold">
                  <span>Explore Module</span>
                  <span>→</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
