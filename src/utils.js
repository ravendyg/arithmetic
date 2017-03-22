'use strict';

module.exports = {
  strToReversedArr,
  exp,
  putBiggestFirst
};

function exp(num, power) {
    for (; power > 0; power--) {
        num += '0';
    }
    return num;
}

function strToReversedArr(input) {
    return input.split('').reverse();
}

function putBiggestFirst(num1, num2) {
    // can be done by simple string comparison
    // but we are not looking for simple solutions
    let max, min, sign = '';
    if (num1.length > num2.length) {
        max = num1;
        min = num2;
    } else if (num2.length > num1.length) {
        max = num2;
        min = num1;
        sign = '-';
    } else {
        for (let i = 0; i < num1.length; i++) {
            let a = +num1[i];
            let b = +num2[i];
            if (a < b) {
                max = num2;
                min = num1;
                sign = '-';
                break;
            } else if (a > b)  {
                max = num1;
                min = num2;
                break;
            }
        }
        max = max || num1;
        min = min || num2;
    }
    return {max, min, sign};
}