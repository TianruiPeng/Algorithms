/**
 * leetcode - 1074 - 元素和为目标值的子矩阵数量
 */
// （超出空间限制）
 var numSubmatrixSumTarget = function (matrix, target) {
    const row = matrix.length;
    const col = matrix[0].length;
    let ansCount = 0;

    // 用递归先对整个矩阵求前缀和矩阵
    let map = new Map();
    const recursive = (i, j) => {
        if (i < 0 || j < 0) {
            return 0;
        }
        if (map.has(`${i}${j}`)) {
            return map.get(`${i}${j}`);
        }
        matrix[i][j] = recursive(i - 1, j) + recursive(i, j - 1) - recursive(i - 1, j - 1) + matrix[i][j];
        map.set(`${i}${j}`, matrix[i][j]);
        return matrix[i][j];
    }
    recursive(row - 1, col - 1);

    // 求矩阵和
    const matrixSum = (x1, y1, x2, y2) => {
        const getPoint = (x, y) => {
            return (x < 0 || y < 0) ? 0 : matrix[x][y]
        }
        return getPoint(x2, y2) - getPoint(x2, y1 - 1) - getPoint(x1 - 1, y2) + getPoint(x1 - 1, y1 - 1);
    }

    // 遍历矩阵
    const set = new Set();
    const search = (x, y) => {
        for (let i = row - 1; i >= 0; i--) {
            if (i < x) {
                return;
            }
            for (let j = col - 1; j >= 0; j--) {
                if (j < y) {
                    return;
                }
                const record = [x, y, i, j].join('');
                if (set.has(record)) {
                    return;
                }
                set.add(record);
                if (matrixSum(x, y, i, j) === target) {
                    ansCount++;
                }
            }
        }
    }

    // 遍历每一个位置，以该位置作为原点，展开搜索
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            search(i, j);
        }
    }
    return ansCount;
};