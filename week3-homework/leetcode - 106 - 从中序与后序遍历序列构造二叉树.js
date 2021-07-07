/**
 * leetcode - 106 - 从中序与后序遍历序列构造二叉树
 */
var buildTree = function (inorder, postorder) {
    const recursive = (inO, postO) => {
        if (inO.length === 0 || postO.length === 0) {
            return null;
        }
        // 后序遍历序列的最后一个元素就是根
        const root = new TreeNode(postO[postO.length - 1]);
        // 找根在中序遍历序列的位置，左边是left，右边是right
        let index = -1;
        for (let i = 0; i < inO.length; i++) {
            if (inO[i] === root.val) {
                index = i;
            }
        }
        root.left = recursive(inO.slice(0, index), postO.slice(0, index));
        root.right = recursive(inO.slice(index + 1), postO.slice(index, postO.length - 1));
        return root;
    }
    return recursive(inorder, postorder);
};