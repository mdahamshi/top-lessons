class LinkedList {
  head = null;
  tail = null;
  size = 0;
  empty() {
    return !this.size;
  }
  append(...values) {
    for (const value of values) {
      let newNode = new Node(value);
      if (this.tail) this.tail.nextNode = newNode;
      this.tail = newNode;
      if (this.empty()) this.head = newNode;
      this.size++;
    }
  }
  prepend(...values) {
    for (const value of values) {
      let newNode = new Node(value);
      if (this.empty()) this.tail = newNode;
      newNode.nextNode = this.head;
      this.head = newNode;
      this.size++;
    }
  }
  pop() {
    if (this.empty()) return null;
    if (this.head === this.tail) {
      const node = this.head;
      this.head = null;
      this.tail = null;
      this.size--;
      return node;
    }
    let current = this.head;
    let prev = current;
    while (current !== this.tail) {
      prev = current;
      current = current.nextNode;
    }
    prev.nextNode = null;
    this.tail = prev;
    this.size--;

    return current;
  }
  shift() {
    if (this.empty()) return null;
    const removed = this.head;
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.nextNode;
    }

    this.size--;
    return removed;
  }
  at(index) {
    if (index >= this.size || index < 0) return null;
    let current = this.head;
    while (index) {
      current = current.nextNode;
      index--;
    }
    return current;
  }
  contains(value) {
    let current = this.head;
    while (current) {
      if (current.value === value) return true;
      current = current.nextNode;
    }

    return false;
  }
  find(value) {
    let current = this.head;
    let index = 0;
    while (current) {
      if (current.value === value) {
        return index;
      }
      current = current.nextNode;
      index++;
    }

    return null;
  }
  insertAt(value, index) {
    if (index <= 0) {
      this.prepend(value);
      return;
    }
    if (index >= this.size) {
      this.append(value);
      return;
    }

    let current = this.head;
    let prev = current;
    let i = 0;
    while (i < index) {
      prev = current;
      current = current.nextNode;
      i++;
    }
    let newNode = new Node(value);
    prev.nextNode = newNode;
    newNode.nextNode = current;
    this.size++;
  }
  removeAt(index) {
    if (index <= 0) return this.shift();
    if (index >= this.size - 1) return this.pop();

    let current = this.head;
    let prev = current;
    let i = 0;
    while (i < index) {
      prev = current;
      current = current.nextNode;
      i++;
    }
    prev.nextNode = current.nextNode;
    this.size--;
    return current;
  }
  toString() {
    if (this.empty()) return "{}";
    let res = "";
    let current = this.head;
    while (current) {
      res += `( ${current.value} ) -> `;
      current = current.nextNode;
    }
    return res.concat("null");
  }
}

class Node {
  constructor(value = null) {
    this.value = value;
  }
  nextNode = null;
}

let list = new LinkedList();

list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");
console.log(list.toString(), list.pop());
