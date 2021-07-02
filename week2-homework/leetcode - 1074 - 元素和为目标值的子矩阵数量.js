/**
 * leetcode - 1074 - 元素和为目标值的子矩阵数量
 */
// 解法1思路：先将矩阵预处理为前缀和矩阵，然后枚举每一个子矩阵，计算其矩阵和
var numSubmatrixSumTarget = function (matrix, target) {
    const row = matrix.length;
    const col = matrix[0].length;
    let ansCount = 0;

    // 用递归求前缀和矩阵
    let map = new Map();
    const recursive = (i, j) => {
        if (i < 0 || j < 0) {
            return 0;
        }
        if (map.has(`${i}${j}`)) {
            // 记忆化，避免重复计算
            return map.get(`${i}${j}`);
        }
        matrix[i][j] = recursive(i - 1, j) + recursive(i, j - 1) - recursive(i - 1, j - 1) + matrix[i][j];
        map.set(`${i}${j}`, matrix[i][j]);
        return matrix[i][j];
    }
    recursive(row - 1, col - 1);

    // 定义求矩阵和的函数
    const matrixSum = (x1, y1, x2, y2) => {
        const getPoint = (x, y) => {
            return (x < 0 || y < 0) ? 0 : matrix[x][y];
        }
        return getPoint(x2, y2) - getPoint(x2, y1 - 1) - getPoint(x1 - 1, y2) + getPoint(x1 - 1, y1 - 1);
    }

    // 以给定位置作为矩阵起始位置，展开枚举
    const search = (x, y) => {
        for (let i = x; i < row; i++) {
            for (let j = y; j < col; j++) {
                if (matrixSum(x, y, i, j) === target) {
                    ansCount++;
                }
            }
        }
    }

    // 遍历每一个位置，以该位置作为矩阵起始位置，展开枚举
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            search(i, j);
        }
    }
    return ansCount;
};