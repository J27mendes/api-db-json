const jsonServer = require("json-server");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(
  jsonServer.rewriter({
    "/api/*": "/$1",
  })
);

server.use(router);

server.listen(3000, () => {
  console.log("JSON Server rodando na porta 3000 🚀");
});

module.exports = server;
