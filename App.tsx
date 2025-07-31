// App.tsx (root)
import React, { useState } from 'react';
import RoleSelectionScreen from './app/screens/auth/RoleSelectionScreen';
import StudentHomeScreen from './app/screens/student/StudentHomeScreen';
import InstructorLiveSessionScreen from './app/screens/instructor/InstructorLiveSessionScreen';
import ScenarioBuilder from './app/screens/instructor/ScenarioBuilder';
import PadPlacementScreen from './app/screens/student/PadPlacementScreen';

export default function App() {
  return <PadPlacementScreen />;
}
