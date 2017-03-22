/* global describe, it */
'use strict';

const chai = require('chai');
const assert = chai.assert;

const {add, subtract, multiply, divide} = require('../index');


describe('basic arithmetic operations' , function testBasciOperation() {
  it('perform different additions', function performAddition() {
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
  });

  it('perform different subtractions', function performSubtraction() {
    assert.equal(subtract('1', '2'), '-1');
    assert.equal(subtract('2', '1'), '1');
    assert.equal(subtract('1', '1'), '0');
    assert.equal(subtract('2', '-1'), '3');
    assert.equal(subtract('-2', '-1'), '-1');
    assert.equal(subtract('2', '11'), '-9');
    assert.equal(subtract('90', '11'), '79');
    assert.equal(subtract('342', '9'), '333');
    assert.equal(subtract('101', '2'), '99');
    assert.equal(subtract('9', '3429'), '-3420');
    assert.equal(subtract('12345678901234567890', '1'), '12345678901234567889');
    assert.equal(subtract('12345678901234567890', '11'), '12345678901234567879');
    assert.equal(subtract('1', '12345678901234567890'), '-12345678901234567889');
  });
});

describe('composite arithmetic operations' , function testCompositeOperation() {
  it('perform different multiplications', function performMultiplication() {
    assert.equal(multiply('1', '1'), '1');
    assert.equal(multiply('1', '-1'), '-1');
    assert.equal(multiply('-1', '1'), '-1');
    assert.equal(multiply('1', '0'), '0');
    assert.equal(multiply('-1', '0'), '0');
    assert.equal(multiply('3', '4'), '12');
    assert.equal(multiply('12345678900000', '12'), '148148146800000');
    assert.equal(multiply('12', '12345678900000'), '148148146800000');
    assert.equal(multiply('12', '-12345678900000'), '-148148146800000');
  });

  it('perform different divisions', function performDivision() {
    let res;

    res = divide('1', '1');
    assert.equal(res[0], '1');
    assert.equal(res[1], '0');

    res = divide('121', '11');
    assert.equal(res[0], '11');
    assert.equal(res[1], '0');

    res = divide('123', '11');
    assert.equal(res[0], '11');
    assert.equal(res[1], '2');

    res = divide('-123', '11');
    assert.equal(res[0], '-11');
    assert.equal(res[1], '-2');

    res = divide('123', '-11');
    assert.equal(res[0], '-11');
    assert.equal(res[1], '2');

    res = divide('-123', '-11');
    assert.equal(res[0], '11');
    assert.equal(res[1], '-2');
  });
});