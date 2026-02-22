import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';

const features = [
    {
        icon: '⚡',
        title: 'Table-Driven Analysis',
        text: 'Uses a DFA transition table to classify tokens — the same approach used in production compilers. Each character is processed through state transitions.',
        gradient: 'linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(0, 212, 255, 0.05))',
        borderColor: 'rgba(0, 212, 255, 0.3)',
        topColor: 'var(--accent-cyan)',
    },
    {
        icon: '🎬',
        title: 'Animated Visualization',
        text: 'Watch the DFA process each character in real-time with step-by-step state transition animations. Control playback speed and navigate between tokens.',
        gradient: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(168, 85, 247, 0.05))',
        borderColor: 'rgba(168, 85, 247, 0.3)',
        topColor: 'var(--accent-purple)',
    },
    {
        icon: '📊',
        title: 'Token Statistics',
        text: 'Get detailed breakdowns of token distribution with beautiful animated charts. See which token types dominate your code.',
        gradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(16, 185, 129, 0.05))',
        borderColor: 'rgba(16, 185, 129, 0.3)',
        topColor: 'var(--accent-green)',
    },
    {
        icon: '🔍',
        title: 'Complete Token Table',
        text: 'View every token with its lexeme, type, line number, and column position. Color-coded badges make it easy to identify token types.',
        gradient: 'linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(251, 191, 36, 0.05))',
        borderColor: 'rgba(251, 191, 36, 0.3)',
        topColor: 'var(--accent-yellow)',
    },
    {
        icon: '📋',
        title: 'DFA Transition Table',
        text: 'Explore the complete state transition table that drives the analyzer. See how each input symbol maps to the next state.',
        gradient: 'linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(236, 72, 153, 0.05))',
        borderColor: 'rgba(236, 72, 153, 0.3)',
        topColor: 'var(--accent-pink)',
    },
    {
        icon: '💾',
        title: 'Analysis History',
        text: 'All your analyses are automatically saved. Browse past results, compare token distributions, and track your code analysis journey.',
        gradient: 'linear-gradient(135deg, rgba(251, 146, 60, 0.2), rgba(251, 146, 60, 0.05))',
        borderColor: 'rgba(251, 146, 60, 0.3)',
        topColor: 'var(--accent-orange)',
    },
];

const howItWorks = [
    {
        step: '01',
        title: 'Input Source Code',
        text: 'Enter or paste your C/C++ source code into the editor, or choose from pre-built sample snippets.',
        color: 'var(--accent-cyan)',
    },
    {
        step: '02',
        title: 'Character-by-Character Scanning',
        text: 'The analyzer reads each character and uses the transition table to determine state changes in the DFA.',
        color: 'var(--accent-purple)',
    },
    {
        step: '03',
        title: 'State Transitions',
        text: 'Based on the current state and input character, the DFA transitions to the next state using the lookup table.',
        color: 'var(--accent-pink)',
    },
    {
        step: '04',
        title: 'Token Classification',
        text: 'When an accepting state is reached, the accumulated lexeme is classified as a keyword, identifier, number, operator, etc.',
        color: 'var(--accent-green)',
    },
];

function Home() {
    return (
        <div>
            <Hero />

            {/* Features Section */}
            <section className="section">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="section-label">✨ Features</span>
                        <h2 className="section-title">
                            Everything You Need to{' '}
                            <span className="gradient-text">Understand Lexical Analysis</span>
                        </h2>
                        <p className="section-subtitle">
                            A comprehensive toolkit for visualizing and understanding how compilers tokenize source code
                        </p>
                    </motion.div>

                    <div className="features-grid">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                className="feature-card"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                style={{ '--feature-border': feature.borderColor }}
                            >
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    height: '3px',
                                    background: feature.topColor,
                                    borderRadius: '3px 3px 0 0'
                                }} />
                                <div
                                    className="feature-icon"
                                    style={{ background: feature.gradient }}
                                >
                                    {feature.icon}
                                </div>
                                <h3 className="feature-title">{feature.title}</h3>
                                <p className="feature-text">{feature.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="section" style={{ background: 'rgba(15, 15, 46, 0.3)' }}>
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="section-label">🔄 Process</span>
                        <h2 className="section-title">
                            How <span className="gradient-text-secondary">Table-Driven</span> Analysis Works
                        </h2>
                        <p className="section-subtitle">
                            The lexical analyzer follows a systematic process to convert source code into tokens
                        </p>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                        {howItWorks.map((step, index) => (
                            <motion.div
                                key={index}
                                className="glass-card"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15, duration: 0.5 }}
                                style={{ padding: '32px' }}
                            >
                                <div style={{
                                    fontSize: '40px',
                                    fontWeight: 900,
                                    fontFamily: 'var(--font-mono)',
                                    color: step.color,
                                    opacity: 0.3,
                                    marginBottom: '12px'
                                }}>
                                    {step.step}
                                </div>
                                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>{step.title}</h3>
                                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{step.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={{
                            textAlign: 'center',
                            padding: '64px 32px',
                            borderRadius: 'var(--radius-xl)',
                            background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.08), rgba(168, 85, 247, 0.08))',
                            border: '1px solid rgba(0, 212, 255, 0.15)',
                        }}
                    >
                        <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, marginBottom: '16px' }}>
                            Ready to <span className="gradient-text">Analyze</span> Your Code?
                        </h2>
                        <p style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '32px', maxWidth: '500px', margin: '0 auto 32px' }}>
                            Paste your source code and watch the lexical analyzer break it down into tokens in real-time
                        </p>
                        <Link to="/analyzer" className="btn-primary" style={{ fontSize: '16px', padding: '16px 40px' }}>
                            ⚡ Launch Analyzer
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

export default Home;
