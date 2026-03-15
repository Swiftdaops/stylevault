import { API_BASE_URL } from '@/lib/hair-specialist-api';
import { createProviderSocketHelpers } from '@/lib/provider-socket';

const SOCKET_URL = API_BASE_URL.replace(/\/api\/?$/, '');

const hairSpecialistSocket = createProviderSocketHelpers({
  socketUrl: SOCKET_URL,
  subscribeEvent: 'subscribe:hair-specialist',
  unsubscribeEvent: 'unsubscribe:hair-specialist',
});

export function connectHairSpecialistSocket(hairSpecialistId) {
  return hairSpecialistSocket.connect(hairSpecialistId);
}

export function disconnectHairSpecialistSocket() {
  hairSpecialistSocket.disconnect();
}

export default connectHairSpecialistSocket;
