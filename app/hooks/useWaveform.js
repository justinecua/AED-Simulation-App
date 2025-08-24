import { useState, useRef } from 'react';

export default function useWaveform(aedWidth) {
  const [waveform, setWaveform] = useState([]);
  const intervalRef = useRef(null);

  const clearWaveform = () => {
    setWaveform([]);
    if (intervalRef.current) clearTimeout(intervalRef.current);
    intervalRef.current = null;
  };

  const stopWaveform = () => {
    if (intervalRef.current) clearTimeout(intervalRef.current);
    intervalRef.current = null;
  };

  const drawWaveformPoint = (pattern, spacing, patternIndex) => {
    setWaveform(prev => {
      const nextPoint = { value: pattern[patternIndex.current], spacing };
      patternIndex.current = (patternIndex.current + 1) % pattern.length;

      const maxPoints = Math.floor(aedWidth / spacing);
      const updated = [...prev, nextPoint];
      if (updated.length > maxPoints) updated.shift();

      return updated;
    });

    const variation = 1 + (Math.random() * 0.06 - 0.03);
    intervalRef.current = setTimeout(
      () => drawWaveformPoint(pattern, spacing, patternIndex),
      50 * variation,
    );
  };

  return { waveform, drawWaveformPoint, clearWaveform, stopWaveform };
}
