import { io } from 'socket.io-client'
import { SOCKET_BASE_URL } from '@/lib/api-base'
import { createProviderSocketHelpers } from '@/lib/provider-socket'

const SOCKET_URL = SOCKET_BASE_URL

const barberSocket = createProviderSocketHelpers({
  socketUrl: SOCKET_URL,
  subscribeEvent: 'subscribe:barber',
  unsubscribeEvent: 'unsubscribe:barber',
})

export function connectBarberSocket(barberId) {
  return barberSocket.connect(barberId)
}

export function disconnectBarberSocket() {
  barberSocket.disconnect()
}

export default connectBarberSocket
