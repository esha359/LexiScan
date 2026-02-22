const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const transitionTablePath = path.join(__dirname, '..', 'data', 'transitionTable.json');
const tokenTypesPath = path.join(__dirname, '..', 'data', 'tokenTypes.json');

function loadJSON(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function classifyChar(ch) {
  if (/[a-zA-Z]/.test(ch)) return 'letter';
  if (/[0-9]/.test(ch)) return 'digit';
  return ch;
}

function getStateTokenType(state, lexeme, tableData) {
  const stateInfo = tableData.states[state];
  if (!stateInfo) return 'ERROR';

  switch (stateInfo.label) {
    case 'Identifier/Keyword':
      return tableData.keywords.includes(lexeme.toLowerCase()) ? 'KEYWORD' : 'IDENTIFIER';
    case 'Integer':
      return 'INTEGER';
    case 'Float':
      return 'FLOAT';
    case 'Operator':
      return 'OPERATOR';
    case 'Delimiter':
      return 'DELIMITER';
    case 'String':
      return 'STRING';
    case 'Comparison/Assignment':
      return 'COMPARISON';
    case 'Comment':
      return 'COMMENT';
    default:
      return 'ERROR';
  }
}

function analyze(sourceCode) {
  const tableData = loadJSON(transitionTablePath);
  const { transitions, states } = tableData;
  const tokens = [];
  const stateTransitions = [];
  let i = 0;
  const code = sourceCode;

  while (i < code.length) {
    // Skip whitespace
    if (/\s/.test(code[i])) {
      i++;
      continue;
    }

    let currentState = 'q0';
    let lexeme = '';
    let startPos = i;
    let transitionPath = [{ state: currentState, char: '', label: states[currentState].label }];

    // Handle string literals
    if (code[i] === '"' || code[i] === "'") {
      const quote = code[i];
      lexeme = quote;
      currentState = 'q9';
      transitionPath.push({ state: 'q9', char: quote, label: states['q9'].label });
      i++;

      while (i < code.length && code[i] !== quote) {
        lexeme += code[i];
        transitionPath.push({ state: 'q9', char: code[i], label: states['q9'].label });
        i++;
      }

      if (i < code.length) {
        lexeme += code[i];
        currentState = 'q10';
        transitionPath.push({ state: 'q10', char: code[i], label: states['q10'].label });
        i++;
      }

      tokens.push({
        id: uuidv4(),
        lexeme,
        type: 'STRING',
        position: startPos,
        line: code.substring(0, startPos).split('\n').length,
        column: startPos - code.lastIndexOf('\n', startPos - 1)
      });

      stateTransitions.push({
        lexeme,
        path: transitionPath
      });
      continue;
    }

    // Handle single-line comments
    if (code[i] === '/' && i + 1 < code.length && code[i + 1] === '/') {
      lexeme = '//';
      currentState = 'q13';
      transitionPath.push({ state: 'q12', char: '/', label: states['q12'].label });
      transitionPath.push({ state: 'q13', char: '/', label: states['q13'].label });
      i += 2;

      while (i < code.length && code[i] !== '\n') {
        lexeme += code[i];
        i++;
      }

      tokens.push({
        id: uuidv4(),
        lexeme,
        type: 'COMMENT',
        position: startPos,
        line: code.substring(0, startPos).split('\n').length,
        column: startPos - code.lastIndexOf('\n', startPos - 1)
      });

      stateTransitions.push({
        lexeme,
        path: transitionPath
      });
      continue;
    }

    // Handle identifiers and keywords
    if (/[a-zA-Z_]/.test(code[i])) {
      currentState = 'q1';
      while (i < code.length && /[a-zA-Z0-9_]/.test(code[i])) {
        lexeme += code[i];
        transitionPath.push({ state: 'q1', char: code[i], label: states['q1'].label });
        i++;
      }
      currentState = 'q3';
      transitionPath.push({ state: 'q3', char: '<end>', label: states['q3'].label });

      const tokenType = tableData.keywords.includes(lexeme) ? 'KEYWORD' : 'IDENTIFIER';
      tokens.push({
        id: uuidv4(),
        lexeme,
        type: tokenType,
        position: startPos,
        line: code.substring(0, startPos).split('\n').length,
        column: startPos - code.lastIndexOf('\n', startPos - 1)
      });

      stateTransitions.push({
        lexeme,
        path: transitionPath
      });
      continue;
    }

    // Handle numbers
    if (/[0-9]/.test(code[i])) {
      currentState = 'q2';
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
        currentState = 'q6';
        transitionPath.push({ state: 'q6', char: '<end>', label: states['q6'].label });
      } else {
        currentState = 'q4';
        transitionPath.push({ state: 'q4', char: '<end>', label: states['q4'].label });
      }

      tokens.push({
        id: uuidv4(),
        lexeme,
        type: isFloat ? 'FLOAT' : 'INTEGER',
        position: startPos,
        line: code.substring(0, startPos).split('\n').length,
        column: startPos - code.lastIndexOf('\n', startPos - 1)
      });

      stateTransitions.push({
        lexeme,
        path: transitionPath
      });
      continue;
    }

    // Handle comparison / assignment operators
    if (['=', '<', '>', '!'].includes(code[i])) {
      lexeme = code[i];
      currentState = 'q11';
      transitionPath.push({ state: 'q11', char: code[i], label: states['q11'].label });
      i++;

      if (i < code.length && code[i] === '=') {
        lexeme += code[i];
        transitionPath.push({ state: 'q11', char: code[i], label: states['q11'].label });
        i++;
      }

      tokens.push({
        id: uuidv4(),
        lexeme,
        type: 'COMPARISON',
        position: startPos,
        line: code.substring(0, startPos).split('\n').length,
        column: startPos - code.lastIndexOf('\n', startPos - 1)
      });

      stateTransitions.push({
        lexeme,
        path: transitionPath
      });
      continue;
    }

    // Handle operators
    if (['+', '-', '*', '/', '%', '&', '|', '^', '~'].includes(code[i])) {
      lexeme = code[i];
      currentState = 'q7';
      transitionPath.push({ state: 'q7', char: code[i], label: states['q7'].label });
      i++;

      tokens.push({
        id: uuidv4(),
        lexeme,
        type: 'OPERATOR',
        position: startPos,
        line: code.substring(0, startPos).split('\n').length,
        column: startPos - code.lastIndexOf('\n', startPos - 1)
      });

      stateTransitions.push({
        lexeme,
        path: transitionPath
      });
      continue;
    }

    // Handle delimiters
    if (['(', ')', '{', '}', '[', ']', ';', ',', '.', ':'].includes(code[i])) {
      lexeme = code[i];
      currentState = 'q8';
      transitionPath.push({ state: 'q8', char: code[i], label: states['q8'].label });
      i++;

      tokens.push({
        id: uuidv4(),
        lexeme,
        type: 'DELIMITER',
        position: startPos,
        line: code.substring(0, startPos).split('\n').length,
        column: startPos - code.lastIndexOf('\n', startPos - 1)
      });

      stateTransitions.push({
        lexeme,
        path: transitionPath
      });
      continue;
    }

    // Handle preprocessor directives
    if (code[i] === '#') {
      lexeme = '#';
      i++;
      while (i < code.length && /[a-zA-Z]/.test(code[i])) {
        lexeme += code[i];
        i++;
      }

      tokens.push({
        id: uuidv4(),
        lexeme,
        type: 'KEYWORD',
        position: startPos,
        line: code.substring(0, startPos).split('\n').length,
        column: startPos - code.lastIndexOf('\n', startPos - 1)
      });

      stateTransitions.push({
        lexeme,
        path: [{ state: 'q0', char: '', label: 'Start' }, { state: 'q3', char: lexeme, label: 'Keyword' }]
      });
      continue;
    }

    // Unknown character
    lexeme = code[i];
    tokens.push({
      id: uuidv4(),
      lexeme,
      type: 'ERROR',
      position: startPos,
      line: code.substring(0, startPos).split('\n').length,
      column: startPos - code.lastIndexOf('\n', startPos - 1)
    });
    stateTransitions.push({
      lexeme,
      path: [{ state: 'q0', char: '', label: 'Start' }, { state: 'q14', char: code[i], label: 'Error' }]
    });
    i++;
  }

  return { tokens, stateTransitions };
}

// Analyze source code
exports.analyzeCode = (req, res) => {
  try {
    const { sourceCode } = req.body;

    if (!sourceCode || sourceCode.trim() === '') {
      return res.status(400).json({ error: 'Source code is required' });
    }

    const result = analyze(sourceCode);

    // Count token types
    const tokenStats = {};
    result.tokens.forEach(token => {
      tokenStats[token.type] = (tokenStats[token.type] || 0) + 1;
    });

    const response = {
      id: uuidv4(),
      sourceCode,
      tokens: result.tokens,
      stateTransitions: result.stateTransitions,
      tokenStats,
      totalTokens: result.tokens.length,
      timestamp: new Date().toISOString()
    };

    // Save to history
    const historyPath = path.join(__dirname, '..', 'data', 'history.json');
    let history = [];
    try {
      history = JSON.parse(fs.readFileSync(historyPath, 'utf-8'));
    } catch (e) {
      history = [];
    }
    history.unshift({
      id: response.id,
      sourceCode: sourceCode.substring(0, 100),
      totalTokens: response.totalTokens,
      tokenStats: response.tokenStats,
      timestamp: response.timestamp
    });

    // Keep only last 50 entries
    if (history.length > 50) history = history.slice(0, 50);
    fs.writeFileSync(historyPath, JSON.stringify(history, null, 2));

    res.json(response);
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: 'Internal server error during analysis' });
  }
};

// Get transition table
exports.getTransitionTable = (req, res) => {
  try {
    const tableData = loadJSON(transitionTablePath);
    res.json(tableData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load transition table' });
  }
};

// Get token types
exports.getTokenTypes = (req, res) => {
  try {
    const tokenTypes = loadJSON(tokenTypesPath);
    res.json(tokenTypes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load token types' });
  }
};
