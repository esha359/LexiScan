// Transition table and analyzer logic running entirely in the browser

const transitionTable = {
    states: {
        q0: { type: "start", label: "Start" },
        q1: { type: "intermediate", label: "Letter" },
        q2: { type: "intermediate", label: "Digit" },
        q3: { type: "accepting", label: "Identifier/Keyword" },
        q4: { type: "accepting", label: "Integer" },
        q5: { type: "intermediate", label: "Dot after Digit" },
        q6: { type: "accepting", label: "Float" },
        q7: { type: "accepting", label: "Operator" },
        q8: { type: "accepting", label: "Delimiter" },
        q9: { type: "intermediate", label: "String Start" },
        q10: { type: "accepting", label: "String" },
        q11: { type: "accepting", label: "Comparison/Assignment" },
        q12: { type: "intermediate", label: "Slash" },
        q13: { type: "accepting", label: "Comment" },
        q14: { type: "error", label: "Error" },
    },
    transitions: {
        q0: {
            letter: "q1", _: "q1", digit: "q2",
            "+": "q7", "-": "q7", "*": "q7", "/": "q12", "%": "q7",
            "(": "q8", ")": "q8", "{": "q8", "}": "q8", "[": "q8", "]": "q8",
            ";": "q8", ",": "q8", "\"": "q9", "'": "q9",
            "=": "q11", "<": "q11", ">": "q11", "!": "q11",
            " ": "q0", "\t": "q0", "\n": "q0", "\r": "q0",
        },
        q1: { letter: "q1", digit: "q1", _: "q1", other: "q3" },
        q2: { digit: "q2", ".": "q5", other: "q4" },
        q5: { digit: "q5", other: "q6" },
        q9: { "\"": "q10", "'": "q10", other: "q9" },
        q11: { "=": "q11", other: "q11" },
        q12: { "/": "q13", other: "q7" },
        q13: { "\n": "q13", other: "q13" },
    },
    keywords: [
        "auto", "break", "case", "char", "const", "continue", "default", "do",
        "double", "else", "enum", "extern", "float", "for", "goto", "if",
        "int", "long", "register", "return", "short", "signed", "sizeof", "static",
        "struct", "switch", "typedef", "union", "unsigned", "void", "volatile", "while",
        "class", "public", "private", "protected", "virtual", "template", "namespace",
        "using", "try", "catch", "throw", "new", "delete", "this", "true", "false",
        "null", "nullptr", "bool", "string", "include", "define", "ifdef", "ifndef",
        "endif", "pragma", "var", "let", "function", "console", "log", "printf",
        "scanf", "main", "import", "from", "export", "async", "await",
    ],
};

export const tokenTypesData = {
    KEYWORD: { color: "#ff6b9d", icon: "🔑", description: "Reserved words" },
    IDENTIFIER: { color: "#c084fc", icon: "📝", description: "User-defined names" },
    INTEGER: { color: "#67e8f9", icon: "🔢", description: "Whole numbers" },
    FLOAT: { color: "#34d399", icon: "💧", description: "Decimal numbers" },
    OPERATOR: { color: "#fbbf24", icon: "⚡", description: "Arithmetic/logic operators" },
    DELIMITER: { color: "#fb923c", icon: "📌", description: "Punctuation & separators" },
    STRING: { color: "#a3e635", icon: "💬", description: "String literals" },
    COMPARISON: { color: "#f472b6", icon: "⚖️", description: "Comparison/assignment" },
    COMMENT: { color: "#94a3b8", icon: "💭", description: "Comments" },
    ERROR: { color: "#ef4444", icon: "❌", description: "Unrecognized tokens" },
};

let idCounter = 0;
function uid() {
    idCounter++;
    return 'tok_' + Date.now() + '_' + idCounter;
}

export function analyzeCode(sourceCode) {
    const { transitions, states, keywords } = transitionTable;
    const tokens = [];
    const stateTransitions = [];
    let i = 0;
    const code = sourceCode;

    while (i < code.length) {
        if (/\s/.test(code[i])) { i++; continue; }

        let lexeme = '';
        let startPos = i;
        let transitionPath = [{ state: 'q0', char: '', label: states['q0'].label }];

        // String literals
        if (code[i] === '"' || code[i] === "'") {
            const quote = code[i];
            lexeme = quote;
            transitionPath.push({ state: 'q9', char: quote, label: states['q9'].label });
            i++;
            while (i < code.length && code[i] !== quote) {
                lexeme += code[i];
                transitionPath.push({ state: 'q9', char: code[i], label: states['q9'].label });
                i++;
            }
            if (i < code.length) {
                lexeme += code[i];
                transitionPath.push({ state: 'q10', char: code[i], label: states['q10'].label });
                i++;
            }
            tokens.push({
                id: uid(), lexeme, type: 'STRING', position: startPos,
                line: code.substring(0, startPos).split('\n').length,
                column: startPos - code.lastIndexOf('\n', startPos - 1)
            });
            stateTransitions.push({ lexeme, path: transitionPath });
            continue;
        }

        // Single-line comments
        if (code[i] === '/' && i + 1 < code.length && code[i + 1] === '/') {
            lexeme = '//';
            transitionPath.push({ state: 'q12', char: '/', label: states['q12'].label });
            transitionPath.push({ state: 'q13', char: '/', label: states['q13'].label });
            i += 2;
            while (i < code.length && code[i] !== '\n') { lexeme += code[i]; i++; }
            tokens.push({
                id: uid(), lexeme, type: 'COMMENT', position: startPos,
                line: code.substring(0, startPos).split('\n').length,
                column: startPos - code.lastIndexOf('\n', startPos - 1)
            });
            stateTransitions.push({ lexeme, path: transitionPath });
            continue;
        }

        // Identifiers and keywords
        if (/[a-zA-Z_]/.test(code[i])) {
            while (i < code.length && /[a-zA-Z0-9_]/.test(code[i])) {
                lexeme += code[i];
                transitionPath.push({ state: 'q1', char: code[i], label: states['q1'].label });
                i++;
            }
            transitionPath.push({ state: 'q3', char: '<end>', label: states['q3'].label });
            const tokenType = keywords.includes(lexeme) ? 'KEYWORD' : 'IDENTIFIER';
            tokens.push({
                id: uid(), lexeme, type: tokenType, position: startPos,
                line: code.substring(0, startPos).split('\n').length,
                column: startPos - code.lastIndexOf('\n', startPos - 1)
            });
            stateTransitions.push({ lexeme, path: transitionPath });
            continue;
        }

        // Numbers
        if (/[0-9]/.test(code[i])) {
            let isFloat = false;
            while (i < code.length && /[0-9]/.test(code[i])) {
                lexeme += code[i];
                transitionPath.push({ state: 'q2', char: code[i], label: states['q2'].label });
                i++;
            }
            if (i < code.length && code[i] === '.') {
                isFloat = true;
                lexeme += code[i];
                transitionPath.push({ state: 'q5', char: '.', label: states['q5'].label });
                i++;
                while (i < code.length && /[0-9]/.test(code[i])) {
                    lexeme += code[i];
                    transitionPath.push({ state: 'q5', char: code[i], label: states['q5'].label });
                    i++;
                }
                transitionPath.push({ state: 'q6', char: '<end>', label: states['q6'].label });
            } else {
                transitionPath.push({ state: 'q4', char: '<end>', label: states['q4'].label });
            }
            tokens.push({
                id: uid(), lexeme, type: isFloat ? 'FLOAT' : 'INTEGER', position: startPos,
                line: code.substring(0, startPos).split('\n').length,
                column: startPos - code.lastIndexOf('\n', startPos - 1)
            });
            stateTransitions.push({ lexeme, path: transitionPath });
            continue;
        }

        // Comparison / assignment
        if (['=', '<', '>', '!'].includes(code[i])) {
            lexeme = code[i];
            transitionPath.push({ state: 'q11', char: code[i], label: states['q11'].label });
            i++;
            if (i < code.length && code[i] === '=') {
                lexeme += code[i];
                transitionPath.push({ state: 'q11', char: code[i], label: states['q11'].label });
                i++;
            }
            tokens.push({
                id: uid(), lexeme, type: 'COMPARISON', position: startPos,
                line: code.substring(0, startPos).split('\n').length,
                column: startPos - code.lastIndexOf('\n', startPos - 1)
            });
            stateTransitions.push({ lexeme, path: transitionPath });
            continue;
        }

        // Operators
        if (['+', '-', '*', '/', '%', '&', '|', '^', '~'].includes(code[i])) {
            lexeme = code[i];
            transitionPath.push({ state: 'q7', char: code[i], label: states['q7'].label });
            i++;
            tokens.push({
                id: uid(), lexeme, type: 'OPERATOR', position: startPos,
                line: code.substring(0, startPos).split('\n').length,
                column: startPos - code.lastIndexOf('\n', startPos - 1)
            });
            stateTransitions.push({ lexeme, path: transitionPath });
            continue;
        }

        // Delimiters
        if (['(', ')', '{', '}', '[', ']', ';', ',', '.', ':'].includes(code[i])) {
            lexeme = code[i];
            transitionPath.push({ state: 'q8', char: code[i], label: states['q8'].label });
            i++;
            tokens.push({
                id: uid(), lexeme, type: 'DELIMITER', position: startPos,
                line: code.substring(0, startPos).split('\n').length,
                column: startPos - code.lastIndexOf('\n', startPos - 1)
            });
            stateTransitions.push({ lexeme, path: transitionPath });
            continue;
        }

        // Preprocessor
        if (code[i] === '#') {
            lexeme = '#';
            i++;
            while (i < code.length && /[a-zA-Z]/.test(code[i])) { lexeme += code[i]; i++; }
            tokens.push({
                id: uid(), lexeme, type: 'KEYWORD', position: startPos,
                line: code.substring(0, startPos).split('\n').length,
                column: startPos - code.lastIndexOf('\n', startPos - 1)
            });
            stateTransitions.push({ lexeme, path: [{ state: 'q0', char: '', label: 'Start' }, { state: 'q3', char: lexeme, label: 'Keyword' }] });
            continue;
        }

        // Unknown
        lexeme = code[i];
        tokens.push({
            id: uid(), lexeme, type: 'ERROR', position: startPos,
            line: code.substring(0, startPos).split('\n').length,
            column: startPos - code.lastIndexOf('\n', startPos - 1)
        });
        stateTransitions.push({ lexeme, path: [{ state: 'q0', char: '', label: 'Start' }, { state: 'q14', char: code[i], label: 'Error' }] });
        i++;
    }

    const tokenStats = {};
    tokens.forEach(t => { tokenStats[t.type] = (tokenStats[t.type] || 0) + 1; });

    const result = {
        id: uid(),
        sourceCode,
        tokens,
        stateTransitions,
        tokenStats,
        totalTokens: tokens.length,
        timestamp: new Date().toISOString(),
    };

    // Save to localStorage history
    try {
        let history = JSON.parse(localStorage.getItem('lexiscan_history') || '[]');
        history.unshift({
            id: result.id,
            sourceCode: sourceCode.substring(0, 100),
            totalTokens: result.totalTokens,
            tokenStats: result.tokenStats,
            timestamp: result.timestamp,
        });
        if (history.length > 50) history = history.slice(0, 50);
        localStorage.setItem('lexiscan_history', JSON.stringify(history));
    } catch (e) { /* ignore storage errors */ }

    return result;
}

export function getTransitionTable() {
    return transitionTable;
}

export function getHistory() {
    try {
        return JSON.parse(localStorage.getItem('lexiscan_history') || '[]');
    } catch { return []; }
}

export function clearHistory() {
    localStorage.removeItem('lexiscan_history');
}

export function deleteHistoryItem(id) {
    try {
        let history = JSON.parse(localStorage.getItem('lexiscan_history') || '[]');
        history = history.filter(item => item.id !== id);
        localStorage.setItem('lexiscan_history', JSON.stringify(history));
    } catch { /* ignore */ }
}
