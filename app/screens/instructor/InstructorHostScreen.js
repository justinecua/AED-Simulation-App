import React, { useEffect, useState } from 'react';
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
    isServer,
    setIsServer,
    ipAddress,
    connectionStatus,
    message,
    inputMsg,
    setInputMsg,
    sendMessage,
  } = useTcpServerContext();

  const [students, setStudents] = useState([]);
  useEffect(() => {
    setIsServer(true);
  }, []);

  useEffect(() => {
    if (connectionStatus === 'Connected') {
      setStudents([{ id: '1', name: 'Student', address: ipAddress }]);
    } else if (
      connectionStatus === 'Disconnected' ||
      connectionStatus === 'Not hosting'
    ) {
      setStudents([]);
    }
  }, [connectionStatus]);
  const toggleHosting = () => setIsServer(!isServer);

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <HeaderBar goBack={goBack} />

          <BluetoothRadar
            isSearching={isServer}
            onToggleSearch={toggleHosting}
          />

          <Text style={styles.Text}>
            {isServer
              ? `Hosting on ${ipAddress}:5000`
              : 'Press Wi-Fi to start a session.'}
          </Text>

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
                {isServer ? 'Waiting for Students…' : 'Session Not Active'}
              </Text>
              <Text style={styles.noResultText}>
                {isServer
                  ? 'Share this IP with students to join.'
                  : 'Enable hotspot or ensure same Wi-Fi before starting.'}
              </Text>
            </View>
          )}

          {message !== '' && (
            <Text style={{ color: '#475569', marginTop: 10 }}>{message}</Text>
          )}
        </View>
      </ScrollView>

      <ConnectionDialog
        visible={connectionStatus === 'Connected'}
        role="instructor"
        id={ipAddress}
        status={connectionStatus}
        onContinue={() => goLiveSession?.()}
      />
    </>
  );
};

export default InstructorHostScreen;
