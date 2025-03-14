const jsonServer = require("json-server");
const path = require("path");
const fs = require("fs");

const server = jsonServer.create();
const filePath = path.join(__dirname, "db.json");

const readDbFile = () => {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

const saveDbFile = (db) => {
  fs.writeFileSync(filePath, JSON.stringify(db, null, 2), "utf-8");
};

server.use((req, res, next) => {
  req.db = readDbFile();
  next();
});

const router = jsonServer.router(readDbFile());

server.use(jsonServer.defaults());
server.use(
  jsonServer.rewriter({
    "/api/*": "/$1",
  })
);

server.use((req, res, next) => {
  res.on("finish", () => {
    if (["POST", "PUT", "DELETE"].includes(req.method)) {
      saveDbFile(router.db.getState());
    }
  });
  next();
});

server.use(router);

server.listen(3000, () => {
  console.log("JSON Server rodando na porta 3000 🚀");
});

module.exports = server;
