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
 * leetcode - 304 - 二维区域和检索-矩阵不可变
 */
 var NumMatrix = function (matrix) {
    this.sumMatrix = [];
    // 转换前缀和矩阵
    for (let i = 0; i < matrix.length; i++) {
        this.sumMatrix[i] = [];
        for (let j = 0; j < matrix[i].length; j++) {
            const sum = this.getSumMatrix(i - 1, j)
                + this.getSumMatrix(i, j - 1)
                - this.getSumMatrix(i - 1, j - 1)
                + matrix[i][j];
            this.sumMatrix[i][j] = sum;
        }
    }
};

NumMatrix.prototype.sumRegion = function (row1, col1, row2, col2) {
    return this.getSumMatrix(row2, col2)
        - this.getSumMatrix(row1 - 1, col2)
        - this.getSumMatrix(row2, col1 - 1)
        + this.getSumMatrix(row1 - 1, col1 - 1);
};

// sumMatrix封装,处理越界
NumMatrix.prototype.getSumMatrix = function (i, j) {
    if (i < 0 || j < 0) {
        return 0;
    } else {
        return this.sumMatrix[i][j];
    }
}

/**
 * leetcode - 1109 - 航班预订统计
 */
 var corpFlightBookings = function (bookings, n) {
    const answer = [];
    for (let i = 0; i <= n + 1; i++) {
        answer[i] = 0;
    }
    for (let i = 0; i < bookings.length; i++) {
        answer[bookings[i][0]] += bookings[i][2];
        answer[bookings[i][1] + 1] -= bookings[i][2];
    }
    for (let i = 1; i < answer.length; i++) {
        answer[i] += answer[i - 1];
    }
    answer.pop();
    answer.shift();
    return answer;
};

/**
 * leetcode - 53 - 最大子序和
 */
 var maxSubArray = function (nums) {
    // 转前缀和数组
    nums.unshift(0);
    for (let i = 1; i < nums.length; i++) {
        nums[i] += nums[i - 1];
    }
    // 求前缀和数组的 前缀最小值
    const minArray = [];
    for (let i = 0; i < nums.length; i++) {
        if (i === 0) {
            minArray[i] = nums[i];
            continue;
        }
        minArray[i] = minArray[i - 1] > nums[i] ? nums[i] : minArray[i - 1];
    }
    // 求最大和
    let ans = null;
    for (let i = 1; i < nums.length; i++) {
        const max = nums[i] - minArray[i - 1];
        if (ans === null || max > ans) {
            ans = max;
        }
    }
    return ans;
};

/**
 * leetcode - 167 - 两数之和 II - 输入有序数组
 */
 var twoSum = function (numbers, target) {
    let i = 0;
    let j = numbers.length - 1;
    while (i !== j) {
        const sum = numbers[i] + numbers[j];
        if (sum === target) {
            return [i + 1, j + 1];
        } else if (sum < target) {
            i++;
            continue;
        } else {
            j--;
            continue;
        }
    }
};

/**
 * leetcode - 1 - 两数之和
 */
 var twoSum = function (nums, target) {
    for (let i = 0; i < nums.length; i++) {
        nums[i] = {
            val: nums[i],
            index: i
        };
    }
    nums.sort((a, b) => {
        return a.val - b.val;
    });
    let i = 0;
    let j = nums.length - 1;
    while (i !== j) {
        const sum = nums[i].val + nums[j].val;
        if (sum === target) {
            return [nums[i].index, nums[j].index]
        } else if (sum < target) {
            i++;
            continue;
        } else {
            j--;
            continue;
        }
    }
};

/**
 * leetcode - 15 - 三数之和
 */
