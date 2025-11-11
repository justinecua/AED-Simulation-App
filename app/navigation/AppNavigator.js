import React, { useState } from 'react';
import AnimatedScreenTransition from '../animations/AnimatedScreenTransition';
import RoleSelectionScreen from '../screens/auth/RoleSelectionScreen';
import StudentHomeScreen from '../screens/student/StudentHomeScreen';
import InstructorHomeScreen from '../screens/instructor/InstructorHomeScreen';
import InstructorTestScenarioScreen from '../screens/instructor/InstructorTestScenarioScreen';
import StudentAutoModeScreen from '../screens/student/StudentAutoModeScreen';
import PadPlacementScreen from '../shared/PadPlacementScreen';
import StudentConnectScreen from '../screens/student/StudentConnectScreen';
import { AEDProvider } from '../context/AEDContext';
import InstructorLiveSessionScreen from '../screens/instructor/InstructorLiveSessionScreen';
import InstructorHostScreen from '../screens/instructor/InstructorHostScreen';
import InstructorScenarioBuilder from '../screens/instructor/InstructorScenarioBuilder';
import StudentLiveSessionScreen from '../screens/student/StudentLiveSessionScreen';
import { TcpServerProvider } from '../context/TcpServerContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScenarioProvider } from '../context/ScenarioContext';
import ScenariosScreen from '../screens/instructor/ScenariosScreen';

export default function AppNavigator() {
  const [screen, setScreen] = useState('role');
  const [direction, setDirection] = useState(1);
  const [editScenario, setEditScenario] = useState(null);

  const handleNavigation = (newScreen, scenarioData = null) => {
    setDirection(newScreen === 'role' || newScreen === 'instructor' ? -1 : 1);

    // Store editScenario data if provided
    if (scenarioData) {
      setEditScenario(scenarioData);
    } else {
      setEditScenario(null); // Clear when not editing
    }

    setScreen(newScreen);
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right', 'bottom']}>
      <TcpServerProvider>
        <AEDProvider>
          <ScenarioProvider>
            {/* Role select */}
            {screen === 'role' && (
              <AnimatedScreenTransition direction={direction} keyValue="role">
                <RoleSelectionScreen
                  onSelectStudent={() => handleNavigation('student')}
                  onSelectInstructor={() => handleNavigation('instructor')}
                />
              </AnimatedScreenTransition>
            )}

            {/* Student flow */}
            {screen === 'student' && (
              <AnimatedScreenTransition direction={direction} keyValue="student">
                <StudentHomeScreen
                  goHome={() => handleNavigation('role')}
                  goStudentAutoMode={() => handleNavigation('studentAutoMode')}
                  goConnectToInstructor={() => handleNavigation('connectInstructor')}
                />
              </AnimatedScreenTransition>
            )}

            {screen === 'studentAutoMode' && (
              <AnimatedScreenTransition direction={direction} keyValue="studentAutoMode">
                <StudentAutoModeScreen
                  goHome={() => handleNavigation('role')}
                  goHomeStudent={() => handleNavigation('student')}
                  goApplyPads={() => handleNavigation('applyPadsStudent')}
                />
              </AnimatedScreenTransition>
            )}

            {screen === 'applyPadsStudent' && (
              <AnimatedScreenTransition direction={direction} keyValue="applyPadsStudent">
                <PadPlacementScreen
                  role="student"
                  onBack={() => handleNavigation('studentAutoMode')}
                />
              </AnimatedScreenTransition>
            )}

            {screen === 'connectInstructor' && (
              <AnimatedScreenTransition direction={direction} keyValue="connectInstructor">
                <StudentConnectScreen
                  goHome={() => handleNavigation('role')}
                  goBack={() => handleNavigation('student')}
                  goLiveSession={() => handleNavigation('studentLiveSession')}
                />
              </AnimatedScreenTransition>
            )}

            {screen === 'studentLiveSession' && (
              <AnimatedScreenTransition direction={direction} keyValue="studentLiveSession">
                <StudentLiveSessionScreen
                  goHomeStudent={() => handleNavigation('student')}
                  goApplyPads={() => handleNavigation('applyPadsStudent')}
                />
              </AnimatedScreenTransition>
            )}

            {/* Instructor flow */}
            {screen === 'instructor' && (
              <AnimatedScreenTransition direction={direction} keyValue="instructor">
                <InstructorHomeScreen
                  goHome={() => handleNavigation('role')}
                  onSelectAutoMode={() => handleNavigation('testScenarioInstructor')}
                  goConnectToStudent={() => handleNavigation('connectStudent')}
                  goScenarioBuilder={() => handleNavigation('scenarioBuilder')}
                />
              </AnimatedScreenTransition>
            )}

            {screen === 'testScenarioInstructor' && (
              <AnimatedScreenTransition direction={direction} keyValue="testScenarioInstructor">
                <InstructorTestScenarioScreen
                  goHome={() => handleNavigation('role')}
                  goHomeInsctructor={() => handleNavigation('instructor')}
                  goApplyPads={() => handleNavigation('applyPadsInstructor')}
                  goScenarios={() => handleNavigation('scenarios')}
                />
              </AnimatedScreenTransition>
            )}

            {screen === 'applyPadsInstructor' && (
              <AnimatedScreenTransition direction={direction} keyValue="applyPadsInstructor">
                <PadPlacementScreen
                  role="instructor"
                  onBack={() => handleNavigation('testScenarioInstructor')}
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

            {screen === 'scenarios' && (
              <AnimatedScreenTransition direction={direction} keyValue="scenarios">
                <ScenariosScreen
                  goBack={() => handleNavigation('instructor')}
                  goNewScenario={() => handleNavigation('scenarioBuilder')}
                  goEditScenario={(scenario) => handleNavigation('scenarioBuilder', scenario)} // Pass scenario data
                />
              </AnimatedScreenTransition>
            )}

            {screen === 'scenarioBuilder' && (
              <AnimatedScreenTransition direction={direction} keyValue="scenarioBuilder">
                <InstructorScenarioBuilder
                  goBack={() => handleNavigation('scenarios')}
                  goScenarios={() => handleNavigation('scenarios')}
                  goTestScenario={() => handleNavigation('testScenarioInstructor')}
                  editScenario={editScenario} // Pass the stored scenario data
                />
              </AnimatedScreenTransition>
            )}
          </ScenarioProvider>
        </AEDProvider>
      </TcpServerProvider>
    </SafeAreaView>
  );
}
