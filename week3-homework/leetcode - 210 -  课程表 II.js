/**
 * leetcode - 210 - 课程表 II
 */
var findOrder = function (numCourses, prerequisites) {
    const res = [];
    const edges = [];
    const visited = new Set();
    // 定义入度数
    const du = [];
    // 初始化出边数组
    for (let i = 0; i < numCourses; i++) {
        edges[i] = [];
        du[i] = 0;
    }

    // 定义加边函数
    const addEdge = (a, b) => {
        edges[a].push(b);
        du[b]++;
    }

    // 定义BFS
    const bfs = (node) => {
        const queue = [];
        queue.push(node);
        visited.add(node);
        while (queue.length !== 0) {
            const top = queue.shift();
            res.push(top);
            for (let i = 0; i < edges[top].length; i++) {
                const next = edges[top][i];
                if (visited.has(next)) {
                    continue
                }
                du[next]--;
                if (du[next] === 0) {
                    queue.push(next);
                    visited.add(next);
                }
            }
        }
    }

    // 建立图的数据
    for (let i = 0; i < prerequisites.length; i++) {
        const a = prerequisites[i][0];
        const b = prerequisites[i][1];
        addEdge(b, a);
    }
    // 从所有0度节点出发BFS
    for (let i = 0; i < du.length; i++) {
        if (du[i] === 0 && !visited.has(i)) {
            bfs(i);
        }
    }
    return res.length !== numCourses ? [] : res;
};