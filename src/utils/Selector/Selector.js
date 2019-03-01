import { createSelector } from 'reselect';

const checkState = state => state;

export const getRootBranch = branchName => createSelector(
  checkState,
  state => state[branchName],
);

const isArray = array => Array.isArray(array) && array.length !== 0;
const isObject = object => Object.prototype.toString.call(object) === '[object Object]';

export const validate = (collection, type, mayByNull = false) => {
  if (mayByNull && collection === null) {
    return collection;
  }
  if (type === 'boolean') {
    return !!collection;
  }
  if (type === 'string') {
    return collection.toString();
  }
  if (type === 'number') {
    return Number(collection);
  }
  if ((type === 'array' && collection && isArray(collection))
    || (type === 'object' && collection && isObject(collection))) {
    return collection;
  }
  if (type === 'array') {
    return [];
  }
  if (type === 'object') {
    return {};
  }

  return undefined;
};

export default {
  getRootBranch,
  validate,
};
