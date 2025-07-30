const users = [
  { id: 1, name: 'Sarah' },
  { id: 2, name: 'Salmah' },
];

export function getAllUsers() {
  return users;
}

export function getUserById(id) {
  return users.find((u) => u.id === id);
}
