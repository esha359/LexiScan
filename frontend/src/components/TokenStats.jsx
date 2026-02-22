import { motion } from 'framer-motion';

const STAT_CONFIG = {
    KEYWORD: { icon: '🔑', color: '#ff6b9d', label: 'Keywords' },
    IDENTIFIER: { icon: '📝', color: '#c084fc', label: 'Identifiers' },
    INTEGER: { icon: '🔢', color: '#67e8f9', label: 'Integers' },
    FLOAT: { icon: '💧', color: '#34d399', label: 'Floats' },
    OPERATOR: { icon: '⚡', color: '#fbbf24', label: 'Operators' },
    DELIMITER: { icon: '📌', color: '#fb923c', label: 'Delimiters' },
    STRING: { icon: '💬', color: '#a3e635', label: 'Strings' },
    COMPARISON: { icon: '⚖️', color: '#f472b6', label: 'Comparisons' },
    COMMENT: { icon: '💭', color: '#94a3b8', label: 'Comments' },
    ERROR: { icon: '❌', color: '#ef4444', label: 'Errors' },
};

function TokenStats({ tokenStats, totalTokens }) {
    if (!tokenStats || totalTokens === 0) {
        return (
            <div className="empty-state">
                <div className="empty-state-icon">📊</div>
                <div className="empty-state-title">No Statistics</div>
                <div className="empty-state-text">Analyze code to see token distribution</div>
            </div>
        );
    }

    const sortedStats = Object.entries(tokenStats).sort((a, b) => b[1] - a[1]);

    return (
        <div>
            {/* Summary bar */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                background: 'rgba(10, 10, 26, 0.5)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                marginBottom: '24px'
            }}>
                <div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Total Tokens</div>
                    <div style={{ fontSize: '28px', fontWeight: 800, fontFamily: 'var(--font-mono)' }} className="gradient-text">
                        {totalTokens}
                    </div>
                </div>
                <div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Token Types</div>
                    <div style={{ fontSize: '28px', fontWeight: 800, fontFamily: 'var(--font-mono)' }} className="gradient-text-secondary">
                        {Object.keys(tokenStats).length}
                    </div>
                </div>
                <div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Most Common</div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: STAT_CONFIG[sortedStats[0]?.[0]]?.color || 'white' }}>
                        {STAT_CONFIG[sortedStats[0]?.[0]]?.label || sortedStats[0]?.[0]}
                    </div>
                </div>
            </div>

            {/* Distribution bar */}
            <div style={{
                display: 'flex',
                height: '12px',
                borderRadius: '6px',
                overflow: 'hidden',
                marginBottom: '24px',
                border: '1px solid var(--border-color)'
            }}>
                {sortedStats.map(([type, count]) => {
                    const config = STAT_CONFIG[type];
                    const percentage = (count / totalTokens) * 100;
                    return (
                        <motion.div
                            key={type}
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            style={{
                                background: config?.color || '#64748b',
                                minWidth: percentage > 0 ? '4px' : 0,
                            }}
                            title={`${config?.label || type}: ${count} (${percentage.toFixed(1)}%)`}
                        />
                    );
                })}
            </div>

            {/* Stat cards grid */}
            <div className="stats-grid">
                {sortedStats.map(([type, count], index) => {
                    const config = STAT_CONFIG[type] || { icon: '❓', color: '#64748b', label: type };
                    const percentage = ((count / totalTokens) * 100).toFixed(1);

                    return (
                        <motion.div
                            key={type}
                            className="stat-card"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.08, duration: 0.4 }}
                            style={{ '--stat-color': config.color }}
                        >
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: '3px',
                                background: config.color,
                                borderRadius: '3px 3px 0 0'
                            }} />
                            <div className="stat-card-icon">{config.icon}</div>
                            <div className="stat-card-value" style={{ color: config.color }}>{count}</div>
                            <div className="stat-card-label">{config.label}</div>
                            <div className="stat-bar">
                                <motion.div
                                    className="stat-bar-fill"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${percentage}%` }}
                                    transition={{ delay: index * 0.08 + 0.3, duration: 0.8 }}
                                    style={{ background: config.color }}
                                />
                            </div>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px', fontFamily: 'var(--font-mono)' }}>
                                {percentage}%
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}

export default TokenStats;
