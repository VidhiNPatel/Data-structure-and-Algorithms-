console.log('script connected');
//Node class
class Node {
    constructor(data) {
        this.data = data,
        this.left = null,
        this.right = null
    }
}

//BinarySearchTree class
class BinarySearchTree {

    constructor() {
        // root of the binary search tree
        this.root = null;
    }

    // helper method which creates a new node to
    // be inserted and calls insertNode
    insert(data) {

        // Creating a node and initailising
        // with data
        var newNode = new Node(data);

        // root is null then node will
        // be added to the tree and made root.
        if (!this.root) {
            this.root = newNode;
        } else {
            // find the correct position in the
            // tree and add the node
            this.insertNode(this.root, newNode);
        }
    }

    // Method to insert a node in a tree
    // it moves over the tree to find the location
    // to insert a node with a given data
    insertNode(node, newNode) {
        // if the data is less than the node
        // data move left of the tree
        if (newNode.data < node.data) {
            // if left is null insert node here
            if (!node.left) {
                node.left = newNode;
            } else {
                // if left is not null recurr until
                // null is found
                this.insertNode(node.left, newNode);
            }
            // if the data is more than the node
            // data move right of the tree
        } else {
            // if right is null insert node here
            if (!node.right) {
                node.right = newNode;
            } else {
                // if right is not null recurr until
                // null is found
                this.insertNode(node.right, newNode);
            }
        }
    };

    // helper method that calls the
    // removeNode with a given data
    remove(data) {
        // root is re-initialized with
        // root of a modified tree.
        this.root = this.removeNode(this.root, data);
    }

    // Method to remove node with a
    // given data
    // it recurrs over the tree to find the
    // data and removes it
    removeNode(node, data) {
        // if the root is null then tree is
        // empty
        if (!node) {
            return null;

            // if data to be delete is less than
            // roots data then move to left subtree
        } else if (data < node.data) {
            node.left = this.removeNode(node.left, data);
            return node;

            // if data to be delete is greater than
            // roots data then move to right subtree
        } else if (data > node.data) {
            node.right = this.removeNode(node.right, data);
            return node;

            // if data is similar to the root's data
            // then delete this node
        } else {
            // deleting node with no children
            if (node.left === null && node.right === null) {
                node = null;
                return node;
            }
            // deleting node with one children
            if (node.left === null) {
                node.right = node
                return node;
            }
            if (node.right === null) {
                node.right = node;
                return node;
            }

            // Deleting node with two children
            // minumum node of the rigt subtree
            // is stored in twoChildernNode
            var twoChildernNode = this.findMinNode(node.right);
            node.data = twoChildernNode.data;

            node.right = this.removeNode(node.right, twoChildernNode.data);
            return node;
        }
    }

    //  finds the minimum node in tree
    // searching starts from given node
    findMinNode(node) {
        // if left of a node is null
        // then it must be minimum node
        if (node.left === null) {
            return node;
        } else {
            return this.findMinNode(node.left);
        }
    }

    // Performs inorder traversal of a tree ---> DFS
    inorder(node) {
        if (node) {
            this.inorder(node.left);
            console.log(node.data);
            this.inorder(node.right);
        }
    }

    // Performs preorder traversal of a tree ---> DFS
    preorder(node) {
        if (node) {
            console.log(node.data);
            this.preorder(node.left);
            this.preorder(node.right);
        }
    }

    // Performs postorder traversal of a tree ---> DFS
    postorder(node) {
        if (node) {
            this.postorder(node.left);
            this.postorder(node.right);
            console.log(node.data);
        }
    }

    // returns root of the tree
    getRootNode() {
        return this.root;
    }

    // return height of the tree
    treeHeight(node) {

        // if trees is empty return 0
        if (!node) {
            return 0;
        } else {

            //check length of the tree on left side
            var leftHeight = this.treeHeight(node.left);

            //check length of the tree on right side
            var rightHeight = this.treeHeight(node.right);

            //get maximum length of the tree from left or right node's lenght
            var maxHeight = Math.max(leftHeight, rightHeight) + 1;

            return maxHeight;
        }
    }

    //function to print level order traversal of tree --> BFS
    printLevelOrder(node){
        var treeHeight = this.treeHeight(node);
        for (let i = 0; i <= treeHeight; i++) {
            this.printGivenLevel(node , i);
        }
    }

    //Print nodes at the given level
    printGivenLevel(node , level) {

        if (!node) {
            return ;
        }
        if (level == 1) {
            console.log(node.data);
        } else if(level > 1) {
            this.printGivenLevel(node.left , level-1);
            this.printGivenLevel(node.right , level-1);
        }
    }

    // search for a node with given data
    search(node, data) {
        // if trees is empty return null
        if (!node) {
            return null;

            // if data is less than node's data
            // move left
        } else if (data < node.data) {
            return this.search(node.left, data);

            // if data is greater than node's data
            // move right
        } else if (data > node.data) {
            return this.search(node.right, data);

            // if data is equal to the node data
            // return node
        } else {
            return node;
        }
    }
}

// create an object for the BinarySearchTree
var BST = new BinarySearchTree();
// Inserting nodes to the BinarySearchTree
BST.insert(15);
BST.insert(25);
BST.insert(10);
BST.insert(7);
BST.insert(22);
BST.insert(17);
BST.insert(13);
BST.insert(5);
BST.insert(9);
BST.insert(27);

let root = BST.getRootNode();

console.log("inorder traversal");
BST.inorder(root);
console.log('-----------');
console.log("postorder traversal");
BST.postorder(root);
console.log('-----------');
console.log("preorder traversal");
BST.preorder(root);
console.log('-----------');
var searchNode = BST.search(root, 22);
console.log('searchNode = ', searchNode);
console.log('-----------');
var heightOfTree = BST.treeHeight(root);
console.log('heightOfTree = ', heightOfTree);
console.log('-----------');
console.log('Level order traversal of tree (BFS)');
BST.printLevelOrder(root);
console.log('-----------');
console.log("inorder traversal removing 5 element");
BST.remove(5);
console.log('-----------');