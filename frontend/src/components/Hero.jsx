import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Hero() {
    return (
        <div className="hero">
            {/* Background Effects */}
            <div className="hero-bg-effects">
                <div className="hero-orb hero-orb-1" />
                <div className="hero-orb hero-orb-2" />
                <div className="hero-orb hero-orb-3" />
                <div className="hero-grid" />
            </div>

            {/* Floating code snippets */}
            <div className="hero-code-float" style={{ top: '15%', left: '5%' }}>
                {"int x = 42;"}
            </div>
            <div className="hero-code-float" style={{ top: '30%', right: '8%', animationDelay: '-3s' }}>
                {"if (token == ID)"}
            </div>
            <div className="hero-code-float" style={{ bottom: '25%', left: '8%', animationDelay: '-7s' }}>
                {"state = q0;"}
            </div>
            <div className="hero-code-float" style={{ bottom: '15%', right: '5%', animationDelay: '-11s' }}>
                {"return KEYWORD;"}
            </div>

            {/* Content */}
            <motion.div
                className="hero-content"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                <motion.div
                    className="hero-badge"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <span className="hero-badge-dot" />
                    Compiler Construction Project
                </motion.div>

                <motion.h1
                    className="hero-title"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.7 }}
                >
                    Table-Driven{' '}
                    <span className="gradient-text">Lexical</span>
                    <br />
                    <span className="gradient-text-secondary">Analyzer</span>
                </motion.h1>

                <motion.p
                    className="hero-subtitle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.7 }}
                >
                    Visualize how compilers break source code into tokens using
                    finite automata and transition tables. Watch the DFA in action
                    with beautiful real-time animations.
                </motion.p>

                <motion.div
                    className="hero-actions"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                >
                    <Link to="/analyzer" className="btn-primary">
                        ⚡ Start Analyzing
                    </Link>
                    <Link to="/learn" className="btn-secondary">
                        📖 Learn How It Works
                    </Link>
                </motion.div>

                <motion.div
                    className="hero-stats"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                >
                    <div className="hero-stat">
                        <div className="hero-stat-value gradient-text">15</div>
                        <div className="hero-stat-label">DFA States</div>
                    </div>
                    <div className="hero-stat">
                        <div className="hero-stat-value gradient-text-secondary">11</div>
                        <div className="hero-stat-label">Token Types</div>
                    </div>
                    <div className="hero-stat">
                        <div className="hero-stat-value gradient-text">75+</div>
                        <div className="hero-stat-label">Keywords</div>
                    </div>
                    <div className="hero-stat">
                        <div className="hero-stat-value gradient-text-secondary">∞</div>
                        <div className="hero-stat-label">Inputs Supported</div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default Hero;
