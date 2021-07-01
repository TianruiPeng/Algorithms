/**
 * leetcode - 697 - 数组的度
 */
var findShortestSubArray = function (nums) {
    let du = null;
    const duMap = new Map();
    // 计算数组的度,如果度有重复的,取其跨越长度最小的度值
    for (let i = 0; i < nums.length; i++) {
        const duInfo = duMap.get(nums[i]) || {
            count: 0,
            minIndex: i,
            maxIndex: i
        };
        const newDuInfo = {
            count: duInfo.count + 1,
            minIndex: Math.min(duInfo.minIndex, i),
            maxIndex: Math.max(duInfo.maxIndex, i)
        }
        duMap.set(nums[i], newDuInfo);
        if (du === null) {
            du = newDuInfo;
            continue;
        }
        if (du.count < newDuInfo.count) {
            du = newDuInfo;
            continue;
        }
        if (du.count === newDuInfo.count
            && du.maxIndex - du.minIndex > newDuInfo.maxIndex - newDuInfo.minIndex) {
            du = newDuInfo;
            continue;
        }
    }
    return du.maxIndex - du.minIndex + 1;
};