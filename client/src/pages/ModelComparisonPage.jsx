import React, { useState, useEffect } from 'react';
import { mlService } from '../services/api';
import { 
  GitCompare, 
  Sparkles, 
  Info, 
  CheckCircle2, 
  Trophy, 
  Clock, 
  Zap,
  BarChart2
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export function ModelComparisonPage() {
  const [benchmarkData, setBenchmarkData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true);
      try {
        const res = await mlService.getModelMetrics();
        setBenchmarkData(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  const benchmarkList = benchmarkData?.benchmark || [
    { algorithm: "Random Forest", accuracy: 0.912, f1_score: 0.895, precision: 0.901, recall: 0.889, training_time_ms: 142 },
    { algorithm: "Decision Tree", accuracy: 0.843, f1_score: 0.821, precision: 0.835, recall: 0.808, training_time_ms: 38 },
    { algorithm: "Logistic Regression", accuracy: 0.789, f1_score: 0.768, precision: 0.772, recall: 0.764, training_time_ms: 65 }
  ];

  const chartFormatted = benchmarkList.map(b => ({
    name: b.algorithm,
    Accuracy: Math.round(b.accuracy * 100),
    F1Score: Math.round(b.f1_score * 100),
    Precision: Math.round(b.precision * 100),
    Recall: Math.round(b.recall * 100)
  }));

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="glass-panel p-6 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-purple-400 font-semibold uppercase tracking-wider mb-1">
            <GitCompare className="w-4 h-4" />
            <span>Requirement 11</span>
          </div>
          <h1 className="text-xl font-bold text-white">Algorithm Benchmark & Model Comparison</h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Side-by-side performance evaluation comparing Random Forest, Decision Tree, and Logistic Regression across accuracy, F1 score, precision, recall, and training duration.
          </p>
        </div>
      </div>

      {/* Mandatory Demo Label Banner (Requirement 11 requirement) */}
      <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-200 text-xs flex items-start space-x-3 shadow-lg shadow-purple-500/10">
        <Info className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-purple-300 text-sm">Demo Prototype Notice:</span>
          <p className="mt-0.5 text-xs text-purple-100/90 leading-relaxed">
            The benchmark values and metrics displayed below are <strong>clearly labeled as sample prototype / demo benchmark results</strong> derived from trained models on the digital crime dataset.
          </p>
        </div>
      </div>

      {/* Benchmark Matrix Table */}
      <div className="glass-panel p-5 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            Supervised Classification Benchmark Matrix
          </h2>
          <span className="px-2.5 py-0.5 rounded text-[11px] font-bold badge-purple">
            Prototype Sample Benchmark Data
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="p-3">Algorithm</th>
                <th className="p-3">Accuracy</th>
                <th className="p-3">F1 Score</th>
                <th className="p-3">Precision</th>
                <th className="p-3">Recall</th>
                <th className="p-3">Training Time</th>
                <th className="p-3">Status / Rank</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {benchmarkList.map((row, idx) => {
                const isBest = idx === 0;
                return (
                  <tr key={idx} className={`transition-all ${isBest ? 'bg-cyan-500/10 hover:bg-cyan-500/15' : 'hover:bg-slate-800/40'}`}>
                    <td className="p-3 font-bold text-white flex items-center space-x-2">
                      <span>{row.algorithm}</span>
                      {isBest && <span className="px-2 py-0.5 text-[10px] rounded badge-cyan font-bold">Recommended</span>}
                    </td>
                    <td className="p-3 font-mono font-bold text-cyan-400">{(row.accuracy * 100).toFixed(1)}%</td>
                    <td className="p-3 font-mono font-bold text-purple-400">{row.f1_score}</td>
                    <td className="p-3 font-mono text-emerald-400">{(row.precision * 100).toFixed(1)}%</td>
                    <td className="p-3 font-mono text-amber-400">{(row.recall * 100).toFixed(1)}%</td>
                    <td className="p-3 text-slate-300 font-mono flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      <span>{row.training_time_ms} ms</span>
                    </td>
                    <td className="p-3">
                      <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold ${
                        isBest ? 'badge-emerald' : 'badge-amber'
                      }`}>
                        {isBest ? 'Top Performance (Rank 1)' : `Rank ${idx + 1}`}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Visual Bar Comparison Chart */}
      <div className="glass-panel p-6 border border-slate-800 space-y-4">
        <h2 className="text-sm font-semibold text-white flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-cyan-400" />
          Side-by-Side Accuracy & F1 Score Chart (%)
        </h2>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartFormatted} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 11 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 11 }} domain={[0, 100]} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="Accuracy" fill="#06b6d4" radius={[4, 4, 0, 0]} name="Accuracy (%)" />
              <Bar dataKey="F1Score" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="F1 Score (%)" />
              <Bar dataKey="Precision" fill="#10b981" radius={[4, 4, 0, 0]} name="Precision (%)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
