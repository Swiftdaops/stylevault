import { SOCKET_BASE_URL } from '@/lib/api-base';
import { createProviderSocketHelpers } from '@/lib/provider-socket';

const SOCKET_URL = SOCKET_BASE_URL;

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
