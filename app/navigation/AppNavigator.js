import React, { useState } from 'react';
import AnimatedScreenTransition from '../animations/AnimatedScreenTransition';
import RoleSelectionScreen from '../screens/auth/RoleSelectionScreen';
import StudentHomeScreen from '../screens/student/StudentHomeScreen';
import InstructorHomeScreen from '../screens/instructor/InstructorHomeScreen';
import InstructorTestScenarioScreen from '../screens/instructor/InstructorTestScenarioScreen';
import StudentAutoModeScreen from '../screens/student/StudentAutoModeScreen';
import PadPlacementScreen from '../screens/student/PadPlacementScreen';
import StudentConnectScreen from '../screens/student/StudentConnectScreen';
import { AEDProvider } from '../context/AEDContext';
import InstructorLiveSessionScreen from '../screens/instructor/InstructorLiveSessionScreen';
import InstructorHostScreen from '../screens/instructor/InstructorHostScreen';
import InstructorScenarioBuilder from '../screens/instructor/InstructorScenarioBuilder';

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
      <AEDProvider>
        {screen === 'student' && (
          <AnimatedScreenTransition direction={direction} keyValue="student">
            <StudentHomeScreen
              goHome={() => handleNavigation('role')}
              goStudentAutoMode={() => handleNavigation('studentAutoMode')}
              goConnectToInstructor={() =>
                handleNavigation('connectInstructor')
              }
            />
          </AnimatedScreenTransition>
        )}

        {screen === 'instructor' && (
          <AnimatedScreenTransition direction={direction} keyValue="instructor">
            <InstructorHomeScreen
              goHome={() => handleNavigation('role')}
              onSelectAutoMode={() =>
                handleNavigation('testScenarioInstructor')
              }
              goConnectToStudent={() => handleNavigation('connectStudent')}
              goScenarioBuilder={() => handleNavigation('scenarioBuilder')}
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
              goApplyPads={() => handleNavigation('applyPads')}
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

        {screen === 'applyPads' && (
          <AnimatedScreenTransition direction={direction} keyValue="applyPads">
            <PadPlacementScreen
              goStudentAutoMode={() => handleNavigation('studentAutoMode')}
            />
          </AnimatedScreenTransition>
        )}
        {screen === 'connectInstructor' && (
          <AnimatedScreenTransition
            direction={direction}
            keyValue="connectInstructor"
          >
            <StudentConnectScreen
              goHome={() => handleNavigation('role')}
              goBack={() => handleNavigation('student')}
              goLiveSession={() => handleNavigation('studentAutoMode')}
            />
          </AnimatedScreenTransition>
        )}

        {screen === 'connectStudent' && (
          <InstructorHostScreen
            goHome={() => handleNavigation('role')}
            goBack={() => handleNavigation('instructor')}
            goLiveSession={() => handleNavigation('liveSession')}
          />
        )}

        {screen === 'liveSession' && (
          <InstructorLiveSessionScreen
            goHome={() => handleNavigation('role')}
            goBack={() => handleNavigation('connectStudent')}
          />
        )}
        {screen === 'scenarioBuilder' && (
          <AnimatedScreenTransition
            direction={direction}
            keyValue="scenarioBuilder"
          >
            <InstructorScenarioBuilder
              goHome={() => handleNavigation('role')}
              goBack={() => handleNavigation('instructor')}
            />
          </AnimatedScreenTransition>
        )}
      </AEDProvider>
    </>
  );
}
