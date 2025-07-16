import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const horses = ['Thunderbolt ⚡', 'Golden Mane 🌟', 'Midnight Runner 🌙', 'Red Comet ☄️'];

const HorseRace = () => {
  const [bets, setBets] = useState({});
  const [raceOn, setRaceOn] = useState(false);
  const [winner, setWinner] = useState('');

  const playSound = (frequency = 440, duration = 0.15) => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = frequency;
      osc.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
      setTimeout(() => ctx.close(), duration * 1000);
    } catch (e) {
      // fail silently if Web Audio API is not available
    }
  };

  const placeBet = (horse) => {
    playSound(880, 0.1);
    setBets((prev) => ({ ...prev, [horse]: (prev[horse] || 0) + 10 }));
  };

  const startRace = () => {
    playSound(440, 0.2);
    setRaceOn(true);
    const winningHorse = horses[Math.floor(Math.random() * horses.length)];
    setTimeout(() => {
      setRaceOn(false);
      setWinner(winningHorse);
    }, 4000);
  };

  useEffect(() => {
    if (winner && !raceOn) {
      playSound(660, 0.4);
    }
  }, [winner, raceOn]);

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
          {horses.map((horse, i) => (
            <motion.div
              key={horse}
              initial={{ x: 0 }}
              animate={{ x: '80vw' }}
              transition={{ duration: Math.random() * 3 + 2 }}
              className="mb-2 text-xl"
            >
              {horse}
            </motion.div>
          ))}
        </div>
      )}

      {winner && !raceOn && (
        <>
          <div className="mt-4 text-2xl text-white font-bold">
            🏆 Winner: {winner}! {bets[winner] ? `You won ${bets[winner] * 2} 🪙` : "Better luck next time!"}
          </div>
          <motion.div
            initial={{ scale: 0.5, opacity: 1 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 2 }}
            className="fixed inset-0 pointer-events-none flex items-center justify-center z-50"
          >
            <div className="text-6xl">🎉</div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default HorseRace;
