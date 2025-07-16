import React from 'react';
import AllStarVibe from './allstarvibe';
import HorseRace from './HorseRace';
import Leaderboard from './Leaderboard';
import './App.css';

function App() {
  return (
    <div className="App space-y-8 p-8 bg-gray-100 min-h-screen">
      <AllStarVibe />
      <HorseRace />
      <Leaderboard />
    </div>
  );
}

export default App;
