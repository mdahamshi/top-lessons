import http from "http";
import fs from "fs/promises";
import path from "path";
import url from "url";
const PORT = process.env.PORT;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__filename, __dirname);
const routeNotFound = (req, res) => {
  const filePath = path.join(__dirname, "public", "index.html");
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 404;
  res.end(JSON.stringify({ message: "Server Error" }));
};


const routes = {
  "/": "index.html",
  "/about": "about.html",
  404: routeNotFound,
};
const server = http.createServer(async (req, res) => {
  try {
    console.log(req.url);

    if (req.method === "GET") {
      const fileName = routes[req.url] || routes["404"];
      if (typeof fileName === "string") {
        const filePath = path.join(__dirname, "public", fileName);
        console.log(`reading ${filePath}`);
        const data = await fs.readFile(filePath);
        res.setHeader("Content-Type", "text/html");
        res.write(data);
        res.end();
      }
    } else {
      throw new Error("Method not allowed");
    }
  } catch (err) {
    console.error(err);
    routeNotFound(req, res);
  }
});

server.listen(PORT, () => {
  console.log(`server running on port http://127.0.0.1:${PORT}`);
});
