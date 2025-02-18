
import { WebSocketServer } from 'ws';
import { NextApiRequest } from 'next';
import { NextApiResponseServerIO } from '../../types';

const wss = new WebSocketServer({ port: 3001 });

wss.on('connection', (ws) => {
  console.log('Client connected');
  
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

export default function handler(req: NextApiRequest, res: NextApiResponseServerIO) {
  if (req.method === 'POST') {
    const message = req.body;
    
    // Broadcast to all connected clients
    wss.clients.forEach((client) => {
      client.send(JSON.stringify(message));
    });

    res.status(200).json({ message: 'Message sent successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
