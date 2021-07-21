/**
 * leetcode - 162 - 寻找峰值
 */
var findPeakElement = function (nums) {
    let left = 0;
    let right = nums.length - 1;
    while (left < right) {
        const midLeft = Math.floor((left + right) / 2);
        const midRight = midLeft + 1;
        if (nums[midLeft] < nums[midRight]) {
            left = midLeft + 1;
        } else {
            right = right - 1;
        }
    }
    return left;
};

/**
 * leetcode - 374 - 猜数字大小
 */
var guessNumber = function (n) {
    let left = 1;
    let right = n;
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (guess(mid) === 1) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return left;
};

/**
 * leetcode - 410 - 分割数组的最大值
 */
var splitArray = function (nums, m) {
    // 思路:问题求解的是最大值T,那就通过二分法猜这个T的值,写一个验证函数来返回猜的值是大了还是小了
    // 前提条件:通过二分答案求解最优解问题的前提是答案要单调

    // 判定猜的值是大了还是小了,<返回false,>=返回true
    const isVaild = (value) => {
        let curM = 1;
        let curSum = 0;
        for (let i = 0; i < nums.length; i++) {
            if (curSum + nums[i] <= value) {
                curSum += nums[i];
            } else {
                curM++;
                curSum = nums[i];
            }
            if (curM > m) {
                // 小了
                return false;
            }
        }
        return true;
    }

    // 二分猜值
    let left = 0;
    let right = 0;
    for (let i = 0; i < nums.length; i++) {
        left = Math.max(left, nums[i]);
        right += nums[i];
    }
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (isVaild(mid) === true) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    return left;
};

/**
 * leetcode - 1482 - 制作 m 束花所需的最少天数
 */
var minDays = function (bloomDay, m, k) {
    // 猜值T是否满足要求,如果满足则天数再往小了猜,如果不满足往大了猜
    const isValid = (value) => {
        groupCount = 0;
        lxCount = 0;
        for (let i = 0; i < bloomDay.length; i++) {
            if (bloomDay[i] <= value) {
                lxCount++;
            } else {
                lxCount = 0;
            }
            if (lxCount === k) {
                groupCount++;
                lxCount = 0;
            }
        }
        if (groupCount >= m) {
            return true;
        } else {
            return false;
        }
    }

    // 二分猜值
    let left = 1;
    let right = Math.pow(10, 9) + 1;
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (isValid(mid) === true) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    return left === Math.pow(10, 9) + 1 ? -1 : left;
};

/**
 * leetcode - 912 - 排序数组（归并解法）
 */
var sortArray = function (nums) {
    const merge = (arrayA, arrayB) => {
        let b = 0;
        const temp = [];
        for (let i = 0; i < arrayA.length; i++) {
            while (b < arrayB.length && arrayA[i] > arrayB[b]) {
                temp.push(arrayB[b]);
                b++;
            }
            temp.push(arrayA[i]);
        }
        while (b < arrayB.length) {
            temp.push(arrayB[b]);
            b++;
        }
        return temp;
    }
    // 归并排序
    const recursive = (left, right) => {
        if (left === right) {
            return [nums[left]];
        }
        const mid = Math.floor((left + right) / 2);
        return merge(recursive(left, mid), recursive(mid + 1, right));
    }
    return recursive(0, nums.length - 1);
};

/**
 * leetcode - 912 - 排序数组（快排解法）
 */
var sortArray = function (nums) {
    const partition = (left, right) => {
        const baseValue = nums[left + Math.floor(Math.random() * (right - left + 1))];
        while (left <= right) {
            while (nums[left] < baseValue) {
                left++;
            }
            while (nums[right] > baseValue) {
                right--;
            }
            if (left <= right) {
                const temp = nums[left];
                nums[left] = nums[right];
                nums[right] = temp;
                left++;
                right--;
            }
        }
        return right;
    }

    const recursive = (left, right) => {
        if (left >= right) {
            return;
        }
        const mid = partition(left, right);
        recursive(left, mid);
        recursive(mid + 1, right);
    }

    recursive(0, nums.length - 1);
    return nums;
}

/**
 * leetcode - 1122 - 数组的相对排序
 */
var relativeSortArray = function (arr1, arr2) {
    const sumNumber = new Array(1001).fill(0);
    const ans = [];
    for (let i = 0; i < arr1.length; i++) {
        sumNumber[arr1[i]]++;
    }
    for (let i = 0; i < arr2.length; i++) {
        let count = sumNumber[arr2[i]];
        while (count > 0) {
            ans.push(arr2[i]);
            count--;
        }
        sumNumber[arr2[i]] = 0;
    }
    for (let i = 0; i < sumNumber.length; i++) {
        let count = sumNumber[i];
        while (count > 0) {
            ans.push(i);
            count--;
        }
    }
    return ans;
};