const http = require("http");
const port = 8000;
const handleRequestResponse = (req, res) => {
  res.writeHead(200, "Content-Type", "text/plain");
  res.end(`Welcome to http server on localhost:${port}`);
};

const server = http.createServer(handleRequestResponse);

server.listen(port, "localhost", () => {
  console.log(`Server is Running on Port ${port}`);
});
