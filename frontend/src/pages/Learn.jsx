import { motion } from 'framer-motion';

const concepts = [
    {
        title: 'What is Lexical Analysis?',
        icon: '📖',
        color: 'var(--accent-cyan)',
        content: 'Lexical analysis (or scanning) is the first phase of a compiler. It reads the source code character by character and groups them into meaningful sequences called lexemes. Each lexeme is then classified into a token type like KEYWORD, IDENTIFIER, NUMBER, OPERATOR, etc.',
        code: `Source: int x = 42;\n\nTokens:\n  (KEYWORD, "int")\n  (IDENTIFIER, "x")\n  (COMPARISON, "=")\n  (INTEGER, "42")\n  (DELIMITER, ";")`
    },
    {
        title: 'Deterministic Finite Automaton (DFA)',
        icon: '🔄',
        color: 'var(--accent-purple)',
        content: 'A DFA is a mathematical model used to recognize patterns. It consists of states, an alphabet, transition functions, a start state, and accepting states. The lexer uses a DFA to determine when a valid token has been recognized.',
        code: `DFA = (Q, Σ, δ, q0, F)\n\nQ  = {q0, q1, q2, ...}  // States\nΣ  = {a-z, 0-9, +, ...} // Alphabet\nδ  = Q × Σ → Q          // Transitions\nq0 = Start State\nF  = {q3, q4, ...}      // Accepting States`
    },
    {
        title: 'Transition Table',
        icon: '📋',
        color: 'var(--accent-pink)',
        content: 'Instead of coding the DFA logic with if-else chains, a table-driven approach uses a 2D array where rows are states, columns are input characters, and cells contain the next state. This is efficient, maintainable, and easy to modify.',
        code: `         letter  digit   +    ;    other\nq0 →  [  q1,    q2,    q7,  q8,   q14 ]\nq1 →  [  q1,    q1,    q3,  q3,   q3  ]\nq2 →  [  q4,    q2,    q4,  q4,   q4  ]\n\nLookup: nextState = table[currentState][inputChar]`
    },
    {
        title: 'Token Types',
        icon: '🏷️',
        color: 'var(--accent-green)',
        content: 'Tokens are categorized into different types. Keywords are reserved words (if, while, int). Identifiers are user-defined names. Literals include numbers and strings. Operators perform arithmetic/logic. Delimiters separate code elements.',
        code: `KEYWORD    → if, while, for, int, return\nIDENTIFIER → myVar, count, factorial\nINTEGER    → 42, 0, 255\nFLOAT      → 3.14, 0.001\nOPERATOR   → +, -, *, /\nDELIMITER  → (, ), {, }, ;\nSTRING     → "hello", 'a'\nCOMPARISON → ==, !=, <=, >=`
    },
    {
        title: 'How Our Analyzer Works',
        icon: '⚙️',
        color: 'var(--accent-yellow)',
        content: 'Our implementation starts in state q0. For each character, it looks up the transition in the table. When it reaches an accepting state or a non-matching character, it emits the accumulated lexeme as a token and restarts. This process repeats until the entire input is consumed.',
        code: `Algorithm:\n  state = q0\n  lexeme = ""\n  for each char in input:\n    nextState = table[state][classify(char)]\n    if nextState is accepting:\n      emit(lexeme, tokenType(state))\n      state = q0\n      lexeme = ""\n    else:\n      state = nextState\n      lexeme += char`
    },
    {
        title: 'Compiler Phases Overview',
        icon: '🏗️',
        color: 'var(--accent-orange)',
        content: 'Lexical analysis is just the beginning! After tokenization, the parser (syntax analysis) builds a parse tree, semantic analysis checks meaning, intermediate code generation creates IR, optimization improves it, and finally code generation produces machine code.',
        code: `Source Code\n  ↓ Lexical Analysis  ← WE ARE HERE!\n  ↓ Syntax Analysis\n  ↓ Semantic Analysis\n  ↓ Intermediate Code Gen\n  ↓ Code Optimization\n  ↓ Code Generation\nMachine Code`
    },
];

function Learn() {
    return (
        <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">📚 Learning Center</span>
                    <h1 className="section-title">
                        Understanding <span className="gradient-text">Lexical Analysis</span>
                    </h1>
                    <p className="section-subtitle">
                        Learn the theory behind table-driven lexical analysis, DFA, and how compilers process source code
                    </p>
                </motion.div>

                <div className="learn-grid">
                    {concepts.map((concept, index) => (
                        <motion.div
                            key={index}
                            className="learn-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <div
                                className="learn-card-number"
                                style={{
                                    background: `${concept.color}20`,
                                    color: concept.color,
                                    border: `2px solid ${concept.color}40`
                                }}
                            >
                                {concept.icon}
                            </div>
                            <h3 className="learn-card-title">{concept.title}</h3>
                            <p className="learn-card-text">{concept.content}</p>
                            <pre className="learn-card-code">{concept.code}</pre>
                        </motion.div>
                    ))}
                </div>

                {/* Key Terminology */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="glass-card"
                    style={{ padding: '40px', marginTop: '48px' }}
                >
                    <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '24px' }}>
                        <span className="gradient-text">Key Terminology</span>
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
                        {[
                            { term: 'Lexeme', def: 'The actual character sequence in the source code (e.g., "while", "42", "+")' },
                            { term: 'Token', def: 'A pair of token type and lexeme value: (KEYWORD, "while")' },
                            { term: 'Pattern', def: 'A rule describing the set of lexemes for a token type (e.g., letter followed by letters/digits)' },
                            { term: 'State', def: 'A node in the DFA representing the current progress in recognizing a pattern' },
                            { term: 'Transition', def: 'Moving from one state to another based on the current input character' },
                            { term: 'Accepting State', def: 'A state indicating that a valid token has been recognized' },
                            { term: 'Dead State', def: 'An error state reached when no valid transition exists for the input' },
                            { term: 'Lookahead', def: 'Reading ahead one character to decide if the current token is complete' },
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                style={{
                                    padding: '16px',
                                    borderRadius: 'var(--radius-sm)',
                                    background: 'rgba(10, 10, 26, 0.5)',
                                    border: '1px solid var(--border-color)',
                                }}
                            >
                                <strong style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontSize: '14px' }}>
                                    {item.term}
                                </strong>
                                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.6 }}>
                                    {item.def}
                                </p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default Learn;
