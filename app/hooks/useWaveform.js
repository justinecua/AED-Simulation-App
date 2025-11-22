import { useState, useRef } from 'react';

export default function useWaveform(aedWidth) {
  const [waveform, setWaveform] = useState([]);
  const intervalRef = useRef(null);
  const pausedRef = useRef(false);

  const clearWaveform = () => {
    setWaveform([]);
    if (intervalRef.current) clearTimeout(intervalRef.current);
    intervalRef.current = null;
  };

  const stopWaveform = () => {
    if (intervalRef.current) clearTimeout(intervalRef.current);
    intervalRef.current = null;
  };

  const pauseWaveform = () => {
    pausedRef.current = true;
  };

  const resumeWaveform = () => {
    pausedRef.current = false;
  };

  const drawWaveformPoint = (pattern, spacing, patternIndex) => {
    if (pausedRef.current) {
      // ❗ If paused, do NOT draw
      intervalRef.current = setTimeout(
        () => drawWaveformPoint(pattern, spacing, patternIndex),
        80,
      );
      return;
    }

    // Normal running waveform
    setWaveform(prev => {
      const nextPoint = { value: pattern[patternIndex.current], spacing };
      patternIndex.current = (patternIndex.current + 1) % pattern.length;

      const maxPoints = Math.floor(aedWidth / spacing);
      const updated = [...prev, nextPoint];
      if (updated.length > maxPoints) updated.shift();

      return updated;
    });

    intervalRef.current = setTimeout(
      () => drawWaveformPoint(pattern, spacing, patternIndex),
      80,
    );
  };

  return {
    waveform,
    drawWaveformPoint,
    clearWaveform,
    stopWaveform,
    pauseWaveform,
    resumeWaveform,
  };
}
