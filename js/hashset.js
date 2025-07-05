import { HashMap } from "./hashmap.js";

export class HashSet extends HashMap {
  constructor() {
    super();
  }
  set(key) {
    if (this.has(key)) return;
    return super.set(key);
  }
  values() {
    return super.keys();
  }
  add(key) {
    this.set(key);
  }

  forEach(callback) {
    for (let key of this.values()) {
      callback(key);
    }
  }
  toString() {
    return `HashSet { ${this.values().join(", ")} }`;
  }
}

const set = new HashSet();

