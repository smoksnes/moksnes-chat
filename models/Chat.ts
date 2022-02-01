import mongoose, { Document, model, Model, Schema } from "mongoose"
// const Schema = mongoose.Schema;

export interface IChatMessage{
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

function modelAreadyDeclared () {
  try {
    mongoose.model('newChat5')  // it throws an error if the model is still not defined
    return true
  } catch (e) {
    return false
  }
}

export const ChatModel: Model<IChatMessage> = mongoose.models['newChat5'] ?? model<IChatMessage>('newChat5', chatSchema);






// export default ChatModel;


// module.exports = Chat;


