// index.ts
import express from "express";
import http from "http";
import WebSocket from "ws";
import routes from "./app/route/ai.route";
import cors from "cors";
import { aiResponseGenerator } from "./app/helper/aigeneratedResponse";

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
  ws.on("message", async (message) => {
    // Convert Buffer to string
    const jsonString = JSON.parse(message.toString("utf-8"));
    const reply = await aiResponseGenerator(jsonString);
    ws.send(reply);
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
