import { API_BASE_URL } from '@/lib/makeup-artist-api';
import { createProviderSocketHelpers } from '@/lib/provider-socket';

const SOCKET_URL = API_BASE_URL.replace(/\/api\/?$/, '');

const makeupArtistSocket = createProviderSocketHelpers({
  socketUrl: SOCKET_URL,
  subscribeEvent: 'subscribe:makeup-artist',
  unsubscribeEvent: 'unsubscribe:makeup-artist',
});

export function connectMakeupArtistSocket(makeupArtistId) {
  return makeupArtistSocket.connect(makeupArtistId);
}

export function disconnectMakeupArtistSocket() {
  makeupArtistSocket.disconnect();
}

export default connectMakeupArtistSocket;
