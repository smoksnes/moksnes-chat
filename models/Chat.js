import { Schema, Document, model, connect } from 'mongoose';
// const Schema = mongoose.Schema;




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

 export default model<IChat>('theChat', chatSchema);

// module.exports = Chat;


