/** 
 * leetcode - 66 - 加一        
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {
    if (digits[0] === 0) {
        return [1];
    }
    if (digits[digits.length - 1] + 1 <= 9) {
        digits[digits.length - 1] += 1;
        return digits;
    }
    for (let i = digits.length - 1; i >= 0; i--) {
        if (digits[i] + 1 === 10) {
            digits[i] = 0;
            if (i === 0) {
                digits.unshift(1);
                break;
            }
            continue;
        } else {
            digits[i] += 1;
            break;
        }
    }
    return digits;
};