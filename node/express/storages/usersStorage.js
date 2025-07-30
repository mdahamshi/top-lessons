export class UsersStorage {
  constructor() {
    this.storage = [
      { id: 0, firstName: 'Sarah' },
      { id: 1, firstName: 'Salmah' },
    ];

    this.id = 2;
  }

  addUser({ firstName, lastName }) {
    const id = this.id;
    this.storage[id] = { id, firstName, lastName };
    this.id++;
  }

  getUsers() {
    return Object.values(this.storage);
  }

  getUser(id) {
    return this.storage[id];
  }

  updateUser(id, { firstName, lastName }) {
    this.storage[id] = { id, firstName, lastName };
  }

  deleteUser(id) {
    delete this.storage[id];
  }
}

export const usersStorage = new UsersStorage();
