import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import App from './App';
import { Sidebar, Map } from './components';

describe('check App', () => {
  const renderer = new ShallowRenderer();

  renderer.render(<App />);
  const result = renderer.getRenderOutput();

  test('check expect type', () => {
    expect(result.type).toBe('div');
  });

  test('check expect className', () => {
    expect(result.props.className).toBe('App');
  });

  test('check expect children', () => {
    expect(result.props.children).toEqual([
      <Sidebar />,
      <Map />,
    ]);
  });

  test('check expect match snapshot', () => {
    expect(result).toMatchSnapshot();
  });
});
