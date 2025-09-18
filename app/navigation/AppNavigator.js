import React, { useState } from 'react';
import AnimatedScreenTransition from '../animations/AnimatedScreenTransition';
import RoleSelectionScreen from '../screens/auth/RoleSelectionScreen';
import StudentHomeScreen from '../screens/student/StudentHomeScreen';
import InstructorHomeScreen from '../screens/instructor/InstructorHomeScreen';
import InstructorTestScenarioScreen from '../screens/instructor/InstructorTestScenarioScreen';
import StudentAutoModeScreen from '../screens/student/StudentAutoModeScreen';
import SimulationTipsScreen from '../screens/student/SimulationTipsScreen';

export default function AppNavigator() {
  const [screen, setScreen] = useState('role');
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

  const handleNavigation = newScreen => {
    if (newScreen === 'role') {
      setDirection(-1);
    } else if (newScreen === 'instructor') {
      setDirection(-1);
    } else {
      setDirection(1);
    }
    setScreen(newScreen);
  };

  return (
    <>
      {screen === 'student' && (
        <AnimatedScreenTransition direction={direction} keyValue="student">
          <StudentHomeScreen
            goHome={() => handleNavigation('role')}
            goStudentAutoMode={() => handleNavigation('studentAutoMode')}
            goSimulationTips={() => handleNavigation('studentSimulationTips')}
          />
        </AnimatedScreenTransition>
      )}

      {screen === 'instructor' && (
        <AnimatedScreenTransition direction={direction} keyValue="instructor">
          <InstructorHomeScreen
            goHome={() => handleNavigation('role')}
            onSelectAutoMode={() => handleNavigation('testScenarioInstructor')}
          />
        </AnimatedScreenTransition>
      )}

      {screen === 'testScenarioInstructor' && (
        <AnimatedScreenTransition
          direction={direction}
          keyValue="testScenarioInstructor"
        >
          <InstructorTestScenarioScreen
            goHome={() => handleNavigation('role')}
            goHomeInsctructor={() => handleNavigation('instructor')}
          />
        </AnimatedScreenTransition>
      )}

      {screen === 'studentAutoMode' && (
        <AnimatedScreenTransition
          direction={direction}
          keyValue="studentAutoMode"
        >
          <StudentAutoModeScreen
            goHome={() => handleNavigation('role')}
            goHomeStudent={() => handleNavigation('student')}
          />
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

      {screen === 'studentSimulationTips' && (
        <AnimatedScreenTransition
          direction={direction}
          keyValue="studentSimulationTips"
        >
          <SimulationTipsScreen
            goHome={() => handleNavigation('role')}
            goHomeStudent={() => handleNavigation('student')}
          />
        </AnimatedScreenTransition>
      )}
    </>
  );
}
