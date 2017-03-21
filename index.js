'use strict';

const assert = require('assert');

const {add, subtract} = require('./src/basic');
const {multiply} = require('./src/composite');

module.exports = {
    add, subtract,
    multiply
};










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

assert.equal(multiply('1', '1'), '1');
assert.equal(multiply('1', '-1'), '-1');
assert.equal(multiply('-1', '1'), '-1');
assert.equal(multiply('1', '0'), '0');
assert.equal(multiply('-1', '0'), '0');
assert.equal(multiply('3', '4'), '12');
assert.equal(multiply('12345678900000', '12'), '148148146800000');
assert.equal(multiply('12', '12345678900000'), '148148146800000');
assert.equal(multiply('12', '-12345678900000'), '-148148146800000');

console.log('pass');