class Node {
  #value = null;
  #left = null;
  #right = null;
  constructor(value = null) {
    this.#value = value;
  }
  toString() {
    return `{Value: ${this.#value}}`;
  }
  get left() {
    return this.#left;
  }
  set left(node) {
    if (!(node instanceof Node) && node !== null)
      throw new TypeError("Must assign a Node or null");
    this.#left = node;
  }
  get right() {
    return this.#right;
  }
  set right(node) {
    if (!(node instanceof Node) && node !== null)
      throw new TypeError("Must assign a Node or null");
    this.#right = node;
  }
  get value() {
    return this.#value;
  }
  set value(value) {
    this.#value = value;
  }
  isLeaf() {
    return this.#left === null && this.#right === null;
  }
}

class Tree {
  #root = null;
  constructor(array) {
    this.#root = this.buildTree(array);
  }
  get root() {
    return this.#root;
  }
  set root(node) {
    if (!(node instanceof Node) && node !== null)
      throw new TypeError("Must assign a Node or null");
    this.#root = node;
  }
  buildTree(array) {
    const unique = [...new Set(array)].sort((a, b) => a - b);
    const helper = (array) => {
      if (array.length === 0) return null;
      const mid = Math.floor(array.length / 2);
      const node = new Node(array[mid]);
      node.left = helper(array.slice(0, mid));
      node.right = helper(array.slice(mid + 1));

      return node;
    };
    return helper(unique);
  }
  insert(value) {
    const helper = (node, val) => {
      if (node === null) return new Node(value);
      if (value < node.value) {
        node.left = helper(node.left, value);
      } else if (value > node.value) {
        node.right = helper(node.right, value);
      }
      return node;
    };

    this.#root = helper(this.#root, value);
  }
  find(value) {
    const helper = (node, value) => {
      if (node === null) return null;
      if (node.value === value) return node;
      else if (node.value < value) return helper(node.right, value);
      else if (node.value > value) return helper(node.left, value);
    };
    return helper(this.#root, value);
  }
  deleteItem(value) {
    const minValueNode = (node) => {
      while (node.left !== null) node = node.left;
      return node;
    };
    const helper = (node, value) => {
      if (node === null) return null;
      if (value < node.value) node.left = helper(node.left, value);
      else if (value > node.value) node.right = helper(node.right, value);
      else {
        if (node.left === null) return node.right;
        if (node.right === null) return node.left;

        const successor = minValueNode(node.right);
        node.value = successor.value;
        node.right = helper(node.right, successor.value);
      }
      return node;
    };

    this.#root = helper(this.#root, value);
  }
  levelOrder(callback) {
    this.checkCallback(callback);
    let queue = [];
    if (this.#root) queue.push(this.#root);
    while (queue.length) {
      let current = queue.shift();
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
      callback(current);
    }
  }
  checkCallback(callback) {
    if (!callback) throw new Error("You must provide callback function");
  }
  levelOrderRec(callback) {
    this.checkCallback(callback);
    const getHeight = (node) => {
      if(! node) return -1;
      return 1 + Math.max(getHeight(node.left), getHeight(node.right));
    }
    const getLevel = (node, level) => {
      if(! node) return;
      if(level === 0) {
        callback(node);
      } else {
        getLevel(node.left, level - 1);
        getLevel(node.right, level - 1);
      }
    }
    const height = getHeight(this.#root);
    for(let i = 0; i <= height; i++)
      getLevel(this.#root, i);
  }
  preOrder(callback) {
    this.checkCallback(callback);
    
    const helper = (node) => {
      if(! node) return;
      callback(node);
      helper(node.left);
      helper(node.right);
    }
    helper(this.#root);
  }
  inOrder(callback) {
    this.checkCallback(callback);
    
    const helper = (node) => {
      if(! node) return;
      helper(node.left);
      callback(node);
      helper(node.right);
    }
    helper(this.#root);
  }
  postOrder(callback) {
    this.checkCallback(callback);
    
    const helper = (node) => {
      if(! node) return;
      helper(node.left);
      helper(node.right);
      callback(node);
    }
    helper(this.#root);
  }
  height(value) {

    let requieredNode = this.find(value);
    if(! requieredNode)
      return null;
    const helper = (node) => {
      if(node === null)
        return -1;

      return 1 + Math.max(helper(node.left), helper(node.right));
    }
    return helper(requieredNode)
  }
  depth(value) {
    
    const helper = (node, depth = 0) => {
      if(! node)
        return null;
      if(node.value === value)
        return depth;
      const left = helper(node.left, depth + 1);
      const right = helper(node.right, depth + 1); 

      return left !== null ? left : right;

    }
    return helper(this.#root);
  }
  isBalanced() {

    const helper = (node) => {
      if(! node)
        return {balanced: true, height: -1};
      const left = helper(node.left);
      const right = helper(node.right);

      const balanced = 
        left.balanced &&
        right.balanced &&
        Math.abs(left.height - right.height) <= 1;
      
      return {
        balanced: balanced,
        height: 1 + Math.max(left.height, right.height)
      };
    }
    return helper(this.#root).balanced;
  }
  reBalance() {
    if(this.isBalanced())
      return;
    let array = [];

    this.inOrder((node) => array.push(node.value));
    this.#root = this.buildTree(array);
    return this;
  }
  prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
}
// Random generator
function generateRandomArray(size = 15, max = 100) {
  const arr = [];
  while (arr.length < size) {
    const num = Math.floor(Math.random() * max);
    if (!arr.includes(num)) arr.push(num);
  }
  return arr;
}

// Collector helper for traversal
function collect(callback) {
  const results = [];
  const collectCallback = (node) => results.push(node.value);
  callback(collectCallback);
  return results;
}

// Assume Tree class is defined with:
// - insert()
// - rebalance()
// - isBalanced()
// - levelOrderRec(callback), inOrder(callback), preOrder(callback), postOrder(callback)

const initialArray = generateRandomArray();
const tree = new Tree(initialArray);

console.log("Initial array:", initialArray);
console.log("Is balanced?", tree.isBalanced());

console.log("Level Order:", collect(cb => tree.levelOrderRec(cb)));
console.log("Pre Order:", collect(cb => tree.preOrder(cb)));
console.log("In Order:", collect(cb => tree.inOrder(cb)));
console.log("Post Order:", collect(cb => tree.postOrder(cb)));

// Unbalance the tree by inserting large values
[101, 110, 120, 130, 140].forEach(n => tree.insert(n));

console.log("Is balanced after unbalancing?", tree.isBalanced());

// Rebalance
tree.reBalance();
console.log("Is balanced after rebalancing?", tree.isBalanced());

console.log("Level Order (after rebalance):", collect(cb => tree.levelOrderRec(cb)));
console.log("Pre Order (after rebalance):", collect(cb => tree.preOrder(cb)));
console.log("In Order (after rebalance):", collect(cb => tree.inOrder(cb)));
console.log("Post Order (after rebalance):", collect(cb => tree.postOrder(cb)));
