const app = require("express")();
const server = require("http").createServer(app);
const { Server } = require("socket.io");
app.use(require("cors"));

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
  allowEIO3: true,
});

const port = process.env.PORT || 5000;

let users = []


io.on("connection", (socket) => {
    // Join a conversation
    const { roomId,username } = socket.handshake.query;
    socket.join(roomId);

    username !== undefined && username !== null && users.push(username)

    // Listen for new messages
    socket.on("newMessages", (data) => {
      io.sockets.in(roomId).emit("newMessages", data);
    });    

      io.sockets.in(roomId).emit("roomData",users)
    
  socket.on("disconnect", () => {
    socket.leave(roomId)
  });
});

server.listen(port, () => {
  console.log(`server running => ${port}`);
});
