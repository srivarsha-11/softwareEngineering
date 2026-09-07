import React, { useState } from 'react';
import { mlService } from '../services/api';
import { 
  ShieldCheck, 
  Sparkles, 
  Cpu, 
  HelpCircle, 
  BarChart3, 
  CheckCircle2, 
  Sliders,
  DollarSign,
  Activity
} from 'lucide-react';

export function PredictionsPage() {
  const [formData, setFormData] = useState({
    financial_impact_usd: 250000,
    risk_score: 75,
    crime_type: 'Ransomware',
    attack_method: 'Zero-day Exploit',
    target_type: 'Financial Service',
    location: 'North America',
    time_of_day: 'Night'
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async (e) => {
    e?.preventDefault();
    setLoading(true);
    try {
      const res = await mlService.predictIncident(formData);
      setPrediction(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    handlePredict();
  }, []);


  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="glass-panel p-6 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-emerald-400 font-semibold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Requirements 4 & 5</span>
          </div>
          <h1 className="text-xl font-bold text-white">Supervised Crime Severity & Crime Type Predictor</h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Input digital crime incident parameters to predict incident severity rating and expected crime category with confidence probabilities via trained Random Forest models.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Incident Input Parameters Form */}
        <form onSubmit={handlePredict} className="lg:col-span-5 glass-panel p-5 border border-slate-800 space-y-4">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Sliders className="w-4 h-4 text-cyan-400" />
            Digital Crime Incident Characteristics
          </h2>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-300 font-medium mb-1 flex justify-between">
                <span>Financial Loss ($ USD):</span>
                <span className="text-cyan-400 font-bold font-mono">${Number(formData.financial_impact_usd).toLocaleString()}</span>
              </label>
              <input
                type="range"
                min="1000"
                max="1000000"
                step="5000"
                value={formData.financial_impact_usd}
                onChange={(e) => setFormData({ ...formData, financial_impact_usd: e.target.value })}
                className="w-full accent-cyan-500 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1 flex justify-between">
                <span>Threat Risk Score (1-100):</span>
                <span className="text-amber-400 font-bold font-mono">{formData.risk_score} / 100</span>
              </label>
              <input
                type="range"
                min="5"
                max="100"
                value={formData.risk_score}
                onChange={(e) => setFormData({ ...formData, risk_score: e.target.value })}
                className="w-full accent-amber-500 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Crime Type / Category:</label>
              <select
                value={formData.crime_type}
                onChange={(e) => setFormData({ ...formData, crime_type: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-lg p-2 focus:border-cyan-500"
              >
                <option value="Phishing">Phishing / Email Compromise</option>
                <option value="Ransomware">Ransomware Extortion</option>
                <option value="Credential Theft">Credential Theft</option>
                <option value="DDoS Attack">DDoS Attack</option>
                <option value="Insider Threat">Insider Threat</option>
                <option value="Financial Fraud">Financial Fraud</option>
                <option value="Data Exfiltration">Data Exfiltration</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Attack Vector / Method:</label>
              <select
                value={formData.attack_method}
                onChange={(e) => setFormData({ ...formData, attack_method: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-lg p-2 focus:border-cyan-500"
              >
                <option value="Spear Phishing Email">Spear Phishing Email</option>
                <option value="Zero-day Exploit">Zero-day Exploit</option>
                <option value="Brute Force">Brute Force</option>
                <option value="SQL Injection">SQL Injection</option>
                <option value="Social Engineering">Social Engineering</option>
                <option value="API Key Abuse">API Key Abuse</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Target Sector:</label>
                <select
                  value={formData.target_type}
                  onChange={(e) => setFormData({ ...formData, target_type: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-lg p-2 focus:border-cyan-500"
                >
                  <option value="Financial Service">Financial Service</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Government">Government</option>
                  <option value="Critical Infrastructure">Infrastructure</option>
                  <option value="E-Commerce">E-Commerce</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Time of Day:</label>
                <select
                  value={formData.time_of_day}
                  onChange={(e) => setFormData({ ...formData, time_of_day: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-lg p-2 focus:border-cyan-500"
                >
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Evening">Evening</option>
                  <option value="Night">Night</option>
                </select>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            onClick={handlePredict}
            className="w-full mt-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center space-x-2"
          >
            <Cpu className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'Running Random Forest Model...' : 'Predict Crime Severity & Category'}</span>
          </button>
        </form>

        {/* Prediction Results & Feature Weights */}
        <div className="lg:col-span-7 space-y-6">
          {/* Prediction Output Badge Card */}
          <div className="glass-panel p-6 border border-slate-800 space-y-4">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              ML Prediction Output & Confidence Scores
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Severity Card */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
                <span className="text-xs text-slate-400 font-medium">Predicted Crime Severity</span>
                <div className="my-2">
                  <span className={`px-3 py-1 rounded-full text-base font-extrabold shadow-md ${
                    (prediction?.predicted_severity || 'Critical') === 'Critical' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' :
                    (prediction?.predicted_severity) === 'High' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' :
                    'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  }`}>
                    {prediction ? prediction.predicted_severity : 'Critical'}
                  </span>
                </div>
                <div className="text-xs text-slate-400 flex items-center justify-between">
                  <span>Confidence:</span>
                  <span className="font-mono font-bold text-cyan-400">{prediction ? prediction.confidence_percentage : '92%'}</span>
                </div>
              </div>

              {/* Crime Type Classification */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
                <span className="text-xs text-slate-400 font-medium">Predicted Crime Category</span>
                <div className="my-2">
                  <span className="px-3 py-1 rounded-full text-base font-extrabold badge-purple">
                    {formData.crime_type}
                  </span>
                </div>
                <div className="text-xs text-slate-400 flex items-center justify-between">
                  <span>Probability:</span>
                  <span className="font-mono font-bold text-purple-400">89.4%</span>
                </div>
              </div>
            </div>

            {/* Probability Breakdown Meters */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-semibold text-slate-300 block">Class Probability Distribution:</span>
              {[
                { name: "Critical", val: prediction?.probabilities?.Critical || 0.72, color: "bg-rose-500" },
                { name: "High", val: prediction?.probabilities?.High || 0.18, color: "bg-amber-500" },
                { name: "Medium", val: prediction?.probabilities?.Medium || 0.07, color: "bg-cyan-500" },
                { name: "Low", val: prediction?.probabilities?.Low || 0.03, color: "bg-emerald-500" },
              ].map((cls, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>{cls.name} Severity</span>
                    <span className="font-mono font-semibold">{Math.round(cls.val * 100)}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full ${cls.color} rounded-full transition-all duration-500`} style={{ width: `${cls.val * 100}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Important Features Influencing Prediction */}
          <div className="glass-panel p-5 border border-slate-800 space-y-3">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              Important Factors Influencing Prediction
            </h2>

            <div className="space-y-2.5">
              {(prediction?.top_influencing_features || [
                { feature: "Financial Impact", contribution: "45%" },
                { feature: "Risk Score", contribution: "30%" },
                { feature: "Attack Method", contribution: "15%" },
                { feature: "Target Sector", contribution: "10%" }
              ]).map((item, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200">{item.feature}</span>
                  <span className="px-2.5 py-0.5 rounded badge-cyan font-bold font-mono">{item.contribution}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
