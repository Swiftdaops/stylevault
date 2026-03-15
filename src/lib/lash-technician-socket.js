import { SOCKET_BASE_URL } from '@/lib/api-base';
import { createProviderSocketHelpers } from '@/lib/provider-socket';

const SOCKET_URL = SOCKET_BASE_URL;

const lashTechnicianSocket = createProviderSocketHelpers({
  socketUrl: SOCKET_URL,
  subscribeEvent: 'subscribe:lash-technician',
  unsubscribeEvent: 'unsubscribe:lash-technician',
});

export function connectLashTechnicianSocket(lashTechnicianId) {
  return lashTechnicianSocket.connect(lashTechnicianId);
}

export function disconnectLashTechnicianSocket() {
  lashTechnicianSocket.disconnect();
}

export default connectLashTechnicianSocket;
