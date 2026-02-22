const express = require('express');
const router = express.Router();
const analyzerController = require('../controllers/analyzerController');

router.post('/analyze', analyzerController.analyzeCode);
router.get('/transition-table', analyzerController.getTransitionTable);
router.get('/token-types', analyzerController.getTokenTypes);

module.exports = router;
