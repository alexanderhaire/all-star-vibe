import React from 'react';
import AllStarVibe from './allstarvibe';
import HorseRace from './HorseRace';
import { CoinProvider, CoinContext } from './CoinContext';
import { useContext } from 'react';
import './App.css';

const CoinDisplay = () => {
  const { coins } = useContext(CoinContext);
  return (
    <div className="text-lg font-semibold mb-4">💰 Coins: {coins}</div>
  );
};

function App() {
  return (
    <CoinProvider>
      <div className="App space-y-8 p-8 bg-gray-100 min-h-screen">
        <CoinDisplay />
        <AllStarVibe />
        <HorseRace />
      </div>
    </CoinProvider>
  );
}

export default App;
