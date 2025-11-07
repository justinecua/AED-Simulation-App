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

  useEffect(() => {
    setIsServer(true);
  }, []);

  const sendSignal = (type, data = null) => {
    if (!connectionStatus?.toLowerCase().includes('connected')) {
      console.log(' No connected student yet');
      return;
    }

    const packet = JSON.stringify({ type, data });
    console.log(' Sending signal:', packet);
    sendMessage(packet);
  };

  const sendSetRhythm = rhythm => {
    setSelectedRhythm(rhythm);
    setCurrentStepIndex(0); // reset index when selecting rhythm
    sendSignal('SET_RHYTHM', rhythm);
  };

  const sendPlayStep = (rhythm, index) => {
    if (aedSequences[rhythm]?.[index]) {
      setCurrentStepIndex(index); // update index on manual step play
      sendSignal('PLAY_STEP', { rhythm, index });
    }
  };

  const sendNextStep = () => {
    setCurrentStepIndex(prev => prev + 1);
    sendSignal('NEXT_STEP');
  };

  const sendPrevStep = () => {
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
      sendSignal('SIM_CONTROL', 'START');
      setCurrentStepIndex(0);
      setTimeout(() => {
        sendSignal('SET_RHYTHM', selectedRhythm);
      }, 50);
    } else {
      sendSignal('SIM_CONTROL', action);
    }
  };

  const toggleControlMode = () => {
    const newMode = !controlMode;
    setControlMode(newMode);
    sendSignal('CONTROL_MODE', newMode ? 'INSTRUCTOR' : 'AUTO');
  };

  // ✅ Listen to student messages to sync stepIndex
  useEffect(() => {
    if (!message) return;

    try {
      const parsed = JSON.parse(message);

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
    } catch (e) {}
  }, [message]);

  return (
    <LiveInstructorContext.Provider
      value={{
        connectionStatus,
        message,
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
        currentStepIndex, // ✅ exposed to instructor screen
      }}
    >
      {children}
    </LiveInstructorContext.Provider>
  );
};

export const useLiveInstructor = () => useContext(LiveInstructorContext);
