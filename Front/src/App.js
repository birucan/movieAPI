import React from 'react';
import logo from './logo.svg';
import './App.css';
import MovieDisplay from './components/MovieDisplay.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MovieDisplay/>
      </header>
    </div>
  );
}

export default App;
