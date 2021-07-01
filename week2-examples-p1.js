/**
 * leetcode - 15 - 三数之和（map解法）
 */
var threeSum = function (nums) {
    // 两数之和解题
    const twoSum = (nums, target, start) => {
        const map = new Map();
        const set = new Set();
        const ans = [];
        for (let i = start; i < nums.length; i++) {
            if (set.has(target - nums[i])) {
                ans.push(String([target - nums[i], nums[i], -target].sort((a, b) => a - b)));
            } else {
                set.add(nums[i]);
            }
        }
        return ans;
    }
    // 三数之和求解
    const set = new Set();
    let res = [];
    for (let i = 0; i < nums.length; i++) {
        const t = twoSum(nums, 0 - nums[i], i + 1);
        if (t.length !== 0) {
            for (let item of t) {
                set.add(item);
            }
        }
    }
    set.forEach(item => res.push(item.split(',').map(num => Number(num))))
    return res;
};

/**
 * leetcode - 874 - 模拟行走机器人
 */
var robotSim = function (commands, obstacles) {
    const obstaclesMap = new Map();
    for (let item of obstacles) {
        obstaclesMap.set(JSON.stringify(item), true);
    }
    let ans = 0;
    let x = 0;
    let y = 0;
    let dx = [0, 1, 0, -1];
    let dy = [1, 0, -1, 0];
    let dir = 0;
    for (let cmd of commands) {
        if (cmd > 0) {
            let steps = cmd;
            while (steps > 0) {
                let nextX = x + dx[dir];
                let mextY = y + dy[dir];
                if (obstaclesMap.has(JSON.stringify([nextX, mextY]))) {
                    break;
                }
                x = nextX;
                y = mextY;
                steps--;
            }
        } else if (cmd === -1) {
            dir = (dir + 1) % 4;
        } else if (cmd === -2) {
            dir = (dir - 1 + 4) % 4;
        }
        ans = Math.max(ans, Math.pow(x, 2) + Math.pow(y, 2));
    }
    return ans;
};

/**
 * leetcode - 49 - 字母异位词分组
 */
var groupAnagrams = function (strs) {
    const map = new Map();
    for (let str of strs) {
        let strCopy = str;
        strCopy = strCopy.split('').sort((a, b) => a.localeCompare(b)).join('');
        if (map.has(strCopy)) {
            map.get(strCopy).push(str);
        } else {
            map.set(strCopy, [str]);
        }
    }
    res = [];
    for (let item of map.values()) {
        res.push(item)
    }
    return res;
};

/**
 * leetcode - 30 - 字母异位词分组（可优化）
 */
var findSubstring = function (s, words) {
    const ans = [];
    // 比较两个map是否完全一致
    const diffMap = (mapA, mapB) => {
        if (mapA.size === mapB.size) {
            for (let item of mapA.keys()) {
                if (mapA.get(item) !== mapB.get(item)) {
                    return false;
                }
            }
        } else {
            return false;
        }
        return true;
    }
    // m个字母为一组的单词
    const m = words[0].length;
    // 先计算words的map
    const wordsMap = new Map();
    for (word of words) {
        if (wordsMap.has(word)) {
            wordsMap.set(word, wordsMap.get(word) + 1);
        } else {
            wordsMap.set(word, 1);
        }
    }
    // 遍历s，计算s的map
    const charNum = words.length * m;
    for (let i = 0; i < s.length; i++) {
        const sMap = new Map();
        const endChar = i + charNum - 1;
        if (endChar > s.length - 1) {
            break;
        }
        for (let j = i; j <= endChar - m + 1; j += m) {
            const charGroup = s.slice(j, j + m);
            if (sMap.has(charGroup)) {
                sMap.set(charGroup, sMap.get(charGroup) + 1);
            } else {
                sMap.set(charGroup, 1);
            }
        }
        // 比较sMap和wordsMap
        if (diffMap(sMap, wordsMap)) {
            ans.push(i);
        };
    }
    return ans;
};

/**
 * leetcode - 146 - LRU 缓存机制
 */
// 链表构造器
var cNode = function (val, next, pre) {
    this.val = val || null;
    this.next = next || null;
    this.pre = pre || null;
}

var LRUCache = function (capacity) {
    // 维护一个map负责记录值和链表节点的引用
    this.map = new Map();
    // 维护一个双向链表结构实现LRU和保存数据
    const nodeA = new cNode(null, null, null);
    const nodeB = new cNode(null, null, null);
    nodeA.next = nodeB;
    nodeB.pre = nodeA;
    this.linked = nodeA;
    this.linkedTail = nodeB;
    // 缓存容量限制
    this.capacity = capacity;
};

LRUCache.prototype.get = function (key) {
    // 先检查value在缓存中是否存在
    if (this.map.has(key)) {
        const val = this.map.get(key).val.value;
        this.delToLinked(key);
        this.addToLinked(key, val);
        return this.linked.next.val.value;
    } else {
        return -1;
    }
};

LRUCache.prototype.put = function (key, value) {
    // 先检查value在缓存中是否存在
    if (this.map.get(key)) {
        this.delToLinked(key);
        this.addToLinked(key, value);
    } else {
        this.addToLinked(key, value);
    }
};

// 添加一个数据到链表
LRUCache.prototype.addToLinked = function (key, value) {
    if (this.map.size >= this.capacity) {
        this.delToLinked(this.linkedTail.pre.val.key);
    }
    const node = new cNode({ key: key, value: value }, this.linked.next, this.linked);
    this.linked.next = node;
    node.next.pre = node;
    this.map.set(key, node);
};

// 从链表中删除一个数据
LRUCache.prototype.delToLinked = function (key) {
    const targetNode = this.map.get(key);
    targetNode.pre.next = targetNode.pre.next.next;
    targetNode.next.pre = targetNode.next.pre.pre;
    this.map.delete(key);
};