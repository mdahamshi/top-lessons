export class LinkedList {
  #head = null;
  #tail = null;
  #size = 0;

  get size() {
    return this.#size;
  }

  empty() {
    return this.#size === 0;
  }

  append(...values) {
    for (const value of values) {
      const newNode = new Node(value);
      if (this.#tail) this.#tail.nextNode = newNode;
      this.#tail = newNode;
      if (this.empty()) this.#head = newNode;
      this.#size++;
    }
  }

  prepend(...values) {
    for (const value of values.reverse()) {
      const newNode = new Node(value);
      if (this.empty()) this.#tail = newNode;
      newNode.nextNode = this.#head;
      this.#head = newNode;
      this.#size++;
    }
  }

  pop() {
    if (this.empty()) return null;
    if (this.#head === this.#tail) {
      const node = this.#head;
      this.#head = this.#tail = null;
      this.#size--;
      return node.value;
    }
    let current = this.#head;
    let prev = current;
    while (current !== this.#tail) {
      prev = current;
      current = current.nextNode;
    }
    prev.nextNode = null;
    this.#tail = prev;
    this.#size--;
    return current.value;
  }

  shift() {
    if (this.empty()) return null;
    const removed = this.#head;
    if (this.#head === this.#tail) {
      this.#head = this.#tail = null;
    } else {
      this.#head = this.#head.nextNode;
    }
    this.#size--;
    return removed.value;
  }

  at(index) {
    if (index < 0 || index >= this.#size) return null;
    let current = this.#head;
    while (index--) current = current.nextNode;
    return current;
  }
  update(index, value) {
    if (index < 0 || index >= this.#size) return null;
    let current = this.#head;
    while (index--) current = current.nextNode;
    current.value = value;
  }

  contains(value, equal = (value, toTest) => toTest === value) {
    let current = this.#head;
    while (current) {
      if (equal(value, current.value)) return true;
      current = current.nextNode;
    }
    return false;
  }

  find(value, equal = (value, toTest) => toTest === value) {
    let current = this.#head;
    let index = 0;
    while (current) {
      if (equal(value, current.value)) return [index, current];
      current = current.nextNode;
      index++;
    }
    return null;
  }

  insertAt(value, index) {
    if (index <= 0) return this.prepend(value);
    if (index >= this.#size) return this.append(value);

    let current = this.#head;
    let prev = null;
    let i = 0;
    while (i < index) {
      prev = current;
      current = current.nextNode;
      i++;
    }
    const newNode = new Node(value);
    prev.nextNode = newNode;
    newNode.nextNode = current;
    this.#size++;
  }

  removeAt(index) {
    if (index <= 0) return this.shift();
    if (index >= this.#size - 1) return this.pop();

    let current = this.#head;
    let prev = null;
    let i = 0;
    while (i < index) {
      prev = current;
      current = current.nextNode;
      i++;
    }
    prev.nextNode = current.nextNode;
    this.#size--;
    return current.value;
  }

  forEach(callback) {
    let current = this.#head;
    let index = 0;
    while (current) {
      callback(current.value, index);
      current = current.nextNode;
      index++;
    }
  }

  toString() {
    if (this.empty()) return "{}";
    let res = "";
    let current = this.#head;
    while (current) {
      res += `( ${JSON.stringify(current.value)} ) -> `;
      current = current.nextNode;
    }
    return res + "null";
  }
}

class Node {
  #value;
  #nextNode = null;

  constructor(value = null) {
    this.#value = value;
  }

  get value() {
    return this.#value;
  }
  set value(value) {
    this.#value = value;
  }
  get nextNode() {
    return this.#nextNode;
  }

  set nextNode(node) {
    if (!(node instanceof Node) && node !== null)
      throw new TypeError("Must assign a Node or null");
    this.#nextNode = node;
  }
}
