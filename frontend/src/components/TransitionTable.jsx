import { useState } from 'react';
import { motion } from 'framer-motion';
import { getTransitionTable } from '../utils/api';

function TransitionTable() {
    const [tableData] = useState(() => getTransitionTable());
    const loading = false;

    if (loading) {
        return (
            <div style={{ padding: '40px', textAlign: 'center' }}>
                <div className="spinner" style={{ margin: '0 auto', borderTopColor: 'var(--accent-cyan)' }} />
                <p style={{ marginTop: '16px', color: 'var(--text-muted)' }}>Loading transition table...</p>
            </div>
        );
    }

    if (!tableData) {
        return (
            <div className="empty-state">
                <div className="empty-state-icon">⚠️</div>
                <div className="empty-state-title">Failed to Load</div>
                <div className="empty-state-text">Could not load the transition table data</div>
            </div>
        );
    }

    const stateKeys = Object.keys(tableData.states);
    const inputSymbols = ['letter', 'digit', '_', '.', '+', '-', '*', '/', '%', '(', ')', '{', '}', '[', ']', ';', ',', '"', "'", '=', '<', '>', '!', ' '];

    const getStateClass = (stateKey) => {
        const state = tableData.states[stateKey];
        if (!state) return '';
        if (state.type === 'start') return 'start';
        if (state.type === 'accepting') return 'accepting';
        if (state.type === 'error') return 'error';
        return '';
    };

    return (
        <div>
            {/* State Nodes Visualization */}
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px',
                justifyContent: 'center',
                marginBottom: '32px',
                padding: '24px',
                background: 'rgba(10, 10, 26, 0.5)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-color)'
            }}>
                {stateKeys.map((stateKey, index) => (
                    <motion.div
                        key={stateKey}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05, type: 'spring', stiffness: 200 }}
                        style={{ textAlign: 'center' }}
                    >
                        <div className={`state-node ${getStateClass(stateKey)}`}>
                            {stateKey}
                        </div>
                        <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px', maxWidth: '60px' }}>
                            {tableData.states[stateKey].label}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Legend */}
            <div style={{
                display: 'flex',
                gap: '24px',
                justifyContent: 'center',
                marginBottom: '24px',
                flexWrap: 'wrap'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                    <div className="state-node start" style={{ width: '24px', height: '24px', fontSize: '8px' }}>q0</div>
                    Start State
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                    <div className="state-node accepting" style={{ width: '24px', height: '24px', fontSize: '8px' }}>qn</div>
                    Accepting State
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                    <div className="state-node error" style={{ width: '24px', height: '24px', fontSize: '8px' }}>qe</div>
                    Error State
                </div>
            </div>

            {/* Transition Table */}
            <div className="token-table-wrapper">
                <table className="token-table">
                    <thead>
                        <tr>
                            <th style={{ position: 'sticky', left: 0, background: 'rgba(15, 15, 46, 0.95)', zIndex: 2 }}>
                                State
                            </th>
                            {inputSymbols.map((sym) => (
                                <th key={sym} style={{ textAlign: 'center', minWidth: '60px' }}>
                                    {sym === ' ' ? '⎵' : sym}
                                </th>
                            ))}
                            <th style={{ textAlign: 'center' }}>other</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stateKeys.map((stateKey, rowIndex) => {
                            const stateTransitions = tableData.transitions[stateKey] || {};
                            return (
                                <motion.tr
                                    key={stateKey}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: rowIndex * 0.04 }}
                                >
                                    <td style={{
                                        position: 'sticky',
                                        left: 0,
                                        background: 'rgba(15, 15, 46, 0.95)',
                                        zIndex: 1,
                                        fontWeight: 700
                                    }}>
                                        <span className={`state-node ${getStateClass(stateKey)}`} style={{ width: '32px', height: '32px', fontSize: '11px' }}>
                                            {stateKey}
                                        </span>
                                    </td>
                                    {inputSymbols.map((sym) => {
                                        const nextState = stateTransitions[sym];
                                        return (
                                            <td key={sym} style={{ textAlign: 'center' }}>
                                                {nextState ? (
                                                    <span style={{
                                                        padding: '2px 8px',
                                                        borderRadius: '4px',
                                                        background: 'rgba(0, 212, 255, 0.1)',
                                                        color: 'var(--accent-cyan)',
                                                        fontSize: '12px',
                                                        fontWeight: 600
                                                    }}>
                                                        {nextState}
                                                    </span>
                                                ) : (
                                                    <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>—</span>
                                                )}
                                            </td>
                                        );
                                    })}
                                    <td style={{ textAlign: 'center' }}>
                                        {stateTransitions['other'] ? (
                                            <span style={{
                                                padding: '2px 8px',
                                                borderRadius: '4px',
                                                background: 'rgba(168, 85, 247, 0.1)',
                                                color: 'var(--accent-purple)',
                                                fontSize: '12px',
                                                fontWeight: 600
                                            }}>
                                                {stateTransitions['other']}
                                            </span>
                                        ) : (
                                            <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>—</span>
                                        )}
                                    </td>
                                </motion.tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TransitionTable;
