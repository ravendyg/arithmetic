'use strict';

const utils = require('./utils');
const {add, subtract} = require('./basic');

module.exports = {
  multiply, divide
};

function multiply(_mult1, _mult2) {
    if (_mult1 === '0' || _mult2 === '0') {
        return '0';
    }
    if (_mult1[0] === '-' && _mult2[0] === '-') {
        return multiply(_mult1.slice(1, _mult1.length), _mult2.slice(1, _mult2.length));
    }
    if (_mult1[0] === '-') {
        return '-' + multiply(_mult1.slice(1, _mult1.length), _mult2);
    }
    if (_mult2[0] === '-') {
        return '-' + multiply(_mult1, _mult2.slice(1, _mult2.length));
    }

    let mult1;
    let next = 0;

    if (_mult2.length === 1) {
        let out = [];
        let coef = +_mult2[0];
        mult1 = utils.strToReversedArr(_mult1);
        for (let i = 0; i < mult1.length; i++) {
            let multiplyed = +mult1[i] || 0;
            let temp = multiplyed * coef + next;
            out.push(temp % 10);
            next = Math.floor(temp / 10);
        }
        if (next > 0) {
            out.push(next);
        }
        return out.reverse().join('');
    }

    let prod = '0';
    let mult2 = utils.strToReversedArr(_mult2);
    for (let i = 0; i < mult2.length; i++) {
        prod = add(prod, utils.exp(multiply(_mult1, mult2[i]), i));
    }
    return prod;
}

function divide(top, bottom) {
    if (bottom === '0' || bottom === '-0') {
        throw new Error('Division by zero');
    }
    if (bottom === '1') {
        return [top, '0'];
    }
    if (bottom === '-1') {
        if (top[0] === '-') {
            return [top.slice(1, top.length), '0'];
        } else {
            return ['-' + top, '0'];
        }
    }
    if (top[0] === '-' && bottom[0] === '-') {
        let [coef, remainder] = divide(top.slice(1, top.length), bottom.slice(1, bottom.length));
        return [coef, '-' + remainder];
    }
    if (top[0] === '-') {
        let [coef, remainder] = divide(top.slice(1, top.length), bottom);
        return ['-' + coef, '-' + remainder];
    }
    if (bottom[0] === '-') {
        let [coef, remainder] = divide(top, bottom.slice(1, bottom.length));
        return ['-' + coef, remainder];
    }
    let {max} = utils.putBiggestFirst(top, bottom);
    if (max !== top) {
        return ['0', top];
    }

    let coef = '0', res = '0';
    while (true) {
        res = subtract(top, bottom);
        if (res[0] === '-') {
            return [coef, top];
        } else {
            coef = add(coef, '1');
            top = res;
        }
    }
}