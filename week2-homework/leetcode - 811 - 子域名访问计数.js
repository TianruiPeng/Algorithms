/**
 * leetcode - 811 - 子域名访问计数
 */
var subdomainVisits = function (cpdomains) {
    const map = new Map();
    for (let i = 0; i < cpdomains.length; i++) {
        let count = 0;
        const domainArr = [];
        for (let j = cpdomains[i].length - 1; j >= 0; j--) {
            if (cpdomains[i][j] === '.') {
                domainArr.push(cpdomains[i].slice(j + 1, cpdomains[i].length));
            }
            if (cpdomains[i][j] === ' ') {
                domainArr.push(cpdomains[i].slice(j + 1, cpdomains[i].length));
                count = Number(cpdomains[i].slice(0, j));
            }
        }
        for (domain of domainArr) {
            const domainCount = map.get(domain) || 0;
            map.set(domain, domainCount + count);
        }
    }
    const ans = [];
    map.forEach((value, key) => {
        ans.push(`${value} ${key}`);
    });
    return ans;
};