// socketService.ts
import io from 'socket.io-client';

const socket = io('ws://localhost:8000/ws/automations/'); // Replace with your Django Channels WebSocket server URL

export default socket;
