import React, { useState } from 'react';
import AnimatedScreenTransition from '../animations/AnimatedScreenTransition';

// Authentication
import RoleSelectionScreen from '../screens/auth/RoleSelectionScreen';

// Student Screens
import StudentHomeScreen from '../screens/student/StudentHomeScreen';
import StudentAutoModeScreen from '../screens/student/StudentAutoModeScreen';
import StudentConnectScreen from '../screens/student/StudentConnectScreen';
import StudentLiveSessionScreen from '../screens/student/StudentLiveSessionScreen';
import LivePadPlacementScreen from '../screens/student/LivePadPlacementScreen';
import PracticeModeScreen from '../screens/student/PracticeModeScreen';
import SimulationTipsScreen from '../screens/student/SimulationTipsScreen';

// Instructor Screens
import InstructorHomeScreen from '../screens/instructor/InstructorHomeScreen';
import InstructorTestScenarioScreen from '../screens/instructor/InstructorTestScenarioScreen';
import InstructorHostScreen from '../screens/instructor/InstructorHostScreen';
import InstructorLiveSessionScreen from '../screens/instructor/InstructorLiveSessionScreen';
import InstructorScenarioBuilder from '../screens/instructor/InstructorScenarioBuilder';
import ScenariosScreen from '../screens/instructor/ScenariosScreen';
import { LiveInstructorProvider } from '../context/LiveInstructorContext';
import InstructorTestScenarioPadPlacementScreen from '../screens/instructor/InstructorTestScenarioPadPlacementScreen';
// Shared
import PadPlacementScreen from '../screens/student/PadPlacementScreen';

// Providers
import { AEDProvider } from '../context/AEDContext';
import { TcpServerProvider } from '../context/TcpServerContext';
import { LiveAEDClientProvider } from '../context/LiveAEDClientContext';
import { ScenarioProvider } from '../context/ScenarioContext';
import { TestScenarioProvider } from '../context/TestScenarioContext';
import PracticePadPlacementScreen from '../screens/student/PracticePadPlacementScreen';
import { AEDPracticeProvider } from '../context/AEDPracticeContext';
import { SimulationAEDProvider } from '../context/SimulationAEDContext';
// UI
import { SafeAreaView } from 'react-native-safe-area-context';
import SplashScreen from '../shared/SplashScreen';

export default function AppNavigator() {
  const [screen, setScreen] = useState('splash');
  const [direction, setDirection] = useState(1);
  const [editScenario, setEditScenario] = useState(null);

  const handleNavigation = (newScreen, scenarioData = null) => {
    setDirection(newScreen === 'role' || newScreen === 'instructor' ? -1 : 1);
    setEditScenario(scenarioData || null);
    setScreen(newScreen);
  };

  return (
    <SafeAreaView
      style={{ flex: 1 }}
      edges={['top', 'left', 'right', 'bottom']}
    >
      <TcpServerProvider>
        <AEDProvider>
          <ScenarioProvider>
            {/* SPLASH */}
            {screen === 'splash' && (
              <AnimatedScreenTransition direction={1} keyValue="splash">
                <SplashScreen onFinish={() => setScreen('role')} />
              </AnimatedScreenTransition>
            )}

            {/* ROLE */}
            {screen === 'role' && (
              <AnimatedScreenTransition direction={direction} keyValue="role">
                <RoleSelectionScreen
                  onSelectStudent={() => handleNavigation('student')}
                  onSelectInstructor={() => handleNavigation('instructor')}
                />
              </AnimatedScreenTransition>
            )}

            {/* STUDENT HOME */}
            {screen === 'student' && (
              <AnimatedScreenTransition
                direction={direction}
                keyValue="student"
              >
                <StudentHomeScreen
                  goHome={() => handleNavigation('role')}
                  goStudentAutoMode={() => handleNavigation('studentAutoMode')}
                  goConnectToInstructor={() =>
                    handleNavigation('connectInstructor')
                  }
                  // 🔹 new props
                  goSimulationTips={() => handleNavigation('simulationTips')}
                  goPracticeMode={() => handleNavigation('practiceMode')}
                />
              </AnimatedScreenTransition>
            )}

            {/* STUDENT AUTO MODE */}
            {screen === 'studentAutoMode' && (
              <AnimatedScreenTransition
                direction={direction}
                keyValue="studentAutoMode"
              >
                <StudentAutoModeScreen
                  goHome={() => handleNavigation('role')}
                  goHomeStudent={() => handleNavigation('student')}
                  goApplyPads={() => handleNavigation('applyPadsStudent')}
                />
              </AnimatedScreenTransition>
            )}

            {/* STUDENT APPLY PADS */}
            {screen === 'applyPadsStudent' && (
              <AnimatedScreenTransition
                direction={direction}
                keyValue="applyPadsStudent"
              >
                <PadPlacementScreen
                  role="student"
                  goStudentAutoMode={() => handleNavigation('studentAutoMode')}
                />
              </AnimatedScreenTransition>
            )}

            {/* 🔹 NEW: SIMULATION TIPS */}
            {screen === 'simulationTips' && (
              <SimulationAEDProvider>
                <AnimatedScreenTransition
                  direction={direction}
                  keyValue="simulationTips"
                >
                  <SimulationTipsScreen
                    goHomeStudent={() => handleNavigation('student')}
                    goApplyPads={() => handleNavigation('applyPadsStudent')}
                  />
                </AnimatedScreenTransition>
              </SimulationAEDProvider>
            )}

            {/* 🔹 NEW: PRACTICE MODE */}
            {screen === 'practiceMode' || screen === 'practiceApplyPads' ? (
              <AEDPracticeProvider>
                {screen === 'practiceMode' && (
                  <AnimatedScreenTransition
                    keyValue="practiceMode"
                    direction={direction}
                  >
                    <PracticeModeScreen
                      goHomeStudent={() => handleNavigation('student')}
                      goPracticeApplyPads={() =>
                        handleNavigation('practiceApplyPads')
                      }
                    />
                  </AnimatedScreenTransition>
                )}

                {screen === 'practiceApplyPads' && (
                  <AnimatedScreenTransition
                    keyValue="practiceApplyPads"
                    direction={direction}
                  >
                    <PracticePadPlacementScreen
                      goBackToPractice={() => handleNavigation('practiceMode')}
                    />
                  </AnimatedScreenTransition>
                )}
              </AEDPracticeProvider>
            ) : null}

            {/* STUDENT CONNECT */}
            {screen === 'connectInstructor' && (
              <AnimatedScreenTransition
                direction={direction}
                keyValue="connectInstructor"
              >
                <StudentConnectScreen
                  goHome={() => handleNavigation('role')}
                  goBack={() => handleNavigation('student')}
                  goLiveSession={() => handleNavigation('studentLiveSession')}
                />
              </AnimatedScreenTransition>
            )}

            {/* STUDENT LIVE SESSION */}
            {(screen === 'studentLiveSession' || screen === 'livePads') && (
              <LiveAEDClientProvider>
                {screen === 'studentLiveSession' && (
                  <AnimatedScreenTransition
                    direction={direction}
                    keyValue="studentLiveSession"
                  >
                    <StudentLiveSessionScreen
                      goHomeStudent={() => handleNavigation('student')}
                      goApplyPads={() => handleNavigation('livePads')}
                    />
                  </AnimatedScreenTransition>
                )}

                {screen === 'livePads' && (
                  <AnimatedScreenTransition
                    direction={direction}
                    keyValue="livePads"
                  >
                    <LivePadPlacementScreen
                      goLiveSession={() =>
                        handleNavigation('studentLiveSession')
                      }
                    />
                  </AnimatedScreenTransition>
                )}
              </LiveAEDClientProvider>
            )}

            {/* INSTRUCTOR HOME */}
            {screen === 'instructor' && (
              <AnimatedScreenTransition
                direction={direction}
                keyValue="instructor"
              >
                <InstructorHomeScreen
                  goHome={() => handleNavigation('role')}
                  onSelectAutoMode={() =>
                    handleNavigation('testScenarioInstructor')
                  }
                  goConnectToStudent={() => handleNavigation('connectStudent')}
                  goScenarioBuilder={() => handleNavigation('scenarioBuilder')}
                  goManageScenarios={() => handleNavigation('scenarios')}
                />
              </AnimatedScreenTransition>
            )}

            {/* INSTRUCTOR TEST SCENARIO
            {screen === 'testScenarioInstructor' && (
              <AnimatedScreenTransition
                direction={direction}
                keyValue="testScenarioInstructor"
              >
                <TestScenarioProvider>
                  <InstructorTestScenarioScreen
                    goHome={() => handleNavigation('role')}
                    goHomeInsctructor={() => handleNavigation('instructor')}
                    goApplyPads={() => handleNavigation('applyPadsInstructor')}
                    goScenarios={() => handleNavigation('scenarios')}
                  />
                </TestScenarioProvider>
              </AnimatedScreenTransition>
            )} */}
            {/* INSTRUCTOR TEST SCENARIO FLOW */}
            {(screen === 'testScenarioInstructor' ||
              screen === 'testScenarioApplyPads') && (
              <TestScenarioProvider>
                <AnimatedScreenTransition
                  direction={direction}
                  keyValue="testScenarioFlow"
                >
                  {screen === 'testScenarioInstructor' && (
                    <InstructorTestScenarioScreen
                      goHomeInsctructor={() => handleNavigation('instructor')}
                      goApplyPads={() =>
                        handleNavigation('testScenarioApplyPads')
                      }
                    />
                  )}

                  {screen === 'testScenarioApplyPads' && (
                    <InstructorTestScenarioPadPlacementScreen
                      goBack={() => handleNavigation('testScenarioInstructor')}
                    />
                  )}
                </AnimatedScreenTransition>
              </TestScenarioProvider>
            )}
            {/* INSTRUCTOR Live APPLY PADS */}
            {screen === 'applyPadsInstructor' && (
              <AnimatedScreenTransition
                direction={direction}
                keyValue="applyPadsInstructor"
              >
                <PadPlacementScreen
                  role="instructor"
                  goStudentAutoMode={() =>
                    handleNavigation('testScenarioInstructor')
                  }
                />
              </AnimatedScreenTransition>
            )}

            {/* INSTRUCTOR HOST SCREEN */}
            {screen === 'connectStudent' && (
              <LiveInstructorProvider>
                <InstructorHostScreen
                  goHome={() => handleNavigation('role')}
                  goBack={() => handleNavigation('instructor')}
                  goLiveSession={() => handleNavigation('liveSession')}
                />
              </LiveInstructorProvider>
            )}

            {/* INSTRUCTOR LIVE SESSION */}
            {screen === 'liveSession' && (
              <LiveInstructorProvider>
                <InstructorLiveSessionScreen
                  goHome={() => handleNavigation('role')}
                  goBack={() => handleNavigation('instructor')}
                />
              </LiveInstructorProvider>
            )}

            {/* SCENARIOS LIST */}
            {screen === 'scenarios' && (
              <AnimatedScreenTransition
                direction={direction}
                keyValue="scenarios"
              >
                <ScenariosScreen
                  goBack={() => handleNavigation('instructor')}
                  goNewScenario={() => handleNavigation('scenarioBuilder')}
                  goEditScenario={scenario =>
                    handleNavigation('scenarioBuilder', scenario)
                  }
                />
              </AnimatedScreenTransition>
            )}

            {/* SCENARIO BUILDER */}
            {screen === 'scenarioBuilder' && (
              <AnimatedScreenTransition
                direction={direction}
                keyValue="scenarioBuilder"
              >
                <InstructorScenarioBuilder
                  goBack={() => handleNavigation('instructor')}
                  goScenarios={() => handleNavigation('scenarios')}
                  goTestScenario={() =>
                    handleNavigation('testScenarioInstructor')
                  }
                  editScenario={editScenario}
                />
              </AnimatedScreenTransition>
            )}
          </ScenarioProvider>
        </AEDProvider>
      </TcpServerProvider>
    </SafeAreaView>
  );
}
