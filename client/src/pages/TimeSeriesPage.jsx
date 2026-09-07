import React, { useState, useEffect } from 'react';
import { mlService } from '../services/api';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend 
} from 'recharts';
import { 
  TrendingUp, 
  AlertCircle, 
  Calendar, 
  Sparkles, 
  ShieldAlert,
  BarChart2
} from 'lucide-react';

export function TimeSeriesPage() {
  const [timeData, setTimeData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await mlService.getTimeSeries();
        setTimeData(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Merge historical and forecast data for seamless continuous plotting
  const mergedChartData = timeData ? [
    ...timeData.historical.map(h => ({
      period: h.period,
      actual: h.actual_count,
      trend: h.trend_line,
      forecast: null,
      lower: null,
      upper: null
    })),
    ...timeData.forecast.map(f => ({
      period: f.period,
      actual: null,
      trend: null,
      forecast: f.forecast_count,
      lower: f.lower_bound,
      upper: f.upper_bound
    }))
  ] : [];

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="glass-panel p-6 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-amber-400 font-semibold uppercase tracking-wider mb-1">
            <TrendingUp className="w-4 h-4" />
            <span>Requirement 6</span>
          </div>
          <h1 className="text-xl font-bold text-white">Time-Series Crime Trend & Forecast Analysis</h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Analyzes historical incident counts, computes 2-period moving averages, detects monthly seasonality, and projects statistical forecasts for future periods.
          </p>
        </div>
      </div>

      {/* Forecast Disclaimer Alert (Mandatory Requirement 6) */}
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-start space-x-3 shadow-lg shadow-amber-500/10">
        <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-amber-300 text-sm">Model Estimate Disclaimer:</span>
          <p className="mt-0.5 text-xs text-amber-200/90 leading-relaxed">
            "{timeData?.disclaimer || 'Notice: Forecasted values are ML model-generated statistical estimates based on historical patterns, not confirmed future crime occurrences.'}"
          </p>
        </div>
      </div>

      {/* Chart Visualizer */}
      <div className="glass-panel p-6 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-cyan-400" />
            Historical Incident Counts & ML Forecast Projection
          </h2>

          <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded bg-cyan-500"></span>
              <span className="text-slate-300">Historical Actual</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded bg-indigo-400"></span>
              <span className="text-slate-300">Trend Line (MA)</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded bg-amber-500 border border-dashed border-amber-400"></span>
              <span className="text-amber-400 font-bold">Model Forecast</span>
            </div>
          </div>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mergedChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0}/>
                </linearGradient>
                <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="period" stroke="#64748b" tick={{ fontSize: 11 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
              />
              <Area type="monotone" dataKey="actual" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorActual)" name="Actual Crime Frequency" />
              <Line type="monotone" dataKey="trend" stroke="#818cf8" strokeWidth={2} strokeDasharray="4 4" dot={false} name="Trendline (Moving Avg)" />
              <Area type="monotone" dataKey="forecast" stroke="#f59e0b" strokeWidth={2} strokeDasharray="6 6" fillOpacity={1} fill="url(#colorForecast)" name="Model Forecast Estimate" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Forecast Data Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-5 border border-slate-800">
          <h2 className="text-sm font-semibold text-white mb-3">Historical Monthly Baseline</h2>
          <div className="space-y-2">
            {(timeData?.historical || []).map((row, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
                <span className="font-mono text-cyan-300 font-semibold">{row.period}</span>
                <span className="text-slate-300">Actual: <strong className="text-white">{row.actual_count}</strong></span>
                <span className="text-slate-400">Trend MA: {row.trend_line}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-5 border border-slate-800 space-y-3">
          <h2 className="text-sm font-semibold text-white flex items-center justify-between">
            <span>Model Forecast Projections</span>
            <span className="px-2 py-0.5 rounded badge-amber text-[10px] uppercase font-bold">Model Estimate</span>
          </h2>
          <div className="space-y-2">
            {(timeData?.forecast || []).map((row, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-between text-xs">
                <div>
                  <span className="font-mono text-amber-300 font-bold block">{row.period}</span>
                  <span className="text-[10px] text-amber-200/70">Estimated Range: {row.lower_bound} - {row.upper_bound}</span>
                </div>
                <div className="text-right">
                  <span className="text-base font-extrabold text-amber-400">{row.forecast_count} Incidents</span>
                  <span className="text-[10px] text-slate-400 block font-semibold">Forecast Projection</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
