import { io } from 'socket.io-client'
import { API_BASE_URL } from '@/lib/barber-api'
import { createProviderSocketHelpers } from '@/lib/provider-socket'

const SOCKET_URL = API_BASE_URL.replace(/\/api\/?$/, '')

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
