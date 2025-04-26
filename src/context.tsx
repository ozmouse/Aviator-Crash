import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface ContextType {
  unityLoading: boolean;
  currentProgress: number;
  rechargeState: boolean;
  balance: number;
  setUnityLoading: (value: boolean) => void;
  setCurrentProgress: (value: number) => void;
  setRechargeState: (value: boolean) => void;
  setBalance: (value: number) => void;
}

export const Context = createContext<ContextType>({
  unityLoading: true,
  currentProgress: 0,
  rechargeState: false,
  balance: 1000,
  setUnityLoading: () => {},
  setCurrentProgress: () => {},
  setRechargeState: () => {},
  setBalance: () => {},
});

export const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [unityLoading, setUnityLoading] = useState(true);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [rechargeState, setRechargeState] = useState(false);
  const [balance, setBalance] = useState(1000);

  // Simulate loading
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProgress((prev) => {
        if (prev >= 90) {
          setUnityLoading(false);
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Check balance
  useEffect(() => {
    if (balance < 10) {
      setRechargeState(true);
    } else {
      setRechargeState(false);
    }
  }, [balance]);

  return (
    <Context.Provider
      value={{
        unityLoading,
        currentProgress,
        rechargeState,
        balance,
        setUnityLoading,
        setCurrentProgress,
        setRechargeState,
        setBalance,
      }}
    >
      {children}
    </Context.Provider>
  );
};
