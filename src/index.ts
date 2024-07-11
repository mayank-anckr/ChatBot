// index.ts
import express from "express";
import http from "http";
import WebSocket from "ws";
import routes from "./app/route/ai.route";
import cors from "cors";

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
    allowedHeaders: "Origin,X-Requested-With,Content-Type,Accept,Authorization",
    methods: "GET,PUT,POST,DELETE,OPTIONS",
  })
);

app.options(
  "*",
  cors({
    origin: "*",
    credentials: true,
    allowedHeaders: "Origin,X-Requested-With,Content-Type,Accept,Authorization",
    methods: "GET,PUT,POST,DELETE,OPTIONS",
  })
);
app.use("/api", routes);

wss.on("connection", (ws) => {
  console.log("A new client connected!");
  ws.send("Welcome New Client!");

  ws.on("message", (message) => {
    console.log("Received: %s", message);

    // Broadcast the message to all connected clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        console.log("here to send the message to client");
        client.send("Hello sir It is ai response");
        console.log("Client needs to check the response");
      }
    });
  });

  ws.on("close", () => {
    console.log("Client has disconnected.");
  });
});

app.use(routes);

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

export { wss };
