// const { expect } = require('chai');
import { expect } from 'chai';

function sum(a, b) {
  return a + b;
}

describe('Функция sum', () => {
  it('должна возвращать сумму двух чисел', () => {
    expect(sum(2, 3)).to.equal(5);
  });

  it('должна возвращать число', () => {
    expect(sum(2, 3)).to.be.a('number');
  });
});

describe('первая тест функция', ()=>{
    if('тест первый', () => {
        
    });
})