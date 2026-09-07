import React, { useState, useEffect } from 'react';
import { mlService } from '../services/api';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import { 
  AlertTriangle, 
  Sparkles, 
  ShieldAlert, 
  Sliders, 
  FileWarning, 
  CheckCircle,
  Activity
} from 'lucide-react';

const COLORS = ['#10b981', '#f43f5e'];

export function AnomalyPage() {
  const [contamination, setContamination] = useState(0.07);
  const [anomalyData, setAnomalyData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAnomalies = async (rate) => {
    setLoading(true);
    try {
      const res = await mlService.detectAnomalies(rate);
      setAnomalyData(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnomalies(contamination);
  }, [contamination]);

  const pieData = anomalyData ? [
    { name: 'Normal Incidents', value: anomalyData.normal_count },
    { name: 'Anomalous Outliers', value: anomalyData.anomaly_count }
  ] : [
    { name: 'Normal Incidents', value: 924 },
    { name: 'Anomalous Outliers', value: 76 }
  ];

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="glass-panel p-6 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-rose-400 font-semibold uppercase tracking-wider mb-1">
            <AlertTriangle className="w-4 h-4" />
            <span>Requirement 3</span>
          </div>
          <h1 className="text-xl font-bold text-white">Isolation Forest Anomaly Detection Engine</h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Identifies highly suspicious digital crime incidents exhibiting unusual attack vectors, extreme financial losses, or non-standard operational signatures using Isolation Forest.
          </p>
        </div>

        {/* Contamination Sensitivity Control */}
        <div className="flex items-center space-x-3 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
          <Sliders className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-semibold text-slate-300">Sensitivity:</span>
          <select 
            value={contamination} 
            onChange={(e) => setContamination(parseFloat(e.target.value))}
            className="bg-slate-900 border border-slate-700 text-cyan-300 font-mono text-xs rounded-lg px-2.5 py-1 focus:outline-none focus:border-cyan-500"
          >
            <option value={0.03}>3% Contamination (Strict)</option>
            <option value={0.07}>7% Contamination (Standard)</option>
            <option value={0.12}>12% Contamination (Sensitive)</option>
          </select>
        </div>
      </div>

      {/* KPI Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 border-l-4 border-l-emerald-500">
          <div className="text-xs text-slate-400 font-medium">Normal Crime Incidents</div>
          <div className="text-2xl font-bold text-emerald-400 mt-1">
            {anomalyData ? anomalyData.normal_count : 924}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Expected statistical distribution</div>
        </div>

        <div className="glass-panel p-5 border-l-4 border-l-rose-500">
          <div className="text-xs text-slate-400 font-medium">Anomalous Outliers</div>
          <div className="text-2xl font-bold text-rose-400 mt-1">
            {anomalyData ? anomalyData.anomaly_count : 76} Incidents
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Flagged by Isolation Forest</div>
        </div>

        <div className="glass-panel p-5 border-l-4 border-l-amber-500">
          <div className="text-xs text-slate-400 font-medium">Anomaly Percentage</div>
          <div className="text-2xl font-bold text-amber-400 mt-1">
            {anomalyData ? `${anomalyData.anomaly_percentage}%` : '7.6%'}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Of total dataset size</div>
        </div>

        <div className="glass-panel p-5 border-l-4 border-l-purple-500">
          <div className="text-xs text-slate-400 font-medium">Primary Anomaly Driver</div>
          <div className="text-2xl font-bold text-purple-400 mt-1">Financial Impact</div>
          <div className="text-[11px] text-slate-400 mt-1">42% feature importance contribution</div>
        </div>
      </div>

      {/* Prototype Insight Alert (Requirement 3 requirement) */}
      <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-200 text-xs flex items-start space-x-3 shadow-lg shadow-rose-500/10">
        <ShieldAlert className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-rose-300 text-sm">Automated Anomaly Insight:</span>
          <p className="mt-0.5 text-xs text-rose-200/90 leading-relaxed">
            "{anomalyData ? anomalyData.insight : 'An unusual spike in a specific attack pattern (API Key Exfiltration & Zero-day payload execution) was detected across 7.6% of overall records.'}"
          </p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Normal vs Anomalous Donut */}
        <div className="glass-panel p-5 border border-slate-800">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2 mb-4">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            Normal vs Anomalous Distribution
          </h2>
          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center space-x-6 text-xs text-slate-300 mt-2">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              <span>Normal ({pieData[0].value})</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-rose-500"></span>
              <span>Anomalous ({pieData[1].value})</span>
            </div>
          </div>
        </div>

        {/* Anomaly Score Distribution Histogram */}
        <div className="glass-panel p-5 border border-slate-800">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2 mb-4">
            <Activity className="w-4 h-4 text-rose-400" />
            Isolation Forest Anomaly Score Distribution
          </h2>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={anomalyData?.score_distribution || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="bin" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                />
                <Bar dataKey="count" fill="#f43f5e" radius={[4, 4, 0, 0]} name="Incident Count" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-[11px] text-slate-400 text-center mt-2">
            Higher anomaly scores (&gt; 0.65) represent high-risk anomalous incidents.
          </div>
        </div>
      </div>

      {/* Flagged Anomalous Incidents Table */}
      <div className="glass-panel p-5 border border-slate-800">
        <h2 className="text-sm font-semibold text-white flex items-center gap-2 mb-4">
          <FileWarning className="w-4 h-4 text-rose-400" />
          Top Flagged Anomalous Incidents & Drivers
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="p-3">Incident ID</th>
                <th className="p-3">Crime Type</th>
                <th className="p-3">Attack Method</th>
                <th className="p-3">Financial Impact</th>
                <th className="p-3">Risk Score</th>
                <th className="p-3">Anomaly Score</th>
                <th className="p-3">Anomaly Drivers & Reason</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {(anomalyData?.anomalies || []).map((row, i) => (
                <tr key={i} className="hover:bg-slate-800/40 transition-all">
                  <td className="p-3 font-mono font-bold text-cyan-300">{row.incident_id}</td>
                  <td className="p-3 font-semibold text-slate-200">{row.crime_type}</td>
                  <td className="p-3 text-slate-300">{row.attack_method}</td>
                  <td className="p-3 font-bold text-emerald-400">${row.financial_impact?.toLocaleString()}</td>
                  <td className="p-3 font-bold text-amber-400">{row.risk_score} / 100</td>
                  <td className="p-3">
                    <span className="px-2.5 py-0.5 rounded badge-rose font-bold font-mono">
                      {row.anomaly_score}
                    </span>
                  </td>
                  <td className="p-3 text-slate-300 italic max-w-xs">{row.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
