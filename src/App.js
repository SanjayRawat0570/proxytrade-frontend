import React from 'react';
import SessionForm from './components/SessionForm';
import SessionList from './components/SessionList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>📈 Proxy Trading Dashboard</h1>
      </header>
      <main>
        <SessionForm />
        <SessionList />
      </main>
    </div>
  );
}

export default App;
