function sumRange(n) {
  if (n == 1) return 1;
  return n + sumRange(n - 1);
}

function power(base, exp) {
  if (exp === 0) return 1;
  return base * power(base, exp - 1);
}

function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}

function all(arr, callback) {
  var copy = copy || arr.slice();
  if (copy.length === 0) return true;
  if (callback(copy[0])) {
    copy.shift();
    return all(copy, callback);
  } else {
    return false;
  }
}
function fib(n) {
  let arr = [0, 1];
  function fibHelper(n, memo = {}) {
    if (n <= 1) return n;
    if (memo[n]) return memo[n];
    memo[n] = fibHelper(n - 1, memo) + fibHelper(n - 2, memo);
    arr.push(memo[n]);
    return memo[n];
  }
  fibHelper(n);
  return arr;
}
const merge = (left, right) => {
  const res = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) res.push(left.shift());
    else res.push(right.shift());
  }
  console.log(`merge res: ${[...res, ...left, ...right]}`);
  return [...res, ...left, ...right];
};

function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = Math.floor(arr.length / 2);
  const left = arr.slice(0, pivot);
  const right = arr.slice(pivot);
  console.log(`left: ${left}   right: ${right}`);
  return merge(mergeSort(left), mergeSort(right));
}
let arr = [3, 2, 1, 13, 8, 5, 0, 1];

console.log(arr);
console.log(mergeSort(arr));
