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
    connect,
  } = useTcpServerContext();

  const handleConnect = ip => {
    connect(ip);
  };
  const noResults = availableHosts.length === 0;

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <HeaderBar goBack={goBack} />

          <BluetoothRadar isSearching={true} onToggleSearch={scanForHosts} />

          <Text style={styles.Text}>
            {connectionStatus.includes('Connected')
              ? 'Connected to Instructor.'
              : 'Enter the Instructor`s IP below.'}
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
                The instructor must start a session and enable their hotspot
                first. Connect to the instructor’s hotspot, then enter the IP
                address shown on their screen.
              </Text>

              <TextInput
                placeholder=""
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
