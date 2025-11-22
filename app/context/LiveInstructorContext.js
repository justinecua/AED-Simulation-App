import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTcpServerContext } from './TcpServerContext';
import aedSequences from '../data/aedSequences';

const LiveInstructorContext = createContext(null);

export const LiveInstructorProvider = ({ children }) => {
  const { sendMessage, setIsServer, connectionStatus, message } =
    useTcpServerContext();

  const [selectedRhythm, setSelectedRhythm] = useState('Sinus');
  const [controlMode, setControlMode] = useState(true);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [studentPoweredOn, setStudentPoweredOn] = useState(false);
  const [studentPaused, setStudentPaused] = useState(false);

  // ⭐ THIS WAS MISSING
  const [instructorMessage, setInstructorMessage] = useState('');
  const [padsLocked, setPadsLocked] = useState(false);
  const [lastPadStatus, setLastPadStatus] = useState({
    'Pad 1': false,
    'Pad 2': false,
  });

  useEffect(() => {
    setIsServer(true);
  }, []);

  const sendSignal = (type, data = null) => {
    if (!connectionStatus?.toLowerCase().includes('connected')) return;
    sendMessage(JSON.stringify({ type, data }));
  };

  const sendSetRhythm = rhythm => {
    setSelectedRhythm(rhythm);
    setCurrentStepIndex(0);
    sendSignal('SET_RHYTHM', rhythm);
    setInstructorMessage(`You changed rhythm to ${rhythm}`);
  };

  const sendPlayStep = (rhythm, index) => {
    if (!studentPoweredOn) {
      setInstructorMessage('Student has not powered on the AED yet');
      return;
    }

    if (aedSequences[rhythm]?.[index]) {
      setCurrentStepIndex(index);
      sendSignal('PLAY_STEP', { rhythm, index });
    }
  };

  const sendNextStep = () => {
    if (!studentPoweredOn) {
      setInstructorMessage('Student has not powered on the AED yet');
      return;
    }

    setCurrentStepIndex(prev => prev + 1);
    sendSignal('NEXT_STEP');
  };

  const sendPrevStep = () => {
    if (!studentPoweredOn) {
      setInstructorMessage('Student has not powered on the AED yet');
      return;
    }

    setCurrentStepIndex(prev => Math.max(0, prev - 1));
    sendSignal('PREV_STEP');
  };

  const sendStopAudio = () => sendSignal('STOP_AUDIO');
  const sendReset = () => {
    setCurrentStepIndex(0);
    sendSignal('RESET_AED');
  };

  const sendSimulationControl = action => {
    if (action === 'START') {
      setStudentPoweredOn(false);
      sendSignal('SIM_CONTROL', 'START');
      setCurrentStepIndex(0);
      setTimeout(() => sendSignal('SET_RHYTHM', selectedRhythm), 50);
      return;
    }

    if (action === 'PADS_ADVISED') {
      sendSignal('PADS_ADVISED', true);
      return;
    }
    if (action === 'SHOCK_ADVISED') {
      sendSignal('SHOCK_ADVISED', true);
      return;
    }
    if (action === 'FINISH') {
      sendSignal('FINISH', true);
      return;
    }

    sendSignal('SIM_CONTROL', action);
  };

  const toggleControlMode = () => {
    const newMode = !controlMode;
    setControlMode(newMode);
    sendSignal('CONTROL_MODE', newMode ? 'INSTRUCTOR' : 'AUTO');
  };

  // ⭐ MAIN MESSAGE HANDLER (clean & fixed)
  useEffect(() => {
    if (!message) return;
    console.log('INCOMING FROM TCP:', message);

    // 🔹 1) Handle plain-text messages from the student first
    if (typeof message === 'string') {
      if (message.includes('Student powered on the AED')) {
        setStudentPoweredOn(true);
        setStudentPaused(false);
        setInstructorMessage('Student powered on the AED');
        return;
      }

      if (message.includes('Student turned off the AED')) {
        setStudentPoweredOn(false);
        setInstructorMessage('Student turned off the AED');
        return;
      }
    }

    let parsed = null;

    try {
      parsed = JSON.parse(message);
    } catch {
      // non-JSON → pass as plain text
      setInstructorMessage(message);
      return;
    }

    // 1️⃣ PAD STATUS
    if (parsed.type === 'PAD_STATUS') {
      const { label, placed } = parsed.data;

      // Update lastPadStatus first
      setLastPadStatus(prev => {
        const updated = { ...prev, [label]: placed };

        const allCorrect = updated['Pad 1'] && updated['Pad 2'];
        const anyNotCorrect = !updated['Pad 1'] || !updated['Pad 2'];

        // 🔓 If previously locked but now a pad is moved → UNLOCK
        if (padsLocked && anyNotCorrect) {
          setPadsLocked(false);
          setInstructorMessage(
            `${label} is ${placed ? 'placed correctly' : 'not placed'}`,
          );
          return updated;
        }

        // 🔒 If both are correct → LOCK and show dominant message
        if (!padsLocked && allCorrect) {
          setPadsLocked(true);
          setInstructorMessage('Student placed both pads correctly');
          return updated;
        }

        // Normal single-pad real-time updates (only when not locked)
        if (!padsLocked) {
          setInstructorMessage(
            `${label} is ${placed ? 'placed correctly' : 'not placed'}`,
          );
        }

        return updated;
      });

      return;
    }

    // 2️⃣ STUDENT ACTION
    if (parsed.type === 'STUDENT_ACTION') {
      if (parsed.data === 'OPEN_PAD_PACKAGE') {
        setInstructorMessage('Student opened the pad package');
      } else if (parsed.data === 'PADS_CORRECTLY_PLACED') {
        setInstructorMessage('Student placed both pads correctly');
      } else if (parsed.data === 'SHOCK_PRESSED') {
        setInstructorMessage('Student pressed shock button');
      } else {
        setInstructorMessage(`Student did action: ${parsed.data}`);
      }
      return;
    }

    // 3️⃣ STEP CONTROLS
    if (parsed.type === 'PLAY_STEP') {
      setCurrentStepIndex(parsed.data.index ?? 0);
    }
    if (parsed.type === 'NEXT_STEP') {
      setCurrentStepIndex(prev => prev + 1);
    }
    if (parsed.type === 'PREV_STEP') {
      setCurrentStepIndex(prev => Math.max(0, prev - 1));
    }
    if (parsed.type === 'RESET_AED') {
      setCurrentStepIndex(0);
    }
    if (parsed.type === 'STUDENT_POWER_BEFORE_START') {
      setInstructorMessage(
        'Student pressed the power button \n but you didn’t start the simulation yet',
      );
      return;
    }

    if (
      typeof message === 'string' &&
      message.includes('Student powered on the AED')
    ) {
      setStudentPoweredOn(true);
      setInstructorMessage('Student powered on the AED');
      return;
    }
    if (
      typeof message === 'string' &&
      message.includes('Student turned off the AED')
    ) {
      setStudentPoweredOn(false);
      setInstructorMessage('Student turned off the AED');
      return;
    }

    // DEFAULT → show message json raw for instructor
    //setInstructorMessage(message);

    // translated JSON into readable text
    if (parsed?.type === 'SIM_CONTROL') {
      if (parsed.data === 'START') {
        setInstructorMessage('You started the simulation');
      } else if (parsed.data === 'STOP') {
        setInstructorMessage('You stopped the simulation');
      } else if (parsed.data === 'PAUSE') {
        setInstructorMessage('You paused the simulation');
      } else {
        setInstructorMessage(`Simulation control: ${parsed.data}`);
      }
      return;
    }

    if (parsed?.type === 'PLAY_STEP') {
      setInstructorMessage(`Instructor played step ${parsed.data?.index + 1}`);
      return;
    }

    if (parsed.type === 'STUDENT_PAUSE_STATE') {
      setStudentPaused(parsed.paused);
      setInstructorMessage(
        parsed.paused
          ? 'Student paused the simulation'
          : 'Student resumed the simulation',
      );
      return;
    }
    if (parsed?.type === 'STUDENT_TRY_AGAIN') {
      setInstructorMessage('Student restarted the simulation');
      setStudentPoweredOn(false);
      setStudentPaused(false);
      setCurrentStepIndex(0);

      return;
    }

    // setInstructorMessage('Received student signal');
  }, [message]);

  return (
    <LiveInstructorContext.Provider
      value={{
        connectionStatus,
        message: instructorMessage,
        controlMode,
        selectedRhythm,
        sendSetRhythm,
        sendPlayStep,
        sendNextStep,
        sendPrevStep,
        sendStopAudio,
        sendReset,
        sendSimulationControl,
        toggleControlMode,
        currentStepIndex,
        studentPoweredOn,
        studentPaused,
      }}
    >
      {children}
    </LiveInstructorContext.Provider>
  );
};

export const useLiveInstructor = () => useContext(LiveInstructorContext);
