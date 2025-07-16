import React, { useState } from 'react';
import { motion } from 'framer-motion';

const horses = ['Thunderbolt ⚡', 'Golden Mane 🌟', 'Midnight Runner 🌙', 'Red Comet ☄️'];

const HorseRace = () => {
  const [bets, setBets] = useState({});
  const [raceOn, setRaceOn] = useState(false);
  const [winner, setWinner] = useState('');
  const [horseSpeeds, setHorseSpeeds] = useState({});

  const placeBet = (horse) => {
    setBets((prev) => ({ ...prev, [horse]: (prev[horse] || 0) + 10 }));
  };

  const startRace = () => {
    const speeds = {};
    horses.forEach(horse => {
      speeds[horse] = Math.random() * 3 + 2; // 2-5 seconds
    });
    setHorseSpeeds(speeds);
    setRaceOn(true);

    const winningHorse = horses.reduce((a, b) =>
      speeds[a] < speeds[b] ? a : b
    );

    const raceDuration = Math.max(...Object.values(speeds)) * 1000;
    setTimeout(() => {
      setRaceOn(false);
      setWinner(winningHorse);
    }, raceDuration);
  };

  return (
    <div className="p-6 bg-green-500 rounded-xl shadow-xl">
      <h2 className="text-3xl font-bold text-white mb-4">🏇 Live Horse Racing!</h2>
      <div className="mb-4 space-y-2">
        {horses.map((horse, i) => (
          <div key={horse} className="flex items-center">
            <button 
              onClick={() => placeBet(horse)} 
              className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 rounded-md shadow mr-4"
            >
              Bet 10 🪙
            </button>
            <span>{horse} (Bet: {bets[horse] || 0} 🪙)</span>
          </div>
        ))}
      </div>
      <button 
        onClick={startRace} 
        className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded"
      >
        Start Race 🚩
      </button>

      {raceOn && (
        <div className="mt-6">
          {horses.map((horse) => (
            <motion.div
              key={horse}
              initial={{ x: 0, y: 0 }}
              animate={{ x: '80vw', y: ['0%', '-15%', '0%', '15%', '0%'] }}
              transition={{
                x: { duration: horseSpeeds[horse], ease: 'linear' },
                y: { duration: 0.5, repeat: Infinity, ease: 'easeInOut' },
              }}
              className="mb-2 text-xl"
            >
              {horse}
            </motion.div>
          ))}
        </div>
      )}

      {winner && !raceOn && (
        <div className="mt-4 text-2xl text-white font-bold">
          🏆 Winner: {winner}! {bets[winner] ? `You won ${bets[winner] * 2} 🪙` : "Better luck next time!"}
        </div>
      )}
    </div>
  );
};

export default HorseRace;
