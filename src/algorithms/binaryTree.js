// src/algorithms/binaryTree.js

export class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

export class BinaryTree {
    constructor() {
        this.root = null;
    }

    insert(data) {
        const newNode = new Node(data);
        if (!this.root) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
    }

    insertNode(node, newNode) {
        if (newNode.data < node.data) {
            if (!node.left) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else if (!node.right) {
            node.right = newNode;
        } else {
            this.insertNode(node.right, newNode);
        }
    }

    // New search method
    search(data) {
        return this.searchNode(this.root, data);
    }

    searchNode(node, data) {
        if (!node || node.data === data) {
            return node;
        }

        if (data < node.data) {
            return this.searchNode(node.left, data);
        } else {
            return this.searchNode(node.right, data);
        }
    }

    // Helper to get all nodes for visualization
    getNodes() {
        const nodes = [];
        const queue = [this.root];
        while (queue.length > 0) {
            const currentNode = queue.shift();
            if (currentNode) {
                nodes.push(currentNode);
                queue.push(currentNode.left);
                queue.push(currentNode.right);
            }
        }
        return nodes;
    }

    // Delete a node from BST (handles leaf, one child, two children)
    delete(data) {
        this.root = this._deleteNode(this.root, data);
    }

    _deleteNode(node, data) {
        if (!node) return null;
        if (data < node.data) {
            node.left = this._deleteNode(node.left, data);
            return node;
        } else if (data > node.data) {
            node.right = this._deleteNode(node.right, data);
            return node;
        }
        // Node found
        if (!node.left && !node.right) return null; // leaf
        if (!node.left) return node.right; // one child
        if (!node.right) return node.left; // one child
        // two children: replace with inorder successor
        const succ = this._minNode(node.right);
        node.data = succ.data;
        node.right = this._deleteNode(node.right, succ.data);
        return node;
    }

    _minNode(node) {
        let cur = node;
        while (cur?.left) {
            cur = cur.left;
        }
        return cur;
    }

    // Traversals (return arrays)
    inorder() {
        const res = [];
        const dfs = (n) => { if (!n) return; dfs(n.left); res.push(n.data); dfs(n.right); };
        dfs(this.root);
        return res;
    }
    preorder() {
        const res = [];
        const dfs = (n) => { if (!n) return; res.push(n.data); dfs(n.left); dfs(n.right); };
        dfs(this.root);
        return res;
    }
    postorder() {
        const res = [];
        const dfs = (n) => { if (!n) return; dfs(n.left); dfs(n.right); res.push(n.data); };
        dfs(this.root);
        return res;
    }
}

// Pseudo-code to be used in DataStructures.js
export const BINARY_TREE_PSEUDOCODE = {
    insert: [
        { code: 'function insert(node, data)', explain: 'Find the correct position to insert the new node.' },
        { code: '  if data < node.data', explain: 'If the data is smaller, move to the left subtree.' },
        { code: '    insert(node.left, data)', explain: 'Recursively call insert on the left child.' },
        { code: '  else', explain: 'If the data is larger, move to the right subtree.' },
        { code: '    insert(node.right, data)', explain: 'Recursively call insert on the right child.' }
    ],
    search: [
        { code: 'function search(node, data)', explain: 'Start the search from the root of the tree.' },
        { code: '  if node === null or node.data === data', explain: 'Base case: if the node is null or its data matches, return the node.' },
        { code: '  if data < node.data', explain: 'If the target data is smaller, it must be in the left subtree.' },
        { code: '    return search(node.left, data)', explain: 'Recursively search the left subtree.' },
        { code: '  else', explain: 'Otherwise, the data must be in the right subtree.' },
        { code: '    return search(node.right, data)', explain: 'Recursively search the right subtree.' }
    ],
    delete: [
        { code: 'function delete(node, key)', explain: 'Find the node to delete.' },
        { code: '  if key < node.data: node.left = delete(node.left, key)', explain: 'Go left.' },
        { code: '  else if key > node.data: node.right = delete(node.right, key)', explain: 'Go right.' },
        { code: '  else // found', explain: 'Handle 3 cases.' },
        { code: '    if no child: return null', explain: 'Leaf node.' },
        { code: '    if one child: return that child', explain: 'Single child replace.' },
        { code: '    two children: node.data = min(node.right)', explain: 'Copy inorder successor.' },
        { code: '    node.right = delete(node.right, node.data)', explain: 'Delete successor.' }
    ],
    inorder: [
        { code: 'inorder(node):', explain: 'LNR' },
        { code: '  inorder(node.left)', explain: 'Left' },
        { code: '  visit(node)', explain: 'Node' },
        { code: '  inorder(node.right)', explain: 'Right' }
    ],
    preorder: [
        { code: 'preorder(node):', explain: 'NLR' },
        { code: '  visit(node)', explain: 'Node' },
        { code: '  preorder(node.left)', explain: 'Left' },
        { code: '  preorder(node.right)', explain: 'Right' }
    ],
    postorder: [
        { code: 'postorder(node):', explain: 'LRN' },
        { code: '  postorder(node.left)', explain: 'Left' },
        { code: '  postorder(node.right)', explain: 'Right' },
        { code: '  visit(node)', explain: 'Node' }
    ]
};

// Function to generate visualization steps
// Helper builders to reduce complexity of getTreeSteps
function buildInsertSteps(treeInstance, data) {
    const steps = [];
    let currentNode = treeInstance.root;
    if (!currentNode) {
        steps.push({ type: 'insert', node: new Node(data), pseudoLine: 0, description: `Inserting new node ${data} as root.`, operation: 'insert' });
        return steps;
    }
    steps.push({ type: 'traverse', node: currentNode, pseudoLine: 0, description: `Starting insert from root node ${currentNode.data}.`, operation: 'insert' });
    while (currentNode) {
        if (data < currentNode.data) {
            if (!currentNode.left) {
                steps.push({ type: 'insert', node: currentNode, value: data, pseudoLine: 2, description: `Inserting ${data} as left child of ${currentNode.data}.`, operation: 'insert' });
                break;
            }
            steps.push({ type: 'traverse', node: currentNode.left, pseudoLine: 2, description: `Moving to left child ${currentNode.left.data} as ${data} is smaller.`, operation: 'insert' });
            currentNode = currentNode.left;
        } else {
            if (!currentNode.right) {
                steps.push({ type: 'insert', node: currentNode, value: data, pseudoLine: 4, description: `Inserting ${data} as right child of ${currentNode.data}.`, operation: 'insert' });
                break;
            }
            steps.push({ type: 'traverse', node: currentNode.right, pseudoLine: 4, description: `Moving to right child ${currentNode.right.data} as ${data} is larger.`, operation: 'insert' });
            currentNode = currentNode.right;
        }
    }
    return steps;
}

function buildSearchSteps(treeInstance, data) {
    const steps = [];
    let currentNode = treeInstance.root;
    if (!currentNode) {
        steps.push({ type: 'notFound', node: null, pseudoLine: 1, description: `Tree is empty, value ${data} not found.`, operation: 'search' });
        return steps;
    }
    steps.push({ type: 'traverse', node: currentNode, pseudoLine: 0, description: `Starting search for ${data} from root node ${currentNode.data}.`, operation: 'search' });
    while (currentNode) {
        if (currentNode.data === data) {
            steps.push({ type: 'found', node: currentNode, pseudoLine: 1, description: `Value ${data} found.`, operation: 'search' });
            return steps;
        }
        steps.push({ type: 'compare', node: currentNode, pseudoLine: 2, description: `Comparing ${data} with ${currentNode.data}.`, operation: 'search' });
        if (data < currentNode.data) {
            if (!currentNode.left) {
                steps.push({ type: 'notFound', node: currentNode, pseudoLine: 3, description: `No left child. Value ${data} not found.`, operation: 'search' });
                return steps;
            }
            steps.push({ type: 'traverse', node: currentNode.left, pseudoLine: 3, description: `Moving to left child ${currentNode.left.data}.`, operation: 'search' });
            currentNode = currentNode.left;
        } else {
            if (!currentNode.right) {
                steps.push({ type: 'notFound', node: currentNode, pseudoLine: 5, description: `No right child. Value ${data} not found.`, operation: 'search' });
                return steps;
            }
            steps.push({ type: 'traverse', node: currentNode.right, pseudoLine: 5, description: `Moving to right child ${currentNode.right.data}.`, operation: 'search' });
            currentNode = currentNode.right;
        }
    }
    steps.push({ type: 'notFound', node: null, pseudoLine: 5, description: `Value ${data} not found in the tree.`, operation: 'search' });
    return steps;
}

function buildDeleteSteps(treeInstance, data) {
    const steps = [];
    let currentNode = treeInstance.root;
    if (!currentNode) {
        steps.push({ type: 'notFound', node: null, pseudoLine: 0, description: `Tree is empty, cannot delete ${data}.`, operation: 'delete' });
        return steps;
    }
    let node = treeInstance.root;
    let parent = null;
    steps.push({ type: 'traverse', node, pseudoLine: 0, description: `Starting delete of ${data} from root ${node.data}.`, operation: 'delete' });
    while (node && node.data !== data) {
        steps.push({ type: 'compare', node, pseudoLine: 0, description: `Compare ${data} with ${node.data}.`, operation: 'delete' });
        parent = node;
        node = data < node.data ? node.left : node.right;
        if (node) steps.push({ type: 'traverse', node, pseudoLine: 0, description: `Move to ${node.data}.`, operation: 'delete' });
    }
    if (!node) {
        steps.push({ type: 'notFound', node: parent, pseudoLine: 0, description: `${data} not found.`, operation: 'delete' });
        return steps;
    }
    // determine case
    let delType;
    if (!node.left && !node.right) delType = 'deleteLeaf';
    else if (!node.left || !node.right) delType = 'deleteOneChild';
    else delType = 'deleteTwoChildren';
    steps.push({ type: delType, node, pseudoLine: 0, description: `Deleting ${data} (${delType.replace(/delete/, '').trim() || 'leaf'} case).`, operation: 'delete' });
    return steps;
}

function buildTraversalSteps(treeInstance, order) {
    const steps = [];
    const seq = [];
    const dfs = (n) => {
        if (!n) return;
        if (order === 'preorder') seq.push(n);
        dfs(n.left);
        if (order === 'inorder') seq.push(n);
        dfs(n.right);
        if (order === 'postorder') seq.push(n);
    };
    dfs(treeInstance.root);
    if (seq.length === 0) {
        steps.push({ type: 'notFound', node: null, description: 'Tree is empty.', operation: order });
        return steps;
    }
    seq.forEach((n, idx) => steps.push({ type: 'visit', node: n, pseudoLine: idx === 0 ? 1 : 2, description: `Visit ${n.data} (${order})`, operation: order }));
    return steps;
}

export const getTreeSteps = (operation, treeInstance, params) => {
    const data = parseInt(params.data, 10);
    switch (operation) {
        case 'insert':
            return buildInsertSteps(treeInstance, data);
        case 'search':
            return buildSearchSteps(treeInstance, data);
        case 'delete':
            return buildDeleteSteps(treeInstance, data);
        case 'inorder':
        case 'preorder':
        case 'postorder':
            return buildTraversalSteps(treeInstance, operation);
        default:
            return [{ type: 'initial', node: null, pseudoLine: 0, description: 'Initial state.' }];
    }
};