import React, { useState } from 'react';
import AnimatedScreenTransition from '../animations/AnimatedScreenTransition';
import RoleSelectionScreen from '../screens/auth/RoleSelectionScreen';

// Student screens
import StudentHomeScreen from '../screens/student/StudentHomeScreen';
import StudentAutoModeScreen from '../screens/student/StudentAutoModeScreen';
import PadPlacementScreen from '../shared/PadPlacementScreen';
import StudentConnectScreen from '../screens/student/StudentConnectScreen';
import StudentLiveSessionScreen from '../screens/student/StudentLiveSessionScreen';
import LivePadPlacementScreen from '../screens/student/LivePadPlacementScreen';

// Instructor screens
import InstructorHomeScreen from '../screens/instructor/InstructorHomeScreen';
import InstructorTestScenarioScreen from '../screens/instructor/InstructorTestScenarioScreen';
import InstructorHostScreen from '../screens/instructor/InstructorHostScreen';
import InstructorLiveSessionScreen from '../screens/instructor/InstructorLiveSessionScreen';
import InstructorScenarioBuilder from '../screens/instructor/InstructorScenarioBuilder';
import ScenariosScreen from '../screens/instructor/ScenariosScreen';

// Providers
import { AEDProvider } from '../context/AEDContext';
import { TcpServerProvider } from '../context/TcpServerContext';
import { LiveInstructorProvider } from '../context/LiveInstructorContext';
import { LiveAEDClientProvider } from '../context/LiveAEDClientContext';
import { ScenarioProvider } from '../context/ScenarioContext';

// -------------------------------------------------------------

export default function AppNavigator() {
  const [screen, setScreen] = useState('role');
  const [direction, setDirection] = useState(1);
  const [editScenario, setEditScenario] = useState(null);

  const handleNavigation = (newScreen, scenarioData = null) => {
    setDirection(newScreen === 'role' || newScreen === 'instructor' ? -1 : 1);

    if (scenarioData) setEditScenario(scenarioData);
    else setEditScenario(null);

    setScreen(newScreen);
  };

  return (
    <TcpServerProvider>
      <AEDProvider>
        <ScenarioProvider>

          {/* ROLE SELECT */}
          {screen === 'role' && (
            <AnimatedScreenTransition direction={direction} keyValue="role">
              <RoleSelectionScreen
                onSelectStudent={() => handleNavigation('student')}
                onSelectInstructor={() => handleNavigation('instructor')}
              />
            </AnimatedScreenTransition>
          )}

          {/* ---------------------------------- */}
          {/* STUDENT FLOW */}
          {/* ---------------------------------- */}

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

          {(screen === 'studentLiveSession' || screen === 'livePads') && (
            <LiveAEDClientProvider>
              {screen === 'studentLiveSession' && (
                <AnimatedScreenTransition direction={direction} keyValue="studentLiveSession">
                  <StudentLiveSessionScreen
                    goHomeStudent={() => handleNavigation('student')}
                    goApplyPads={() => handleNavigation('livePads')}
                  />
                </AnimatedScreenTransition>
              )}

              {screen === 'livePads' && (
                <AnimatedScreenTransition direction={direction} keyValue="livePads">
                  <LivePadPlacementScreen
                    goLiveSession={() => handleNavigation('studentLiveSession')}
                  />
                </AnimatedScreenTransition>
              )}
            </LiveAEDClientProvider>
          )}

          {/* ---------------------------------- */}
          {/* INSTRUCTOR FLOW */}
          {/* ---------------------------------- */}

          {screen === 'instructor' && (
            <AnimatedScreenTransition direction={direction} keyValue="instructor">
              <InstructorHomeScreen
                goHome={() => handleNavigation('role')}
                onSelectAutoMode={() => handleNavigation('testScenarioInstructor')}
                goConnectToStudent={() => handleNavigation('connectStudent')}
                goScenarioBuilder={() => handleNavigation('scenarioBuilder')}
                goScenarios={() => handleNavigation('scenarios')}
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
            <LiveInstructorProvider>
              <AnimatedScreenTransition direction={direction} keyValue="connectStudent">
                <InstructorHostScreen
                  goHome={() => handleNavigation('role')}
                  goBack={() => handleNavigation('instructor')}
                  goLiveSession={() => handleNavigation('liveSession')}
                />
              </AnimatedScreenTransition>
            </LiveInstructorProvider>
          )}

          {screen === 'liveSession' && (
            <LiveInstructorProvider>
              <AnimatedScreenTransition direction={direction} keyValue="liveSession">
                <InstructorLiveSessionScreen
                  goHome={() => handleNavigation('role')}
                  goBack={() => handleNavigation('connectStudent')}
                />
              </AnimatedScreenTransition>
            </LiveInstructorProvider>
          )}

          {/* SCENARIOS LIST */}
          {screen === 'scenarios' && (
            <AnimatedScreenTransition direction={direction} keyValue="scenarios">
              <ScenariosScreen
                goBack={() => handleNavigation('instructor')}
                goNewScenario={() => handleNavigation('scenarioBuilder')}
                goEditScenario={(sc) => handleNavigation('scenarioBuilder', sc)}
              />
            </AnimatedScreenTransition>
          )}

          {/* SCENARIO BUILDER */}
          {screen === 'scenarioBuilder' && (
            <AnimatedScreenTransition direction={direction} keyValue="scenarioBuilder">
              <InstructorScenarioBuilder
                goBack={() => handleNavigation('scenarios')}
                goScenarios={() => handleNavigation('scenarios')}
                goTestScenario={() => handleNavigation('testScenarioInstructor')}
                editScenario={editScenario}
              />
            </AnimatedScreenTransition>
          )}

        </ScenarioProvider>
      </AEDProvider>
    </TcpServerProvider>
  );
}
