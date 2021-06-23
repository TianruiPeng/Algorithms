/** 
 * leetcode - 88 - 合并两个有序数组        
 */
var merge = function (nums1, m, nums2, n) {
    let a = m - 1;
    let b = n - 1;
    let replaceIndex = nums1.length - 1;
    while (a >= 0 && b >= 0) {
        if (nums1[a] > nums2[b]) {
            nums1[replaceIndex] = nums1[a];
            a--;
        } else {
            nums1[replaceIndex] = nums2[b];
            b--;
        }
        replaceIndex--;
    }
    while (a < 0 && b >= 0) {
        nums1[replaceIndex] = nums2[b];
        b--;
        replaceIndex--;
    }
};

/** 
 * leetcode - 26 - 删除有序数组中的重复项        
 */
var removeDuplicates = function (nums) {
    let replaceIndex = 0;
    for (let i = 0; i < nums.length; i++) {
        if (i === 0 || nums[i] !== nums[i - 1]) {
            nums[replaceIndex] = nums[i];
            replaceIndex++;
        }
    }
    nums.splice(replaceIndex, nums.length);
};

/** 
 * leetcode - 283 - 移动零      
 */
var moveZeroes = function (nums) {
    let replaceIndex = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            nums[replaceIndex] = nums[i];
            replaceIndex++;
        }
    }
    while (replaceIndex < nums.length) {
        nums[replaceIndex] = 0;
        replaceIndex++;
    }
};

/** 
 * leetcode - 206 - 反转链表      
 */
var reverseList = function (head) {
    let last = null;
    while (head !== null) {
        const after = head.next;
        head.next = last;
        last = head;
        head = after;
    }
    return last;
};

/** 
 * leetcode - 25 - K 个一组翻转链表    
 */
var reverseKGroup = function (head, k) {
    // 获取分组的end
    const getGroupEnd = (head, k) => {
        while (head !== null) {
            k--;
            if (k <= 0) {
                break;
            }
            head = head.next;
        }
        return head;
    }

    // 反转链表
    const revert = (head, end) => {
        let last = head;
        head = head.next;
        while (last !== end) {
            const after = head.next;
            head.next = last;
            last = head;
            head = after;
        }
    }

    // 保护节点
    const protectNode = new ListNode(null, head);
    // 分组
    let last = protectNode;
    while (head !== null) {
        const end = getGroupEnd(head, k);
        if (end === null) {
            break;
        }
        const nextGroupHead = end.next;
        revert(head, end);
        last.next = end;
        head.next = nextGroupHead;
        last = head;
        head = nextGroupHead;
    }
    return protectNode.next;
};

/** 
 * leetcode - 141 - 环形链表  
 */
var hasCycle = function (head) {
    let a = head;
    let b = head;
    while (b !== null && b.next !== null) {
        a = a.next;
        b = b.next.next;
        if (a === b) {
            return true;
        }
    }
    return false;
};

/** 
 * leetcode - 142 - 环形链表 II  
 */
var detectCycle = function (head) {
    let a = head;
    let b = head;
    while (b !== null && b.next !== null) {
        a = a.next;
        b = b.next.next;
        if (a === b) {
            while (head !== null) {
                if (b === head) {
                    return head;
                }
                head = head.next;
                b = b.next;
            }
        }
    }
    return null
};

/** 
 * leetcode - 20 - 有效的括号 
 */
var isValid = function (s) {
    const stack = [];
    for (char of s) {
        if (char === '(' || char === '{' || char === '[') {
            stack.push(char);
        } else if (char === ')' && stack.pop() === '(') {
            continue;
        } else if (char === '}' && stack.pop() === '{') {
            continue;
        } else if (char === ']' && stack.pop() === '[') {
            continue;
        } else {
            return false;
        }
    }
    if (stack.length !== 0) {
        return false;
    } else {
        return true;
    }
};

/** 
 * leetcode - 155 - 最小栈
 */
var MinStack = function () {
    this.dataStack = [];
    this.infoStack = [];
};

/** 
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function (val) {
    this.dataStack.push(val);
    if (this.infoStack.length === 0) {
        this.infoStack.push(val);
    } else {
        const infoStackTop = this.infoStack[this.infoStack.length - 1]
        this.infoStack.push(Math.min(val, infoStackTop));
    }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
    this.dataStack.pop();
    this.infoStack.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
    return this.dataStack[this.infoStack.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
    return this.infoStack[this.infoStack.length - 1];
};

/**
 * leetcode - 150 - 逆波兰表达式求值
 */
 const calc = (a, b, sign) => {
    if (sign === '+') {
        return a + b;
    } else if (sign === '-') {
        return a - b;
    } else if (sign === '*') {
        return a * b;
    } else if (sign === '/') {
        return parseInt(a / b);
    }
}

var evalRPN = function (tokens) {
    const stack = [];
    for (token of tokens) {
        if (isNaN(Number(token))) {
            const b = stack.pop();
            const a = stack.pop();
            stack.push(calc(a, b, token));
        } else {
            stack.push(Number(token));
        }
    }
    return stack.pop();
};

/**
 * leetcode - 224 - 基本计算器
 */
//  后缀表达式求值
const calcReversePolish = (str) => {
    const stack = [];
    for (let char of str) {
        if (!isNaN(Number(char))) {
            stack.push(char);
        } else {
            const b = Number(stack.pop());
            const a = Number(stack.pop());
            if (char === '+') {
                stack.push(a + b);
            } else if (char === '-') {
                stack.push(a - b);
            } else if (char === '*') {
                stack.push(a * b);
            } else if (char === '/') {
                stack.push(parseInt(a / b));
            }
        }
    }
    return stack.pop();
}

// main
var calculate = function (s) {
    // 预处理字符串,解决数字正负号问题
    let lastChar = s[0];
    let newArray = [];
    for (let char of s) {
        if (char === ' ') {
            continue
        }
        if (lastChar
            && (lastChar === '+' || lastChar === '-' || lastChar === '(')
            && (char === '+' || char === '-')) {
            newArray.push('0');
        }
        newArray.push(char);
        lastChar = char;
    }
    // 中缀转后缀
    const taget = [];
    const signStack = [];
    const signLevelMap = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
    }
    let num = '';
    for (let char of newArray) {
        // 处理数字
        if (!isNaN(Number(char))) {
            num = num + char;
        } else if (num !== '') {
            taget.push(num);
            num = '';
        }

        // 处理符号
        if (signLevelMap[char]) {
            while (signStack.length !== 0
                && signLevelMap[signStack[signStack.length - 1]] >= signLevelMap[char]) {
                taget.push(signStack.pop());
            }
            signStack.push(char);
        }

        // 处理括号
        if (char === '(') {
            signStack.push(char);
        } else if (char === ')') {
            while (signStack[signStack.length - 1] !== '(') {
                taget.push(signStack.pop());
            }
            signStack.pop();
        }
    }
    // 处理符号栈内的剩余运算符
    if (num) {
        taget.push(num);
    }
    while (signStack.length !== 0) {
        taget.push(signStack.pop());
    }
    // 计算后缀表达式
    return calcReversePolish(taget);
};