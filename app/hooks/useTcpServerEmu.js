import { useEffect, useState, useRef } from 'react';
import TcpSocket from 'react-native-tcp-socket';
import { NetworkInfo } from 'react-native-network-info';

const PORT = 5000;

export default function useTcpServerEmu() {
  const [isServer, setIsServer] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('Not connected');
  const [ipAddress, setIpAddress] = useState('');
  const [message, setMessage] = useState('');
  const [ipServer, setIpServer] = useState('10.0.2.2'); // better default for emu
  const [availableHosts, setAvailableHosts] = useState([]);
  const [inputMsg, setInputMsg] = useState('');
  const serverRef = useRef(null);
  const socketRef = useRef(null);

  // 🧠 Get device IP & manage hosting
  useEffect(() => {
    (async () => {
      const ip = await NetworkInfo.getIPV4Address();
      setIpAddress(ip);
    })();

    if (isServer) {
      const server = TcpSocket.createServer(socket => {
        let handshakeVerified = false;

        socket.once('data', data => {
          const msg = data.toString().trim();
          console.log('📩 Initial data from student:', msg);

          // ✅ Only accept real students that send "HELLO_STUDENT"
          if (msg === 'HELLO_STUDENT') {
            handshakeVerified = true;
            setConnectionStatus('Connected'); // use simple flag value
            socketRef.current = socket;

            // After handshake, handle normal messages
            socket.on('data', payload => {
              const incoming = payload.toString();
              console.log('📩 Student says:', incoming);
              setMessage(`Student: ${incoming}`);
            });

            socket.on('close', () => {
              console.log('❌ Student disconnected');
              setConnectionStatus('Disconnected');
            });

            socket.on('error', err => console.warn('Socket error:', err));
          } else {
            // Ignore scans or invalid packets
            console.log('⚠️ Ignored non-handshake connection');
            socket.destroy();
          }
        });
      });

      server.listen({ port: PORT, host: '0.0.0.0' }, () => {
        console.log(`Server listening on port ${PORT}`);
        setConnectionStatus(` Hosting on ${ipAddress}:${PORT}`);
      });

      serverRef.current = server;
      return () => server.close();
    } else {
      setConnectionStatus('Not hosting');
      if (socketRef.current) socketRef.current.destroy();
    }
  }, [isServer]);

  const sendMessage = (text = '') => {
    if (isServer) {
      // Instructor
      if (socketRef.current) {
        socketRef.current.write(text || '');
        setMessage(text.trim());
      } else {
        console.warn('No connected student');
      }
    } else {
      // Student
      if (!socketRef.current) {
        const client = TcpSocket.createConnection(
          { port: PORT, host: ipServer },
          () => {
            setConnectionStatus(' Connected to instructor');
            if (text) client.write(text);
            setMessage(text ? `You (Student): ${text}` : 'Connected!');
          },
        );

        client.on('data', data => {
          const msg = data.toString();
          console.log('📩 Received from instructor:', msg);
          setMessage(msg.trim());
        });

        client.on('error', err => {
          console.warn('Client error:', err);
          setConnectionStatus(' Connection failed');
        });

        client.on('close', () => {
          setConnectionStatus('Disconnected');
        });

        socketRef.current = client;
      } else {
        // already connected
        socketRef.current.write(text);
        setMessage(text.trim()); // ✅ keep the raw text only
      }
    }
  };

  // 🔍 Scan for available hosts (for emulator)
  const scanForHosts = async () => {
    console.log('Scanning for hosts...');
    const potentialHosts = ['10.0.2.2'];
    const found = [];

    for (const host of potentialHosts) {
      await new Promise(resolve => {
        const tempClient = TcpSocket.createConnection(
          { port: PORT, host },
          () => {
            console.log(` Host found at ${host}`);
            found.push({ ip: host });
            tempClient.destroy();
            resolve();
          },
        );

        tempClient.on('error', () => {
          tempClient.destroy();
          resolve();
        });

        setTimeout(() => {
          tempClient.destroy();
          resolve();
        }, 1000);
      });
    }

    setAvailableHosts(found);
  };

  return {
    isServer,
    setIsServer,
    connectionStatus,
    ipAddress,
    message,
    ipServer,
    setIpServer,
    sendMessage,
    scanForHosts,
    availableHosts,
    inputMsg,
    setInputMsg,
  };
}
