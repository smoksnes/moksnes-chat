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
    var socket = res.socket.server.io;
    if (req.method === "POST") {
      // get message
      const chatMessage : IChatMessage = req.body as IChatMessage
      console.log('Got POST');
      console.log(chatMessage);

      await connectToDatabase();
      var chat = new ChatModel(chatMessage);
      chat.save();
      socket.sockets.emit("message", chatMessage);

      // return message
      res.status(201).json(chatMessage);
    } else if(req.method === "GET"){
      await connectToDatabase();
      // console.log('Get from DB.')
      const chats:Array<IChatMessage> = await ChatModel.find({  });
      res.status(200).json(chats);
    }
};