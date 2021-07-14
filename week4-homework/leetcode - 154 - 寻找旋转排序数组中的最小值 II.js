/**
 * leetcode - 154 - 寻找旋转排序数组中的最小值 II
 */
var findMin = function (nums) {
    // 重复带来的问题是，会导致数组对于条件来说不单调了，所以这里先把数组变的单调
    while (nums.length !== 1 && nums[0] === nums[nums.length - 1]) {
        nums.pop();
    }
    // 二分条件：找第一个<=末尾元素的值
    let left = 0;
    let right = nums.length - 1;
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] <= nums[right]) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    return nums[left];
};