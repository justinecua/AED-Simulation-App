import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Users } from 'lucide-react-native';
import styles from '../../styles/connectToInstructorStyles';
import HeaderBar from '../../components/ConnectToInstructor/HeaderBar';
import BluetoothRadar from '../../components/ConnectToInstructor/BluetoothRadar';
import InstructorCard from '../../components/ConnectToInstructor/InstructorCard';
import ConnectionDialog from '../../components/ConnectionDialog';
import { useTcpServerContext } from '../../context/TcpServerContext';

const StudentConnectScreen = ({ goBack, goLiveSession }) => {
  const {
    connectionStatus,
    ipServer,
    setIpServer,
    scanForHosts,
    availableHosts,
    sendMessage,
  } = useTcpServerContext();

  const handleConnect = ip => {
    setIpServer(ip);
    sendMessage('HELLO_STUDENT');
  };

  const noResults = availableHosts.length === 0;

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <HeaderBar goBack={goBack} />

          <BluetoothRadar isSearching={false} onToggleSearch={scanForHosts} />

          <Text style={styles.Text}>
            {connectionStatus.includes('Connected')
              ? 'Connected to Instructor.'
              : 'Press Wi-Fi to search or enter IP below.'}
          </Text>

          {availableHosts.length > 0 ? (
            <>
              <Text style={styles.studentCount}>
                {availableHosts.length} Instructor
                {availableHosts.length > 1 ? 's' : ''} Available
              </Text>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.studentCarousel}
              >
                {availableHosts.map((ins, index) => (
                  <InstructorCard
                    key={index}
                    name={`Instructor`}
                    id={ins.ip}
                    onConnect={() => handleConnect(ins.ip)}
                  />
                ))}
              </ScrollView>
            </>
          ) : (
            <View style={styles.noResultContainer}>
              <Users color="#94A3B8" size={25} />
              <Text style={styles.noResultTitle}>No Active Sessions</Text>
              <Text style={styles.noResultText}>
                Ensure the instructor started a session, or connect manually:
              </Text>

              <TextInput
                placeholder="e.g. 10.0.2.2"
                value={ipServer}
                onChangeText={setIpServer}
                style={styles.ipConnectInput}
              />

              <TouchableOpacity
                onPress={() => handleConnect(ipServer)}
                style={styles.ipConnectButton}
              >
                <Text style={styles.ipConnectButtonText}>Join Session</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>

      <ConnectionDialog
        visible={connectionStatus.includes('Connected')}
        role="student"
        id={ipServer}
        status={connectionStatus}
        onContinue={goLiveSession}
      />
    </>
  );
};

export default StudentConnectScreen;
