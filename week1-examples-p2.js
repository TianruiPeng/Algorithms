/**
 * leetcode - 1248 - 统计「优美子数组」
 */
var numberOfSubarrays = function (nums, k) {
    for (let i = 0; i < nums.length; i++) {
        // 转奇偶数组
        nums[i] = nums[i] % 2;
        // 转前缀和数组
        if (i > 0) {
            nums[i] = nums[i - 1] + nums[i];
        }
    }
    nums.unshift(0);
    const sum = [];
    for (let i = 0; i < nums.length; i++) {
        sum[nums[i]] = (sum[nums[i]] || 0) + 1;
    }
    // 计算优美子数组个数
    let count = 0;
    for (let i = 1; i < nums.length; i++) {
        if (0 <= nums[i] - k) {
            count = count + (sum[nums[i] - k] || 0);
        }
    }
    return count;
};

/**
 * leetcode - 560 - 和为K的子数组
 */
