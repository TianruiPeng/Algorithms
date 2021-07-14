/**
 * leetcode - 239 - 滑动窗口最大值（自写堆，可弹出堆中任意元素的解法，较慢）
 */
class BinaryHeap {
    constructor() {
        this.heap = [];
    }

    swrp(i, j) {
        const temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    }

    top() {
        return this.heap[0];
    }

    push(value) {
        this.heap.push(value);
        this.heapifyUp(this.heap.length - 1);
    }

    pop() {
        const ans = this.heap[0];
        this.swrp(0, this.heap.length - 1);
        this.heap.pop();
        this.heapifyDown(0);
        return ans;
    }

    select(targetKey) {
        for (let i = 0; i < this.heap.length; i++) {
            if (targetKey === this.heap[i].key) {
                const ans = this.heap[i];
                this.swrp(i, this.heap.length - 1);
                this.heap.pop();
                this.heapifyDown(i);
                this.heapifyUp(i);
                return ans;
            }
        }
    }

    heapifyUp(index) {
        if (index >= this.heap.length) {
            return;
        }
        while (index > 0) {
            const fa = Math.floor((index - 1) / 2);
            if (this.heap[fa].key < this.heap[index].key) {
                this.swrp(fa, index);
                index = fa;
            } else {
                break;
            }
        }
    }

    heapifyDown(index) {
        const leftChild = index * 2 + 1;
        const rightChild = index * 2 + 2;
        let maxChild = null;
        if (leftChild < this.heap.length) {
            maxChild = leftChild;
            if (rightChild < this.heap.length) {
                if (this.heap[maxChild].key < this.heap[rightChild].key) {
                    maxChild = rightChild;
                }
            }
            if (this.heap[index].key < this.heap[maxChild].key) {
                this.swrp(index, maxChild);
                this.heapifyDown(maxChild);
            }
        }
    }
}
var maxSlidingWindow = function (nums, k) {
    const heap = new BinaryHeap();
    const ans = [];
    for (let i = 0; i < k; i++) {
        heap.push({ key: nums[i] });
    }
    ans.push(heap.top().key);
    for (let i = k; i < nums.length; i++) {
        heap.push({ key: nums[i] });
        const needDel = i - k;
        heap.select(nums[needDel]);
        ans.push(heap.top().key);
    }
    return ans;
};

/**
 * leetcode - 239 - 滑动窗口最大值（自写堆，懒惰删除解法，较快）
 */
class BinaryHeap {
    constructor() {
        this.heap = [];
    }

    swrp(i, j) {
        const temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    }

    top() {
        return this.heap[0];
    }

    push(value) {
        this.heap.push(value);
        this.heapifyUp(this.heap.length - 1);
    }

    pop() {
        const ans = this.heap[0];
        this.swrp(0, this.heap.length - 1);
        this.heap.pop();
        this.heapifyDown(0);
        return ans;
    }

    heapifyUp(index) {
        if (index >= this.heap.length) {
            return;
        }
        while (index > 0) {
            const fa = Math.floor((index - 1) / 2);
            if (this.heap[fa].key < this.heap[index].key) {
                this.swrp(fa, index);
                index = fa;
            } else {
                break;
            }
        }
    }

    heapifyDown(index) {
        const leftChild = index * 2 + 1;
        const rightChild = index * 2 + 2;
        let maxChild = null;
        if (leftChild < this.heap.length) {
            maxChild = leftChild;
            if (rightChild < this.heap.length) {
                if (this.heap[maxChild].key < this.heap[rightChild].key) {
                    maxChild = rightChild;
                }
            }
            if (this.heap[index].key < this.heap[maxChild].key) {
                this.swrp(index, maxChild);
                this.heapifyDown(maxChild);
            }
        }
    }
}
var maxSlidingWindow = function (nums, k) {
    const heap = new BinaryHeap();
    const ans = [];
    for (let i = 0; i < k; i++) {
        heap.push({ key: nums[i], index: i });
    }
    ans.push(heap.top().key);
    for (let i = k; i < nums.length; i++) {
        heap.push({ key: nums[i], index: i });
        let heapTop = heap.top();
        const oldIndex = i - k;
        while (heapTop.index <= oldIndex) {
            heap.pop();
            heapTop = heap.top();
        }
        ans.push(heap.top().key);
    }
    return ans;
};

/**
 * leetcode - 701 - 二叉搜索树中的插入操作
 */
var insertIntoBST = function (root, val) {
    if (root === null) {
        return new TreeNode(val);
    }
    if (root.val < val) {
        root.right = insertIntoBST(root.right, val);
    } else {
        root.left = insertIntoBST(root.left, val);
    }
    return root;
};

/**
 * leetcode - 面试题 04.06 - 后继者
 */
var inorderSuccessor = function (root, p) {
    // 后继：第一个大于p节点的数
    let record = null;
    let ans = null;
    // 找到p的位置
    const recursive = (node, target) => {
        if (node.val === target) {
            let temp = node.right;
            if (temp === null) {
                ans = record;
            } else {
                while (temp.left !== null) {
                    temp = temp.left;
                }
                ans = temp;
            }
            return;
        }
        if (record === null && node.val > target) {
            record = node;
        }
        if (node.val > target && node.val < record.val) {
            record = node;
        }
        if (node.val < target) {
            recursive(node.right, target);
        } else {
            recursive(node.left, target);
        }
    }
    recursive(root, p.val);
    return ans;
};

/**
 * leetcode - 450 - 删除二叉搜索树中的节点
 */
var deleteNode = function (root, key) {
    // 先找到key的位置
    const recursive = (node, key) => {
        if (node === null) {
            return null;
        }
        if (node.val === key) {
            const keyNode = node;
            // 如果只有左子树
            if (keyNode.right === null && keyNode.left !== null) {
                return keyNode.left;
            }
            // 如果只有右子树
            else if (keyNode.right !== null && keyNode.left === null) {
                return keyNode.right;
            }
            // 如果没有孩子
            else if (keyNode.right === null && keyNode.left === null) {
                return null;
            }
            // 如果有两个孩子，找到其后继删除掉，并与key交换
            else {
                let next = keyNode.right;
                while (next.left !== null) {
                    next = next.left;
                }
                deleteNode(keyNode, next.val);
                keyNode.val = next.val;
                return keyNode;
            }
        }
        if (node.val < key) {
            node.right = recursive(node.right, key)
        } else {
            node.left = recursive(node.left, key)
        }
        return node;
    }
    return recursive(root, key);
};

/**
 * leetcode - 704 - 二分查找
 */
var search = function (nums, target) {
    // 1.条件：查找第一个>= target 的数
    // 2.范围：right = mid;
    // 3.+1？：false
    // 4.初始边界：0~N
    let left = 0;
    let right = nums.length;
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] >= target) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    return nums[left] === target ? left : -1;
};

/**
 * leetcode - 34 - 在排序数组中查找元素的第一个和最后一个位置
 */
var searchRange = function (nums, target) {
    // 思路：分解成两个问题
    const n = nums.length - 1;
    // 找第一个 >= target 的值
    const part1 = (nums, target) => {
        let left = 0;
        let right = n + 1;
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (nums[mid] >= target) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        return left;
    }
    // 找最后一个 <= target 的值
    const part2 = (nums, target) => {
        let left = -1;
        let right = n;
        while (left < right) {
            const mid = Math.floor((left + right) / 2) + 1;
            if (nums[mid] <= target) {
                left = mid;
            } else {
                right = mid - 1;
            }
        }
        return left;
    }

    let start = part1(nums, target);
    start = nums[start] === target ? start : -1;
    let end = part2(nums, target);
    end = nums[end] === target ? end : -1;
    return [start, end];
};

/**
 * leetcode - 69 - x 的平方根
 */
var mySqrt = function (x) {
    // 思路：用二分法,找最大的m^2 <= x
    let left = 0;
    let right = x;
    while (left < right) {
        const mid = Math.floor((left + right) / 2) + 1;
        if (mid * mid <= x) {
            left = mid;
        } else {
            right = mid - 1;
        }
    }
    return left;
};

/**
 * leetcode - 153 - 寻找旋转排序数组中的最小值
 */
var findMin = function (nums) {
    // 转换二分的思维，即 第一个<=数组末尾的数
    // 满足二分的单调序列，因为单调是对于条件的满足或不满足而言的
    let left = 0;
    let right = nums.length - 1;
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] <= nums[right]) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    return nums[left];
};