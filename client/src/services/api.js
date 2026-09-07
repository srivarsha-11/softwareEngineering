import axios from 'axios';

const API_BASE = 'http://localhost:3001/api/ml';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const mlService = {
  // Preprocessing
  preprocess: async (payload = {}) => {
    const res = await api.post('/preprocess', payload);
    return res.data;
  },

  // Crime Clustering (K-Means + PCA 2D)
  clusterCrimes: async (nClusters = 3) => {
    const res = await api.post('/cluster', { n_clusters: nClusters });
    return res.data;
  },

  // Anomaly Detection (Isolation Forest)
  detectAnomalies: async (contamination = 0.07) => {
    const res = await api.post('/anomaly-detection', { contamination });
    return res.data;
  },

  // Model Training (ML Lab)
  trainModel: async (config) => {
    const res = await api.post('/train', config);
    return res.data;
  },

  // Crime Severity & Type Predictor
  predictIncident: async (incidentData) => {
    const res = await api.post('/predict', incidentData);
    return res.data;
  },

  // Model Metrics & Benchmark Comparison
  getModelMetrics: async () => {
    const res = await api.get('/model-metrics');
    return res.data;
  },

  // Feature Importance
  getFeatureImportance: async () => {
    const res = await api.get('/feature-importance');
    return res.data;
  },

  // Time Series Trend & Forecast
  getTimeSeries: async () => {
    const res = await api.get('/time-series');
    return res.data;
  },

  // Upload custom dataset
  uploadDataset: async (file) => {
    const formData = new FormData();
    formData.append('dataset', file);
    const res = await axios.post(`${API_BASE}/upload-dataset`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  }
};
