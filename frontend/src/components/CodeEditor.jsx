import { useState } from 'react';

const sampleCodes = {
    'C Program': `#include <stdio.h>

int main() {
    int x = 10;
    float y = 3.14;
    if (x > 5) {
        printf("Hello World");
    }
    return 0;
}`,
    'Variables': `int count = 42;
float pi = 3.14159;
char grade = 'A';
string name = "LexiScan";`,
    'Loop': `for (int i = 0; i < 10; i++) {
    sum = sum + i;
    if (i == 5) {
        break;
    }
}`,
    'Function': `int factorial(int n) {
    if (n <= 1) {
        return 1;
    }
    return n * factorial(n - 1);
}`,
    'Expression': `result = (a + b) * c - d / e;
flag = x >= y && z != 0;`
};

function CodeEditor({ code, setCode, onAnalyze, loading }) {
    const lineCount = code.split('\n').length;
    const charCount = code.length;

    return (
        <div>
            <div className="sample-codes">
                {Object.keys(sampleCodes).map((name) => (
                    <button
                        key={name}
                        className="sample-btn"
                        onClick={() => setCode(sampleCodes[name])}
                    >
                        {name}
                    </button>
                ))}
            </div>

            <div className="code-editor-wrapper">
                <div className="code-editor-header">
                    <div className="code-editor-dots">
                        <span className="code-editor-dot red" />
                        <span className="code-editor-dot yellow" />
                        <span className="code-editor-dot green" />
                    </div>
                    <span className="code-editor-title">source_code.c</span>
                    <button
                        className="clear-btn"
                        onClick={() => setCode('')}
                        style={{ padding: '4px 10px', fontSize: '11px' }}
                    >
                        Clear
                    </button>
                </div>

                <textarea
                    className="code-editor-textarea"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="// Enter your source code here...&#10;// Or select a sample above ☝️&#10;&#10;int main() {&#10;    return 0;&#10;}"
                    spellCheck={false}
                />

                <div className="code-editor-footer">
                    <span className="code-editor-info">
                        Lines: {lineCount} | Characters: {charCount}
                    </span>
                    <span className="code-editor-info">UTF-8 | C/C++</span>
                </div>
            </div>

            <button
                className={`analyze-btn ${loading ? 'loading' : ''}`}
                onClick={onAnalyze}
                disabled={!code.trim() || loading}
            >
                {loading ? (
                    <>
                        <span className="spinner" />
                        Analyzing...
                    </>
                ) : (
                    <>
                        ⚡ Analyze Code
                    </>
                )}
            </button>
        </div>
    );
}

export default CodeEditor;
