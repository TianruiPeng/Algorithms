/**
 * leetcode - 56 - 合并区间
 */
var merge = function (intervals) {
    // 双字段排序
    intervals.sort((a, b) => {
        if (a[0] === b[0]) {
            return a[1] - b[1]
        }
        return a[0] - b[0];
    });

    let start = intervals[0][0];
    let end = intervals[0][1];
    const res = []
    for (let i = 0; i < intervals.length; i++) {
        if (intervals[i][0] <= end) {
            end = Math.max(end, intervals[i][1]);
        } else {
            res.push([start, end]);
            start = intervals[i][0];
            end = intervals[i][1];
        }
    }
    res.push([start, end]);
    return res;
};

/**
 * leetcode - 56 - 合并区间（差分解法）
 */
var merge = function (intervals) {
    const events = [];
    // 差分思想，把开始和结束都看作事件，注意差分的结尾位置是+1的
    for (let i = 0; i < intervals.length; i++) {
        const start = [intervals[i][0], 'start'];
        const end = [intervals[i][1] + 1, 'end'];
        events.push(start);
        events.push(end);
    }
    // 收录所有事件后，按照事件位置排序，注意位置相同时，end要排在start之前
    events.sort((a, b) => {
        if (a[0] === b[0]) {
            return a[1] === 'end' ? -1 : 1;
        }
        return a[0] - b[0]
    });
    const ans = [];
    let count = 0;
    const res = [];
    // 如果是start就计数+1，是end就计数-1，当为计数为0时说明中间有断开的，利用这个特性求解
    for (let i = 0; i < events.length; i++) {
        if (events[i][1] === 'start') {
            if (count === 0) {
                res[0] = events[i][0];
            }
            count++;
        } else if (events[i][1] === 'end') {
            count--;
            if (count === 0) {
                res[1] = events[i][0] - 1;
                ans.push([res[0], res[1]]);
            }
        }
    }
    return ans;
};

/**
 * leetcode - 215 - 数组中的第K个最大元素（快排解法）
 */
var findKthLargest = function (nums, k) {
    // 快排做法（时间复杂度：n）
    const partition = (l, r) => {
        const midValue = nums[l + Math.floor(Math.random() * (r - l + 1))];
        while (l <= r) {
            while (nums[l] < midValue) l++;
            while (nums[r] > midValue) r--;
            if (l === r) break;
            if (l < r) {
                const temp = nums[l];
                nums[l] = nums[r];
                nums[r] = temp;
                l++;
                r--;
            }
        }
        return r;
    }

    let ans = null;
    const quickSort = (l, r) => {
        if (l >= r) {
            ans = nums[l];
            return;
        }
        const mid = partition(l, r);
        // 第k个最大元素，等于排序后第 length-k+1 个元素
        if (mid < nums.length - k) {
            quickSort(mid + 1, r);
        } else {
            quickSort(l, mid);
        }
    }
    quickSort(0, nums.length - 1);
    return ans;
};

/**
 * leetcode - 215 - 数组中的第K个最大元素（堆解法：n + k * log n）
 */
//  自建大根堆
class BinaryTree {
    constructor() {
        this.heap = [];
    }

    // 交换
    swap(i, j) {
        const temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    }

    // 插入元素
    add(value) {
        this.heap.push(value);
        this.heapifyUp(this.heap.length - 1);
    }

    // 弹出堆顶
    pop() {
        const ans = this.heap[0];
        this.swap(0, this.heap.length - 1);
        this.heap.pop();
        this.heapifyDown(0);
        return ans;
    }

    // 向下调整
    heapifyDown(index) {
        let leftChild = index * 2 + 1;
        let rightChild = index * 2 + 2;
        let maxChild = null;
        if (leftChild < this.heap.length) {
            maxChild = leftChild;
            if (rightChild < this.heap.length && this.heap[maxChild] < this.heap[rightChild]) {
                maxChild = rightChild;
            }
            if (this.heap[maxChild] > this.heap[index]) {
                this.swap(maxChild, index);
                this.heapifyDown(maxChild);
            }
        }
    }

    // 向上调整
    heapifyUp(index) {
        while (index !== 0) {
            const fa = Math.floor((index - 1) / 2);
            if (this.heap[fa] < this.heap[index]) {
                this.swap(fa, index);
                index = fa;
            } else {
                break;
            }
        }
    }
}
var findKthLargest = function (nums, k) {
    const heap = new BinaryTree();
    for (let item of nums) {
        heap.add(item);
    }
    let ans = -1;
    for (let i = 0; i < k; i++) {
        ans = heap.pop();
    }
    return ans;
};

/**
 * acwing - 104 - 货仓选址
 */
const question = (n, arr) => {
    arr.sort();
    const mid = arr[Math.floor(n / 2)];
    let count = 0;
    for (let i = 0; i < n; i++) {
        if (arr[i] >= mid) {
            count += arr[i] - mid;
        } else {
            count += mid - arr[i];
        }
    }
    return count;
}
console.log(question(4, [6, 2, 9, 1]));

/**
 * leetcode - 493 - 翻转对
 */
var reversePairs = function (nums) {
    const merge = (left, right) => {
        const temp = [];
        let i = 0;
        let j = 0;
        while (left.length > i && right.length > j) {
            if (left[i] <= right[j]) {
                temp.push(left[i]);
                i++;
            } else {
                temp.push(right[j]);
                j++
            }
        }
        while (left.length > i) {
            temp.push(left[i]);
            i++;
        }
        while (right.length > j) {
            temp.push(right[j]);
            j++;
        }
        return temp;
    }

    let count = 0;
    const calc = (left, right) => {
        for (let i = 0; i < left.length; i++) {
            let j = 0;
            while (j < right.length && left[i] > 2 * right[j]) j++;
            count += j;
        }
    }

    const mergeSort = (nums) => {
        if (nums.length <= 1) {
            return nums;
        }
        const mid = Math.floor(nums.length / 2);
        const left = nums.slice(0, mid);
        const right = nums.slice(mid);
        const tempL = mergeSort(left);
        const tempR = mergeSort(right);
        calc(tempL, tempR);
        return merge(tempL, tempR);
    }
    mergeSort(nums);
    return count;
};

/**
 * leetcode - 493 - 翻转对
 */