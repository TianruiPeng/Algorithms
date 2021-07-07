/**
 * leetcode - 207 - 课程表
 */
var canFinish = function (numCourses, prerequisites) {
    const edges = [];
    const du = [];
    const que = [];
    let count = 0;

    // 向图中加边的方法，且计算节点的度
    const addEdge = (a, b) => {
        edges[a].push(b);
        du[b]++;
    }

    // 初始化图和度
    for (let i = 0; i < numCourses; i++) {
        edges[i] = [];
        du[i] = 0;
    }
    // 将数据转换为图
    for (let i = 0; i < prerequisites.length; i++) {
        const a = prerequisites[i][0];
        const b = prerequisites[i][1];
        addEdge(a, b);
    }
    // BFS从所有0度开始搜索图
    for (let i = 0; i < du.length; i++) {
        if (du[i] === 0) {
            que.push(i);
        }
    }
    while (que.length !== 0) {
        const top = que.pop();
        count++;
        for (let node of edges[top]) {
            du[node]--
            if (du[node] === 0) {
                que.push(node);
            }
        }
    }
    // 如果图中还存在非0的度，则有向图有环
    return count !== numCourses ? false : true;
};

/**
 * leetcode - 17 - 电话号码的字母组合
 */
var letterCombinations = function (digits) {
    if (digits.length === 0) {
        return [];
    }
    const map = {
        '2': ['a', 'b', 'c'],
        '3': ['d', 'e', 'f'],
        '4': ['g', 'h', 'i'],
        '5': ['j', 'k', 'l'],
        '6': ['m', 'n', 'o'],
        '7': ['p', 'q', 'r', 's'],
        '8': ['t', 'u', 'v'],
        '9': ['w', 'x', 'y', 'z']
    };
    const ans = [];
    let set = [];

    digits = digits.split('');
    const dfs = (index) => {
        if (index === digits.length) {
            ans.push(set.join(''));
            return;
        }
        for (let char of map[digits[index]]) {
            set.push(char);
            dfs(index + 1);
            set.pop();
        }
    }
    dfs(0);
    return ans;
};

/**
 * leetcode - 51 - N 皇后
 */
var solveNQueens = function (n) {
    const res = [];
    // 思路：先保证每行每列只有一个皇后，再看对角线合不合法
    // 每行每列只有一个皇后是排列问题，考虑每个位置为行，元素为列的数组的排列组合
    const ans = [];
    const set = [];
    const usedCol = new Set();
    const legalSet1 = new Set();
    const legalSet2 = new Set();
    const recursive = (index) => {
        if (index === n) {
            ans.push([...set]);
            return;
        }
        for (let i = 0; i < n; i++) {
            if (usedCol.has(i) || legalSet1.has(i + index) || legalSet2.has(i - index)) {
                continue;
            }
            legalSet1.add(i + index);
            legalSet2.add(i - index);
            usedCol.add(i);
            set.push(i);
            recursive(index + 1);
            set.pop();
            usedCol.delete(i);
            legalSet1.delete(i + index);
            legalSet2.delete(i - index);
        }
    }
    recursive(0);
    // 返回结果
    for (let i = 0; i < ans.length; i++) {
        // 生成棋盘
        const board = [];
        for (let i = 0; i < n; i++) {
            board[i] = [];
            for (let j = 0; j < n; j++) {
                board[i].push('.');
            }
        }
        // 放上棋子
        for (let j = 0; j < ans[i].length; j++) {
            board[j][ans[i][j]] = 'Q';
            board[j] = board[j].join('');
        }
        res.push(board);
    }
    return res;
};

/**
 * leetcode - 200 - 岛屿数量
 */
var numIslands = function (grid) {
    const row = grid.length;
    const col = grid[0].length;
    // 方向数组简化出边过程
    const drX = [1, -1, 0, 0];
    const drY = [0, 0, 1, -1];
    const visited = [];
    let ans = 0;

    // 初始化visited
    for (let i = 0; i < row; i++) {
        visited[i] = [];
        for (let j = 0; j < col; j++) {
            visited[i][j] = false;
        }
    }

    // bfs走遍单个岛屿的方法
    const bfs = (x, y) => {
        const queue = [];
        queue.push([x, y]);
        visited[x][y] === true;
        while (queue.length !== 0) {
            const top = queue.shift();
            const topX = top[0];
            const topY = top[1];
            for (let i = 0; i < 4; i++) {
                const tempX = topX + drX[i];
                const tempY = topY + drY[i];
                if (tempX < 0 || tempX >= row || tempY < 0 || tempY >= col) {
                    continue;
                }
                if (grid[tempX][tempY] === '1' && visited[tempX][tempY] === false) {
                    queue.push([topX + drX[i], topY + drY[i]]);
                    visited[tempX][tempY] = true;
                }
            }
        }
    }

    // 走每一个元素，遇到没标记过的1就bfs标记单个岛屿
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            if (grid[i][j] === '1' && visited[i][j] === false) {
                bfs(i, j);
                ans++;
            }
        }
    }
    return ans;
};

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