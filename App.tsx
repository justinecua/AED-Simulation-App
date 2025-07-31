// App.tsx (root)
import React, { useState } from 'react';
import RoleSelectionScreen from './app/screens/auth/RoleSelectionScreen';
import StudentHomeScreen from './app/screens/student/StudentHomeScreen';
import SessionCompleteScreen from './app/screens/SessionCompleteScreen';
import PrivacyPolicyScreen from './app/screens/PrivacyPolicyScreen';

export default function App() {
  return <RoleSelectionScreen />;
}
