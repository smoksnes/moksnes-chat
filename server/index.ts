// // import express, { Express, Request, Response } from 'express';
// import express, { Request, Response } from "express";
// import * as http from 'http';
// import next from 'next';
// import * as socketio from 'socket.io';
// import { Server as IO } from "socket.io";

// const port: number = parseInt(process.env.PORT || '3000', 10);
// const dev: boolean = process.env.NODE_ENV !== 'production';
// const app = next({ dev });
// const nextHandler = app.getRequestHandler();

// app.prepare().then(async() => {
//     const expressApp = express();
//     console.log('Starting.');
    
//     const io: socketio.Server = new socketio.Server();
//     const server: http.Server = http.createServer(expressApp);
//     io.attach(server);
//     io.on('connection', (socket: socketio.Socket) => {
//         console.log('Got connection for Socket.IO', socket.id);
//         socket.emit('status', 'Hello from Socket.io');

//         socket.on('disconnect', () => {
//             console.log('client disconnected');
//         })
//     });

//     server.listen(port, () => {
//         console.log(`> Ready on http://localhost:${port}`);
//     });
//     expressApp.set('socketio', io);
//     const nextHandler = app.getRequestHandler()

//     expressApp.all("*", (req: Request, res: Response) => {
//         return nextHandler(req, res);
//     });
      
// });