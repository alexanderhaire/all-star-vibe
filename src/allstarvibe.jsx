import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Button = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-2xl shadow transition"
  >
    {children}
  </button>
);

const AllStarVibe = () => {
  const [vibe, setVibe] = useState(50);
  const [analytics, setAnalytics] = useState(50);
  const [reputation, setReputation] = useState(50);
  const [recommendedAction, setRecommendedAction] = useState('');
  const [sessionTime] = useState(10); // Placeholder. Replace with real session time if needed.

  const makeDecision = (type) => {
    switch (type) {
      case 'network':
        setVibe(v => Math.min(v + 10, 100));
        setAnalytics(a => Math.max(a - 5, 0));
        setReputation(r => r + 5);
        break;
      case 'analyze':
        setAnalytics(a => Math.min(a + 10, 100));
        setVibe(v => Math.max(v - 5, 0));
        setReputation(r => r + 5);
        break;
      case 'brand':
        setReputation(r => Math.min(r + 15, 100));
        setVibe(v => v + 5);
        setAnalytics(a => a + 5);
        break;
      default:
        break;
    }
  };

  const overallScore = Math.round((vibe + analytics + reputation) / 3);

  useEffect(() => {
    axios.post('http://localhost:5000/predict_next_action', {
      network_freq: vibe,
      analyze_freq: analytics,
      brand_freq: reputation,
      session_duration: sessionTime,
    })
    .then(res => {
      setRecommendedAction(res.data.next_action);
    })
    .catch(err => {
      console.error("Error fetching recommendation:", err);
    });
  }, [vibe, analytics, reputation, sessionTime]);

  return (
    <div className="p-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-white mb-4">✨ All-Star Vibe ✨</h1>
      <div className="bg-white p-4 rounded-2xl shadow-xl text-center w-full max-w-md">
        <p className="text-xl mb-2">🌟 Overall Score: {overallScore} 🌟</p>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <p>😎 Vibe: {vibe}</p>
          <p>📈 Analytics: {analytics}</p>
          <p>💎 Reputation: {reputation}</p>
        </div>
        <div className="space-x-2 mb-4">
          <Button onClick={() => makeDecision('network')}>Network 🌐</Button>
          <Button onClick={() => makeDecision('analyze')}>Analyze 📊</Button>
          <Button onClick={() => makeDecision('brand')}>Build Brand 📸</Button>
        </div>
        <div className="text-lg text-gray-700 font-semibold">
          🔮 Recommended Action: <span className="text-indigo-600">{recommendedAction || '...'}</span>
        </div>
      </div>
    </div>
  );
};

export default AllStarVibe;
