# Table-Driven Lexical Analyzer - Implementation Plan

## Project Structure
```
lexical-analyzer/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── data/
│   │   ├── transitionTable.json
│   │   ├── tokenTypes.json
│   │   └── history.json
│   ├── routes/
│   │   ├── analyzerRoutes.js
│   │   └── historyRoutes.js
│   └── controllers/
│       ├── analyzerController.js
│       └── historyController.js
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   ├── public/
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── Hero.jsx
│       │   ├── CodeEditor.jsx
│       │   ├── TokenTable.jsx
│       │   ├── TransitionTable.jsx
│       │   ├── AnimatedVisualizer.jsx
│       │   ├── TokenStats.jsx
│       │   ├── History.jsx
│       │   └── Footer.jsx
│       ├── pages/
│       │   ├── Home.jsx
│       │   ├── Analyzer.jsx
│       │   ├── Learn.jsx
│       │   └── HistoryPage.jsx
│       └── utils/
│           └── api.js
```

## Features
1. **Code Input Editor** - Syntax-highlighted code input area
2. **Lexical Analysis Engine** - Table-driven tokenization
3. **Transition Table Visualization** - Animated state transitions
4. **Token Output Table** - Classified tokens with animations
5. **Token Statistics** - Charts showing token distribution
6. **Analysis History** - Saved past analyses (JSON storage)
7. **Learning Section** - How lexical analyzers work

## Tech Stack
- Frontend: React + Vite + Framer Motion + React Router
- Backend: Express.js + JSON file storage
- Animations: Framer Motion + CSS Animations
