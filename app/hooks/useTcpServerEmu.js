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
              const raw = payload.toString();
              console.log('📩 RAW TCP:', raw);

              // 🧠 Split combined JSON objects e.g. ...}{...
              const parts = raw
                .replace(/}\s*{/g, '}|{') // insert separator
                .split('|'); // split into separate JSON strings

              parts.forEach(part => {
                const cleaned = part.trim();
                if (!cleaned) return;

                console.log('📩 Parsed packet:', cleaned);
                setMessage(cleaned); // send one clean message at a time
              });
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
    const msg = text.trim();
    if (!msg) return;

    if (isServer) {
      // 🧠 Instructor (Server)
      const socket = socketRef.current;
      if (!socket) {
        console.warn('⚠️ No connected student socket');
        return;
      }

      // ✅ guard: only send if not destroyed
      if (socket.destroyed) {
        console.warn('⚠️ Tried to send on destroyed socket');
        return;
      }

      try {
        socket.write(msg);
        setMessage(msg);
      } catch (err) {
        console.warn('⚠️ Failed to send message (server):', err.message);
      }
    } else {
      // 🧠 Student (Client)
      const socket = socketRef.current;

      // if not yet connected, create connection
      if (!socket) {
        const client = TcpSocket.createConnection(
          { port: PORT, host: ipServer },
          () => {
            setConnectionStatus('Connected');
            client.write(msg);
            setMessage(`You (Student): ${msg}`);
          },
        );

        client.on('data', data => {
          const received = data.toString();
          console.log('📩 Received from instructor:', received);
          setMessage(received.trim());
        });

        client.on('error', err => {
          console.warn('⚠️ Client error:', err.message);
          setConnectionStatus('Connection failed');
        });

        client.on('close', () => {
          console.log('🔌 Client socket closed');
          setConnectionStatus('Disconnected');
        });

        socketRef.current = client;
      } else {
        // ✅ guard: only send if still active
        if (socket.destroyed) {
          console.warn('⚠️ Tried to send on destroyed socket (client)');
          return;
        }

        try {
          socket.write(msg);
          setMessage(`You (Student): ${msg}`);
        } catch (err) {
          console.warn('⚠️ Failed to send message (client):', err.message);
        }
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
