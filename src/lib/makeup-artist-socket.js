import { SOCKET_BASE_URL } from '@/lib/api-base';
import { createProviderSocketHelpers } from '@/lib/provider-socket';

const SOCKET_URL = SOCKET_BASE_URL;

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
