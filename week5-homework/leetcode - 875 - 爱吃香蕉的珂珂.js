/**
 * leetcode - 875 - 爱吃香蕉的珂珂
 */
var minEatingSpeed = function (piles, h) {
    // 思路:设最小速度为T
    // 当速度大于T时,总能吃完所有香蕉
    // 当速度小于T时,是来不及吃完所有香蕉的
    // 答案单调性满足,且更换吃堆的顺序对结果没有影响,所以满足二分法求解

    // 判定函数
    const isCanEat = (T) => {
        let usedH = 0;
        for (let i = 0; i < piles.length; i++) {
            usedH += Math.ceil(piles[i] / T);
        }
        return usedH > h ? false : true;
    }

    // 二分法
    // 二分条件:找第一个满足的方案
    let left = 1;
    let right = Math.max(...piles);
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (isCanEat(mid) === true) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    return left;
};