import { validate } from './Selector';

describe('check Selector util', () => {
  test('check expect string type', () => {
    expect(validate('app', 'string')).toBe('app');
    expect(validate({ app: 'app' }, 'string')).toBe('[object Object]');
  });

  test('check expect boolean type', () => {
    expect(validate('exist', 'boolean')).toBeTruthy();
    expect(validate(null, 'boolean')).not.toBeTruthy();
  });

  test('check expect number type', () => {
    expect(validate('4', 'number')).toBe(4);
    expect(validate(11, 'number')).toBe(11);
    expect(validate('11', 'number')).not.toBe('11');
    expect(validate('test', 'number')).toBe(NaN);
  });

  test('check expect array type', () => {
    expect(validate(137, 'array')).toEqual([]);
    expect(validate([1, 2, 3], 'array')).toEqual([1, 2, 3]);
    expect(validate('test', 'array')).toEqual([]);
  });

  test('check expect object type', () => {
    expect(validate(137, 'object')).toEqual({});
    expect(validate({ a: 'a', b: 3 }, 'object')).toEqual({ a: 'a', b: 3 });
    expect(validate('test', 'object')).toEqual({});
  });
});
