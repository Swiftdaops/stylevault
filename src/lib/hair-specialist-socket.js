import { io } from 'socket.io-client';
import { API_BASE_URL } from '@/lib/hair-specialist-api';

const SOCKET_URL = API_BASE_URL.replace(/\/api\/?$/, '');

export function connectHairSpecialistSocket(hairSpecialistId) {
  if (!hairSpecialistId) return null;

  const socket = io(SOCKET_URL, {
    transports: ['websocket', 'polling'],
  });

  socket.on('connect', () => {
    socket.emit('subscribe:hair-specialist', hairSpecialistId);
  });

  return socket;
}

export default connectHairSpecialistSocket;
