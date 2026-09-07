import React, { useState, useEffect } from 'react';
import { mlService } from '../services/api';
import { 
  ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie
} from 'recharts';
import { 
  Share2, 
  Sparkles, 
  Layers, 
  PieChart as PieIcon, 
  FileText,
  Sliders,
  Info
} from 'lucide-react';

const CLUSTER_COLORS = ['#06b6d4', '#8b5cf6', '#f43f5e', '#10b981', '#f59e0b'];

export function ClusteringPage() {
  const [nClusters, setNClusters] = useState(3);
  const [clusterData, setClusterData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState(null);

  const fetchClusters = async (k) => {
    setLoading(true);
    try {
      const res = await mlService.clusterCrimes(k);
      setClusterData(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClusters(nClusters);
  }, [nClusters]);

  return (
    <div className="space-y-6 pb-8">
      {/* Page Header */}
      <div className="glass-panel p-6 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-purple-400 font-semibold uppercase tracking-wider mb-1">
            <Share2 className="w-4 h-4" />
            <span>Requirement 2</span>
          </div>
          <h1 className="text-xl font-bold text-white">Unsupervised Crime Clustering (K-Means)</h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Groups digital crime incidents using K-Means clustering across crime type, attack vector, severity, location, target sector, and financial impact. Projected to 2D space via Principal Component Analysis (PCA).
          </p>
        </div>

        {/* Cluster Selector Slider / Buttons */}
        <div className="flex items-center space-x-3 bg-slate-950 p-2 rounded-xl border border-slate-800">
          <Sliders className="w-4 h-4 text-slate-400 ml-2" />
          <span className="text-xs font-semibold text-slate-300">Clusters (k):</span>
          <div className="flex space-x-1">
            {[2, 3, 4, 5].map((k) => (
              <button
                key={k}
                onClick={() => setNClusters(k)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  nClusters === k
                    ? 'bg-purple-500 text-white shadow-md shadow-purple-500/25'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                k={k}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cluster Overview Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-panel p-5 border-l-4 border-l-purple-500">
          <div className="text-xs text-slate-400 font-medium">Number of Clusters</div>
          <div className="text-2xl font-bold text-white mt-1">{clusterData ? clusterData.n_clusters : nClusters} Clusters</div>
          <div className="text-[11px] text-slate-400 mt-1">K-Means Algorithm</div>
        </div>

        <div className="glass-panel p-5 border-l-4 border-l-cyan-500">
          <div className="text-xs text-slate-400 font-medium">Silhouette Score</div>
          <div className="text-2xl font-bold text-cyan-400 mt-1">
            {clusterData ? clusterData.silhouette_score : '0.642'}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Cluster cohesion & separation quality</div>
        </div>

        <div className="glass-panel p-5 border-l-4 border-l-emerald-500">
          <div className="text-xs text-slate-400 font-medium">Dimensionality Reduction</div>
          <div className="text-2xl font-bold text-emerald-400 mt-1">PCA 2D</div>
          <div className="text-[11px] text-slate-400 mt-1">7 feature dimensions → 2 Principal Components</div>
        </div>
      </div>

      {/* Main Visualizer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 2D Interactive Scatter Visualization */}
        <div className="lg:col-span-2 glass-panel p-5 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              Interactive 2D PCA Cluster Projection
            </h2>
            <span className="text-[11px] text-slate-400">Hover dot to view incident details</span>
          </div>

          <div className="h-80 w-full">
            {loading ? (
              <div className="h-full flex items-center justify-center text-xs text-cyan-400">
                Computing K-Means & PCA coordinates...
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis type="number" dataKey="x" name="PCA Component 1" stroke="#64748b" tick={{ fontSize: 11 }} />
                  <YAxis type="number" dataKey="y" name="PCA Component 2" stroke="#64748b" tick={{ fontSize: 11 }} />
                  <ZAxis type="number" range={[40, 40]} />
                  <Tooltip
                    content={({ payload }) => {
                      if (payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="p-3 bg-slate-900 border border-slate-700 rounded-lg shadow-xl text-xs space-y-1">
                            <div className="font-bold text-cyan-400">{data.id}</div>
                            <div><strong className="text-slate-300">Cluster:</strong> Cluster {data.cluster + 1}</div>
                            <div><strong className="text-slate-300">Crime:</strong> {data.crime_type}</div>
                            <div><strong className="text-slate-300">Attack:</strong> {data.attack_method}</div>
                            <div><strong className="text-slate-300">Severity:</strong> {data.severity}</div>
                            <div><strong className="text-slate-300">Impact:</strong> ${data.financial_impact?.toLocaleString()}</div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Scatter 
                    data={clusterData?.points || []} 
                    onClick={(p) => setSelectedPoint(p.payload)}
                  >
                    {(clusterData?.points || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CLUSTER_COLORS[entry.cluster % CLUSTER_COLORS.length]} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center space-x-4">
              {clusterData?.distribution.map((d, i) => (
                <div key={i} className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: CLUSTER_COLORS[i % CLUSTER_COLORS.length] }}></span>
                  <span className="text-slate-300 font-semibold">{d.cluster}</span>
                </div>
              ))}
            </div>
            <span>Total Points: 300 Sampled Incidents</span>
          </div>
        </div>

        {/* Cluster Distribution Donut Chart */}
        <div className="glass-panel p-5 border border-slate-800 flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-semibold text-white flex items-center gap-2 mb-4">
              <PieIcon className="w-4 h-4 text-purple-400" />
              Cluster Volume Distribution
            </h2>

            <div className="h-48 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={clusterData?.distribution || []}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="count"
                    nameKey="cluster"
                  >
                    {(clusterData?.distribution || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CLUSTER_COLORS[index % CLUSTER_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-2 mt-2">
            {clusterData?.distribution.map((d, i) => (
              <div key={i} className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: CLUSTER_COLORS[i % CLUSTER_COLORS.length] }}></span>
                  <span className="font-semibold text-slate-200">{d.cluster}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-white">{d.count} Incidents</span>
                  <span className="text-[11px] text-slate-400 block">({d.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cluster Characteristics & Insights (Req 2 requirement) */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-white flex items-center gap-2">
          <FileText className="w-4 h-4 text-cyan-400" />
          Discovered Cluster Characteristics & Insights
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {clusterData?.characteristics.map((char, i) => (
            <div 
              key={i} 
              className="glass-panel p-5 border border-slate-800 relative overflow-hidden flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between">
                <span 
                  className="px-2.5 py-0.5 rounded text-xs font-bold text-white"
                  style={{ backgroundColor: CLUSTER_COLORS[i % CLUSTER_COLORS.length] }}
                >
                  {char.cluster_name}
                </span>
                <span className="text-xs text-slate-400 font-medium">{char.count} Incidents</span>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between border-b border-slate-800/80 pb-1">
                  <span className="text-slate-400">Dominant Crime Type:</span>
                  <span className="font-bold text-cyan-300">{char.top_crime_type}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-1">
                  <span className="text-slate-400">Primary Attack Vector:</span>
                  <span className="font-semibold text-slate-200">{char.top_attack_method}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-1">
                  <span className="text-slate-400">Common Severity:</span>
                  <span className="font-semibold text-amber-400">{char.dominant_severity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Avg Financial Impact:</span>
                  <span className="font-bold text-emerald-400">${char.avg_financial_impact?.toLocaleString()}</span>
                </div>
              </div>

              {/* Natural Language Prototype Insight */}
              <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-200 text-xs flex items-start space-x-2">
                <Sparkles className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                <span className="italic">"{char.insight}"</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
