import express from "express";
import http from "http";
import { WebSocketServer } from "ws";

const app = express();
const port = process.env.PORT || 4000;

const server = http.createServer(app);

const wss = new WebSocketServer({ server });

wss.on("connection", async (ws) => {
  console.log("someone connected");
  ws.on("message", (message) => {
    console.log("received!");
    wss.broadcast(`${message}`);
  });
});

wss.broadcast = function broadcast(msg) {
  console.log(msg);
  wss.clients.forEach(function each(client) {
    client.send(msg);
  });
};

server.listen(port, () => {
  console.log("server is live");
});
