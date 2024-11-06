import { expect } from 'chai';
import convertCamelToSnake from './camel-to-snake.js';

describe('camelToSnake', () => {
  it('should convert camelCase to snake_case', () => {
    const camelToSnake = (str) =>
      str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
    
    expect(camelToSnake('camelCase')).to.equal('camel_case');
    expect(camelToSnake('anotherExample')).to.equal('another_example');
    expect(camelToSnake('testString')).to.equal('test_string');
  });
});

describe('convertCamelToSnake middleware', () => {
  it('should convert all camelCase keys in req.body to snake_case', () => {
    const req = {
      body: {
        camelCaseKey: 'value',
        anotherExample: 'anotherValue'
      }
    };
    const res = {};
    let nextCalled = false;
    const next = () => { nextCalled = true; };

    convertCamelToSnake(req, res, next);

    expect(req.body).to.deep.equal({
      camel_case_key: 'value',
      another_example: 'anotherValue'
    });
    expect(nextCalled).to.be.true;
  });
});