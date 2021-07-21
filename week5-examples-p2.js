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
 * leetcode - 215 - 数组中的第K个最大元素
 */