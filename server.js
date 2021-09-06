const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const port = process.env.port || 3000;
const io = require("socket.io")(server);

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client.html");
});

io.on("connection", (socket) => {
  console.log("socket connected....");
  socket.on("disconnect", () => console.log("socket disconnected"));
  socket.on('message',(msg)=>{
      socket.broadcast.emit('message',msg)
  })
});

server.listen(port, () => console.log(`server is running on port ${port}`));
