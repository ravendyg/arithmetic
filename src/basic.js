'use strict'

const utils = require('./utils');

module.exports = {
  add, subtract
}

function add(_add1, _add2) {
    if (_add1 === '0') {
        return _add2;
    }
    if (_add2 === '0') {
        return _add1;
    }
    if (_add1[0] === '-' && _add2[0] === '-') {
        return '-' + add(_add1.slice(1, _add1.length), _add2.slice(1, _add2.length));
    }
    if (_add1[0] === '-') {
        return subtract(_add2, _add1.slice(1, _add1.length));
    }
    if (_add2[0] === '-') {
        return subtract(_add1, _add2.slice(1, _add2.length));
    }

    let out = [];
    const add1 = utils.strToReversedArr(_add1);
    const add2 = utils.strToReversedArr(_add2);

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
    if (what === '0') {
        return from;
    }
    if (from[0] === '-' && what[0] === '-') {
        return '-' + subtract(from.slice(1, from.length), what.slice(1, what.length));
    }
    if (from[0] === '-') {
        return subtract(what, from.slice(1, from.length));
    }
    if (what[0] === '-') {
        return add(from, what.slice(1, what.length));
    }

    let out = [];
    const {max, min, sign} = utils.putBiggestFirst(utils.strToReversedArr(from), utils.strToReversedArr(what));

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

