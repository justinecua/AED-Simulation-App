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
import useTcpClient from '../../hooks/useTcpClient';
import ConnectionDialog from '../../components/ConnectionDialog';

const StudentConnectScreen = ({ goBack }) => {
  const {
    status,
    targetIp,
    setTargetIp,
    instructors,
    isSearching,
    connectTo,
    handleToggleSearch,
    dialogVisible,
    readableId,
    handleContinue,
  } = useTcpClient();

  const handleConnect = ip => connectTo(ip || targetIp);
  const noResults = !isSearching && instructors.length === 0;

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <HeaderBar goBack={goBack} />

          <BluetoothRadar
            isSearching={isSearching}
            onToggleSearch={handleToggleSearch}
          />

          <Text style={styles.Text}>
            {isSearching
              ? 'Searching for available sessions…'
              : 'Press Wi-Fi to search or enter IP below.'}
          </Text>

          {/* Instructors */}
          {instructors.length > 0 && (
            <>
              <Text style={styles.studentCount}>
                {instructors.length} Instructor
                {instructors.length > 1 ? 's' : ''} Available
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.studentCarousel}
              >
                {instructors.map(ins => (
                  <InstructorCard
                    key={ins.id}
                    name={ins.name}
                    id={ins.id}
                    onConnect={() => handleConnect(ins.address)}
                  />
                ))}
              </ScrollView>
            </>
          )}

          {/* Empty state + Manual connect */}
          {noResults && (
            <View style={styles.noResultContainer}>
              <Users color="#94A3B8" size={25} />
              <Text style={styles.noResultTitle}>No Active Sessions</Text>
              <Text style={styles.noResultText}>
                Ensure the instructor started a session, or connect manually:
              </Text>

              <TextInput
                placeholder="e.g. 192.168.1.23"
                value={targetIp}
                onChangeText={setTargetIp}
                style={styles.ipConnectInput}
              />
              <TouchableOpacity
                onPress={() => handleConnect(targetIp)}
                style={styles.ipConnectButton}
              >
                <Text style={styles.ipConnectButtonText}>Join Session</Text>
              </TouchableOpacity>
              {/* <Text style={{ color: '#64748b', paddingTop: 4 }}>{status}</Text> */}
            </View>
          )}
        </View>
      </ScrollView>

      <ConnectionDialog
        visible={dialogVisible}
        id={readableId}
        role="student"
        status={status}
        onContinue={handleContinue}
      />
    </>
  );
};

export default StudentConnectScreen;
