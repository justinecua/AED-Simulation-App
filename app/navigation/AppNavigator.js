import React, { useState } from 'react';
import AnimatedScreenTransition from '../animations/AnimatedScreenTransition';
import RoleSelectionScreen from '../screens/auth/RoleSelectionScreen';
import StudentHomeScreen from '../screens/student/StudentHomeScreen';
import InstructorHomeScreen from '../screens/instructor/InstructorHomeScreen';

export default function AppNavigator() {
  const [screen, setScreen] = useState('role');
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

  const handleNavigation = newScreen => {
    setDirection(newScreen === 'role' ? -1 : 1);
    setScreen(newScreen);
  };

  return (
    <>
      {screen === 'student' && (
        <AnimatedScreenTransition direction={direction} keyValue="student">
          <StudentHomeScreen goHome={() => handleNavigation('role')} />
        </AnimatedScreenTransition>
      )}

      {screen === 'instructor' && (
        <AnimatedScreenTransition direction={direction} keyValue="instructor">
          <InstructorHomeScreen />
        </AnimatedScreenTransition>
      )}

      {screen === 'role' && (
        <AnimatedScreenTransition direction={direction} keyValue="role">
          <RoleSelectionScreen
            onSelectStudent={() => handleNavigation('student')}
            onSelectInstructor={() => handleNavigation('instructor')}
          />
        </AnimatedScreenTransition>
      )}
    </>
  );
}
