/**
 * leetcode - 23 - 合并K个升序链表
 */
var mergeKLists = function (lists) {
    if (lists.length === 0) {
        return null;
    }
    // 思路:用分治,可以最小不可拆a和剩余b分段,也可以从中间平均分段
    const recursive = (linkedArray) => {
        if (linkedArray.length === 1) {
            return linkedArray[0];
        }
        // 最小不可拆A段 和 剩余部分B段
        const linkedA = linkedArray[0];
        linkedArray.shift();
        const linkedB = recursive(linkedArray);
        // 将linkedB合并进linkedA
        const protectNodeA = new ListNode(null, linkedA);
        let curA = protectNodeA.next;
        let curB = linkedB;
        let pre = protectNodeA;
        while (curA !== null && curB !== null) {
            const temp = curB.next;
            // 将linkB中比linkA的第一个元素小的一段,插到linkA第一个元素之前
            if (curA.val > curB.val) {
                curB.next = curA;
                pre.next = curB;
                pre = pre.next;
                curB = temp;
                continue;
            }
            // 链表合并的逻辑
            if (curA.next === null) {
                break;
            }
            if (curA.val <= curB.val && curB.val <= curA.next.val) {
                curB.next = curA.next;
                curA.next = curB;
                curB = temp;
            }
            curA = curA.next;
        }
        if (curB !== null) {
            // 判断当linkA为空链表null的情况
            curA === null ? protectNodeA.next = curB : curA.next = curB;
        }
        return protectNodeA.next;
    }
    return recursive(lists);
};