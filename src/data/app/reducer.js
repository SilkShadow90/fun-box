import * as ActionType from './types';
import { appState } from '../../store/initialState';

export default function (state = appState, action) {
  switch (action.type) {
    case ActionType.SWITCH_SIDEBAR_START:
      return {
        ...state,
        appConfigChanging: true,
        appConfigChangingError: null,
      };
    case ActionType.SWITCH_SIDEBAR_SUCCESS:
      return {
        ...state,
        appConfigChanging: false,
        isSidebarOpen: !state.isSidebarOpen,
      };
    case ActionType.SWITCH_SIDEBAR_ERROR:
      return {
        ...state,
        appConfigChanging: false,
        appConfigChangingError: action.error,
      };

    default:
      return state;
  }
}
