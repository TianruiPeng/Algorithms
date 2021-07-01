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