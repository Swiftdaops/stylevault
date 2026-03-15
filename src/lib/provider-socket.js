import { io } from 'socket.io-client'

export function createProviderSocketHelpers({ socketUrl, subscribeEvent, unsubscribeEvent }) {
  let socket = null
  let subscribedId = ''
  let connectHandler = null

  function ensureSocket() {
    if (!socket) {
      socket = io(socketUrl, {
        transports: ['websocket', 'polling'],
      })
    }

    return socket
  }

  function connect(nextId) {
    if (!nextId) return null

    const socketInstance = ensureSocket()
    const normalizedId = String(nextId)

    if (connectHandler) {
      socketInstance.off('connect', connectHandler)
    }

    connectHandler = () => {
      socketInstance.emit(subscribeEvent, normalizedId)
    }

    socketInstance.on('connect', connectHandler)

    if (subscribedId && subscribedId !== normalizedId && socketInstance.connected) {
      socketInstance.emit(unsubscribeEvent, subscribedId)
    }

    subscribedId = normalizedId

    if (socketInstance.connected) {
      socketInstance.emit(subscribeEvent, normalizedId)
    }

    return socketInstance
  }

  function disconnect() {
    if (!socket) return

    if (subscribedId && socket.connected) {
      socket.emit(unsubscribeEvent, subscribedId)
    }

    if (connectHandler) {
      socket.off('connect', connectHandler)
    }

    socket.disconnect()
    socket = null
    subscribedId = ''
    connectHandler = null
  }

  return {
    connect,
    disconnect,
  }
}
