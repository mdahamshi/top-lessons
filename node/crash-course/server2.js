import { createServer } from "http";
const PORT = process.env.PORT;

const users = [
  { id: 1, name: "Sarah Dahamshi" },
  { id: 2, name: "Salmah Dahamshi" },
  { id: 3, name: "Kosai Dahamshi" },
];
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

//JSON middleware

const jsonMiddleware = (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
};

// route handler for GET /api/users

const getUsersHandler = (req, res) => {
  res.end(JSON.stringify(users));
  res.end();
};

// not found handler
const notFoundHandler = (req, res, err) => {
  const message = err?.message || "Route Not found";
  res.statusCode = 404;
  console.error(message);
  res.end(JSON.stringify({ message }));
};
// create suer
const createUserHandler = (req, res) => {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk.toString();
  });
  req.on('end', () => {
    const newUser = JSON.parse(body);
    users.push(newUser);
    res.statusCode = 201;
    res.write(JSON.stringify(newUser));
    res.end();
  });
}
// route handler for GET /api/users/:id
const getUserByIdHandler = (req, res) => {
  const id = parseInt(req.url.split("/")[3]);
  const user = users.find((user) => user.id === id);
  if (!user) throw new Error(`User ${id} not found`);

  res.end(JSON.stringify(user));
  res.end();
};
const userApi = (url) => url.match(/\/api\/users\/([0-9]+)/);
const server = createServer((req, res) => {
  try {
    logger(req, res, () => {
      jsonMiddleware(req, res, () => {
        if (req.url === "/api/users" && req.method === "GET") {
          getUsersHandler(req, res);
        } else if (userApi(req.url) && req.method === "GET") {
          getUserByIdHandler(req, res);
        } 
        else if(req.url === '/api/users' && req.method === 'POST') {
          createUserHandler(req, res);
        }
        else {
          notFoundHandler(req, res);
        }
      });
    });
  } catch (err) {
    notFoundHandler(req, res, err);
  }
});

server.listen(PORT, () => {
  console.log(`server running on port http://127.0.0.1:${PORT}`);
});
