/**
 * leetcode - 1011 - 在 D 天内送达包裹的能力
 */
var shipWithinDays = function (weights, days) {
    // 思路：求解船的最低运载量，设这个答案为T。
    // 发现当运载能力大于T时，包裹可以送达
    // 发现当运载能力小于T时，包裹不可以送达
    // 答案满足单调性，且包裹顺序不能改变，完美契合二分法的使用条件，即猜值判定的方式求解该题

    // 判断函数
    const isStaify = (T, weights, day) => {
        let curPack = 0;
        while (day > 0) {
            let tempT = T;
            while (tempT - weights[curPack] >= 0) {
                tempT = tempT - weights[curPack];
                curPack++;
                if (curPack >= weights.length) {
                    return true;
                }
            }
            day--;
        }
        return false;
    }

    // 二分模板
    // 二分条件：找第一个满足条件的
    let left = Math.max(...weights);
    let right = weights.reduce((a, b) => a + b);
    while (left < right) {
        mid = Math.floor((left + right) / 2);
        if (isStaify(mid, weights, days) === true) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    return left;
};