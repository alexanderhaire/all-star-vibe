import React, { createContext, useState, useEffect } from 'react';

export const CoinContext = createContext();

export const CoinProvider = ({ children }) => {
  const [coins, setCoins] = useState(() => {
    const stored = localStorage.getItem('coins');
    return stored ? parseInt(stored, 10) : 100;
  });

  useEffect(() => {
    localStorage.setItem('coins', coins);
  }, [coins]);

  const addCoins = (amount) => setCoins((c) => c + amount);
  const spendCoins = (amount) => setCoins((c) => Math.max(c - amount, 0));

  return (
    <CoinContext.Provider value={{ coins, addCoins, spendCoins }}>
      {children}
    </CoinContext.Provider>
  );
};
