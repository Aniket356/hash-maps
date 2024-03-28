const linkedList = require("./linked-lists.js");

function createHashSet() {
  const load_factor = 0.75;
  let buckets = new Array(16);
  buckets.fill(null);
  let numberOfKeys = 0;

  function hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % buckets.length;
    }

    return hashCode;
  }

  function growBuckets() {
    const newSize = 2 * buckets.length;
    for (let i = buckets.length; i < newSize; i++) {
      buckets[i] = null;
    }
  }

  function set(key) {
    const hashCode = hash(key);

    if (buckets[hashCode] == null) {
      buckets[hashCode] = linkedList.createLinkedList();
      buckets[hashCode].append(key, null);
      numberOfKeys++;
      return;
    }

    const nodeOfKey = buckets[hashCode].find(key)[1];
    if (nodeOfKey) return;

    buckets[hashCode].prepend(key, null);
    numberOfKeys++;

    if (numberOfKeys / buckets.length >= load_factor) growBuckets();
  }

  function has(key) {
    const hashCode = hash(key);
    if (buckets[hashCode] == null) return false;

    return buckets[hashCode].contains(key);
  }

  function remove(key) {
    const hashCode = hash(key);

    if (buckets[hashCode] == null) return false;

    const indexOfKey = buckets[hashCode].find(key)[0];
    if (indexOfKey != null) {
      buckets[hashCode].removeAt(indexOfKey);
      numberOfKeys--;
      return true;
    }

    return false;
  }

  function length() {
    return numberOfKeys;
  }

  function clear() {
    for (let i = 0; i < buckets.length; i++) {
      buckets[i] = null;
    }
    numberOfKeys = 0;
  }

  function keys() {
    let arr = [];
    for (list of buckets) {
      if (list == null) continue;

      for (let tmp = list.head(); tmp != null; tmp = tmp.nextNode) {
        arr.push(tmp.key);
      }
    }
    return arr;
  }

  return {
    set,
    has,
    remove,
    length,
    clear,
    keys,
  };
}
