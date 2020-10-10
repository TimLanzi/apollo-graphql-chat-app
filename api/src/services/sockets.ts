// import http from "http";
// import socketIO, { Socket } from "socket.io";
// import { addUser } from "./chatroom";
// import { send } from "./messaging";


// interface UserSocket extends Socket {
//   uid: string;
// }

// export default function(server: http.Server): void {
//   const io = socketIO(server);

//   let users: string[] = [];
//   let rooms: any = {};

//   io.on("connection", (socket: UserSocket) => {
//     console.log("> A user connected")

//     socket.on("add user", async(uid: string) => {
//       try {
//         await addUser(uid, rooms);
//         users.push(uid.toString());
//       } catch (e) {
//         // error
//       }
//     });
  
//     socket.on("send message", async(data) => {
//       // io.emit('chat message', msg);
//       try {
//         await send(data, "");
//         io.sockets.in(data.rid).emit('update chat', socket.uid, data.msg);
//       } catch (e) {
//         // error
//       }
//     });

//     socket.on("disconnect", () => {
//       console.log("> A user disconnected");
//       users = users.filter(i => i !== socket.uid);

//       for (let i in rooms) {
//         rooms[i] = rooms[i].filter(i => i !== socket.uid);
//         if (rooms[i].length <= 0) {
//           delete rooms[i];
//         } 
//       }
//     });
//   });
// }