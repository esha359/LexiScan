import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getHistory, clearHistory, deleteHistoryItem } from '../utils/api';

function History() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchHistory = () => {
        try {
            const data = getHistory();
            setHistory(data);
        } catch (err) {
            console.error('Failed to load history:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    const handleClear = () => {
        clearHistory();
        setHistory([]);
    };

    const handleDelete = (id) => {
        deleteHistoryItem(id);
        setHistory(history.filter(item => item.id !== id));
    };

    if (loading) {
        return (
            <div style={{ padding: '40px', textAlign: 'center' }}>
                <div className="spinner" style={{ margin: '0 auto', borderTopColor: 'var(--accent-cyan)' }} />
            </div>
        );
    }

    if (history.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-state-icon">📋</div>
                <div className="empty-state-title">No History</div>
                <div className="empty-state-text">Your analysis history will appear here</div>
            </div>
        );
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                    {history.length} analysis record{history.length > 1 ? 's' : ''}
                </span>
                <button className="clear-btn" onClick={handleClear}>
                    🗑 Clear All
                </button>
            </div>

            <div className="history-list">
                <AnimatePresence>
                    {history.map((item, index) => (
                        <motion.div
                            key={item.id}
                            className="history-item"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <div>
                                <div className="history-item-code">{item.sourceCode}</div>
                                <div className="history-item-date" style={{ marginTop: '4px' }}>
                                    {new Date(item.timestamp).toLocaleString()}
                                </div>
                            </div>
                            <div className="history-item-meta">
                                <span className="history-item-tokens">{item.totalTokens} tokens</span>
                                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                                    {Object.entries(item.tokenStats || {}).slice(0, 3).map(([type, count]) => (
                                        <span key={type} style={{
                                            padding: '2px 8px',
                                            borderRadius: '50px',
                                            fontSize: '10px',
                                            background: 'rgba(168, 85, 247, 0.1)',
                                            color: 'var(--accent-purple)',
                                            fontFamily: 'var(--font-mono)'
                                        }}>
                                            {type}: {count}
                                        </span>
                                    ))}
                                </div>
                                <button
                                    className="history-item-delete"
                                    onClick={() => handleDelete(item.id)}
                                    title="Delete"
                                >
                                    ✕
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default History;
