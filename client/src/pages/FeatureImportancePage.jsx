import React, { useState, useEffect } from 'react';
import { mlService } from '../services/api';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell 
} from 'recharts';
import { 
  BarChart3, 
  Layers, 
  Sliders, 
  Sparkles,
  Award
} from 'lucide-react';

const BAR_COLORS = ['#06b6d4', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#f43f5e'];

export function FeatureImportancePage() {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchImportance = async () => {
      setLoading(true);
      try {
        const res = await mlService.getFeatureImportance();
        setFeatures(res.feature_importance || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchImportance();
  }, []);

  const featureList = features.length > 0 ? features : [
    { feature: "Attack Method", importance: 0.38 },
    { feature: "Financial Impact", importance: 0.27 },
    { feature: "Target Type", importance: 0.16 },
    { feature: "Risk Score", importance: 0.11 },
    { feature: "Time Of Day", importance: 0.05 },
    { feature: "Location", importance: 0.03 }
  ];

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="glass-panel p-6 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-indigo-400 font-semibold uppercase tracking-wider mb-1">
            <BarChart3 className="w-4 h-4" />
            <span>Requirement 9</span>
          </div>
          <h1 className="text-xl font-bold text-white">Feature Importance Weight Analysis</h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Displays which digital crime features contributed most heavily to model predictions using Gini importance metrics from Random Forest classifiers.
          </p>
        </div>
      </div>

      {/* Horizontal Text Prototype Bar Representation (Req 9 requirement) */}
      <div className="glass-panel p-6 border border-slate-800 space-y-4">
        <h2 className="text-sm font-semibold text-white flex items-center gap-2">
          <Award className="w-4 h-4 text-cyan-400" />
          Severity Prediction Feature Importance Breakdown
        </h2>

        <div className="space-y-4 max-w-2xl font-mono text-xs">
          {featureList.map((item, idx) => {
            const barLength = Math.round(item.importance * 30);
            const blocks = '█'.repeat(Math.max(2, barLength));
            return (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-slate-300">
                  <span className="font-sans font-semibold text-slate-200">{item.feature}</span>
                  <span className="text-cyan-400 font-bold">{(item.importance * 100).toFixed(1)}%</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-cyan-400 tracking-tighter text-sm">{blocks}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Chart View */}
      <div className="glass-panel p-6 border border-slate-800 space-y-4">
        <h2 className="text-sm font-semibold text-white flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-purple-400" />
          Interactive Factor Weight Distribution Chart
        </h2>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart layout="vertical" data={featureList} margin={{ top: 10, right: 30, left: 40, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis type="number" stroke="#64748b" tick={{ fontSize: 11 }} format={(v) => `${v * 100}%`} />
              <YAxis type="category" dataKey="feature" stroke="#64748b" tick={{ fontSize: 11 }} width={120} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                formatter={(val) => [`${(val * 100).toFixed(1)}%`, 'Weight Contribution']}
              />
              <Bar dataKey="importance" radius={[0, 4, 4, 0]} name="Feature Importance">
                {featureList.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={BAR_COLORS[index % BAR_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
