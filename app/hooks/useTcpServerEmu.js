import { useEffect, useState, useRef, useCallback } from 'react';
import TcpSocket from 'react-native-tcp-socket';
import { NetworkInfo } from 'react-native-network-info';

const PORT = 5000;
const CONNECT_TIMEOUT = 4000;

export default function useTcpServerEmu() {
  const [isServer, setIsServer] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('Not connected');
  const [ipAddress, setIpAddress] = useState('');
  const [message, setMessage] = useState('');
  const [ipServer, setIpServer] = useState('');
  const [availableHosts, setAvailableHosts] = useState([]);
  const [inputMsg, setInputMsg] = useState('');

  const serverRef = useRef(null);
  const socketRef = useRef(null);
  const timeoutRef = useRef(null);

  /* ──────────────────────────────────────────────
   * HARD RESET — absolutely required on mobile
   * ────────────────────────────────────────────── */
  const hardReset = useCallback(() => {
    console.log('♻️ HARD TCP RESET');

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (socketRef.current) {
      try {
        socketRef.current.destroy();
      } catch {}
      socketRef.current = null;
    }

    if (serverRef.current) {
      try {
        serverRef.current.close();
      } catch {}
      serverRef.current = null;
    }

    setConnectionStatus('Not connected');
    setMessage('');
  }, []);

  /* ──────────────────────────────────────────────
   * DISCONNECT (soft)
   * ────────────────────────────────────────────── */
  const disconnect = useCallback(() => {
    console.log('🔌 TCP DISCONNECT');
    hardReset();
    setConnectionStatus('Disconnected');
  }, [hardReset]);

  /* ──────────────────────────────────────────────
   * GET DEVICE IP (once)
   * ────────────────────────────────────────────── */
  useEffect(() => {
    (async () => {
      const ip = await NetworkInfo.getIPV4Address();
      console.log('📡 Device IPv4:', ip);
      setIpAddress(ip || '');
    })();
  }, []);

  /* ──────────────────────────────────────────────
   * SERVER (Instructor)
   * ────────────────────────────────────────────── */
  useEffect(() => {
    if (!isServer) {
      hardReset();
      setConnectionStatus('Not hosting');
      return;
    }

    if (!ipAddress) {
      setConnectionStatus('Getting IP…');
      return;
    }

    hardReset();

    const server = TcpSocket.createServer(socket => {
      console.log('📥 Incoming connection');

      socket.once('data', data => {
        const msg = data.toString().trim();
        console.log('📩 Handshake:', msg);

        if (msg !== 'HELLO_STUDENT') {
          console.warn('❌ Invalid handshake');
          socket.destroy();
          return;
        }

        console.log('✅ Student connected');
        socketRef.current = socket;
        setConnectionStatus('Connected');

        socket.on('data', payload => {
          setMessage(payload.toString().trim());
        });

        socket.on('close', () => {
          console.log('❌ Student disconnected');
          socketRef.current = null;
          setConnectionStatus('Disconnected');
        });

        socket.on('error', err => {
          console.warn('⚠️ Server socket error:', err?.message || err);
        });
      });
    });

    server.listen({ port: PORT, host: '0.0.0.0' }, () => {
      console.log(`🟢 Hosting on ${ipAddress}:${PORT}`);
      setConnectionStatus(`Hosting on ${ipAddress}:${PORT}`);
    });

    serverRef.current = server;

    return () => hardReset();
  }, [isServer, ipAddress, hardReset]);

  /* ──────────────────────────────────────────────
   * CLIENT (Student)
   * ────────────────────────────────────────────── */
  const connect = useCallback(
    host => {
      const target = (host || '').trim();
      if (!target) {
        setConnectionStatus('Enter instructor IP');
        return;
      }

      setIpServer(target);
      setConnectionStatus(`Connecting to ${target}:${PORT}…`);

      hardReset();

      let connected = false;

      const client = TcpSocket.createConnection(
        { host: target, port: PORT },
        () => {
          connected = true;
          console.log('✅ Connected to instructor');
          socketRef.current = client;
          setConnectionStatus('Connected');
          client.write('HELLO_STUDENT');
        },
      );

      timeoutRef.current = setTimeout(() => {
        if (!connected) {
          console.warn('⏱️ Connection timeout');
          try {
            client.destroy();
          } catch {}
          setConnectionStatus('Connection timed out');
        }
      }, CONNECT_TIMEOUT);

      client.on('data', data => {
        setMessage(data.toString().trim());
      });

      client.on('close', () => {
        console.log('🔌 Client closed');
        socketRef.current = null;
        setConnectionStatus('Disconnected');
      });

      client.on('error', err => {
        console.warn('⚠️ Client error:', err?.message || err);
        setConnectionStatus('Connection failed');
      });

      socketRef.current = client;
    },
    [hardReset],
  );

  /* ──────────────────────────────────────────────
   * SEND MESSAGE
   * ────────────────────────────────────────────── */
  const sendMessage = text => {
    const msg = (text || '').trim();
    if (!msg) return;

    const socket = socketRef.current;
    if (!socket || socket.destroyed) {
      console.warn('⚠️ Not connected');
      return;
    }

    try {
      socket.write(msg);
      setMessage(msg);
    } catch (err) {
      console.warn('⚠️ Send failed:', err?.message || err);
    }
  };

  /* ──────────────────────────────────────────────
   * EXPERIMENTAL LAN SCAN (NOT RELIABLE ON PHONES)
   * ────────────────────────────────────────────── */
  const scanForHosts = async () => {
    console.log('⚠️ LAN scan is experimental on mobile');

    if (!ipAddress) return;

    setAvailableHosts([]);
    const found = [];
    const baseIp = ipAddress.split('.').slice(0, 3).join('.');

    const tryHost = ip =>
      new Promise(resolve => {
        const temp = TcpSocket.createConnection(
          { host: ip, port: PORT },
          () => {
            found.push({ ip });
            temp.destroy();
            resolve();
          },
        );

        setTimeout(() => {
          try {
            temp.destroy();
          } catch {}
          resolve();
        }, 250);
      });

    for (let i = 2; i < 30; i++) {
      await tryHost(`${baseIp}.${i}`);
    }

    setAvailableHosts(found);
  };

  /* ──────────────────────────────────────────────
   * CLEANUP ON UNMOUNT
   * ────────────────────────────────────────────── */
  useEffect(() => {
    return () => hardReset();
  }, [hardReset]);

  return {
    isServer,
    setIsServer,
    connectionStatus,
    ipAddress,
    message,
    ipServer,
    setIpServer,
    connect,
    sendMessage,
    disconnect,
    scanForHosts,
    availableHosts,
    inputMsg,
    setInputMsg,
  };
}
