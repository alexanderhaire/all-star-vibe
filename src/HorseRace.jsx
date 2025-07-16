import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { CoinContext } from './CoinContext';

const horses = ['Thunderbolt ⚡', 'Golden Mane 🌟', 'Midnight Runner 🌙', 'Red Comet ☄️'];

const HorseRace = () => {
  const { coins, spendCoins, addCoins } = useContext(CoinContext);
  const [bets, setBets] = useState({});
  const [raceOn, setRaceOn] = useState(false);
  const [winner, setWinner] = useState('');
  const [payout, setPayout] = useState(0);

  const placeBet = (horse) => {
    if (coins >= 10 && !raceOn) {
      spendCoins(10);
      setBets((prev) => ({ ...prev, [horse]: (prev[horse] || 0) + 10 }));
    }
  };

  const startRace = () => {
    setRaceOn(true);
    const winningHorse = horses[Math.floor(Math.random() * horses.length)];
    setTimeout(() => {
      setRaceOn(false);
      const winningBet = bets[winningHorse] || 0;
      setWinner(winningHorse);
      if (winningBet) {
        const reward = winningBet * 2;
        addCoins(reward);
        setPayout(reward);
      } else {
        setPayout(0);
      }
      setBets({});
    }, 4000);
  };

  return (
    <div className="p-6 bg-green-500 rounded-xl shadow-xl">
      <h2 className="text-3xl font-bold text-white mb-4">🏇 Live Horse Racing!</h2>
      <div className="mb-4 space-y-2">
        {horses.map((horse, i) => (
          <div key={horse} className="flex items-center">
            <button
              onClick={() => placeBet(horse)}
              disabled={coins < 10 || raceOn}
              className={`px-3 py-1 rounded-md shadow mr-4 ${coins < 10 || raceOn ? 'bg-gray-400 cursor-not-allowed' : 'bg-yellow-400 hover:bg-yellow-500'}`}
            >
              Bet 10 🪙
            </button>
            <span>{horse} (Bet: {bets[horse] || 0} 🪙)</span>
          </div>
        ))}
      </div>
      <button
        onClick={startRace}
        disabled={raceOn || Object.keys(bets).length === 0}
        className={`text-white font-semibold px-4 py-2 rounded ${raceOn || Object.keys(bets).length === 0 ? 'bg-gray-500 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'}`}
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
        <div className="mt-4 text-2xl text-white font-bold">
          🏆 Winner: {winner}! {payout ? `You won ${payout} 🪙` : "Better luck next time!"}
        </div>
      )}
    </div>
  );
};

export default HorseRace;
