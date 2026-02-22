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
                gap: '8px',
                justifyContent: 'center',
                marginBottom: '16px',
                padding: '12px',
                background: 'rgba(10, 10, 26, 0.5)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)'
            }}>
                {stateKeys.map((stateKey, index) => (
                    <motion.div
                        key={stateKey}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.03, type: 'spring', stiffness: 200 }}
                        style={{ textAlign: 'center' }}
                    >
                        <div className={`state-node ${getStateClass(stateKey)}`} style={{ width: '28px', height: '28px', fontSize: '9px' }}>
                            {stateKey}
                        </div>
                        <div style={{ fontSize: '7px', color: 'var(--text-muted)', marginTop: '2px', maxWidth: '40px' }}>
                            {tableData.states[stateKey].label}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Legend */}
            <div style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'center',
                marginBottom: '12px',
                flexWrap: 'wrap'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', color: 'var(--text-secondary)' }}>
                    <div className="state-node start" style={{ width: '18px', height: '18px', fontSize: '7px' }}>q0</div>
                    Start
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', color: 'var(--text-secondary)' }}>
                    <div className="state-node accepting" style={{ width: '18px', height: '18px', fontSize: '7px' }}>qn</div>
                    Accepting
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', color: 'var(--text-secondary)' }}>
                    <div className="state-node error" style={{ width: '18px', height: '18px', fontSize: '7px' }}>qe</div>
                    Error
                </div>
            </div>

            {/* Transition Table */}
            <div className="token-table-wrapper" style={{ fontSize: '10px' }}>
                <table className="token-table" style={{ fontSize: '10px' }}>
                    <thead>
                        <tr>
                            <th style={{ position: 'sticky', left: 0, background: 'rgba(15, 15, 46, 0.95)', zIndex: 2, padding: '6px 8px', fontSize: '9px' }}>
                                State
                            </th>
                            {inputSymbols.map((sym) => (
                                <th key={sym} style={{ textAlign: 'center', minWidth: '32px', padding: '6px 2px', fontSize: '9px' }}>
                                    {sym === ' ' ? '⎵' : sym}
                                </th>
                            ))}
                            <th style={{ textAlign: 'center', padding: '6px 2px', fontSize: '9px' }}>other</th>
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
                                        fontWeight: 700,
                                        padding: '4px 6px'
                                    }}>
                                        <span className={`state-node ${getStateClass(stateKey)}`} style={{ width: '24px', height: '24px', fontSize: '8px' }}>
                                            {stateKey}
                                        </span>
                                    </td>
                                    {inputSymbols.map((sym) => {
                                        const nextState = stateTransitions[sym];
                                        return (
                                            <td key={sym} style={{ textAlign: 'center', padding: '3px 1px' }}>
                                                {nextState ? (
                                                    <span style={{
                                                        padding: '1px 4px',
                                                        borderRadius: '3px',
                                                        background: 'rgba(0, 212, 255, 0.1)',
                                                        color: 'var(--accent-cyan)',
                                                        fontSize: '9px',
                                                        fontWeight: 600
                                                    }}>
                                                        {nextState}
                                                    </span>
                                                ) : (
                                                    <span style={{ color: 'var(--text-muted)', fontSize: '9px' }}>—</span>
                                                )}
                                            </td>
                                        );
                                    })}
                                    <td style={{ textAlign: 'center', padding: '3px 1px' }}>
                                        {stateTransitions['other'] ? (
                                            <span style={{
                                                padding: '1px 4px',
                                                borderRadius: '3px',
                                                background: 'rgba(168, 85, 247, 0.1)',
                                                color: 'var(--accent-purple)',
                                                fontSize: '9px',
                                                fontWeight: 600
                                            }}>
                                                {stateTransitions['other']}
                                            </span>
                                        ) : (
                                            <span style={{ color: 'var(--text-muted)', fontSize: '9px' }}>—</span>
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
