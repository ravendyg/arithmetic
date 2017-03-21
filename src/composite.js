'use strict';

const utils = require('./utils');
const {add} = require('./basic');

module.exports = {
  multiply
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