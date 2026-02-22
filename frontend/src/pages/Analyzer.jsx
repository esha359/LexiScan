import { useState } from 'react';
import { motion } from 'framer-motion';
import CodeEditor from '../components/CodeEditor';
import TokenTable from '../components/TokenTable';
import TokenStats from '../components/TokenStats';
import TransitionTable from '../components/TransitionTable';
import AnimatedVisualizer from '../components/AnimatedVisualizer';
import { analyzeCode } from '../utils/api';

function Analyzer() {
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [activeTab, setActiveTab] = useState('tokens');
    const [error, setError] = useState(null);

    const handleAnalyze = () => {
        if (!code.trim()) return;

        setLoading(true);
        setError(null);

        try {
            const data = analyzeCode(code);
            setResult(data);
            setActiveTab('tokens');
        } catch (err) {
            console.error('Analysis failed:', err);
            setError('Failed to analyze code. Please check your input.');
        } finally {
            setLoading(false);
        }
    };

    const tabs = [
        { id: 'tokens', label: '🔍 Tokens', count: result?.totalTokens },
        { id: 'visualizer', label: '🎬 Visualizer' },
        { id: 'stats', label: '📊 Statistics' },
        { id: 'table', label: '📋 DFA Table' },
    ];

    return (
        <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
            <div className="container">
                {/* Page Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ marginBottom: '32px' }}
                >
                    <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '8px' }}>
                        <span className="gradient-text">Lexical Analyzer</span>
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
                        Enter source code below and watch the table-driven DFA tokenize it in real-time
                    </p>
                </motion.div>

                <div className="analyzer-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '24px' }}>
                    {/* Left Panel - Code Editor */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="glass-card" style={{ padding: '24px' }}>
                            <div className="panel-header">
                                <div className="panel-icon" style={{ background: 'rgba(0, 212, 255, 0.15)' }}>📝</div>
                                <div>
                                    <div className="panel-title">Source Code</div>
                                    <div className="panel-subtitle">Enter or select a sample</div>
                                </div>
                            </div>
                            <CodeEditor
                                code={code}
                                setCode={setCode}
                                onAnalyze={handleAnalyze}
                                loading={loading}
                            />
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={{
                                        marginTop: '12px',
                                        padding: '12px 16px',
                                        borderRadius: 'var(--radius-sm)',
                                        background: 'rgba(239, 68, 68, 0.1)',
                                        border: '1px solid rgba(239, 68, 68, 0.2)',
                                        color: '#ef4444',
                                        fontSize: '13px'
                                    }}
                                >
                                    ⚠️ {error}
                                </motion.div>
                            )}
                        </div>
                    </motion.div>

                    {/* Right Panel - Results */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <div className="glass-card" style={{ padding: '24px' }}>
                            <div className="panel-header">
                                <div className="panel-icon" style={{ background: 'rgba(168, 85, 247, 0.15)' }}>📊</div>
                                <div>
                                    <div className="panel-title">Analysis Results</div>
                                    <div className="panel-subtitle">
                                        {result ? `${result.totalTokens} tokens found` : 'Waiting for analysis...'}
                                    </div>
                                </div>
                            </div>

                            {/* Tabs */}
                            <div className="tabs">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                                        onClick={() => setActiveTab(tab.id)}
                                    >
                                        {tab.label}
                                        {tab.count !== undefined && tab.count !== null && (
                                            <span style={{
                                                marginLeft: '6px',
                                                padding: '1px 8px',
                                                borderRadius: '50px',
                                                background: 'rgba(0, 212, 255, 0.15)',
                                                fontSize: '11px',
                                                fontFamily: 'var(--font-mono)'
                                            }}>
                                                {tab.count}
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Tab Content */}
                            <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                                {activeTab === 'tokens' && (
                                    <TokenTable tokens={result?.tokens} />
                                )}
                                {activeTab === 'visualizer' && (
                                    <AnimatedVisualizer stateTransitions={result?.stateTransitions} />
                                )}
                                {activeTab === 'stats' && (
                                    <TokenStats
                                        tokenStats={result?.tokenStats}
                                        totalTokens={result?.totalTokens || 0}
                                    />
                                )}
                                {activeTab === 'table' && (
                                    <TransitionTable />
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default Analyzer;
