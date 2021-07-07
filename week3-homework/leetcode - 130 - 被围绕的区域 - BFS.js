/**
 * leetcode - 130 - 被围绕的区域
 */
// 思路：遍历每一个元素，如果是O就用BFS搜索整个O块，如果满足被X包围，就将该块置为X
var solve = function (board) {
    const m = board.length;
    const n = board[0].length;
    // 定义方向数组
    const drX = [1, -1, 0, 0];
    const drY = [0, 0, 1, -1];
    // 定义遍历过的元素，避免重复BFS
    const visited = [];
    for (let i = 0; i < m; i++) {
        visited[i] = [];
        for (let j = 0; j < n; j++) {
            visited[i][j] = false;
        }
    }

    // 定义BFS搜索O块的方法
    const bfs = (x, y) => {
        // 标记是否被包围
        let isSurround = true;
        // 记录找到的O的位置，用于后面填充为X
        const mark = [];
        const queue = [];
        queue.push([x, y]);
        visited[x][y] = true;
        mark.push([x, y]);
        while (queue.length !== 0) {
            const top = queue.shift();
            const topX = top[0];
            const topY = top[1];
            for (let i = 0; i < 4; i++) {
                const tempX = topX + drX[i];
                const tempY = topY + drY[i];
                // 一旦发现这个O块和边边相连就标记为非被包围
                if (tempX < 0 || tempX >= m || tempY < 0 || tempY >= n) {
                    isSurround = false;
                    continue;
                }
                if (board[tempX][tempY] === 'O' && visited[tempX][tempY] === false) {
                    queue.push([tempX, tempY]);
                    mark.push([tempX, tempY]);
                    visited[tempX][tempY] = true;
                }
            }
        }
        if (isSurround === true) {
            // 填充为X
            for (let item of mark) {
                const itemX = item[0];
                const itemY = item[1];
                board[itemX][itemY] = 'X';
            }
        }
    }

    // 主程序：遍历每一个元素
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] === 'O' && visited[i][j] === false) {
                bfs(i, j);
            }
        }
    }
};