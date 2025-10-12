import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Users } from 'lucide-react-native';
import styles from '../../styles/connectToInstructorStyles';
import HeaderBar from '../../components/ConnectToInstructor/HeaderBar';
import BluetoothRadar from '../../components/ConnectToInstructor/BluetoothRadar';
import InstructorCard from '../../components/ConnectToInstructor/InstructorCard';
import ConnectionDialog from '../../components/ConnectionDialog';
import { useTcpServerContext } from '../../context/TcpServerContext';

const InstructorHostScreen = ({ goBack, goLiveSession }) => {
  const {
    isHosting,
    hostIp,
    students,
    isSearching,
    startHosting,
    stopHosting,
    dialogVisible,
    readableId,
    handleContinue,
    status,
  } = useTcpServerContext();

  const toggleHosting = () => (isHosting ? stopHosting() : startHosting());

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <HeaderBar goBack={goBack} />
          <BluetoothRadar
            isSearching={isSearching}
            onToggleSearch={toggleHosting}
          />

          <Text style={styles.Text}>
            {isHosting
              ? `Hosting on ${hostIp}`
              : 'Press Wi-Fi to start a session.'}
          </Text>

          {/* Students */}
          {students.length > 0 ? (
            <>
              <Text style={styles.studentCount}>
                {students.length} Student{students.length > 1 ? 's' : ''}{' '}
                Connected
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.studentCarousel}
              >
                {students.map(s => (
                  <InstructorCard key={s.id} name={s.name} id={s.id} />
                ))}
              </ScrollView>
            </>
          ) : (
            <View style={styles.noResultContainer}>
              <Users color="#94A3B8" size={25} />
              <Text style={styles.noResultTitle}>
                {isHosting ? 'Waiting for Students…' : 'Session Not Active'}
              </Text>
              <Text style={styles.noResultText}>
                {isHosting
                  ? 'Share this IP with students to join.'
                  : 'Enable hotspot or ensure same Wi-Fi before starting.'}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
      <ConnectionDialog
        visible={dialogVisible}
        role="instructor"
        id={readableId}
        status={status}
        onContinue={() => {
          handleContinue();
          goLiveSession?.();
        }}
      />
    </>
  );
};

export default InstructorHostScreen;
