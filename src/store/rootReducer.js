import { combineReducers } from 'redux';
import navigation from '../data/navigation';
import app from '../data/app';

export const treeReducer = combineReducers({
  app,
  navigation,
});

const order = [treeReducer];

export default function rootReducer(state, action) {
  return order.reduce(
    (currentState, reducer) => reducer(currentState, action),
    state,
  );
}
