import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function AnimatedVisualizer({ stateTransitions }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeStepIndex, setActiveStepIndex] = useState(0);
    const [speed, setSpeed] = useState(500);

    useEffect(() => {
        if (!isPlaying || !stateTransitions || stateTransitions.length === 0) return;

        const currentTransition = stateTransitions[activeIndex];
        if (!currentTransition) return;

        const timer = setInterval(() => {
            setActiveStepIndex((prev) => {
                if (prev >= currentTransition.path.length - 1) {
                    // Move to next token
                    setActiveIndex((prevIdx) => {
                        if (prevIdx >= stateTransitions.length - 1) {
                            setIsPlaying(false);
                            return prevIdx;
                        }
                        return prevIdx + 1;
                    });
                    return 0;
                }
                return prev + 1;
            });
        }, speed);

        return () => clearInterval(timer);
    }, [isPlaying, activeIndex, stateTransitions, speed]);

    if (!stateTransitions || stateTransitions.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-state-icon">🎬</div>
                <div className="empty-state-title">No Transitions</div>
                <div className="empty-state-text">Analyze some code to see the state transition animation</div>
            </div>
        );
    }

    const currentTransition = stateTransitions[activeIndex];

    return (
        <div>
            {/* Controls */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '20px',
                flexWrap: 'wrap'
            }}>
                <button
                    className="btn-primary"
                    style={{ padding: '8px 20px', fontSize: '13px' }}
                    onClick={() => {
                        if (isPlaying) {
                            setIsPlaying(false);
                        } else {
                            setActiveStepIndex(0);
                            setIsPlaying(true);
                        }
                    }}
                >
                    {isPlaying ? '⏸ Pause' : '▶ Play'}
                </button>

                <button
                    className="btn-secondary"
                    style={{ padding: '8px 20px', fontSize: '13px' }}
                    onClick={() => {
                        setActiveIndex(0);
                        setActiveStepIndex(0);
                        setIsPlaying(false);
                    }}
                >
                    ⟲ Reset
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Speed:</span>
                    <input
                        type="range"
                        min="100"
                        max="1000"
                        step="100"
                        value={1100 - speed}
                        onChange={(e) => setSpeed(1100 - parseInt(e.target.value))}
                        style={{ width: '100px', accentColor: 'var(--accent-cyan)' }}
                    />
                </div>
            </div>

            {/* Token selector */}
            <div style={{
                display: 'flex',
                gap: '6px',
                flexWrap: 'wrap',
                marginBottom: '20px'
            }}>
                {stateTransitions.map((t, idx) => (
                    <button
                        key={idx}
                        onClick={() => { setActiveIndex(idx); setActiveStepIndex(0); setIsPlaying(false); }}
                        style={{
                            padding: '4px 10px',
                            borderRadius: '6px',
                            border: activeIndex === idx ? '1px solid var(--accent-cyan)' : '1px solid var(--border-color)',
                            background: activeIndex === idx ? 'rgba(0, 212, 255, 0.15)' : 'transparent',
                            color: activeIndex === idx ? 'var(--accent-cyan)' : 'var(--text-muted)',
                            fontSize: '11px',
                            fontFamily: 'var(--font-mono)',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                    >
                        {t.lexeme.length > 12 ? t.lexeme.substring(0, 12) + '..' : t.lexeme}
                    </button>
                ))}
            </div>

            {/* Current token info */}
            <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    padding: '16px',
                    background: 'rgba(10, 10, 26, 0.5)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    marginBottom: '20px'
                }}
            >
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Processing Token {activeIndex + 1} of {stateTransitions.length}
                </div>
                <div style={{
                    fontSize: '20px',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    color: 'var(--accent-cyan)'
                }}>
                    "{currentTransition.lexeme}"
                </div>
            </motion.div>

            {/* State transition flow */}
            <div className="transition-flow">
                {currentTransition.path.map((step, stepIdx) => (
                    <div key={stepIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <motion.div
                            className="transition-item"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: stepIdx * 0.05 }}
                        >
                            {stepIdx > 0 && (
                                <div className="transition-char">
                                    '{step.char}'
                                </div>
                            )}
                            <div
                                className={`state-node ${stepIdx === activeStepIndex ? 'active' : ''
                                    } ${stepIdx === 0 ? 'start' : ''} ${stepIdx === currentTransition.path.length - 1 ? 'accepting' : ''
                                    }`}
                                style={{ width: '40px', height: '40px', fontSize: '11px' }}
                            >
                                {step.state}
                            </div>
                            <div className="transition-label">{step.label}</div>
                        </motion.div>

                        {stepIdx < currentTransition.path.length - 1 && (
                            <motion.div
                                className="transition-arrow"
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: stepIdx < activeStepIndex ? 1 : 0.3,
                                    color: stepIdx < activeStepIndex ? 'var(--accent-cyan)' : 'var(--text-muted)'
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                →
                            </motion.div>
                        )}
                    </div>
                ))}
            </div>

            {/* Progress bar */}
            <div style={{
                marginTop: '16px',
                height: '4px',
                background: 'var(--border-color)',
                borderRadius: '4px',
                overflow: 'hidden'
            }}>
                <motion.div
                    style={{
                        height: '100%',
                        background: 'var(--gradient-primary)',
                        borderRadius: '4px',
                    }}
                    animate={{
                        width: `${((activeIndex * 100) / stateTransitions.length) +
                            ((activeStepIndex * 100) / (currentTransition.path.length * stateTransitions.length))}%`
                    }}
                    transition={{ duration: 0.3 }}
                />
            </div>
        </div>
    );
}

export default AnimatedVisualizer;
