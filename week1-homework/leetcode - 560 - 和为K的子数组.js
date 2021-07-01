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