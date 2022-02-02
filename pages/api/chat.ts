import { NextApiRequest } from "next";
import { connectToDatabase } from "../../middleware/mongodb";
import { ChatModel, IChatMessage } from "../../models/Chat";
import * as socketio from "socket.io";
import { Server as NetServer } from "http";
import { NextApiResponseServerIO } from "../../types/next";
import ioserver, { Socket } from 'socket.io';
// import ioclient from 'socket.io-client';
// const io = ioserver(server);

// import { io } from "socket.io-client";

type ChatResponse = {
    name: string
  }

export default async (req: NextApiRequest, res: NextApiResponseServerIO) => {
    // if (!res.socket.server.io) {
    //     console.log("New Socket.io server...");
    //     // adapt Next's net Server to http Server
    //     const httpServer: NetServer = res.socket.server as any;
    //     const io = new ServerIO(httpServer, {
    //         path: "/api/socketio",
    //     });
    //     // append SocketIO server to Next.js socket server response
    //     res.socket.server.io = io;
    // }

    // let io = require("socket.io")(http);

    if (!res.socket.server.io) {
        console.log('No SocketIO');
    }
    else{
        console.log('Got SocketIO');
        console.log(res.socket.server.io);
    }
    
    var socket = res.socket.server.io;
    if (req.method === "POST") {
    // get message
    const chatMessage : IChatMessage = req.body as IChatMessage
    console.log('Got POST');
    console.log(chatMessage);

    await connectToDatabase();
    // console.log('Connected to db.')
    var chat = new ChatModel(chatMessage);
    chat.save();
    // var clients = io.sockets.clients();

    // dispatch to channel "message"
    console.log('Emitting message');
    let clients = socket.listeners("message");
    console.log(clients);
    socket.sockets.emit("message", chatMessage);
    // io. .emitit("message", chatMessage);



    // return message
    res.status(201).json(chatMessage);
  }
};