import "dotenv/config";
import express from "express";
import url from "url";
import path from "path";
import http from "http";
import { Server } from "socket.io";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from "./types.ts";

import "./dbConnect.ts";

const app = express();
const httpServer = http.createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(
  httpServer,
  {
    cors: {
      origin: [
        "http://127.0.0.1:5173",
        "http://localhost:5173",
        "http://127.0.0.1:4173",
        "http://localhost:4173",
      ],
      methods: ["GET", "POST"],
    },
  },
);

const port = Number(process.env.port || 3000);

const pathAtual = url.fileURLToPath(import.meta.url);
const pathPublic = path.join(pathAtual, "../../public");
app.use(express.static(pathPublic));

httpServer.listen(port, () => {
  console.log("Server running on port 3000");
});

export default io;
