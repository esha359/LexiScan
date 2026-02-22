function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-inner">
                    <div className="footer-text">
                        © 2026 LexiScan — Table-Driven Lexical Analyzer | Compiler Construction Project | Developed by <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>Esha</span>
                    </div>
                    <div className="footer-links">
                        <a href="https://en.wikipedia.org/wiki/Lexical_analysis" target="_blank" rel="noreferrer">
                            Wiki: Lexical Analysis
                        </a>
                        <a href="https://en.wikipedia.org/wiki/Deterministic_finite_automaton" target="_blank" rel="noreferrer">
                            Wiki: DFA
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
