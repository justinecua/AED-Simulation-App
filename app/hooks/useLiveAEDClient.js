// useLiveAEDClient.js
import { useEffect, useState, useRef } from 'react';
import Sound from 'react-native-sound';
import aedSequences from '../data/aedSequences';
import heartRhythms from '../data/heartRhythms';
import { useTcpServerContext } from '../context/TcpServerContext';

export default function useLiveAEDClient() {
  const { message } = useTcpServerContext();

  const [currentRhythm, setCurrentRhythm] = useState(null);
  const [steps, setSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [expectedAction, setExpectedAction] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [instructorStarted, setInstructorStarted] = useState(false);
  const [poweredOn, setPoweredOn] = useState(false);
  const [paused, setPaused] = useState(false);
  const [started, setStarted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [displayMessage, setDisplayMessage] = useState(
    'Waiting for instructor...',
  );
  const [isSwitchOpen, setIsSwitchOpen] = useState(false);
  const shouldAutoplayRef = useRef(false);
  const [placedPads, setPlacedPads] = useState({
    'Pad 1': false,
    'Pad 2': false,
  });
  const [positions, setPositions] = useState({
    'Pad 1': { x: 15, y: 10 },
    'Pad 2': { x: 10, y: 75 },
  });

  const autoTimerRef = useRef(null);

  // 🔊 NEW: strong sound control
  const soundRef = useRef(null); // holds the current Sound instance immediately
  const tokenRef = useRef(0); // monotonic token to invalidate older loads
  const lastPlayKeyRef = useRef(''); // "VFib#0" etc, avoids re-triggering same step
  const lastStartAtRef = useRef(0); // timestamp of last SIM_CONTROL:START

  /* Timer */
  useEffect(() => {
    let interval;
    if (started && !paused) {
      interval = setInterval(() => setTimer(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [started, paused]);

  /* Basic AED */
  const startAED = () => {
    setStarted(true);
    setPaused(false);
  };
  const pauseAED = (v = true) => setPaused(v);
  const powerOnAED = () => setPoweredOn(true);

  const clearAuto = () => {
    if (autoTimerRef.current) {
      clearTimeout(autoTimerRef.current);
      autoTimerRef.current = null;
    }
  };

  const stopAudio = () => {
    const s = soundRef.current;
    if (s) {
      try {
        s.stop(() => {
          s.release();
        });
      } catch {}
      soundRef.current = null;
    }
    setIsPlaying(false);
  };

  const powerOffAED = () => {
    stopAudio();
    clearAuto();
    setPoweredOn(false);
    setStarted(false);
    setPaused(false);
    setTimer(0);
  };

  const playStepAudio = index => {
    stopAudio(); // stops current or in-flight sound immediately
    clearAuto();

    const step = steps[index];
    if (!step) return;

    setExpectedAction(step.action || null);

    // Debounce: don’t replay same (rhythm#index)
    const rhythmName = currentRhythm?.name || 'Sinus';
    const playKey = `${rhythmName}#${index}`;
    if (lastPlayKeyRef.current === playKey) return;
    lastPlayKeyRef.current = playKey;

    // Invalidate any older loads
    const myToken = ++tokenRef.current;

    if (step.audio) {
      const s = new Sound(step.audio, Sound.MAIN_BUNDLE, err => {
        // Ignore if a newer play started
        if (myToken !== tokenRef.current) {
          try {
            s.release();
          } catch {}
          return;
        }

        if (err) {
          console.log('Audio load error:', err);
          soundRef.current = null;
          setIsPlaying(false);
          return;
        }

        // Loop unless auto/analyze
        if (step.action !== 'auto' && step.action !== 'analyze') {
          s.setNumberOfLoops(-1);
        }

        // Start playing
        try {
          s.play(() => {
            // completion callback (usually not called for loops)
            if (myToken !== tokenRef.current) {
              try {
                s.release();
              } catch {}
              return;
            }
            try {
              s.release();
            } catch {}
            if (soundRef.current === s) soundRef.current = null;
            setIsPlaying(false);
          });
        } catch (e) {
          console.log('Audio play error:', e);
        }

        // Register active sound
        soundRef.current = s;
        setIsPlaying(true);
      });

      // If another play starts before the callback fires,
      // stopAudio() will still see this instance via soundRef
      soundRef.current = s;
    }
  };

  const nextStep = () => {
    stopAudio();
    clearAuto();
    setStepIndex(prev => {
      const next = prev + 1;
      if (next < steps.length) {
        playStepAudio(next);
        return next;
      }
      setExpectedAction(null);
      return prev;
    });
  };

  const prevStep = () => {
    stopAudio();
    clearAuto();
    setStepIndex(prev => {
      const next = prev > 0 ? prev - 1 : 0;
      playStepAudio(next);
      return next;
    });
  };

  const handleAction = action => {
    if (expectedAction === action) {
      stopAudio();
      nextStep();
    }
  };

  const resetSequence = () => {
    stopAudio();
    clearAuto();
    setSteps([]);
    setStepIndex(0);
    setExpectedAction(null);
    lastPlayKeyRef.current = '';
  };

  /* Interpret instructor messages */
  useEffect(() => {
    if (!message) return;

    let signal;
    try {
      signal = JSON.parse(message);
    } catch {
      console.warn('Invalid signal (not JSON):', message);
      return;
    }

    const { type, data } = signal;

    switch (type) {
      case 'SET_RHYTHM': {
        if (data && aedSequences[data]) {
          setCurrentRhythm({ name: data, ...heartRhythms[data] });
          setSteps(aedSequences[data]);
          setStepIndex(0);
          const first = aedSequences[data][0];
          setExpectedAction(first?.action ?? null);

          stopAudio();
          clearAuto();
          lastPlayKeyRef.current = '';

          // ✅ Auto-play ONLY if START happened
          if (shouldAutoplayRef.current && poweredOn) {
            shouldAutoplayRef.current = false;
            playStepAudio(0);
          }
        }
        break;
      }

      case 'PLAY_STEP': {
        // Ignore if this PLAY_STEP arrived immediately after START (already auto-played)
        const justStarted = Date.now() - lastStartAtRef.current < 400; // 0.4s window
        if (justStarted) break;

        if (poweredOn && data?.rhythm && aedSequences[data.rhythm]) {
          const idx = data.index ?? 0;
          setDisplayMessage(`Instructor played step ${idx + 1}`);
          setCurrentRhythm({ name: data.rhythm, ...heartRhythms[data.rhythm] });
          setSteps(aedSequences[data.rhythm]);
          setStepIndex(idx);
          playStepAudio(idx);
        }
        break;
      }

      case 'SIM_CONTROL': {
        if (data === 'START') {
          lastStartAtRef.current = Date.now();
          setInstructorStarted(true);
          setDisplayMessage(' Instructor started the simulation'); // clear instruction

          // ✅ Start timer without turning on AED
          setStarted(true); // allow timer to run
          setPaused(false); // allow timer to tick

          // ✅ Keep AED powered OFF until student presses ON
          // powerOnAED() --> NOT CALLED
          // startAED()   --> NOT CALLED

          setStepIndex(0);
          lastPlayKeyRef.current = '';
          shouldAutoplayRef.current = true;
        } else if (data === 'STOP') {
          setDisplayMessage('Instructor stopped the simulation');
          stopAudio();
          clearAuto();
          resetSequence();
          setTimer(0);
          setInstructorStarted(false);
          powerOffAED();
        } else if (data === 'PAUSE') {
          setDisplayMessage('Simulation paused by instructor');
          pauseAED();
        }
        break;
      }

      case 'NEXT_STEP':
        setDisplayMessage('Instructor advanced to the next step');
        nextStep();
        break;

      case 'PREV_STEP':
        setDisplayMessage('Instructor went back to the previous step');
        prevStep();
        break;

      case 'STOP_AUDIO':
        setDisplayMessage('Instructor stopped the audio');
        stopAudio();
        break;

      case 'RESET_AED':
        setDisplayMessage('Instructor reset the AED');
        resetSequence();
        break;

      case 'CONTROL_MODE':
        setDisplayMessage(`Instructor changed control mode: ${data}`);
        break;

      default:
        setDisplayMessage('Received instruction from instructor');
    }
  }, [message]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    currentRhythm,
    steps,
    stepIndex,
    expectedAction,
    isPlaying,
    timer,
    started,
    poweredOn,
    paused,
    instructorStarted,
    startAED,
    pauseAED,
    powerOnAED,
    powerOffAED,
    nextStep,
    prevStep,
    handleAction,
    playStepAudio,
    stopAudio,
    positions,
    setPositions,
    placedPads,
    setPlacedPads,
    displayMessage,
    isSwitchOpen,
    setIsSwitchOpen,
  };
}
