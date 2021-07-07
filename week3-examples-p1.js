/**
 * leetcode - 94 - 二叉树的中序遍历
 */
var inorderTraversal = function (root) {
    const res = [];
    const recursive = (node) => {
        if (node === null) {
            return [];
        }
        recursive(node.left);
        res.push(node.val);
        recursive(node.right);
    }
    recursive(root);
    return res;
};

/**
 * leetcode - 589 - 叉树的前序遍历
 */
// 递归法
var preorder = function (root) {
    const res = [];
    const recursive = (node) => {
        if (node === null) {
            return;
        }
        res.push(node.val);
        for (let ch of node.children) {
            recursive(ch);
        }
    }
    recursive(root);
    return res;
};

// 栈迭代法
var preorder = function (root) {
    if (root === null) {
        return [];
    }
    ans = [];
    const stack = [];
    stack.push(root);
    while (stack.length !== 0) {
        const top = stack.pop();
        ans.push(top.val);
        if (top.children) {
            for (let i = top.children.length - 1; i >= 0; i--) {
                stack.push(top.children[i]);
            }
        }
    }
    return ans;
};

/**
 * leetcode - 429 - N 叉树的层序遍历
 */
var levelOrder = function (root) {
    if (root === null) {
        return [];
    }
    const ans = [];
    const que = [];
    que.push({
        value: root.val,
        level: 0,
        children: root.children
    });
    while (que.length !== 0) {
        const item = que.shift();
        if (!ans[item.level]) {
            ans[item.level] = [];
        }
        ans[item.level].push(item.value);
        for (let i = 0; i < item.children.length; i++) {
            que.push({
                value: item.children[i].val,
                level: item.level + 1,
                children: item.children[i].children
            });
        }
    }
    return ans;
};

/**
 * leetcode - 297 - 二叉树的序列化与反序列化
 */
/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function (root) {
    const res = [];
    const recursive = (node) => {
        if (node === null) {
            res.push('null');
            return;
        }
        res.push(node.val);
        recursive(node.left);
        recursive(node.right);
    }
    recursive(root);
    return res.join(',');
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data) {
    const list = data.split(',');
    let index = 0;
    const recursive = () => {
        if (list[index] === 'null') {
            index++;
            return null;
        }
        const node = new TreeNode(Number(list[index]));
        index++;
        node.left = recursive();
        node.right = recursive();
        return node;
    }
    return recursive();
};

/**
 * leetcode - 105 - 二叉树的序列化与反序列化
 */
var buildTree = function (preorder, inorder) {
    const recursive = (preO, inO) => {
        if (preO.length === 0 && inO.length === 0) {
            return null;
        }
        // 取当前的根节点
        const root = new TreeNode(preO[0], null, null);
        // 查找根在中序的哪个位置
        let posIndex;
        for (let i = 0; i < inO.length; i++) {
            if (inO[i] === preO[0]) {
                posIndex = i;
                break;
            }
        }
        // 递归求解左右子树
        root.left = recursive(preO.slice(1, posIndex + 1), inO.slice(0, posIndex));
        root.right = recursive(preO.slice(posIndex + 1), inO.slice(posIndex + 1));
        return root;
    }
    return recursive(preorder, inorder);
};

/**
 * leetcode - 236 -  二叉树的最近公共祖先
 */
var lowestCommonAncestor = function (root, p, q) {
    if (root === null) {
        return null;
    }
    // 先记录每个节点的父节点
    const map = new Map();
    const recursive = (node) => {
        if (node.left !== null) {
            map.set(node.left.val, node);
            recursive(node.left);
        }
        if (node.right !== null) {
            map.set(node.right.val, node);
            recursive(node.right);
        }
    }
    recursive(root);
    // 把p到根节点的路径记录下来
    const set = new Set();
    let temp_P = p.val;
    while (map.has(temp_P)) {
        set.add(temp_P);
        temp_P = map.get(temp_P).val;
    }
    set.add(root.val);
    // 查找最近公共祖先
    let temp_Q = q.val;
    while (map.has(temp_Q)) {
        if (set.has(temp_Q)) {
            return new TreeNode(temp_Q);
        }
        temp_Q = map.get(temp_Q).val;
    }
    return root;
};

/**
 * leetcode - 684. - 冗余连接
 */
var findRedundantConnection = function (input) {
    // 先初始化图的数据结构，下标代表节点，值数组储存边
    const edges = [[]];
    for (let i = 1; i < input.length + 1; i++) {
        edges[i] = [];
    }
    // 向数据结构中加一条边的方法，a连向b
    const addEdge = (a, b) => {
        edges[a].push(b);
    }
    // 记录已经访问过的节点
    const visited = new Set();
    // 深度优先搜索找环的方法
    let hasLoop = false;
    const dfs = (node, source) => {
        visited.add(node);
        for (let i = 0; i < edges[node].length; i++) {
            if (edges[node][i] === source) {
                continue;
            }
            if (visited.has(edges[node][i])) {
                hasLoop = true;
                return;
            }
            dfs(edges[node][i], node);
        }
        visited.delete(node);
    }
    // 逐步的生成图的数据，每加一条边就检查一下有没有环
    for (let i = 0; i < input.length; i++) {
        const a = input[i][0];
        const b = input[i][1];
        addEdge(a, b);
        addEdge(b, a);
        dfs(a, -1);
        if (hasLoop === true) {
            return [a, b];
        }
    }
};