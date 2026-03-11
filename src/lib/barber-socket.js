import { io } from 'socket.io-client'
import { API_BASE_URL } from '@/lib/barber-api'

const SOCKET_URL = API_BASE_URL.replace(/\/api\/?$/, '')

export function connectBarberSocket(barberId) {
  if (!barberId) return null

  const socket = io(SOCKET_URL, {
    transports: ['websocket', 'polling'],
  })

  socket.on('connect', () => {
    socket.emit('subscribe:barber', barberId)
  })

  return socket
}

export default connectBarberSocket
