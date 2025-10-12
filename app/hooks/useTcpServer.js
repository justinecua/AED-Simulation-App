// Imports React utilities for managing component state, references, and side effects.
// `useEffect` runs setup and cleanup logic, `useState` stores data, and `useRef` holds persistent values across renders.
import { useEffect, useRef, useState } from 'react';

// Imports a library that allows creating TCP servers for device-to-device communication.
// Used here to let the instructor host sessions that students can connect to.
import TcpSocket from 'react-native-tcp-socket';

// Imports a helper that retrieves the device’s current local IP address.
// The instructor’s IP is needed for broadcasting and allowing students to connect.
import { NetworkInfo } from 'react-native-network-info';

// Imports the UDP library, used for broadcasting messages over the local network.
// UDP is lighter than TCP and suitable for quick device discovery.
import dgram from 'react-native-udp';

// Imports a helper that retrieves or generates a unique ID for the instructor device.
// This helps distinguish each instructor when broadcasting or confirming connections.
import { getOrCreateInstructorId } from '../data/roleIds';

// Sets the TCP port used for main student-instructor communication.
const PORT = 5000;

// Sets the UDP port used for broadcasting and device discovery.
const DISCOVERY_PORT = 5001;

// Defines a custom React hook that handles all instructor-side networking logic.
// This includes hosting sessions, broadcasting presence, and managing connected students.
export default function useTcpServer({ onStudentConnected } = {}) {
  // Tracks whether the instructor is currently hosting a TCP session.
  const [isHosting, setIsHosting] = useState(false);

  // Stores the instructor’s current IP address on the local network.
  const [hostIp, setHostIp] = useState('0.0.0.0');

  // Holds a list of currently connected students.
  const [students, setStudents] = useState([]);

  // Controls visibility of the confirmation dialog shown when a new student connects.
  const [dialogVisible, setDialogVisible] = useState(false);

  // Keeps track of the ID of the most recently connected student.
  const [lastStudentId, setLastStudentId] = useState('');

  // Holds a reference to the student socket waiting for instructor approval.
  const [pendingSocket, setPendingSocket] = useState(null);

  // Indicates whether the instructor is actively broadcasting their presence.
  const [isSearching, setIsSearching] = useState(false);

  // Displays a human-readable status of what the server is doing.
  const [status, setStatus] = useState('Idle');

  // Stores the instructor’s unique readable ID (e.g., for display or communication).
  const [readableId, setReadableId] = useState('');

  // --- References for long-lived network resources ---
  const serverRef = useRef(null); // Holds the active TCP server instance.
  const clients = useRef(new Map()); // Keeps a map of connected students (ID → socket).
  const udpRef = useRef(null); // Holds the active UDP socket used for broadcasting.
  const broadcastTimer = useRef(null); // Holds a repeating timer for UDP broadcast messages.

  // Runs when the hook initializes (similar to a component mounting).
  useEffect(() => {
    // Retrieves the device’s current local IPv4 address for broadcasting and connections.
    NetworkInfo.getIPV4Address().then(ip => setHostIp(ip || '0.0.0.0'));

    // Retrieves or creates the instructor’s unique ID for identification.
    (async () => {
      const iid = await getOrCreateInstructorId();
      setReadableId(iid);
    })();

    // Cleans up by stopping the hosting session when the hook is unloaded.
    return () => stopHosting();
  }, []);

  // Starts the TCP server and the UDP broadcast.
  const startHosting = () => {
    // Stops any existing sessions to prevent duplicates or conflicts.
    stopHosting();

    // Indicates the instructor is now discoverable on the network.
    setIsSearching(true);
    setStatus('Hosting session…');

    // Creates a TCP server that will listen for incoming student connections.
    const srv = TcpSocket.createServer(socket => {
      // Listens for data sent by connected students.
      socket.on('data', buf => {
        try {
          // Converts the received message into readable JSON format.
          const msg = JSON.parse(buf.toString());

          // If a student sends a "hello" message, it means a new student wants to join.
          if (msg.type === 'hello' && msg.role === 'student') {
            const stuId = msg.id || `STUD-${Date.now()}`; // Generates an ID if none is provided.

            // Saves the new student’s socket for later use (communication, cleanup, etc.).
            clients.current.set(stuId, socket);

            // Adds the new student to the visible list of connected students.
            setStudents(prev => [...prev, { id: stuId, name: stuId }]);

            // Updates the ID of the most recently connected student.
            setLastStudentId(stuId);

            // Marks this socket as pending until the instructor approves.
            setPendingSocket(socket);

            // Displays a confirmation dialog to the instructor.
            setDialogVisible(true);

            // Updates the status to show a new connection request.
            setStatus(`${stuId} connected`);
          }
        } catch {
          // Ignores invalid or malformed messages.
        }
      });

      // Handles cleanup when a student disconnects.
      socket.on('close', () => {
        let removed;

        // Finds which student disconnected by comparing socket references.
        clients.current.forEach((val, key) => {
          if (val === socket) removed = key;
        });

        // Removes the disconnected student from both the list and the socket map.
        if (removed) {
          clients.current.delete(removed);
          setStudents(prev => prev.filter(s => s.id !== removed));
          setStatus(`Student ${removed} disconnected`);
        }
      });
    });

    // Starts the server, listening for incoming TCP connections on the specified port.
    srv.listen({ port: PORT, host: '0.0.0.0' }, () => setIsHosting(true));
    serverRef.current = srv;

    // --- UDP Broadcasting Section ---
    // Sets up a lightweight message broadcaster so students can detect this instructor automatically.
    const udp = dgram.createSocket('udp4');

    // Opens the UDP socket for sending broadcast messages.
    udp.bind(DISCOVERY_PORT, () => {
      udpRef.current = udp;

      // Sends a broadcast every 2 seconds so students can detect the instructor.
      broadcastTimer.current = setInterval(() => {
        // Prepares a simple message announcing the instructor’s availability.
        const msg = JSON.stringify({
          type: 'instructor',
          ip: hostIp,
          port: PORT,
        });

        // Sends the broadcast to all devices on the same local network.
        udp.send(msg, 0, msg.length, DISCOVERY_PORT, '255.255.255.255', err => {
          if (err) console.log('UDP send error', err);
        });
      }, 2000);
    });
  };

  // Stops all hosting activity and cleans up all network resources.
  const stopHosting = () => {
    try {
      // Closes the TCP server and UDP broadcaster if they’re active.
      serverRef.current?.close();
      udpRef.current?.close();

      // Clears the repeating broadcast timer.
      if (broadcastTimer.current) clearInterval(broadcastTimer.current);
    } catch {}

    // Resets references to null to release memory and avoid reuse.
    serverRef.current = null;
    udpRef.current = null;
    broadcastTimer.current = null;

    // Destroys all active student sockets and clears the map.
    clients.current.forEach(c => c.destroy());
    clients.current.clear();

    // Resets UI-related states and flags.
    setStudents([]);
    setIsHosting(false);
    setDialogVisible(false);
    setIsSearching(false);
    setStatus('Idle');
  };

  // Handles the instructor’s approval of a student connection.
  const handleContinue = async () => {
    // Hides the approval dialog once the instructor confirms.
    setDialogVisible(false);

    // Sends a welcome message back to the pending student.
    if (pendingSocket) {
      // Ensures the instructor’s ID is available.
      const iid = readableId || (await getOrCreateInstructorId());

      // Sends confirmation details, linking both instructor and student IDs.
      pendingSocket.write(
        JSON.stringify({
          type: 'welcome',
          role: 'instructor',
          studentId: lastStudentId,
          instructorId: iid,
        }),
      );

      // Runs the optional callback to notify other parts of the app.
      onStudentConnected?.(lastStudentId);

      // Clears the pending connection once approved.
      setPendingSocket(null);
    }
  };

  // Returns all important state values and functions for external components to use.
  // These allow the rest of the app to monitor, display, and control the hosting process.
  return {
    isHosting, // Whether the instructor is currently hosting a TCP session
    isSearching, // Whether the instructor is broadcasting via UDP
    hostIp, // The instructor’s local IP address
    students, // List of connected students
    startHosting, // Function to start the hosting process
    stopHosting, // Function to stop hosting and clean up
    dialogVisible, // Whether the student approval dialog is visible
    lastStudentId, // The ID of the most recently connected student
    handleContinue, // Function to approve a student connection
    status, // Current status message for display
    readableId, // Instructor’s unique readable identifier
  };
}
