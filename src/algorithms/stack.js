// src/algorithms/stack.js

export class Node {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
    value() { return this.data; }
}

export class Stack {
    constructor() {
        this.top = null;
        this.size = 0;
    }

    push(data) {
        const newNode = new Node(data, this.top);
        this.top = newNode;
        this.size++;
    }

    pop() {
        if (!this.top) {
            return null;
        }
        const poppedNode = this.top;
        this.top = this.top.next;
        this.size--;
        return poppedNode.data;
    }

    peek() {
        return this.top ? this.top.data : null;
    }

    isEmpty() {
        return this.size === 0;
    }

    getArray() {
        const arr = [];
        let current = this.top;
        while (current) {
            arr.push(current.data);
            current = current.next;
        }
        return arr;
    }
}

// Pseudo-code to be used in DataStructures.js
export const STACK_PSEUDOCODE = {
    push: [
        { code: 'function push(data)', explain: 'A new node with the data is created.' },
        { code: '  newNode.next = stack.top', explain: 'The new node\'s next pointer points to the current top.' },
        { code: '  stack.top = newNode', explain: 'The new node becomes the new top of the stack.' }
    ],
    pop: [
        { code: 'function pop()', explain: 'The element at the top of the stack is removed.' },
        { code: '  if stack is not empty', explain: 'Check if there are any elements to remove.' },
        { code: '    stack.top = stack.top.next', explain: 'The top is moved to the next element in the stack.' }
    ]
};

// Function to generate visualization steps
export const getStackSteps = (operation, stackInstance, params) => {
    const steps = [];
    const tempStack = new Stack();
    tempStack.top = stackInstance.top;
    tempStack.size = stackInstance.size;
    
    // Animate the operation
    switch (operation) {
        case 'push':
            steps.push({
                type: 'highlight',
                stack: [...tempStack.getArray()],
                pseudoLine: 0
            });
            tempStack.push(params.data);
            steps.push({
                type: 'insert',
                stack: [...tempStack.getArray()],
                pseudoLine: 1
            });
            break;
        case 'pop':
            steps.push({
                type: 'highlight',
                stack: [...tempStack.getArray()],
                pseudoLine: 0
            });
            tempStack.pop();
            steps.push({
                type: 'delete',
                stack: [...tempStack.getArray()],
                pseudoLine: 2
            });
            break;
        case 'search': {
            const target = params?.data;
            let current = tempStack.top;
            let idx = 0;
            let found = false;
            while (current) {
                steps.push({ type: 'traverse', stack: [...tempStack.getArray()], highlightIndex: idx, pseudoLine: 0, description: `Checking node ${idx}` });
                if (current.data === target) {
                    steps.push({ type: 'found', stack: [...tempStack.getArray()], highlightIndex: idx, pseudoLine: 0, description: `Found ${target} at position ${idx}` });
                    found = true;
                    break;
                }
                current = current.next;
                idx++;
            }
            if (!found) steps.push({ type: 'notFound', stack: [...tempStack.getArray()], highlightIndex: -1, pseudoLine: 0, description: `${target} not found` });
            break; }
        default:
            steps.push({
                type: 'initial',
                stack: [...tempStack.getArray()],
                pseudoLine: 0
            });
    }

    return steps;
};