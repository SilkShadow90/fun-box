import { CALL_STORE } from '../../store/reduxMiddleware';
import {
  SWITCH_SIDEBAR_START,
  SWITCH_SIDEBAR_SUCCESS,
  SWITCH_SIDEBAR_ERROR,
} from './types';

// eslint-disable-next-line import/prefer-default-export
export function switchSidebar() {
  const call = {};
  call[CALL_STORE] = {
    data: true,
    unifier: 'switch sidebar',
    startType: SWITCH_SIDEBAR_START,
    successType: SWITCH_SIDEBAR_SUCCESS,
    errorType: SWITCH_SIDEBAR_ERROR,
  };

  return call;
}
