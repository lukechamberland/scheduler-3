import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    setMode(newMode);
    if (replace) {
      setHistory(prevHistory => [...prevHistory.slice(0, -1), newMode]);
    } else {
      setHistory(prevHistory => [...prevHistory, newMode]);
    }
  };

  const back = () => {
    if (history.length > 1) {
      setMode(history[history.length - 2]);
      setHistory(prevHistory => [...prevHistory.slice(0, -1)]);
    }
  };
  return { mode, transition, back };
}