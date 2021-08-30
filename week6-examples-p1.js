/**
 * leetcode - 322 - 零钱兑换
 */
var coinChange = function (coins, amount) {
    const opt = new Array(amount + 1).fill(Infinity);
    opt[0] = 0;
    for (let i = 1; i <= amount; i++) {
        for (let j = 0; j < coins.length; j++) {
            if (i - coins[j] >= 0) {
                opt[i] = Math.min(opt[i], opt[i - coins[j]] + 1);
            }
        }
    }
    return opt[amount] === Infinity ? -1 : opt[amount];
};

/**
 * leetcode - 63 - 不同路径 II
 */
var uniquePathsWithObstacles = function (obstacleGrid) {
    // 状态：当前位置
    // 目标：结束位置
    // 边界：起始位置的路径数为1，不要出格子外，障碍物为0
    const m = obstacleGrid.length;
    const n = obstacleGrid[0].length;
    // 先遍历所有状态
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (obstacleGrid[i][j] === 1) {
                obstacleGrid[i][j] = 0;
            } else if (i === 0 && j === 0) {
                obstacleGrid[i][j] = 1;
            } else if (i - 1 < 0) {
                obstacleGrid[i][j] = obstacleGrid[i][j - 1];
            } else if (j - 1 < 0) {
                obstacleGrid[i][j] = obstacleGrid[i - 1][j];
            } else {
                obstacleGrid[i][j] = obstacleGrid[i - 1][j] + obstacleGrid[i][j - 1];
            }
        }
    }
    return obstacleGrid[m - 1][n - 1];
};

/**
 * leetcode - 1143 - 最长公共子序列
 */
var longestCommonSubsequence = function (text1, text2) {
    const m = text1.length;
    const n = text2.length;
    text1 = ' ' + text1;
    text2 = ' ' + text2;
    const opt = [];
    for (let i = 0; i <= m; i++) {
        opt[i] = [];
        for (let j = 0; j <= n; j++) {
            opt[i][j] = 0;
        }
    }
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i] === text2[j]) {
                opt[i][j] = opt[i - 1][j - 1] + 1;
            } else {
                opt[i][j] = Math.max(opt[i - 1][j], opt[i][j - 1]);
            }
        }
    }
    return opt[m][n];
};

/**
 * leetcode - 300 - 最长递增子序列
 */
var lengthOfLIS = function (nums) {
    const f = [];
    for (let i = 0; i < nums.length; i++) {
        f[i] = 1;
        for (let j = 0; j < f.length; j++) {
            if (nums[j] < nums[i]) {
                f[i] = Math.max(f[j] + 1, f[i]);
            }
        }
    }
    let ans = 0;
    for (let i = 0; i < f.length; i++) {
        ans = Math.max(ans, f[i]);
    }
    return ans
};

/**
 * leetcode - 53 - 最大子序和
 */
var maxSubArray = function (nums) {
    const f = [];
    for (let i = 0; i < nums.length; i++) {
        if (i === 0) {
            f[i] = nums[i];
            continue;
        }
        f[i] = Math.max(f[i - 1] + nums[i], nums[i]);
    }
    let ans = -Infinity;
    for (let i = 0; i < f.length; i++) {
        ans = Math.max(ans, f[i]);
    }
    return ans;
};

/**
 * leetcode - 152 - 乘积最大子数组
 */
var maxProduct = function (nums) {
    const fMax = [];
    const fMin = [];
    for (let i = 0; i < nums.length; i++) {
        if (i === 0) {
            fMax[i] = nums[i];
            fMin[i] = nums[i];
            continue;
        }
        fMax[i] = nums[i] < 0 ? Math.max(fMin[i - 1] * nums[i], nums[i]) : Math.max(fMax[i - 1] * nums[i], nums[i]);
        fMin[i] = nums[i] >= 0 ? Math.min(fMin[i - 1] * nums[i], nums[i]) : Math.min(fMax[i - 1] * nums[i], nums[i]);
    }
    let ans = -Infinity;
    for (let i = 0; i < fMax.length; i++) {
        ans = Math.max(ans, fMax[i]);
    }
    return ans;
};