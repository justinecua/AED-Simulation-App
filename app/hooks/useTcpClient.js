// Imports React tools used for managing data inside a component and running code
// when the component loads or updates.
import { useEffect, useState } from 'react';

// Imports a library that allows this device to connect to another one
// using a TCP connection (used for direct communication with an instructor).
import TcpSocket from 'react-native-tcp-socket';

// Imports a helper that can detect if the app is running inside an emulator
// (used to handle localhost connections differently).
import DeviceInfo from 'react-native-device-info';

// Imports a library that lets this app send and receive short messages
// across the local network (used for finding instructors nearby).
import dgram from 'react-native-udp';

// Imports a helper function that gets or creates a unique student ID
// for identifying this device.
import { getOrCreateStudentId } from '../data/roleIds';

// Sets the main communication port used for TCP connections.
const PORT = 5000;

// Sets the port used for device discovery over UDP messages.
const DISCOVERY_PORT = 5001;

// Defines the main custom hook for handling all student-side network logic.
// It manages connecting to the instructor, discovering nearby instructors,
// and keeping track of the current connection status.
export default function useTcpClient({ onConnected } = {}) {
  // Stores the active TCP connection (if connected to an instructor).
  const [socket, setSocket] = useState(null);

  // Holds the IP address of the instructor to connect to.
  const [targetIp, setTargetIp] = useState('');

  // Keeps track of the current connection status for user feedback.
  const [status, setStatus] = useState('Idle');

  // Holds a list of instructors found during the search process.
  const [instructors, setInstructors] = useState([]);

  // Indicates whether the app is currently scanning for instructors on the network.
  const [isSearching, setIsSearching] = useState(false);

  // Stores the readable version of the student’s unique ID for display and use in messages.
  const [readableId, setReadableId] = useState('');

  // Controls whether the “waiting for confirmation” dialog should be visible.
  const [dialogVisible, setDialogVisible] = useState(false);

  // Runs once when the component or hook is first used.
  useEffect(() => {
    // Checks if the app is running inside an emulator.
    // If true, sets the IP address to connect to the host machine instead.
    DeviceInfo.isEmulator().then(emu => emu && setTargetIp('10.0.2.2'));

    // Retrieves or generates the student’s unique ID and saves it.
    (async () => {
      const sid = await getOrCreateStudentId();
      setReadableId(sid);
    })();

    // Cleans up any open socket connection when the component unmounts
    // to avoid resource leaks or lingering network activity.
    return () => socket?.destroy();
  }, []);

  // Defines a function for connecting to a specific instructor using their IP address.
  const connectTo = async ip => {
    // If no IP is provided, show a message asking the user to enter one.
    if (!ip) return setStatus('Enter instructor IP first.');

    // Prevents opening multiple connections at the same time.
    if (socket) return setStatus('Already connected.');

    // Updates the status message to show connection progress.
    setStatus(`Connecting to ${ip}:${PORT}…`);

    // Creates a new TCP connection to the instructor's IP and port.
    const client = TcpSocket.createConnection(
      { port: PORT, host: ip },
      async () => {
        // Once connected, confirm or fetch the student ID again.
        const sid = await getOrCreateStudentId();

        // Show a waiting dialog while the instructor approves the connection.
        setDialogVisible(true);

        // Sends a greeting message to the instructor identifying this device as a student.
        client.write(
          JSON.stringify({ type: 'hello', role: 'student', id: sid }),
        );

        // Updates the status to show that the app is waiting for instructor approval.
        setStatus('Waiting for instructor to confirm…');
      },
    );

    // Handles messages received from the instructor.
    client.on('data', data => {
      try {
        // Tries to read and parse the incoming message as JSON.
        const msg = JSON.parse(data.toString());

        // If the instructor responds with a "welcome" message,
        // that means the connection has been accepted.
        if (msg.type === 'welcome') {
          setStatus('Instructor confirmed connection');
          setDialogVisible(false);

          // Runs any extra code passed in through the onConnected callback.
          onConnected?.();
        }
      } catch {
        // Ignores messages that cannot be parsed properly.
      }
    });

    // Handles connection errors and displays them in the status.
    client.on('error', err => setStatus(`Error: ${err.message}`));

    // Handles when the connection is closed (either by instructor or network issues).
    client.on('close', () => {
      setStatus('Connection closed.');
      setSocket(null);
      setDialogVisible(false);
    });

    // Saves this TCP connection instance for later use or cleanup.
    setSocket(client);
  };

  // Defines a function for searching for instructors on the same network.
  const handleToggleSearch = () => {
    // Toggles the search mode on and off.
    setIsSearching(prev => {
      // If already searching, stop and return to idle state.
      if (prev) {
        setStatus('Idle');
        return false;
      }

      // Clear previous instructor results and update status to show search is active.
      setInstructors([]);
      setStatus('Searching…');

      // Creates a UDP socket to listen for broadcast messages from instructors.
      const udpSocket = dgram.createSocket('udp4');

      // Opens the UDP port to start receiving messages.
      udpSocket.bind(DISCOVERY_PORT);

      // Listens for messages sent across the local network.
      udpSocket.on('message', msg => {
        try {
          // Parses each message to see if it matches the "instructor" type.
          const data = JSON.parse(msg.toString());

          // If a valid instructor message is received, store it in the list.
          if (data.type === 'instructor') {
            setInstructors([{ id: data.ip, name: data.ip, address: data.ip }]);
            setStatus('Instructor found');
          }
        } catch {
          // Skips messages that aren’t properly formatted.
        }
      });

      // Returns true to indicate the search is now active.
      return true;
    });
  };

  // Defines what happens when the student manually continues
  // after the instructor approval process.
  const handleContinue = () => {
    // Hides the dialog box.
    setDialogVisible(false);

    // Executes any follow-up action provided by the parent component.
    onConnected?.();
  };

  // Returns all relevant values and functions so other parts of the app
  // can use or display them. This makes it easy for UI components
  // to show the current status or trigger a connection.
  return {
    status, // Current connection status message
    targetIp, // IP address entered or detected for instructor
    setTargetIp, // Allows manual updates to target IP
    instructors, // List of discovered instructors
    isSearching, // Indicates whether UDP discovery is active
    connectTo, // Function to connect to a specific instructor
    handleToggleSearch, // Function to start or stop searching for instructors
    readableId, // Student’s unique identifier
    dialogVisible, // Whether the waiting dialog is shown
    handleContinue, // Function for manually continuing after approval
  };
}
