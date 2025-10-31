// hooks/useUdpServer.js
import { useState, useEffect, useRef } from 'react';
import UdpSocket from 'react-native-udp';
import { NetworkInfo } from 'react-native-network-info';

const SERVER_PORT = 8888;
const CLIENT_PORT = 8887;

export default function useUdpServer(role = 'instructor') {
  const [ip, setIp] = useState('');
  const [message, setMessage] = useState('');
  const [students, setStudents] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    (async () => {
      const addr = await NetworkInfo.getIPV4Address();
      setIp(addr);
    })();

    const socket = UdpSocket.createSocket('udp4');
    socketRef.current = socket;

    if (role === 'instructor') {
      socket.bind(SERVER_PORT);
      socket.on('message', (data, rinfo) => {
        const msg = data.toString();
        setMessage(msg);

        // Store connected student if new
        setStudents(prev =>
          prev.find(s => s.address === rinfo.address)
            ? prev
            : [...prev, { address: rinfo.address, port: rinfo.port }],
        );

        // Auto-reply
        socket.send(
          'Hello from instructor!',
          undefined,
          undefined,
          rinfo.port,
          rinfo.address,
        );
      });
    } else {
      socket.bind(CLIENT_PORT);
    }

    return () => socket.close();
  }, [role]);

  const sendMessage = targetIp => {
    const socket = socketRef.current;
    if (!socket) return;
    socket.send(
      'Hello from student!',
      undefined,
      undefined,
      SERVER_PORT,
      targetIp,
    );
  };

  return { ip, message, students, sendMessage };
}
