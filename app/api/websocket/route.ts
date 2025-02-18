
import { NextApiRequest } from 'next';
import { NextApiResponseServerIO } from '../../types';

export default function handler(req: NextApiRequest, res: NextApiResponseServerIO) {
  if (req.method === 'POST') {
    // Get message from N8N
    const message = req.body;

    // Send message to all connected clients
    res?.socket?.server?.io?.emit('message', message);

    res.status(200).json({ message: 'Message sent successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
