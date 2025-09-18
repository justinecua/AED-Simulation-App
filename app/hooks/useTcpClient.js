import { useEffect, useState } from 'react';
import TcpSocket from 'react-native-tcp-socket';
import DeviceInfo from 'react-native-device-info';
import { makeReadableId } from '../shared/id';

const PORT = 5000;

export default function useTcpClient({ onConnected } = {}) {
  const [socket, setSocket] = useState(null);
  const [targetIp, setTargetIp] = useState('');
  const [status, setStatus] = useState('Idle');
  const [instructors, setInstructors] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const [readableId, setReadableId] = useState('');
  const [dialogVisible, setDialogVisible] = useState(false);

  useEffect(() => {
    DeviceInfo.isEmulator().then(emu => emu && setTargetIp('10.0.2.2'));
    return () => socket?.destroy();
  }, []);

  /** Connect only when user presses Connect button */
  const connectTo = ip => {
    if (!ip) return setStatus('Enter instructor IP first.');
    if (socket) return setStatus('Already connected.');

    setStatus(`Connecting to ${ip}:${PORT}…`);
    const client = TcpSocket.createConnection({ port: PORT, host: ip }, () => {
      const rid = makeReadableId('STU');
      setReadableId(rid);
      setDialogVisible(true);

      // only send hello, don’t claim success yet
      client.write(JSON.stringify({ type: 'hello', role: 'student', id: rid }));
      setStatus('Waiting for instructor to confirm…');
    });

    client.on('data', data => {
      try {
        const msg = JSON.parse(data.toString());
        if (msg.type === 'welcome') {
          setStatus('Instructor confirmed connection');
        }
      } catch {}
    });
    client.on('error', err => setStatus(`Error: ${err.message}`));
    client.on('close', () => {
      setStatus('Connection closed.');
      setSocket(null);
      setDialogVisible(false);
    });

    setSocket(client);
  };

  /** Wi-Fi search: only populates instructor list */
  const handleToggleSearch = async () => {
    setIsSearching(prev => {
      if (prev) return false; // stop searching

      setInstructors([]);
      setStatus('Searching…');

      setTimeout(async () => {
        const isEmu = await DeviceInfo.isEmulator();
        if (isEmu) {
          // just add found instructor — no connect yet
          setInstructors([
            { id: 'HOST#5000', name: 'Instructor', address: '10.0.2.2' },
          ]);
          setStatus('Instructor found (press Connect)');
        } else {
          setStatus('Enter IP manually.');
        }
        setIsSearching(false);
      }, 1200);

      return true;
    });
  };

  const handleContinue = () => {
    setDialogVisible(false);
    onConnected?.();
  };

  return {
    status,
    targetIp,
    setTargetIp,
    instructors,
    isSearching,
    connectTo,
    handleToggleSearch,
    readableId,
    dialogVisible,
    handleContinue,
  };
}
