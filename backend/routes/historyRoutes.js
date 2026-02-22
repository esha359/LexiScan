const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historyController');

router.get('/', historyController.getHistory);
router.delete('/', historyController.clearHistory);
router.delete('/:id', historyController.deleteHistoryItem);

module.exports = router;
