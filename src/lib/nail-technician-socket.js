import { API_BASE_URL } from '@/lib/nail-technician-api';
import { createProviderSocketHelpers } from '@/lib/provider-socket';

const SOCKET_URL = API_BASE_URL.replace(/\/api\/?$/, '');

const nailTechnicianSocket = createProviderSocketHelpers({
  socketUrl: SOCKET_URL,
  subscribeEvent: 'subscribe:nail-technician',
  unsubscribeEvent: 'unsubscribe:nail-technician',
});

export function connectNailTechnicianSocket(nailTechnicianId) {
  return nailTechnicianSocket.connect(nailTechnicianId);
}

export function disconnectNailTechnicianSocket() {
  nailTechnicianSocket.disconnect();
}

export default connectNailTechnicianSocket;
