/**
 * leetcode - 70 - 爬楼梯
 */
var climbStairs = function (n) {
    f = new Array(n + 1).fill(0);
    f[-1] = 0;
    f[0] = 1;
    for (let i = 1; i <= n; i++) {
        f[i] = f[i - 1] + f[i - 2];
    }
    return f[n];
};