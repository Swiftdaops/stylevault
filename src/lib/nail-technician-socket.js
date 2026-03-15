import { SOCKET_BASE_URL } from '@/lib/api-base';
import { createProviderSocketHelpers } from '@/lib/provider-socket';

const SOCKET_URL = SOCKET_BASE_URL;

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
