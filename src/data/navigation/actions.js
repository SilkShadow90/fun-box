import { CALL_STORE } from '../../store/reduxMiddleware';
import {
  GET_NAVIGATION_LIST_ERROR,
  GET_NAVIGATION_LIST_START,
  GET_NAVIGATION_LIST_SUCCESS,
  ADD_NAVIGATION_LIST_ERROR,
  ADD_NAVIGATION_LIST_START,
  ADD_NAVIGATION_LIST_SUCCESS,
  DELETE_NAVIGATION_LIST_ERROR,
  DELETE_NAVIGATION_LIST_START,
  DELETE_NAVIGATION_LIST_SUCCESS,
  REORDER_NAVIGATION_LIST_START,
  REORDER_NAVIGATION_LIST_SUCCESS,
  REORDER_NAVIGATION_LIST_ERROR,
  MOVE_MAP_START,
  MOVE_MAP_SUCCESS,
  MOVE_MAP_ERROR,
  MOVE_PLACE_MARK_START,
  MOVE_PLACE_MARK_SUCCESS,
  MOVE_PLACE_MARK_ERROR,
} from './types';

export function getNavigationList() {
  const call = {};
  call[CALL_STORE] = {
    unifier: 'get navigation list',
    startType: GET_NAVIGATION_LIST_START,
    successType: GET_NAVIGATION_LIST_SUCCESS,
    errorType: GET_NAVIGATION_LIST_ERROR,
  };

  return call;
}

export function addNavigationList(item) {
  const call = {};
  call[CALL_STORE] = {
    data: item,
    unifier: 'add navigation list',
    startType: ADD_NAVIGATION_LIST_START,
    successType: ADD_NAVIGATION_LIST_SUCCESS,
    errorType: ADD_NAVIGATION_LIST_ERROR,
  };

  return call;
}

export function removeNavigationList(item) {
  const call = {};
  call[CALL_STORE] = {
    data: item,
    unifier: 'remove navigation list',
    startType: DELETE_NAVIGATION_LIST_START,
    successType: DELETE_NAVIGATION_LIST_SUCCESS,
    errorType: DELETE_NAVIGATION_LIST_ERROR,
  };

  return call;
}

export function reorderNavigationList(items) {
  const call = {};
  call[CALL_STORE] = {
    data: items,
    unifier: 'reorder navigation list',
    startType: REORDER_NAVIGATION_LIST_START,
    successType: REORDER_NAVIGATION_LIST_SUCCESS,
    errorType: REORDER_NAVIGATION_LIST_ERROR,
  };

  return call;
}

export function setMapCenter(position) {
  const call = {};
  call[CALL_STORE] = {
    data: position,
    unifier: 'move map',
    startType: MOVE_MAP_START,
    successType: MOVE_MAP_SUCCESS,
    errorType: MOVE_MAP_ERROR,
  };

  return call;
}

export function setNewPlaceMarkPosition(position, id) {
  const call = {};
  call[CALL_STORE] = {
    data: {
      id,
      content: id,
      position,
    },
    unifier: 'move placeMark',
    startType: MOVE_PLACE_MARK_START,
    successType: MOVE_PLACE_MARK_SUCCESS,
    errorType: MOVE_PLACE_MARK_ERROR,
  };

  return call;
}
