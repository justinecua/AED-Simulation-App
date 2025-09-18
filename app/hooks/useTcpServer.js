import { useEffect, useRef, useState } from 'react';
import TcpSocket from 'react-native-tcp-socket';
import { NetworkInfo } from 'react-native-network-info';
import { makeReadableId } from '../shared/id';

const PORT = 5000;

export default function useTcpServer({ onStudentConnected } = {}) {
  const [isHosting, setIsHosting] = useState(false);
  const [hostIp, setHostIp] = useState('0.0.0.0');
  const [students, setStudents] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [lastStudentId, setLastStudentId] = useState('');
  const [pendingSocket, setPendingSocket] = useState(null);

  const serverRef = useRef(null);
  const clients = useRef(new Map());

  useEffect(() => {
    NetworkInfo.getIPV4Address().then(ip => setHostIp(ip || '0.0.0.0'));
    return () => stopHosting();
  }, []);

  const startHosting = () => {
    stopHosting();

    const srv = TcpSocket.createServer(socket => {
      const rid = makeReadableId('INS');

      if (!clients.current.has(rid)) {
        clients.current.set(rid, socket);
        setStudents(prev => [
          ...prev,
          { id: rid, name: `Student ${prev.length + 1}` },
        ]);
        setLastStudentId(rid);
        setDialogVisible(true);
        setPendingSocket(socket);
      }

      socket.on('close', () => {
        clients.current.delete(rid);
        setStudents(prev => prev.filter(s => s.id !== rid));
      });
    });

    srv.listen({ port: PORT, host: '0.0.0.0' }, () => {
      setIsHosting(true);
      setIsSearching(true);
    });
    serverRef.current = srv;
  };

  const stopHosting = () => {
    try {
      serverRef.current?.close();
    } catch {}
    serverRef.current = null;
    clients.current.forEach(c => c.destroy());
    clients.current.clear();
    setStudents([]);
    setIsHosting(false);
    setIsSearching(false);
    setDialogVisible(false);
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
    hostIp,
    students,
    isSearching,
    startHosting,
    stopHosting,
    dialogVisible,
    lastStudentId,
    handleContinue,
  };
}
