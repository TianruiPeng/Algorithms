/** 
 * leetcode - 66 - 加一        
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {
    if (digits[0] === 0) {
        return [1];
    }
    if (digits[digits.length - 1] + 1 <= 9) {
        digits[digits.length - 1] += 1;
        return digits;
    }
    for (let i = digits.length - 1; i >= 0; i--) {
        if (digits[i] + 1 === 10) {
            digits[i] = 0;
            if (i === 0) {
                digits.unshift(1);
                break;
            }
            continue;
        } else {
            digits[i] += 1;
            break;
        }
    }
    return digits;
};

/** 
 * leetcode - 21 - 合并两个有序链表
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function (l1, l2) {
    const perHead = new ListNode(null, null);
    let current = perHead;
    while (l1 !== null && l2 !== null) {
        if (l1.val > l2.val) {
            current.next = l2;
            l2 = l2.next;
        } else {
            current.next = l1;
            l1 = l1.next;
        }
        current = current.next;
    }
    if (l1 !== null) {
        current.next = l1;
    } else if (l2 !== null) {
        current.next = l2;
    }
    return perHead.next;
};

/** 
 * leetcode - 641 - 设计循环双端队列
 */
/**
 * Initialize your data structure here. Set the size of the deque to be k.
 * @param {number} k
 */
var MyCircularDeque = function (k) {
    this.maxLimit = k;
    this.que = [];
};

/**
 * Adds an item at the front of Deque. Return true if the operation is successful. 
 * @param {number} value
 * @return {boolean}
 */
MyCircularDeque.prototype.insertFront = function (value) {
    if (this.isFull() === false) {
        this.que.unshift(value);
        return true;
    } else {
        return false;
    }
};

/**
 * Adds an item at the rear of Deque. Return true if the operation is successful. 
 * @param {number} value
 * @return {boolean}
 */
MyCircularDeque.prototype.insertLast = function (value) {
    if (this.isFull() === false) {
        this.que.push(value);
        return true;
    } else {
        return false;
    }
};

/**
 * Deletes an item from the front of Deque. Return true if the operation is successful.
 * @return {boolean}
 */
MyCircularDeque.prototype.deleteFront = function () {
    if (this.isEmpty() === false) {
        this.que.shift();
        return true;
    } else {
        return false;
    }
};

/**
 * Deletes an item from the rear of Deque. Return true if the operation is successful.
 * @return {boolean}
 */
MyCircularDeque.prototype.deleteLast = function () {
    if (this.isEmpty() === false) {
        this.que.pop();
        return true;
    } else {
        return false;
    }
};

/**
 * Get the front item from the deque.
 * @return {number}
 */
MyCircularDeque.prototype.getFront = function () {
    return this.isEmpty() === false ? this.que[0] : -1;
};

/**
 * Get the last item from the deque.
 * @return {number}
 */
MyCircularDeque.prototype.getRear = function () {
    return this.isEmpty() === false ? this.que[this.que.length - 1] : -1;
};

/**
 * Checks whether the circular deque is empty or not.
 * @return {boolean}
 */
MyCircularDeque.prototype.isEmpty = function () {
    return this.que.length === 0 ? true : false;
};

/**
 * Checks whether the circular deque is full or not.
 * @return {boolean}
 */
MyCircularDeque.prototype.isFull = function () {
    return this.que.length === this.maxLimit ? true : false;
};

/** 
 * leetcode - 560 - 和为K的子数组
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
    nums.unshift(0);
    const sumArray = [0];
    for (let i = 1; i < nums.length; i++) {
        sumArray[i] = sumArray[i - 1] + nums[i];
    }
    const countMap = {};
    let ans = 0;
    for (let i = 0; i < sumArray.length; i++) {
        countMap[sumArray[i]] = (countMap[sumArray[i]] || 0) + 1;
        ans += countMap[sumArray[i + 1] - k] || 0;
    }
    return ans;
};