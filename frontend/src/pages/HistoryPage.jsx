import { motion } from 'framer-motion';
import History from '../components/History';

function HistoryPage() {
    return (
        <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
            <div className="container" style={{ maxWidth: '900px' }}>
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">📋 History</span>
                    <h1 className="section-title">
                        Analysis <span className="gradient-text">History</span>
                    </h1>
                    <p className="section-subtitle">
                        Browse your past code analysis sessions and results
                    </p>
                </motion.div>

                <motion.div
                    className="glass-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    style={{ padding: '24px' }}
                >
                    <History />
                </motion.div>
            </div>
        </div>
    );
}

export default HistoryPage;
