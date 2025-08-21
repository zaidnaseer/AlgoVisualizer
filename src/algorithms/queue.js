// src/algorithms/queue.js

export class Node {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

export class Queue {
    constructor() {
        this.front = null;
        this.back = null;
        this.size = 0;
    }

    enqueue(data) {
        const newNode = new Node(data);
        if (!this.back) {
            this.front = newNode;
            this.back = newNode;
        } else {
            this.back.next = newNode;
            this.back = newNode;
        }
        this.size++;
    }

    dequeue() {
        if (!this.front) {
            return null;
        }
        const dequeuedNode = this.front;
        this.front = this.front.next;
        if (!this.front) {
            this.back = null;
        }
        this.size--;
        return dequeuedNode.data;
    }

    peek() {
        return this.front ? this.front.data : null;
    }

    isEmpty() {
        return this.size === 0;
    }

    // New search method
    search(data) {
        let current = this.front;
        while (current) {
            if (current.data === data) {
                return true;
            }
            current = current.next;
        }
        return false;
    }

    getArray() {
        const arr = [];
        let current = this.front;
        while (current) {
            arr.push(current.data);
            current = current.next;
        }
        return arr;
    }
}

// Pseudo-code to be used in DataStructures.js
export const QUEUE_PSEUDOCODE = {
    enqueue: [
        { code: 'function enqueue(data)', explain: 'A new node with the data is created and added to the back of the queue.' },
        { code: '  if queue is empty', explain: 'If the queue is empty, the new node is both the front and the back.' },
        { code: '  else', explain: 'Otherwise, the new node is added after the current back node.' },
        { code: '    queue.back.next = newNode', explain: 'The old back node\'s next pointer is updated.' },
        { code: '    queue.back = newNode', explain: 'The new node becomes the new back of the queue.' }
    ],
    dequeue: [
        { code: 'function dequeue()', explain: 'The element at the front of the queue is removed.' },
        { code: '  if queue is not empty', explain: 'Check if there are any elements to remove.' },
        { code: '    queue.front = queue.front.next', explain: 'The front is moved to the next element in the queue.' }
    ],
    search: [
        { code: 'function search(data)', explain: 'Iterate through the queue to find the data.' },
        { code: '  current = queue.front', explain: 'Start from the front of the queue.' },
        { code: '  while (current !== null)', explain: 'Loop until the end of the queue is reached.' },
        { code: '    if (current.data === data)', explain: 'Check if the current node\'s data matches the target.' },
        { code: '      return true', explain: 'If a match is found, return true.' },
        { code: '    current = current.next', explain: 'Move to the next node.' },
        { code: '  return false', explain: 'If the loop finishes, the data was not found.' }
    ]
};

// Function to generate visualization steps
export const getQueueSteps = (operation, queueInstance, params) => {
    const steps = [];
    const tempQueue = new Queue();
    tempQueue.front = queueInstance.front;
    tempQueue.back = queueInstance.back;
    tempQueue.size = queueInstance.size;

    switch (operation) {
        case 'enqueue':
            steps.push({
                type: 'highlight',
                queue: [...tempQueue.getArray()],
                pseudoLine: 0,
                description: `Adding element ${params.data} to the back.`
            });
            tempQueue.enqueue(params.data);
            steps.push({
                type: 'insert',
                queue: [...tempQueue.getArray()],
                pseudoLine: 4,
                description: `New element ${params.data} added.`
            });
            break;
        case 'dequeue':
            steps.push({
                type: 'highlight',
                queue: [...tempQueue.getArray()],
                pseudoLine: 0,
                description: `Removing element from the front.`
            });
            tempQueue.dequeue();
            steps.push({
                type: 'delete',
                queue: [...tempQueue.getArray()],
                pseudoLine: 2,
                description: `Element removed from the front.`
            });
            break;
        case 'search':
            let current = tempQueue.front;
            let index = 0;
            let found = false;

            while(current) {
                steps.push({
                    type: 'traverse',
                    queue: [...tempQueue.getArray()],
                    highlightIndex: index,
                    pseudoLine: 2,
                    description: `Searching for ${params.data}. Checking node at index ${index}`
                });
                if (current.data === params.data) {
                    steps.push({
                        type: 'found',
                        queue: [...tempQueue.getArray()],
                        highlightIndex: index,
                        pseudoLine: 4,
                        description: `Value ${params.data} found at index ${index}.`
                    });
                    found = true;
                    break;
                }
                current = current.next;
                index++;
            }
            if (!found) {
                steps.push({
                    type: 'notFound',
                    queue: [...tempQueue.getArray()],
                    highlightIndex: -1,
                    pseudoLine: 6,
                    description: `Value ${params.data} not found in the queue.`
                });
            }
            break;
        default:
            steps.push({
                type: 'initial',
                queue: [...tempQueue.getArray()],
                pseudoLine: 0,
                description: `Initial state of the queue.`
            });
    }

    return steps;
};