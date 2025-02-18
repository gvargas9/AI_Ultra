
import { NextApiRequest } from 'next';
import { NextApiResponseServerIO } from '../../types';
import { WebSocketHandler } from 'next/dist/compiled/@edge-runtime/primitives';

export function GET(req: Request) {
  const { socket: res } = new WebSocketHandler();
  
  if (res) {
    res.onopen = () => {
      console.log('Client connected');
    };

    res.onclose = () => {
      console.log('Client disconnected');
    };

    res.onmessage = (event) => {
      const message = JSON.parse(event.data);
      // Broadcast to all connected clients
      res.send(JSON.stringify(message));
    };

    return res;
  }

  return new Response('WebSocket endpoint', { status: 200 });
}

export async function POST(req: Request) {
  try {
    const message = await req.json();
    // Send message to connected WebSocket clients
    if (WebSocketHandler.clients) {
      WebSocketHandler.clients.forEach((client) => {
        client.send(JSON.stringify(message));
      });
    }
    return new Response('Message sent successfully', { status: 200 });
  } catch (error) {
    return new Response('Error sending message', { status: 500 });
  }
}
