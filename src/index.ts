import WebSocket, { WebSocketServer } from "ws";
import http from "http";

const server = http.createServer((req, res) => {
  console.log(new Date() + " Received req for: " + req.url);
  res.end("Hi");
});

const wss = new WebSocketServer({ server });

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  ws.on("message", function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });


  ws.send("YOoooooooooo")
});

server.listen(3000, () => {
  console.log("Started server on port", 3000)
})
