import { NextApiRequest } from "next";
import { connectToDatabase } from "../../middleware/mongodb";
import { ChatModel, IChatMessage } from "../../models/Chat";
import { NextApiResponseServerIO } from "../../types/next";

type ChatResponse = {
    name: string
  }

export default async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (req.method === "POST") {
    // get message
    const chatMessage : IChatMessage = req.body as IChatMessage
    console.log('Got POST');
    console.log(chatMessage);

    await connectToDatabase();
    console.log('Connected.')
    var chat = new ChatModel(chatMessage);
    chat.save();
    

    // dispatch to channel "message"
    res?.socket?.server?.io?.emit("message", chatMessage);



    // return message
    res.status(201).json(chatMessage);
  }
};