import React from 'react';
import Renderer from 'react-test-renderer';

import IconButton from './IconButton';

describe('check IconButton component', () => {
  const renderer = Renderer.create(
    <IconButton
      color="secondary"
      icon="keyboard_arrow_left"
      size="small"
    />,
  );

  const button = renderer.toJSON();

  test('check expect match type', () => {
    expect(button.type).toBe('button');
  });

  test('check expect match children', () => {
    expect(button.children[0].type).toBe('span');
    expect(button.props.className).toMatch('Secondary');
    expect(button.children[0].children[0].props.className).toMatch('fontSizeSmall');
    expect(button.children[0].children[0].children[0]).toBe('keyboard_arrow_left');
    expect(button.children[1].type).toBe('span');
  });

  test('check expect match snapshot', () => {
    expect(button).toMatchSnapshot();
  });
});
