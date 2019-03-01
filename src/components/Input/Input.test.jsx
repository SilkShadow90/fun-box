import React from 'react';
import Renderer from 'react-test-renderer';

import Input from './Input';

describe('check Input component', () => {
  const renderer = Renderer.create(
    <Input
      placeholder="test"
      label="test label"
    />,
  );

  const input = renderer.toJSON();

  test('check expect match type', () => {
    expect(input.type).toBe('div');
  });

  test('check expect match children', () => {
    expect(input.children[0].type).toBe('label');
    expect(input.children[0].children[0]).toBe('test label');
    expect(input.children[1].type).toBe('div');
    expect(input.children[1].children[0].type).toBe('input');
    expect(input.children[1].children[0].props.placeholder).toBe('test');
  });

  test('check expect match snapshot', () => {
    expect(input).toMatchSnapshot();
  });
});
