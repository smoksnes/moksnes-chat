import mongoose, { Document, model, Model, Schema } from "mongoose"
// const Schema = mongoose.Schema;

export interface IChat extends Document {
  message: string;
  sender: string;
}

const chatSchema = new Schema(
  {
    message: {
      type: String
    },
    sender: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export const Chat: Model<IChat> = model<IChat>('newChat', chatSchema);






// export default ChatModel;


// module.exports = Chat;


