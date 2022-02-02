import { NextApiRequest } from "next";

import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";
import { NextApiResponseServerIO } from "../../types/next";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponseServerIO) => {
    console.log("Call to socketio");
    if (!res.socket.server.io) {
        console.log("New Socket.io server...");
        // adapt Next's net Server to http Server
        const httpServer: NetServer = res.socket.server as any;
        const io = new ServerIO(httpServer, {
            path: "/api/socketio",
        });
        // append SocketIO server to Next.js socket server response
        res.socket.server.io = io;
        io.on('connection', (socket) => {
            console.log('Got connection for Socket.IO', socket.id);
            socket.emit('status', 'Hello from Socket.io');
    
            socket.on('disconnect', () => {
                console.log('client disconnected');
            })
        });
    }
  res.end();
};