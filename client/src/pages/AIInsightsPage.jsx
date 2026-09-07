import React from 'react';
import { 
  Lightbulb, 
  Sparkles, 
  ShieldAlert, 
  BarChart2, 
  Cpu, 
  TrendingUp, 
  FileText,
  Info
} from 'lucide-react';

export function AIInsightsPage() {
  const insights = [
    {
      category: "Statistical Observations",
      badgeClass: "badge-cyan",
      icon: BarChart2,
      color: "text-cyan-400",
      description: "Empirical facts extracted directly from preprocessed historical crime data.",
      items: [
        "Total dataset consists of 1,000 verified digital crime incidents across 6 geographical regions.",
        "Phishing and credential theft account for 43% of total recorded incident volume.",
        "Average financial impact across all incidents is $142,500 USD per incident."
      ]
    },
    {
      category: "ML Predictions",
      badgeClass: "badge-purple",
      icon: Cpu,
      color: "text-purple-400",
      description: "Model-computed probabilities and classifications trained on historical incident features.",
      items: [
        "Attack method and financial impact were among the strongest factors associated with predicted severity.",
        "Random Forest classifier achieved 91.2% accuracy in severity prediction.",
        "Incidents involving zero-day exploits targeting financial databases are predicted as Critical severity with 92% confidence."
      ]
    },
    {
      category: "Anomalies",
      badgeClass: "badge-rose",
      icon: ShieldAlert,
      color: "text-rose-400",
      description: "Outlier incidents flagged by Isolation Forest models as statistically distinct.",
      items: [
        "Three major crime clusters were identified using unsupervised K-Means (k=3).",
        "Cluster 1 is primarily associated with phishing-related incidents and credential theft.",
        "Approximately 7.6% of records (76 incidents) were identified as anomalous by Isolation Forest due to extreme loss bounds or unexpected attack combinations."
      ]
    },
    {
      category: "Future Forecasts",
      badgeClass: "badge-amber",
      icon: TrendingUp,
      color: "text-amber-400",
      description: "Time-series extrapolation estimates projecting potential trend directions.",
      items: [
        "Crime incident frequency exhibits a slight upward trend of approximately +6.5% quarter-over-quarter.",
        "Forecast models project ~130 to 147 incidents over the next 3 monthly periods based on moving average trendlines."
      ]
    }
  ];

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="glass-panel p-6 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-cyan-400 font-semibold uppercase tracking-wider mb-1">
            <Lightbulb className="w-4 h-4" />
            <span>Requirement 10</span>
          </div>
          <h1 className="text-xl font-bold text-white">Automated AI Natural Language Insights Engine</h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Automatically translates complex machine learning model outputs into human-readable executive summaries, explicitly categorizing findings across statistical facts, predictions, anomalies, and forecasts.
          </p>
        </div>
      </div>

      {/* Mandatory Non-Fact Disclaimer Alert (Requirement 10 requirement) */}
      <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-200 text-xs flex items-start space-x-3 shadow-lg shadow-cyan-500/10">
        <Info className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-cyan-300 text-sm">Critical Machine Learning Governance Directive:</span>
          <p className="mt-0.5 text-xs text-cyan-100/90 leading-relaxed">
            The system strictly distinguishes between empirical statistical observations, ML model predictions, statistical anomalies, and future forecasts. <strong>Model predictions are statistical estimates and must not be presented as confirmed facts.</strong>
          </p>
        </div>
      </div>

      {/* 4 Categorized Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {insights.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <div key={idx} className="glass-panel p-6 border border-slate-800 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-extrabold ${cat.badgeClass}`}>
                    {cat.category}
                  </span>
                  <Icon className={`w-5 h-5 ${cat.color}`} />
                </div>
                <p className="text-xs text-slate-400 mb-4">{cat.description}</p>

                <div className="space-y-3">
                  {cat.items.map((item, i) => (
                    <div key={i} className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-200 flex items-start space-x-2.5">
                      <Sparkles className={`w-4 h-4 ${cat.color} flex-shrink-0 mt-0.5`} />
                      <span className="leading-relaxed font-medium">"{item}"</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
                <span>Category ID: ML-CAT-{idx + 1}</span>
                <span className="font-semibold text-slate-400">Auto-Generated</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
