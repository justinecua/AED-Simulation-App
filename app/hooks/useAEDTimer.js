import { useState, useRef } from 'react';

export default function useAEDTimer() {
  const [timer, setTimer] = useState(0);
  const timerIntervalRef = useRef(null);

  const startTimer = () => {
    if (timerIntervalRef.current) return;
    timerIntervalRef.current = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    timerIntervalRef.current = null;
  };

  const resetTimer = () => {
    setTimer(0);
  };

  return { timer, startTimer, stopTimer, resetTimer };
}
