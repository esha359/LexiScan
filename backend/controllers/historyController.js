const fs = require('fs');
const path = require('path');

const historyPath = path.join(__dirname, '..', 'data', 'history.json');

function loadHistory() {
    try {
        return JSON.parse(fs.readFileSync(historyPath, 'utf-8'));
    } catch (e) {
        return [];
    }
}

function saveHistory(data) {
    fs.writeFileSync(historyPath, JSON.stringify(data, null, 2));
}

exports.getHistory = (req, res) => {
    try {
        const history = loadHistory();
        res.json(history);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load history' });
    }
};

exports.clearHistory = (req, res) => {
    try {
        saveHistory([]);
        res.json({ message: 'History cleared successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to clear history' });
    }
};

exports.deleteHistoryItem = (req, res) => {
    try {
        const { id } = req.params;
        let history = loadHistory();
        history = history.filter(item => item.id !== id);
        saveHistory(history);
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete history item' });
    }
};
