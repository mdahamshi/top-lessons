import { HashMap } from "./hashmap.js";

class HashSet extends HashMap {
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

set.add("apple");
set.add("banana");
set.set("cherry"); // same as add
set.set("banana"); // ignored because it's already there
set.remove("banana");

console.log(set.toString()); // true
