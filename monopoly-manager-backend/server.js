import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import { globalErrorHandler } from "./middlewares/errorHandler.js";
import initializeSocket from "./sockets/socketManager.js";
import roomRoutes from "./routes/roomRoutes.js";

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middlewares
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Body parser for JSON

// API Routes
app.get("/", (req, res) => res.send("Monopoly Manager API Running"));
app.use("/api/rooms", roomRoutes);

// Global Error Handler (Must be the last middleware)
app.use(globalErrorHandler);

// Setup HTTP and Socket.IO Server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // In production, restrict this to your frontend's URL
    methods: ["GET", "POST"],
  },
});

// Initialize Socket.IO logic
initializeSocket(io);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
