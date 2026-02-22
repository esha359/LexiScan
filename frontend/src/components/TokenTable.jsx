import { motion, AnimatePresence } from 'framer-motion';

const TOKEN_COLORS = {
    KEYWORD: { bg: 'rgba(255, 107, 157, 0.15)', text: '#ff6b9d', border: 'rgba(255, 107, 157, 0.3)' },
    IDENTIFIER: { bg: 'rgba(192, 132, 252, 0.15)', text: '#c084fc', border: 'rgba(192, 132, 252, 0.3)' },
    INTEGER: { bg: 'rgba(103, 232, 249, 0.15)', text: '#67e8f9', border: 'rgba(103, 232, 249, 0.3)' },
    FLOAT: { bg: 'rgba(52, 211, 153, 0.15)', text: '#34d399', border: 'rgba(52, 211, 153, 0.3)' },
    OPERATOR: { bg: 'rgba(251, 191, 36, 0.15)', text: '#fbbf24', border: 'rgba(251, 191, 36, 0.3)' },
    DELIMITER: { bg: 'rgba(251, 146, 60, 0.15)', text: '#fb923c', border: 'rgba(251, 146, 60, 0.3)' },
    STRING: { bg: 'rgba(163, 230, 53, 0.15)', text: '#a3e635', border: 'rgba(163, 230, 53, 0.3)' },
    COMPARISON: { bg: 'rgba(244, 114, 182, 0.15)', text: '#f472b6', border: 'rgba(244, 114, 182, 0.3)' },
    COMMENT: { bg: 'rgba(148, 163, 184, 0.15)', text: '#94a3b8', border: 'rgba(148, 163, 184, 0.3)' },
    ERROR: { bg: 'rgba(239, 68, 68, 0.15)', text: '#ef4444', border: 'rgba(239, 68, 68, 0.3)' },
};

const TOKEN_ICONS = {
    KEYWORD: '🔑',
    IDENTIFIER: '📝',
    INTEGER: '🔢',
    FLOAT: '💧',
    OPERATOR: '⚡',
    DELIMITER: '📌',
    STRING: '💬',
    COMPARISON: '⚖️',
    COMMENT: '💭',
    ERROR: '❌',
};

function TokenTable({ tokens }) {
    if (!tokens || tokens.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-state-icon">🔍</div>
                <div className="empty-state-title">No Tokens Yet</div>
                <div className="empty-state-text">Enter some code and click "Analyze" to see tokens</div>
            </div>
        );
    }

    return (
        <div className="token-table-wrapper">
            <table className="token-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Lexeme</th>
                        <th>Token Type</th>
                        <th>Line</th>
                        <th>Column</th>
                    </tr>
                </thead>
                <tbody>
                    <AnimatePresence>
                        {tokens.map((token, index) => {
                            const colors = TOKEN_COLORS[token.type] || TOKEN_COLORS.ERROR;
                            return (
                                <motion.tr
                                    key={token.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ delay: index * 0.03, duration: 0.3 }}
                                >
                                    <td style={{ color: 'var(--text-muted)' }}>{index + 1}</td>
                                    <td>
                                        <code style={{ color: colors.text }}>
                                            {token.lexeme.length > 30
                                                ? token.lexeme.substring(0, 30) + '...'
                                                : token.lexeme}
                                        </code>
                                    </td>
                                    <td>
                                        <span
                                            className="token-badge"
                                            style={{
                                                background: colors.bg,
                                                color: colors.text,
                                                border: `1px solid ${colors.border}`,
                                            }}
                                        >
                                            {TOKEN_ICONS[token.type] || '❓'} {token.type}
                                        </span>
                                    </td>
                                    <td style={{ color: 'var(--text-muted)' }}>{token.line}</td>
                                    <td style={{ color: 'var(--text-muted)' }}>{token.column}</td>
                                </motion.tr>
                            );
                        })}
                    </AnimatePresence>
                </tbody>
            </table>
        </div>
    );
}

export default TokenTable;
