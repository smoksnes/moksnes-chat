import { connect, ConnectOptions } from "mongoose"

// const connectDB = handler => async (req, res) => {
//   console.log("Trying to connect to mongo")
//     const url = process.env.MONGODB_URI || "mongodb://localhost:27017/chat";
//   if (mongoose.connections[0].readyState) {
//     // Use current db connection
//     return handler(req, res);
//   }
//   // Use new db connection
//   await mongoose.connect(url, {
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//     useCreateIndex: true,
//     useNewUrlParser: true
//   });
//   return handler(req, res);

// };

// export default connectDB;

// // export const connect = async () => {
    
  
// //     const conn = await mongoose
// //       .connect(url as string)
// //       .catch(err => console.log(err))
// //     console.log("Mongoose Connection Established")
  
  
// //     return conn;
// //   }


// import { connect, ConnectionOptions } from "mongoose"

const url = process.env.MONGODB_URI || "mongodb://localhost:62251/chat";


console.log(url)

export const connectToDatabase = () => connect(url, {
  // useFindAndModify: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
  useNewUrlParser: true,
} as ConnectOptions)