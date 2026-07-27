import express from "express";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import cors from 'cors'
import projectRoutes from "./routes/projectRoutes.js"
import dns from "node:dns";
import { allProjects } from "./controllers/ProjectController.js";
import { Server } from "socket.io";
import { createServer } from "http";
import { skipMiddlewareFunction } from "mongoose";
import socket from "../client/src/socket.io.js";

dns.setServers=(["8.8.8.8", "1.1.1.1"]);

const app = express();
// HTTP Server
const server = createServer(app);

// Socket.IO Server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST","DELETE", "PUT"],
  credentials: true 
}});

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("message", (data) => {
    console.log("Message:", data);

    // Sab clients ko message bhejna
    io.emit("receive-message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
  });
});

const PORT = 5000;
connectDB()

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// MiddleWare
app.use(express.json());

app.use((req,res,next)=>{
  console.log(req.url)
  next();
})

app.use ('/api/auth',authRoutes)
app.use('/api/',projectRoutes)





server.listen(PORT, () => {
  console.log(`Server is listening at PORT ${PORT}`);
});
app.set("io", io)