import { useEffect, useRef, useState } from 'react';
import TcpSocket from 'react-native-tcp-socket';
import { NetworkInfo } from 'react-native-network-info';
import { makeReadableId } from '../shared/id';
import dgram from 'react-native-udp';

const PORT = 5000;
const DISCOVERY_PORT = 5001;

export default function useTcpServer({ onStudentConnected } = {}) {
  const [isHosting, setIsHosting] = useState(false);
  const [hostIp, setHostIp] = useState('0.0.0.0');
  const [students, setStudents] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [lastStudentId, setLastStudentId] = useState('');
  const [pendingSocket, setPendingSocket] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [status, setStatus] = useState('Idle');
  const [readableId, setReadableId] = useState('');

  const serverRef = useRef(null);
  const clients = useRef(new Map());
  const udpRef = useRef(null);
  const broadcastTimer = useRef(null);

  useEffect(() => {
    NetworkInfo.getIPV4Address().then(ip => setHostIp(ip || '0.0.0.0'));
    return () => stopHosting();
  }, []);

  const startHosting = () => {
    stopHosting();
    setIsSearching(true);
    setReadableId(makeReadableId('INS'));
    setStatus('Hosting session…');

    // --- TCP server ---
    const srv = TcpSocket.createServer(socket => {
      const rid = makeReadableId('STU');

      clients.current.set(rid, socket);
      setStudents(prev => [
        ...prev,
        { id: rid, name: `Student ${prev.length + 1}` },
      ]);
      setLastStudentId(rid);
      setDialogVisible(true);
      setPendingSocket(socket);
      setStatus(`Student ${rid} connected`);

      socket.on('close', () => {
        clients.current.delete(rid);
        setStudents(prev => prev.filter(s => s.id !== rid));
        setStatus(`Student ${rid} disconnected`);
      });
    });

    srv.listen({ port: PORT, host: '0.0.0.0' }, () => {
      setIsHosting(true);
    });
    serverRef.current = srv;

    // --- UDP broadcaster ---
    const udp = dgram.createSocket('udp4');
    udp.bind(DISCOVERY_PORT, () => {
      udpRef.current = udp;

      broadcastTimer.current = setInterval(() => {
        const msg = JSON.stringify({
          type: 'instructor',
          ip: hostIp,
          port: PORT,
        });
        udp.send(msg, 0, msg.length, DISCOVERY_PORT, '255.255.255.255', err => {
          if (err) console.log('UDP send error', err);
        });
      }, 2000);
    });
  };

  const stopHosting = () => {
    try {
      serverRef.current?.close();
      udpRef.current?.close();
      if (broadcastTimer.current) clearInterval(broadcastTimer.current);
    } catch {}
    serverRef.current = null;
    udpRef.current = null;
    broadcastTimer.current = null;
    clients.current.forEach(c => c.destroy());
    clients.current.clear();
    setStudents([]);
    setIsHosting(false);
    setDialogVisible(false);
    setIsSearching(false);
    setStatus('Idle'); // reset
  };

  const handleContinue = () => {
    setDialogVisible(false);
    if (pendingSocket) {
      pendingSocket.write(
        JSON.stringify({
          type: 'welcome',
          role: 'instructor',
          id: lastStudentId,
        }),
      );
      onStudentConnected?.(lastStudentId);
      setPendingSocket(null);
    }
  };

  return {
    isHosting,
    isSearching,
    hostIp,
    students,
    startHosting,
    stopHosting,
    dialogVisible,
    lastStudentId,
    handleContinue,
    status,
    readableId,
  };
}
