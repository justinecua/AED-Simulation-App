import RoleSelectionScreen from './app/screens/auth/RoleSelectionScreen';
import StudentHomeScreen from './app/screens/student/StudentHomeScreen';
import InstructorLiveSessionScreen from './app/screens/instructor/InstructorLiveSessionScreen';
import ScenarioBuilder from './app/screens/instructor/ScenarioBuilder';
import PadPlacementScreen from './app/screens/student/PadPlacementScreen';
import InstructorTestScenarioScreen from './app/screens/instructor/InstructorTestScenarioScreen';
import InstructorHomeScreen from './app/screens/instructor/InstructorHomeScreen';

import React from 'react';
import AppNavigator from './app/navigation/AppNavigator';

export default function App() {
  return <AppNavigator />;
}
