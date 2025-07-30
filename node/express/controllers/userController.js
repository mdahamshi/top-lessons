import { getAllUsers } from '../storages/index.js';

export const usersListGet = (req, res) => {
  res.send("List of users");
};

export const usersCreateGet = (req, res) => {
  res.send("Form to create a user");
};

export const usersCreatePost = (req, res) => {
  const { name } = req.body;
  res.send(`User ${name} created`);
};