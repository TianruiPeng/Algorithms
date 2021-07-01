/**
 * leetcode - 78 - 子集
 */
var subsets = function (nums) {
    const ans = [];
    let set = [];
    // 很多问题转递归思想需要一个判断分支，这里是判断一个数要还是不要
    const recursive = (index) => {
        if (index === nums.length) {
            ans.push([...set]);
            return;
        }
        // “递”的阶段往set里面记录答案
        // 这个index的数不要时
        recursive(index + 1);
        // 这个index的数要时
        set.push(nums[index]);
        recursive(index + 1);
        // “归”的阶段清空现场
        // 这里要pop不能=[]，原因可以这样理解，在递归树上看，当递到叶节点得出一个答案后，归是回到父节点而不是回到跟节点，所以每次归是pop操作。
        set.pop();
    }
    // 需要手动触发递归函数
    recursive(0);
    return ans;
};

/**
 * leetcode - 77 - 组合
 */
var combine = function (n, k) {
    // 组合是子集题的一个特例,在子集的基础上剪枝
    const ans = [];
    let set = [];
    // 递归函数
    const recursive = (curNum) => {
        // 剪枝
        if (set.length > k || set.length + (n - curNum + 1) < k) {
            return;
        }
        if (curNum > n) {
            ans.push([...set]);
            return;
        }
        // 不要
        recursive(curNum + 1);
        // 要
        set.push(curNum);
        recursive(curNum + 1);
        // 清理 
        set.pop();
    }
    recursive(1);
    return ans;
};

/**
 * leetcode - 46 - 全排列
 */
var permute = function (nums) {
    // 用递归，思路是每个index位置放什么数
    const ans = [];
    const set = [];
    const used = [];
    for (let i = 0; i < nums.length; i++) {
        used[i] = false;
    }
    // 递归控制每个位置
    const recursive = (index) => {
        if (index >= nums.length) {
            ans.push([...set]);
            return;
        }
        for (let i = 0; i < nums.length; i++) {
            if (used[i] === false) {
                set.push(nums[i]);
                used[i] = true;
                recursive(index + 1);
                // 清理现场
                set.pop();
                used[i] = false;
            }
        }

    }
    recursive(0);
    return ans;
};

/**
 * leetcode - 226 - 翻转二叉树
 */
var invertTree = function (root) {
    const recursive = (node) => {
        if (node === null) {
            return;
        }
        const temp = node.left;
        node.left = node.right;
        node.right = temp;
        invertTree(node.left);
        invertTree(node.right);
    }
    recursive(root);
    return root;
};

/**
 * leetcode - 98 - 验证二叉搜索树
 */
var isValidBST = function (root) {
    // 递归做三件事
    // 1.计算当前子树的最大值
    // 2.计算当前子树的最小值
    // 3.判断当前子树是不是二叉搜索树
    const recursive = (node) => {
        if (node === null) {
            return {
                min: Infinity,
                max: -Infinity,
                isVaild: true
            }
        }
        const lInfo = recursive(node.left);
        const rInfo = recursive(node.right);
        const cInfo = {
            min: null,
            max: null,
            isVaild: null
        }
        // 判断当前子树是不是二叉搜索树
        if (node.val > lInfo.max && node.val < rInfo.min && lInfo.isVaild === true && rInfo.isVaild === true) {
            cInfo.isVaild = true;
        } else {
            cInfo.isVaild = false;
        }
        // 计算最大最小值
        cInfo.min = Math.min(Math.min(lInfo.min, rInfo.min), node.val);
        cInfo.max = Math.max(Math.max(lInfo.max, rInfo.max), node.val);
        return cInfo;
    }
    return recursive(root).isVaild;
};

/**
 * leetcode - 104 - 二叉树的最大深度
 */
var maxDepth = function (root) {
    const recursive = (node) => {
        if (node === null) {
            return 0;
        }
        const leftCount = recursive(node.left);
        const rightCount = recursive(node.right);
        return Math.max(leftCount, rightCount) + 1;
    }
    return recursive(root);
};

/**
 * leetcode - 111 - 二叉树的最小深度
 */
// 解法1，“归”时操作，无全局变量
var minDepth = function (root) {
    const recursive = (node) => {
        if (node === null) {
            return 0;
        }
        const lCount = recursive(node.left);
        const rCount = recursive(node.right);
        if (lCount === 0 && rCount !== 0) {
            return rCount + 1;
        } else if (rCount === 0 && lCount !== 0) {
            return lCount + 1;
        } else {
            return Math.min(lCount, rCount) + 1;
        }
    }
    return recursive(root);
};
// 解法2，“递”时操作，有全局变量
var minDepth = function (root) {
    let ans = Infinity;
    let dep = 0;
    const recursive = (node) => {
        if (node === null) {
            return;
        }
        if (node.left === null && node.right === null) {
            ans = Math.min(ans, dep + 1);
            return;
        }
        dep++;
        recursive(node.left);
        recursive(node.right);
        dep--;
    }
    recursive(root);
    return ans === Infinity ? 0 : ans;
};

/**
 * leetcode - 50 - Pow(x, n)
 */
var myPow = function (x, n) {
    // 处理负数
    if (n < 0) {
        return 1 / myPow(x, -n)
    }
    if (n === 0) {
        return 1;
    }
    // 当n为基数或者偶数的时候，解题公式，记住即可
    const temp = myPow(x, Math.floor(n / 2));
    if (n % 2 === 1) {
        return temp * temp * x
    } else if (n % 2 === 0) {
        return temp * temp
    }
};

/**
 * leetcode - 22 - 括号生成
 */
/**
 * 理解版本
 */
var generateParenthesis = function (n) {
    if (n <= 0) {
        return [''];
    }
    const res = [];
    // 分治的分段方式是:(a)和b
    // 其中定义(a)的括号对数为k,则a的对数为k-1,b的对数为n-k
    // 举例a的所有情况
    for (let k = 1; k <= n; k++) {
        const resA = generateParenthesis(k - 1);
        const resB = generateParenthesis(n - k);
        for (let a of resA) {
            for (let b of resB) {
                res.push(`(${a})${b}`);
            }
        }
    }
    return res;
};

/**
 * 利用记忆化优化的版本
 */
//  把结果都记录下来,避免重复求解答案
const map = new Map();
var generateParenthesis = function (n) {
    if (n <= 0) {
        return [''];
    }
    const res = [];
    // 分治的分段方式是:(a)和b
    // 其中定义(a)的括号对数为k,则a的对数为k-1,b的对数为n-k
    // 举例a可能会有的对数的所有情况,从0对到n对
    for (let k = 1; k <= n; k++) {
        let resA;
        let resB;
        if (map.has(k - 1)) {
            resA = map.get(k - 1);
        } else {
            resA = generateParenthesis(k - 1);
            map.set(k - 1, resA)
        }
        if (map.has(n - k)) {
            resB = map.get(n - k);
        } else {
            resB = generateParenthesis(n - k);
            map.set(n - k, resB)
        }
        for (let a of resA) {
            for (let b of resB) {
                res.push(`(${a})${b}`);
            }
        }
    }
    return res;
};

/**
 * leetcode - 47 - 全排列 II
 */
var permuteUnique = function (nums) {
    nums = nums.sort((a, b) => a - b);
    const ans = [];
    const set = [];
    const used = [];
    const recursion = (index) => {
        if (index >= nums.length) {
            ans.push([...set]);
            return;
        }
        for (let i = 0; i < nums.length; i++) {
            if (used[i] || i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) {
                continue;
            }
            set.push(nums[i]);
            used[i] = true;
            recursion(index + 1);
            set.pop();
            used[i] = false;
        }
    }
    recursion(0);
    return ans;
};