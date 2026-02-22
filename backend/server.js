const express = require('express');
const cors = require('cors');
const path = require('path');

const analyzerRoutes = require('./routes/analyzerRoutes');
const historyRoutes = require('./routes/historyRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/api/analyzer', analyzerRoutes);
app.use('/api/history', historyRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Lexical Analyzer API is running' });
});

// Serve React frontend in production
const frontendBuildPath = path.join(__dirname, '..', 'frontend', 'dist');
app.use(express.static(frontendBuildPath));

// All non-API routes serve the React app (for client-side routing)
app.get('*', (req, res) => {
    res.sendFile(path.join(frontendBuildPath, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Lexical Analyzer Backend running on port ${PORT}`);
    console.log(`📊 API: http://localhost:${PORT}/api`);
});
