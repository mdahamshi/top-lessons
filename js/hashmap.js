import { LinkedList } from "./list.js";
class HashMap {
  #loadFactor = 0.75;
  #capacity = 16;
  #buckets = Array.from({ length: this.#capacity }, () => new LinkedList());
  #length = 0;

  get capacity() {
    return this.#capacity;
  }

  length() {
    return this.#length;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.#capacity;
    }
    return hashCode;
  }
  findFunc = (key, toTest) => {
    return key === toTest.key;
  };
  currentLoad() {
    return this.#length / this.#capacity;
  }
  checkLoad() {
    if (this.currentLoad() <= this.#loadFactor) return;
    let enteries = this.entries();
    let doubleCapacity = 2 * this.#capacity;
    this.clear(doubleCapacity);
    enteries.forEach((entry) => {
      this.set(entry[0], entry[1]);
    });
  }
  set(key, value) {
    let list = this.getBucket(key);
    let newItem = { key: key, value: value };
    let ind = list.find(key, this.findFunc);
    if (ind !== null) {
      list.update(ind, newItem);
      return true;
    }
    list.append(newItem);
    this.#length++;
    this.checkLoad();
  }
  getBucket(key) {
    let index = this.hash(key);
    if (index < 0 || index >= this.#buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    return this.#buckets[index];
  }
  get(key) {
    let bucket = this.getBucket(key);
    let [_, result] = bucket.find(key, this.findFunc);
    return result ? result.value.value : null;
  }
  has(key) {
    let bucket = this.getBucket(key);
    return bucket.contains(key, this.findFunc);
  }
  remove(key) {
    if (!this.has(key)) return false;
    let bucket = this.getBucket(key);
    let [index, result] = bucket.find(key, this.findFunc);
    bucket.removeAt(index);
    this.#length--;
    return true;
  }
  clear(size = 16) {
    this.#loadFactor = 0.75;
    this.#capacity = size;
    this.#buckets = Array.from({ length: size }, () => new LinkedList());
    this.#length = 0;
  }
  keys() {
    let keys = [];
    for (let bucket of this.#buckets) {
      bucket.forEach((element) => keys.push(element.key));
    }
    return keys;
  }
  values() {
    let values = [];
    for (let bucket of this.#buckets) {
      bucket.forEach((element) => values.push(element.value));
    }
    return values;
  }
  entries() {
    let entries = [];
    for (let bucket of this.#buckets) {
      bucket.forEach((element) => entries.push([element.key, element.value]));
    }
    return entries;
  }
  toString() {
    let res = `HasMap[length: ${this.length()} capacity: ${this.capacity}]:\n`;
    let index = 0;
    for (let bucket of this.#buckets) {
      res += `bucket(${index}): `;
      res += bucket.toString();
      res += "\n";
      index++;
    }
    return res;
  }
}

let test = new HashMap();
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
test.set("moon", "silver");

console.log(test.toString());
