/**
 * leetcode - 130 - 被围绕的区域
 */
// 思路：先找出四边的O块，DFS将其标记为非被围绕，然后剩下的所有O块都是被围绕的，都更改为X
var solve = function (board) {
    const m = board.length;
    const n = board[0].length;
    // 定义方向数组
    const drX = [1, -1, 0, 0];
    const drY = [0, 0, 1, -1];
    // 初始化visited数组
    const visited = [];
    for (let i = 0; i < m; i++) {
        visited[i] = [];
        for (let j = 0; j < n; j++) {
            visited[i][j] = false;
        }
    }

    // DFS将其标记为非被围绕
    const dfs = (x, y) => {
        visited[x][y] = true;

        for (let i = 0; i < 4; i++) {
            const tempX = x + drX[i];
            const tempY = y + drY[i];
            if (tempX < 0 || tempX >= m || tempY < 0 || tempY >= n) {
                continue;
            }
            if (board[tempX][tempY] === 'O' && visited[tempX][tempY] === false) {
                dfs(tempX, tempY);
            }
        }
    }

    // 找出四边的O块，对其DFS标记为非被围绕
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i === 0 || i === m - 1 || j === 0 || j === n - 1) {
                if (board[i][j] === 'O' && visited[i][j] === false) {
                    dfs(i, j);
                }
            }
        }
    }

    // 将剩下的所有O块都更改为X
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (visited[i][j] === false && board[i][j] === 'O') {
                board[i][j] = 'X';
            }
        }
    }
};