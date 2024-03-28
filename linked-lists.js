function createNode(key = null, value = null) {
  return { key, value, nextNode: null };
}

function createLinkedList() {
  let headNode = null;

  function append(key, value) {
    if (headNode == null) {
      headNode = createNode(key, value);
      return;
    }

    let tmp = headNode;

    while (tmp.nextNode != null) {
      tmp = tmp.nextNode;
    }

    tmp.nextNode = createNode(key, value);
  }

  function prepend(key, value) {
    if (headNode == null) headNode = createNode(key, value);
    else {
      const newNode = createNode(key, value);
      newNode.nextNode = headNode;
      headNode = newNode;
    }
  }

  function size() {
    let tmp = headNode;
    let size = 0;

    while (tmp != null) {
      tmp = tmp.nextNode;
      size += 1;
    }

    return size;
  }

  function head() {
    return headNode;
  }

  function tail() {
    if (!headNode) return null;
    let tmp = headNode;
    while (tmp.nextNode != null) tmp = tmp.nextNode;
    return tmp;
  }

  function at(index) {
    if (!headNode) return null;
    let tmp = headNode;

    for (let currIndex = 0; currIndex < index; currIndex++) {
      tmp = tmp.nextNode;
      if (tmp == null) return null;
    }

    return tmp;
  }

  function pop() {
    const tailNode = tail();
    if (headNode === tailNode) {
      headNode = null;
      return;
    }

    let tmp = headNode;
    while (tmp.nextNode != tailNode) tmp = tmp.nextNode;
    tmp.nextNode = null;
  }

  function contains(key) {
    if (!headNode) return false;
    let tmp = headNode;

    while (tmp.key !== key) {
      tmp = tmp.nextNode;
      if (tmp == null) return false;
    }

    return true;
  }

  function find(key) {
    if (!headNode) return null;
    let currIndex = 0;
    let tmp = headNode;

    while (tmp.key !== key) {
      tmp = tmp.nextNode;
      currIndex++;
      if (tmp == null) return [null, null];
    }

    return [currIndex, tmp];
  }

  function insertAt(key, value, index) {
    const newNode = createNode(key, value);
    const node = at(index - 1);
    if (node == null) {
      append(key, value);
      return;
    }
    newNode.nextNode = node.nextNode;
    node.nextNode = newNode;
  }

  function removeAt(index) {
    if (index === 0) {
      headNode = headNode.nextNode;
      return;
    }

    const prevNode = at(index - 1);
    if (prevNode == null || prevNode.nextNode == null) return;

    const currNode = prevNode.nextNode;

    prevNode.nextNode = currNode.nextNode;
    currNode.nextNode = null;
  }

  function toString(Node = head()) {
    if (!Node) return "null";

    return `[${Node.key}: ${Node.value}] -> ${toString(Node.nextNode)}`;
  }

  return {
    append,
    prepend,
    size,
    head,
    tail,
    at,
    pop,
    contains,
    find,
    insertAt,
    removeAt,
    toString,
  };
}

module.exports = {
  createLinkedList,
};
