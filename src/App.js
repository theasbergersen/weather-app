import React from 'react';
import './App.css';
import WeatherComponent from './WeatherComponent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Se været</h1>
      </header>
      <main>
        <WeatherComponent />
      </main>
    </div>
  );
}

export default App;