import { API_BASE_URL } from '@/lib/lash-technician-api';
import { createProviderSocketHelpers } from '@/lib/provider-socket';

const SOCKET_URL = API_BASE_URL.replace(/\/api\/?$/, '');

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
