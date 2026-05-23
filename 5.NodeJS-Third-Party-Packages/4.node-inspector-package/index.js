const http = require("http");
const inspector = require("inspector");
const session = new inspector.Session();
session.connect();

const server = http.createServer((req, res) => {
  session.post("Debugger.enable", () => {
    session.post("Debugger.pause", () => {
      console.log("Execution paused. You can now inspect the code.");
    });
  });

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello, World!\n");
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});

// To run this code, use the following command in your terminal:
// node --inspect index.js

// Then, open Chrome and navigate to chrome://inspect to start debugging.
// or run this command to open the inspector directly in the browser:
// node --inspect-brk index.js

// or use this url to open the inspector directly in the browser:
// chrome-devtools://devtools/bundled/inspector.html?ws=localhost:9229/uuid
// http://127.0.0.1:8080/debug?port=5858
