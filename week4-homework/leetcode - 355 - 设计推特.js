/**
 * leetcode - 355 - 设计推特
 */
// 手写一个大根堆
class BinaryHeap {
    constructor() {
        this.heap = [];
    }

    // 交换两个元素
    swap(i, j) {
        const temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    }

    // 堆是否为空
    isEmpty() {
        return this.heap.length === 0 ? true : false;
    }

    // 插入一个元素
    push(ele) {
        this.heap.push(ele);
        this.heapifyUp(this.heap.length - 1);
    }

    // 弹出堆顶元素
    pop() {
        const ans = this.heap[0];
        this.swap(0, this.heap.length - 1);
        this.heap.pop();
        this.heapifyDown(0);
        return ans;
    }

    // 向上调整
    heapifyUp(index) {
        while (index > 0) {
            const fa = Math.floor((index - 1) / 2);
            if (this.heap[fa].key < this.heap[index].key) {
                this.swap(fa, index);
                index = fa;
            } else {
                break;
            }
        }
    }

    // 向下调整
    heapifyDown(index) {
        const leftChild = index * 2 + 1;
        const rightChild = index * 2 + 2;
        let maxChild = null;
        if (leftChild < this.heap.length) {
            maxChild = leftChild;
            if (rightChild < this.heap.length && this.heap[maxChild].key < this.heap[rightChild].key) {
                maxChild = rightChild;
            }
            if (this.heap[maxChild].key > this.heap[index].key) {
                this.swap(maxChild, index);
                this.heapifyDown(maxChild);
            }
        } else {
            return;
        }
    }
}

/**
 * Initialize your data structure here.
 */
// 思路：类似于 【k个有序链表的合并】 那道题的堆解法，重点在于细节和调试
var Twitter = function () {
    // key：用户ID ，value：{该用户关注的用户ID，该用户发的推特}
    // value的结构：{ follow: [], twitter: [] }
    this.userMap = new Map();

    // 记录推特的发布时间次序
    // key：推特ID ，value：时间次序count
    this.timeCountMap = new Map();
    this.timeCount = 1;
};

// 检查userID在userMap中是否存在，避免map操作报错
Twitter.prototype.checkUserID = function (userID) {
    if (this.userMap.has(userID) === false) {
        this.userMap.set(userID, { follow: [], twitter: [] })
    }
}

/**
 * Compose a new tweet. 
 * @param {number} userId 
 * @param {number} tweetId
 * @return {void}
 */
Twitter.prototype.postTweet = function (userId, tweetId) {
    this.checkUserID(userId);
    const userData = this.userMap.get(userId);
    userData.twitter.unshift(tweetId);
    this.userMap.set(userId, userData);
    this.timeCountMap.set(tweetId, this.timeCount++);
};

/**
 * Retrieve the 10 most recent tweet ids in the user's news feed. Each item in the news feed must be posted by users who the user followed or by the user herself. Tweets must be ordered from most recent to least recent. 
 * @param {number} userId
 * @return {number[]}
 */
Twitter.prototype.getNewsFeed = function (userId) {
    // 步骤1.找到userID关注的人的列表
    this.checkUserID(userId);
    const followList = [...this.userMap.get(userId).follow];
    followList.push(userId);
    // 步骤2.将关注的每一个人的最新推特构建成一个大根堆（时间最新顺序）
    const twitterList = [];
    const heap = new BinaryHeap();
    for (let userID of followList) {
        this.checkUserID(userID);
        twitterList.push(this.userMap.get(userID).twitter);
    }
    // 这里用数组代替链表方便操作，因为js里的数组删元素的时间复杂度和链表一样都是O(1)
    for (let twitters of twitterList) {
        if (twitters.length !== 0) {
            heap.push({ key: this.timeCountMap.get(twitters[0]), twitters: [...twitters] });
        }
    }
    // 步骤3.取堆顶，得到最新的十条推特
    const res = [];
    while (heap.isEmpty() === false && res.length < 10) {
        const data = heap.pop();
        res.push(data.twitters.shift());
        if (data.twitters.length !== 0) {
            heap.push({ key: this.timeCountMap.get(data.twitters[0]), twitters: data.twitters });
        }
    }
    return res;
};

/**
 * Follower follows a followee. If the operation is invalid, it should be a no-op. 
 * @param {number} followerId 
 * @param {number} followeeId
 * @return {void}
 */
Twitter.prototype.follow = function (followerId, followeeId) {
    this.checkUserID(followerId);
    const userData = this.userMap.get(followerId);
    // 检查重复关注
    if (userData.follow.indexOf(followeeId) !== -1) {
        return;
    }
    userData.follow.push(followeeId);
    this.userMap.set(followerId, userData);
};

/**
 * Follower unfollows a followee. If the operation is invalid, it should be a no-op. 
 * @param {number} followerId 
 * @param {number} followeeId
 * @return {void}
 */
Twitter.prototype.unfollow = function (followerId, followeeId) {
    this.checkUserID(followerId);
    const userData = this.userMap.get(followerId);
    const needDel = userData.follow.indexOf(followeeId);
    // 取关的用户不存在
    if (needDel === -1) {
        return;
    }
    userData.follow.splice(needDel, 1);
    this.userMap.set(followerId, userData);
};

/**
 * Your Twitter object will be instantiated and called as such:
 * var obj = new Twitter()
 * obj.postTweet(userId,tweetId)
 * var param_2 = obj.getNewsFeed(userId)
 * obj.follow(followerId,followeeId)
 * obj.unfollow(followerId,followeeId)
 */