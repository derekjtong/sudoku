class StackNode {
  constructor(grid, booleanValue) {
    this.grid = grid;
    this.booleanValue = booleanValue;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.top = null;
    this.size = 0;
  }

  isEmpty() {
    return this.size === 0;
  }
// @params(board, T/F)
  push(grid, booleanValue) {
    const newNode = new StackNode(grid, booleanValue);
    newNode.next = this.top;
    this.top = newNode;
    this.size++;
  }

  pop() {
    if (this.isEmpty()) {
      return null;
    }

    const poppedNode = this.top;
    this.top = poppedNode.next;
    this.size--;

    return { grid: poppedNode.grid, booleanValue: poppedNode.booleanValue };
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    }

    return { grid: this.top.grid, booleanValue: this.top.booleanValue };
  }

  getSize() {
    return this.size;
  }
}

export { Stack,StackNode};
// Example usage:



// Pushing pairs into the stack
// myStack.push(
//   [
//     [1, 2, 3],
//     [4, 5, 6],
//   ],
//   true,
// );
// myStack.push(
//   [
//     [7, 8, 9],
//     [10, 11, 12],
//   ],
//   false,
// );
