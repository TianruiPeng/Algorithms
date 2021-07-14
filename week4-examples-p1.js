/**
 * leetcode - 433 - 最小基因变化
 */
var minMutation = function (start, end, bank) {
    const char = ['A', 'C', 'G', 'T'];
    const bankSet = new Set();
    for (let i = 0; i < bank.length; i++) {
        bankSet.add(bank[i]);
    }

    const visited = new Set();
    const queue = [];
    queue.push({ val: start, lev: 0 });
    visited.add(start);
    while (queue.length !== 0) {
        const top = queue.shift();
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < char.length; j++) {
                let temp = top.val;
                if (temp[i] === char[j]) {
                    continue;
                }
                temp = temp.split('');
                temp[i] = char[j];
                temp = temp.join('');
                if (visited.has(temp) || !bankSet.has(temp)) {
                    continue;
                }
                if (temp === end) {
                    return top.lev + 1;
                }
                queue.push({ val: temp, lev: top.lev + 1 });
                visited.add(temp);
            }
        }
    }
    return -1;
};

/**
 * leetcode - 329 - 矩阵中的最长递增路径
 */
var longestIncreasingPath = function (matrix) {
    const row = matrix.length;
    const col = matrix[0].length;
    const drx = [0, 0, 1, -1];
    const dry = [1, -1, 0, 0];
    const answer = [];
    for (let i = 0; i < row; i++) {
        answer[i] = [];
        for (let j = 0; j < col; j++) {
            answer[i][j] = false;
        }
    }
    let count = 0;

    // 子问题：从xy出发，return最长能走多远
    const dfs = (x, y) => {
        if (answer[x][y] !== false) {
            return answer[x][y];
        }
        answer[x][y] = 1;
        for (let i = 0; i < 4; i++) {
            const tempx = x + drx[i];
            const tempy = y + dry[i];
            if (tempx < 0 || tempx >= row || tempy < 0 || tempy >= col) {
                continue;
            }
            if (matrix[tempx][tempy] > matrix[x][y]) {
                answer[x][y] = Math.max(answer[x][y], dfs(tempx, tempy) + 1);
            }
        }
        return answer[x][y];
    }

    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            count = Math.max(count, dfs(i, j))
        }
    }
    return count;
};

/**
 * leetcode - 23 - 合并K个升序链表（堆解法）
 */
class BinaryHeap {
    constructor() {
        // 用0基的数组表示堆
        this.heap = [];
    }

    // 交换两个元素
    swap(i, j) {
        const temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    }

    // 返回是否为空
    isEmpty() {
        return this.heap.length === 0 ? true : false;
    }

    // 插入一个元素
    push(value) {
        this.heap.push(value);
        let p = this.heap.length - 1;
        this.heapifyUp(p);
    }

    // 取出堆顶元素
    pop() {
        if (this.heap.length === 0) {
            return null;
        }
        const ans = this.heap[0];
        // 堆顶和最后一个元素交换，且删除最后一个元素
        this.swap(0, this.heap.length - 1);
        this.heap.pop();
        this.heapifyDown(0);
        return ans;
    }

    // 向上调整
    heapifyUp(p) {
        while (p > 0) {
            const fa = Math.floor((p - 1) / 2);
            if (this.heap[p].key < this.heap[fa].key) {
                this.swap(p, fa);
                p = fa;
            } else {
                break;
            }
        }
    }

    // 向下调整
    heapifyDown(p) {
        const leftChild = p * 2 + 1;
        const rightChild = p * 2 + 2;
        // minChlid是左右子孩子中最小的孩子
        let minChlid = -1;
        if (leftChild < this.heap.length) {
            minChlid = leftChild;
        }
        if (rightChild < this.heap.length) {
            if (minChlid === -1 || this.heap[minChlid].key > this.heap[rightChild].key) {
                minChlid = rightChild;
            }
        }
        // 父亲和最小孩子交换
        if (minChlid !== -1 && this.heap[p].key > this.heap[minChlid].key) {
            this.swap(minChlid, p);
            this.heapifyDown(minChlid);
        } else {
            return;
        }
    }
}

/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
    const heap = new BinaryHeap();
    for (let i = 0; i < lists.length; i++) {
        if (lists[i] === null) {
            continue;
        }
        heap.push({ key: lists[i].val, linked: lists[i] });
    }
    const protectNode = new ListNode(null);
    let point = protectNode;
    while (heap.isEmpty() === false) {
        const min = heap.pop();
        point.next = new ListNode(min.key);
        point = point.next;
        min.linked = min.linked.next;
        if (min.linked === null) {
            continue;
        }
        min.key = min.linked.val;
        heap.push(min);
    }
    return protectNode.next;
};