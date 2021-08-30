/**
 * leetcode - 121 - 买卖股票的最佳时机
 */
// 动态规划做法
var maxProfit = function (prices) {
    // f[i] 代表第i天卖出的话，对应的最小买入时的金额
    const f = [];
    const n = prices.length;
    let ans = -Infinity;
    for (let i = 0; i < n; i++) {
        if (i === 0) {
            f[i] = Infinity;
            continue;
        }
        f[i] = Math.min(f[i - 1], prices[i - 1]);
        ans = Math.max(ans, prices[i] - f[i]);
    }
    return ans < 0 ? 0 : ans;
};
// 分治归并做法
var maxProfit = function (prices) {
    let ans = 0;
    const merge = (l, r) => {
        ans = Math.max(ans, r[r.length - 1] - l[0]);
        const temp = [];
        let i = 0;
        let j = 0;
        while (i < l.length && j < r.length) {
            if (l[i] <= r[j]) {
                temp.push(l[i]);
                i++;
            } else {
                temp.push(r[j]);
                j++;
            }
        }
        while (i < l.length) {
            temp.push(l[i]);
            i++;
        }
        while (j < r.length) {
            temp.push(r[j]);
            j++;
        }
        return temp;
    }
    const mergeSort = (nums) => {
        if (nums.length <= 1) return nums;
        const mid = Math.floor(nums.length / 2);
        const left = mergeSort(nums.slice(0, mid));
        const right = mergeSort(nums.slice(mid));
        return merge(left, right);
    }
    mergeSort(prices)
    return ans;
};

/**
 * leetcode - 122 - 买卖股票的最佳时机 II
 */
var maxProfit = function (prices) {
    f = [];
    for (let i = 0; i < prices.length; i++) {
        f[i] = [];
        for (let j = 0; j < 2; j++) {
            f[i][j] = -Infinity;
        }
    }
    for (let i = 0; i < prices.length; i++) {
        if (i === 0) {
            f[0][0] = 0;
            f[0][1] = -prices[i];
            continue;
        }
        f[i][0] = Math.max(f[i - 1][1] + prices[i], f[i - 1][0]);
        f[i][1] = Math.max(f[i - 1][0] - prices[i], f[i - 1][1]);
    }
    return f[prices.length - 1][0];
};

/**
 * leetcode - 123 - 买卖股票的最佳时机 III
 */
var maxProfit = function (prices) {
    const n = prices.length;
    prices.unshift(0);
    // 初始化f[i][j][k]
    f = [];
    for (let i = 0; i <= n; i++) {
        f[i] = [];
        for (let j = 0; j < 2; j++) {
            f[i][j] = [];
            for (let k = 0; k <= 2; k++) {
                f[i][j][k] = -Infinity;
            }
        }
    }
    f[0][0][0] = 0;
    // 动态规划
    for (let i = 1; i <= n; i++) {
        for (let j = 0; j < 2; j++) {
            for (let k = 0; k <= 2; k++) {
                f[i][j][k] = f[i - 1][j][k];
                if (j === 0) {
                    f[i][j][k] = Math.max(f[i][j][k], f[i - 1][1][k] + prices[i]);
                }
                if (j === 1 && k > 0) {
                    f[i][j][k] = Math.max(f[i][j][k], f[i - 1][0][k - 1] - prices[i]);
                }
            }
        }
    }
    // 寻找结果
    let ans = -Infinity;
    for (let k = 0; k <= 2; k++) {
        ans = Math.max(ans, f[n][0][k]);
    }
    return ans;
};

/**
 * leetcode - 188 - 买卖股票的最佳时机 IV
 */
var maxProfit = function (k, prices) {
    const n = prices.length;
    // 迁移i 0~n-1 到 1~n
    const newPrices = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        newPrices[i + 1] = prices[i];
    }
    prices = newPrices;
    // 初始化f[i][j][c]
    f = [];
    for (let i = 0; i <= n; i++) {
        f[i] = [];
        for (let j = 0; j < 2; j++) {
            f[i][j] = [];
            for (let c = 0; c <= k; c++) {
                f[i][j][c] = -Infinity;
            }
        }
    }
    f[0][0][0] = 0;
    // 动态规划
    for (let i = 1; i <= n; i++) {
        for (let j = 0; j < 2; j++) {
            for (let c = 0; c <= k; c++) {
                f[i][j][c] = f[i - 1][j][c];
                if (j === 0) {
                    f[i][j][c] = Math.max(f[i][j][c], f[i - 1][1][c] + prices[i]);
                }
                if (j === 1 && c > 0) {
                    f[i][j][c] = Math.max(f[i][j][c], f[i - 1][0][c - 1] - prices[i]);
                }
            }
        }
    }
    // 寻找结果
    let ans = -Infinity;
    for (let c = 0; c <= k; c++) {
        ans = Math.max(ans, f[n][0][c]);
    }
    return ans;
};

/**
 * leetcode - 714 - 买卖股票的最佳时机含手续费
 */
var maxProfit = function (prices, fee) {
    const n = prices.length;
    const f = [];
    prices.unshift(0);
    for (let i = 0; i <= n; i++) {
        f[i] = [];
        for (let j = 0; j < 2; j++) {
            f[i][j] = -Infinity;
        }
    }
    f[0][0] = 0;
    for (let i = 1; i <= n; i++) {
        for (let j = 0; j < 2; j++) {
            if (j === 0) {
                f[i][j] = Math.max(f[i - 1][j], f[i - 1][1] + prices[i]);
            }
            if (j === 1) {
                f[i][j] = Math.max(f[i - 1][j], f[i - 1][0] - prices[i] - fee);
            }
        }
    }
    return f[n][0]
};

/**
 * leetcode - 309 - 最佳买卖股票时机含冷冻期
 */
var maxProfit = function (prices) {
    const f = [];
    const n = prices.length;
    prices.unshift(0);
    for (let i = 0; i <= n; i++) {
        f[i] = [];
        for (let j = 0; j < 2; j++) {
            f[i][j] = [];
            for (let k = 0; k < 2; k++) {
                f[i][j][k] = -Infinity;
            }
        }
    }
    f[0][0][0] = 0;
    for (let i = 1; i <= n; i++) {
        for (let j = 0; j < 2; j++) {
            if (j === 0) {
                for (let k = 0; k < 2; k++) {
                    if (k === 0) {
                        f[i][j][k] = Math.max(f[i - 1][0][1], f[i - 1][0][0])
                    }
                    if (k === 1) {
                        f[i][j][k] = f[i - 1][1][0] + prices[i];
                    }
                }
            }
            if (j === 1) {
                f[i][j][0] = Math.max(f[i - 1][j][0], f[i - 1][0][0] - prices[i]);
            }
        }
    }
    return Math.max(f[n][0][0], f[n][0][1]);
};

/**
 * leetcode - 198 - 打家劫舍
 */
var rob = function (nums) {
    // 优化空间：对每个f的第一维整体mod2
    const n = nums.length;
    const f = [];
    for (let i = 0; i < 2; i++) {
        f[i] = [];
        for (let j = 0; j < 2; j++) {
            f[i][j] = -Infinity;
        }
    }

    for (let i = 0; i < n; i++) {
        if (i === 0) {
            f[0][0] = 0;
            f[0][1] = nums[i];
            continue;
        }
        for (let j = 0; j < 2; j++) {
            if (j === 0) {
                f[i & 1][j] = Math.max(f[i - 1 & 1][0], f[i - 1 & 1][1]);
            }
            if (j === 1) {
                f[i & 1][j] = f[i - 1 & 1][0] + nums[i];
            }
        }
    }
    return Math.max(f[n - 1 & 1][1], f[n - 1 & 1][0]);
};

/**
 * leetcode - 213 - 打家劫舍 II
 */
var rob = function (nums) {
    if (nums.length === 1) {
        return nums[0];
    }
    const n = nums.length;
    const f = [];
    nums.unshift(0);
    for (let i = 0; i <= n; i++) {
        f[i] = [];
        for (let j = 0; j < 2; j++) {
            f[i][j] = -Infinity;
        }
    }
    // 第1个可能偷时，那第n个肯定不能偷，所以不计算f[n][1]
    f[0][0] = 0;
    for (let i = 1; i <= n; i++) {
        for (let j = 0; j < 2; j++) {
            if (j === 0) {
                f[i][j] = Math.max(f[i - 1][0], f[i - 1][1]);
            }
            if (j === 1) {
                f[i][j] = f[i - 1][0] + nums[i];
            }
        }
    }
    let ans = f[n][0];
    // 第n个可能偷时，那第1个肯定不能偷，所以f[1][1]需要是不合法的-infinity
    f[0][0] = 0;
    for (let i = 1; i <= n; i++) {
        for (let j = 0; j < 2; j++) {
            if (j === 0) {
                f[i][j] = Math.max(f[i - 1][0], f[i - 1][1]);
            }
            if (j === 1) {
                if (i === 1) {
                    f[1][1] = -Infinity;
                    continue;
                }
                f[i][j] = f[i - 1][0] + nums[i];
            }
        }
    }
    return Math.max(ans, Math.max(f[n][0], f[n][1]));
};

/**
 * leetcode - 72 - 编辑距离
 */
var minDistance = function (word1, word2) {
    word1 = ' ' + word1;
    word2 = ' ' + word2;
    const f = [];
    for (let i = 0; i <= word1.length; i++) {
        f[i] = [];
        f[i][0] = i;
        for (let j = 0; j <= word2.length; j++) {
            if (i === 0) {
                f[0][j] = j;
            }
        }
    }
    for (let i = 1; i <= word1.length; i++) {
        for (let j = 1; j <= word2.length; j++) {
            if (word1[i] === word2[j]) {
                f[i][j] = Math.min(f[i - 1][j] + 1, f[i][j - 1] + 1, f[i - 1][j - 1]);
            } else {
                f[i][j] = Math.min(f[i - 1][j] + 1, f[i][j - 1] + 1, f[i - 1][j - 1] + 1);
            }

        }
    }
    return f[word1.length][word2.length]
};

/**
 * 01背包问题（正常思路）
 * 看一道题是不是背包问题，就是看这个问题是不是给i个物品，要去凑某个数值条件
 */
const bag = (arrar, M) => {
    // 思路：f[i][j] = 前i个物品刚好拿j重量的最优价值
    const n = arrar.length;
    arrar.unshift(null);
    const f = [];
    for (let i = 0; i <= n; i++) {
        f[i] = [];
        for (let j = 0; j <= M; j++) {
            f[i][j] = -Infinity;
        }
    }
    f[0][0] = 0;
    for (let i = 1; i <= n; i++) {
        for (let j = 0; j <= M; j++) {
            f[i][j] = f[i - 1][j];
            if (j - arrar[i].w >= 0) {
                f[i][j] = Math.max(f[i][j], f[i - 1][j - arrar[i].w] + arrar[i].v);
            }
        }
    }
    console.log(f);
    let ans = 0;
    for (let j = 0; j <= M; j++) {
        ans = Math.max(ans, f[n][j]);
    }
    return ans;
}

/**
 * 01背包问题（空间优化：1滚动，2降维）
 */
const bag = (arrar, M) => {
    const n = arrar.length;
    arrar.unshift(null);
    f = new Array(n + 1).fill(-Infinity);
    f[0] = 0;
    for (let i = 1; i <= n; i++) {
        for (let j = M; j >= arrar[i].w; j--) {
            f[j] = Math.max(f[j], f[j - arrar[i].w] + arrar[i].v);
        }
    }
    let ans = 0;
    for (let j = 0; j <= M; j++) {
        ans = Math.max(ans, f[j]);
    }
    return ans;
}

/**
 * leetcode - 518 - 零钱兑换 II
 * 注：完全背包问题（相比01背包问题，倒序变正序）(物品可以复用就是完全背包问题)
 */
var change = function (amount, coins) {
    coins.unshift(0);
    // 值0为不合法方案数
    const f = new Array(amount + 1).fill(0);
    // 值1为初始值方案数
    f[0] = 1;
    for (let i = 1; i <= coins.length; i++) {
        // 初值是 coins[i] 是因为边界问题
        for (let j = coins[i]; j <= amount; j++) {
            // 求方案书就是累加了，不是用max或者min了
            f[j] = f[j] + f[j - coins[i]];
        }
    }
    return f[amount];
};

/**
 * leetcode - 416 - 分割等和子集 （01背包问题）
 */
var canPartition = function (nums) {
    let sum = 0;
    for (let i = 0; i < nums.length; i++) {
        sum += nums[i];
    }
    if (sum % 2 === 1) {
        return false;
    }
    let target = sum / 2;
    const n = nums.length;
    nums.unshift(0);
    const f = new Array(target + 1).fill(false);
    f[0] = true;
    for (let i = 1; i <= n; i++) {
        for (let j = target; j >= nums[i]; j--) {
            f[j] = f[j] | f[j - nums[i]];
        }
    }
    return f[target];
};