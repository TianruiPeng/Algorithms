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