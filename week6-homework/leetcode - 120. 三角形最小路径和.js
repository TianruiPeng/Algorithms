/**
 * leetcode - 120. 三角形最小路径和
 */
const minimumTotal = triangle => {
    // 最底下一行
    const bottom = triangle[triangle.length - 1];
    const opt = new Array(bottom.length);
    // opt初始化，为最下面一行
    for (let i = 0; i < opt.length; i++) {
        opt[i] = bottom[i];
    }
    // 从倒数第二行开始，向上循环
    for (let i = opt.length - 2; i >= 0; i--) {
        for (let j = 0; j < triangle[i].length; j++) {
            // 等号右边的opt[j], opt[j + 1]是下一行的
            // 等号左边的opt[j]是当前行的
            // triangle[i][j]也是当前行的
            opt[j] = Math.min(opt[j], opt[j + 1]) + triangle[i][j];
        }
    }
    return opt[0];
};