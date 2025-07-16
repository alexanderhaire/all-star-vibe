import React, { useEffect, useState } from 'react';

const initialPlayers = [
  { name: 'Player One', score: 120 },
  { name: 'Player Two', score: 95 },
  { name: 'Player Three', score: 80 },
  { name: 'Player Four', score: 60 },
];

const Leaderboard = () => {
  const [players, setPlayers] = useState(initialPlayers);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlayers(prev => prev.map(p => ({
        ...p,
        score: p.score + Math.floor(Math.random() * 5),
      })).sort((a,b) => b.score - a.score));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl max-w-md w-full mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">🏅 Live Leaderboard</h2>
      <ul className="space-y-2">
        {players.map((player, idx) => (
          <li key={player.name} className="flex justify-between">
            <span>
              {idx + 1}. {player.name}
            </span>
            <span className="font-semibold">{player.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
