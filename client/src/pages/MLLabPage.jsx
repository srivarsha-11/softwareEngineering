import React, { useState } from 'react';
import { mlService } from '../services/api';
import { 
  FlaskConical, 
  Play, 
  CheckCircle2, 
  Sliders, 
  Cpu, 
  Sparkles, 
  BarChart3, 
  PieChart, 
  ArrowRight,
  Database,
  Layers,
  FileSpreadsheet
} from 'lucide-react';

export function MLLabPage() {
  const [task, setTask] = useState('severity');
  const [algorithm, setAlgorithm] = useState('Random Forest');
  const [testRatio, setTestRatio] = useState(0.2); // 80/20 split
  const [selectedFeatures, setSelectedFeatures] = useState([
    'attack_method', 'financial_impact_usd', 'target_type', 'risk_score', 'location'
  ]);

  const [isTraining, setIsTraining] = useState(false);
  const [trainingStep, setTrainingStep] = useState(0);
  const [trainingResults, setTrainingResults] = useState(null);

  const toggleFeature = (feat) => {
    if (selectedFeatures.includes(feat)) {
      setSelectedFeatures(selectedFeatures.filter(f => f !== feat));
    } else {
      setSelectedFeatures([...selectedFeatures, feat]);
    }
  };

  const pipelineSteps = [
    "1. Dataset Loading",
    "2. Data Preprocessing",
    "3. Feature Engineering",
    "4. Train/Test Split",
    "5. Model Training",
    "6. Model Evaluation",
    "7. Predictions & Insights"
  ];

  const handleTrainModel = async () => {
    setIsTraining(true);
    setTrainingResults(null);

    // Animate pipeline steps
    for (let i = 1; i <= 6; i++) {
      setTrainingStep(i);
      await new Promise(r => setTimeout(r, 350));
    }

    try {
      let res;
      if (task === 'clustering') {
        res = await mlService.clusterCrimes(3);
      } else if (task === 'anomaly') {
        res = await mlService.detectAnomalies(0.07);
      } else {
        res = await mlService.trainModel({
          target: task,
          algorithm: algorithm,
          test_size: testRatio,
          features: selectedFeatures
        });
      }
      setTrainingResults(res);
      setTrainingStep(7);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTraining(false);
    }
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="glass-panel p-6 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-cyan-400 font-semibold uppercase tracking-wider mb-1">
            <FlaskConical className="w-4 h-4" />
            <span>Requirement 7</span>
          </div>
          <h1 className="text-xl font-bold text-white">Dedicated ML Lab — Model Training Pipeline</h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Configure custom machine learning experiments, select algorithm hyper-parameters, adjust train/test ratios, toggle feature vectors, and execute real-time training workflows.
          </p>
        </div>
      </div>

      {/* Visual Pipeline Flow Diagram (Req 7 requirement) */}
      <div className="glass-panel p-5 border border-slate-800">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          Interactive Machine Learning Pipeline Workflow
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
          {pipelineSteps.map((stepName, idx) => {
            const stepNum = idx + 1;
            const isCompleted = trainingStep >= stepNum;
            const isCurrent = trainingStep === stepNum && isTraining;

            return (
              <div 
                key={idx} 
                className={`p-3 rounded-lg border text-center transition-all ${
                  isCurrent ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 animate-pulse glow-cyan' :
                  isCompleted ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' :
                  'bg-slate-900/60 border-slate-800 text-slate-500'
                }`}
              >
                <div className="text-[10px] font-bold uppercase mb-1">Step {stepNum}</div>
                <div className="text-xs font-semibold truncate">{stepName.split('. ')[1]}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lab Configuration Controls & Execution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Settings Panel */}
        <div className="lg:col-span-5 glass-panel p-5 border border-slate-800 space-y-4">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Sliders className="w-4 h-4 text-cyan-400" />
            ML Experiment Hyper-Parameters
          </h2>

          <div className="space-y-4 text-xs">
            {/* ML Task Selector */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">1. Select ML Task:</label>
              <select
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-lg p-2.5 focus:border-cyan-500"
              >
                <option value="severity">Crime Severity Prediction (Supervised)</option>
                <option value="crime_type">Crime Type Classification (Supervised)</option>
                <option value="clustering">Crime Incident Clustering (Unsupervised)</option>
                <option value="anomaly">Anomaly Outlier Detection (Unsupervised)</option>
              </select>
            </div>

            {/* Algorithm Selector */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">2. Select Algorithm:</label>
              <select
                value={algorithm}
                onChange={(e) => setAlgorithm(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-lg p-2.5 focus:border-cyan-500"
              >
                {task === 'clustering' ? (
                  <option value="K-Means">K-Means Clustering</option>
                ) : task === 'anomaly' ? (
                  <option value="Isolation Forest">Isolation Forest</option>
                ) : (
                  <>
                    <option value="Random Forest">Random Forest Classifier</option>
                    <option value="Decision Tree">Decision Tree Classifier</option>
                    <option value="Logistic Regression">Logistic Regression</option>
                  </>
                )}
              </select>
            </div>

            {/* Train/Test Split Ratio */}
            {task !== 'clustering' && task !== 'anomaly' && (
              <div>
                <label className="block text-slate-300 font-semibold mb-1 flex justify-between">
                  <span>3. Train / Test Split Ratio:</span>
                  <span className="text-cyan-400 font-bold font-mono">
                    {Math.round((1 - testRatio) * 100)}% Train / {Math.round(testRatio * 100)}% Test
                  </span>
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="0.4"
                  step="0.05"
                  value={testRatio}
                  onChange={(e) => setTestRatio(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>
            )}

            {/* Feature Selection Checkboxes */}
            <div>
              <label className="block text-slate-300 font-semibold mb-2">4. Feature Engineering Selection:</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'crime_type', label: 'Crime Type' },
                  { id: 'attack_method', label: 'Attack Method' },
                  { id: 'financial_impact_usd', label: 'Financial Impact' },
                  { id: 'target_type', label: 'Target Type' },
                  { id: 'location', label: 'Location' },
                  { id: 'risk_score', label: 'Risk Score' },
                  { id: 'time_of_day', label: 'Time of Day' },
                ].map((f) => (
                  <label key={f.id} className="flex items-center space-x-2 bg-slate-900 p-2 rounded-lg border border-slate-800 cursor-pointer hover:border-slate-700">
                    <input
                      type="checkbox"
                      checked={selectedFeatures.includes(f.id)}
                      onChange={() => toggleFeature(f.id)}
                      className="accent-cyan-500 rounded"
                    />
                    <span className="text-slate-300 font-medium">{f.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleTrainModel}
            disabled={isTraining}
            className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center space-x-2"
          >
            <Play className={`w-4 h-4 ${isTraining ? 'animate-spin' : ''}`} />
            <span>{isTraining ? 'Training Machine Learning Model...' : 'Train Model Now'}</span>
          </button>
        </div>

        {/* Results & Progress Output Panel */}
        <div className="lg:col-span-7 glass-panel p-5 border border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <h2 className="text-sm font-semibold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Model Training Output & Evaluation Results
            </h2>

            {isTraining && (
              <div className="py-12 text-center space-y-3">
                <Cpu className="w-10 h-10 text-cyan-400 animate-spin mx-auto" />
                <div className="text-sm font-bold text-white">Executing Pipeline Step {trainingStep} of 7</div>
                <div className="text-xs text-slate-400">{pipelineSteps[trainingStep - 1]}</div>
                <div className="w-64 h-2 bg-slate-800 rounded-full mx-auto overflow-hidden">
                  <div className="h-full bg-cyan-400 transition-all duration-300" style={{ width: `${(trainingStep / 7) * 100}%` }}></div>
                </div>
              </div>
            )}

            {!isTraining && trainingResults && (
              <div className="space-y-4 pt-2">
                <div className="p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Model Training Complete — {trainingResults.algorithm || algorithm}</span>
                  </div>
                  <span className="font-mono font-bold">1,000 Incidents Processed</span>
                </div>

                {/* Classification Metrics Grid */}
                {trainingResults.accuracy && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-center">
                      <div className="text-[11px] text-slate-400">Accuracy</div>
                      <div className="text-lg font-bold text-cyan-400">{Math.round(trainingResults.accuracy * 100)}%</div>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-center">
                      <div className="text-[11px] text-slate-400">Precision</div>
                      <div className="text-lg font-bold text-emerald-400">{Math.round(trainingResults.precision * 100)}%</div>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-center">
                      <div className="text-[11px] text-slate-400">Recall</div>
                      <div className="text-lg font-bold text-amber-400">{Math.round(trainingResults.recall * 100)}%</div>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-center">
                      <div className="text-[11px] text-slate-400">F1 Score</div>
                      <div className="text-lg font-bold text-purple-400">{trainingResults.f1_score}</div>
                    </div>
                  </div>
                )}

                {/* Feature Importance Output */}
                {trainingResults.feature_importance && (
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-slate-300">Top Trained Feature Weights:</span>
                    {trainingResults.feature_importance.slice(0, 4).map((f, i) => (
                      <div key={i} className="flex items-center justify-between text-xs p-2 bg-slate-900 rounded border border-slate-800">
                        <span className="text-slate-300 font-medium">{f.feature}</span>
                        <span className="font-mono text-cyan-300 font-bold">{(f.importance * 100).toFixed(1)}%</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {!isTraining && !trainingResults && (
              <div className="py-16 text-center text-slate-500 text-xs">
                Configure your hyper-parameters on the left and click "Train Model Now" to run the ML pipeline.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
