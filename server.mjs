import { createServer } from "node:http";
import { sum } from "./calc.mjs";

const server = createServer((request, response) => {
  console.log("request received");

  response.statusCode = 200;

  response.setHeader("Content-Type", "text/html");

  response.end(
    ` <html><body><h1>Hello Word</h1><span>SUM: ${sum(4,6)}<span></body></html> ` 
  );
});

server.listen(3000, () => {
  console.log(`Server running at http://localhost:3000`);
});
