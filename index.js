'use strict';

const assert = require('assert');

function add(_add1, _add2) {
    if (_add1[0] === '-' && _add2[0] === '-') {
        return '-' + add(_add1.slice(1, _add1.length), _add2.slice(1, _add2.length));
    } else if (_add1[0] === '-') {
        return subtract(_add2, _add1.slice(1, _add1.length));
    } else if (_add2[0] === '-') {
        return subtract(_add1, _add2.slice(1, _add2.length));
    }

    let out = [];
    const add1 = strToReversedArr(_add1);
    const add2 = strToReversedArr(_add2);

    let next = 0;

    for (let i = 0; i < Math.max(add1.length, add2.length); i++) {
        let first =   +add1[i] || 0;
        let second =  +add2[i] || 0;
        let sum = first + second + next;
        if (sum >= 10) {
            out.push(sum % 10);
            next = Math.floor(sum  / 10);
        } else {
            out.push(sum);
            next = 0;
        }
    }

    if (next > 0) {
        out.push(next);
    }

    return out.reverse().join('');
}

function subtract(from, what) {
    if (from[0] === '-' && what[0] === '-') {
        return '-' + subtract(from.slice(1, from.length), what.slice(1, what.length));
    } else if (from[0] === '-') {
        return subtract(what, from.slice(1, from.length));
    } else if (what[0] === '-') {
        return add(from, what.slice(1, what.length));
    }

    let out = [];
    const {max, min, sign} = putBiggestFirst(strToReversedArr(from), strToReversedArr(what));

    let next = 0;

    for (let i = 0; i < max.length; i++) {
        let f = +max[i];
        let w = +min[i] || 0;
        let subtr = w + next;

        if (f >= subtr) {
            out.push(f - subtr);
            next = 0;
        } else {
            out.push(f - subtr + 10);
            next = 1;
        }
    }
    out.push(sign);

    return out.reverse().join('');
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
            if (a <= b) {
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
    }
    return {max, min, sign};
}

assert.equal(add('1', '2'), '3');
assert.equal(add('1', '-2'), '-1');
assert.equal(add('-1', '-2'), '-3');
assert.equal(add('2', '1'), '3');
assert.equal(add('342', '1'), '343');
assert.equal(add('342', '9'), '351');
assert.equal(add('12345678901234567890', '1'), '12345678901234567891');
assert.equal(add('12345678901234567890', '11'), '12345678901234567901');
assert.equal(add('11', '12345678901234567890'), '12345678901234567901');
assert.equal(add('11', '-12345678901234567890'), '-12345678901234567879');

assert.equal(subtract('1', '2'), '-1');
assert.equal(subtract('2', '1'), '1');
assert.equal(subtract('2', '-1'), '3');
assert.equal(subtract('-2', '-1'), '-1');
assert.equal(subtract('342', '9'), '333');
assert.equal(subtract('9', '3429'), '-3420');
assert.equal(subtract('12345678901234567890', '1'), '12345678901234567889');
assert.equal(subtract('12345678901234567890', '11'), '12345678901234567879');
assert.equal(subtract('1', '12345678901234567890'), '-12345678901234567889');


console.log('pass');