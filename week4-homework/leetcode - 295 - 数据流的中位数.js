/**
 * leetcode - 295 - 数据流的中位数
 */
// 自建堆
class BinaryHeap {
    constructor(type) {
        // type 指定是大根堆还是小根堆。值为'max'或者'min'
        this.type = type;
        this.heap = [];
    }


    warp(i, j) {
        const temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    }

    getTop() {
        if (this.isEmpy() === true) {
            return false;
        }
        return this.heap[0];
    }

    isEmpy() {
        return this.heap.length === 0 ? true : false;
    }

    pop() {
        if (this.isEmpy() === true) {
            return false;
        }
        const ans = this.heap[0];
        this.warp(0, this.heap.length - 1);
        this.heap.pop();
        this.heapifyDown(0);
        return ans;
    }

    push(value) {
        this.heap.push(value);
        this.heapifyUp(this.heap.length - 1);
    }

    heapifyUp(index) {
        while (index > 0) {
            const fa = Math.floor((index - 1) / 2)
            if (this.type === 'max' && this.heap[fa] < this.heap[index]
                || this.type === 'min' && this.heap[fa] > this.heap[index]) {
                this.warp(fa, index);
                index = fa;
            } else {
                break;
            }
        }
    }

    heapifyDown(index) {
        const leftChild = index * 2 + 1;
        const rightChild = index * 2 + 2;
        let sChild = null;
        if (leftChild < this.heap.length) {
            sChild = leftChild;
            if (rightChild < this.heap.length) {
                if (this.type === 'max' && this.heap[sChild] < this.heap[rightChild]
                    || this.type === 'min' && this.heap[sChild] > this.heap[rightChild]) {
                    sChild = rightChild;
                }
            }
            if (this.type === 'max' && this.heap[sChild] > this.heap[index]
                || this.type === 'min' && this.heap[sChild] < this.heap[index]) {
                this.warp(sChild, index);
                this.heapifyDown(sChild);
            }
        } else {
            return;
        }
    }
}

/**
 * initialize your data structure here.
 */
// 思路：用两个堆分别维护 中位数左边的部分 和 中位数右边的部分，但在add的过程中要保证两个堆的元素个数平衡
var MedianFinder = function () {
    // 大根堆，小于中位数的部分
    this.lowPart = new BinaryHeap('max');
    // 小根堆，大于中位数的部分
    this.highPart = new BinaryHeap('min');
    // 当前 highPart 的元素个数
    this.highPartCount = 0;
    // 当前元素总个数
    this.length = 0;
};

/** 
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function (num) {
    const lowPartTop = this.lowPart.getTop() || Infinity;
    const highPartTop = this.highPart.getTop() || -Infinity;
    if (num > highPartTop) {
        this.highPart.push(num);
        this.highPartCount++;
    } else {
        this.lowPart.push(num);
    }
    this.length++;
    // 如何保证两个堆元素平衡
    if (this.length % 2 === 0) {
        // 当元素总个数为偶数
        if (this.highPartCount > this.length / 2) {
            // 应该向 lowpart 移动一个值
            this.lowPart.push(this.highPart.pop());
            this.highPartCount--;
        } else if (this.highPartCount < this.length / 2) {
            // 应该向 highPart 移动一个值
            this.highPart.push(this.lowPart.pop());
            this.highPartCount++;
        }
    } else {
        // 当元素总个数为奇数
        if (this.highPartCount > Math.floor(this.length / 2) + 1) {
            // 应该向 lowpart 移动一个值
            this.lowPart.push(this.highPart.pop());
            this.highPartCount--;
        } else if (this.highPartCount < Math.floor(this.length / 2) + 1) {
            // 应该向 highPart 移动一个值
            this.highPart.push(this.lowPart.pop());
            this.highPartCount++;
        }
    }

};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function () {
    // 判断空边界
    if (this.length === 0) {
        return null;
    }
    const lowPartTop = this.lowPart.getTop() || null;
    const highPartTop = this.highPart.getTop() || null;
    // 判断只有一个元素时的边界
    if (this.length === 1) {
        return lowPartTop === null ? highPartTop : lowPartTop;
    }
    if (this.length % 2 === 0) {
        // 当元素总个数为偶数
        return (lowPartTop + highPartTop) / 2
    } else {
        // 当元素总个数为奇数
        return highPartTop;
    }
};

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */