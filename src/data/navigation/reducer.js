import * as ActionType from './types';
import { navigationState } from '../../store/initialState';

export default function (state = navigationState, action) {
  let newNavigationList = state.navigationList;
  let deleteIndex;
  let changeItem;

  switch (action.type) {
    case ActionType.GET_NAVIGATION_LIST_START:
      return {
        ...state,
        navigationListIsLoading: true,
        navigationListError: null,
      };
    case ActionType.GET_NAVIGATION_LIST_SUCCESS:
      return {
        ...state,
        navigationListIsLoading: false,
        navigationList: action.data,
      };
    case ActionType.GET_NAVIGATION_LIST_ERROR:
      return {
        ...state,
        navigationListIsLoading: false,
        navigationListError: action.error,
      };

    case ActionType.ADD_NAVIGATION_LIST_START:
      return {
        ...state,
        navigationListIsLoading: true,
        navigationListError: null,
      };
    case ActionType.ADD_NAVIGATION_LIST_SUCCESS:
      return {
        ...state,
        navigationListIsLoading: false,
        navigationList: [
          ...state.navigationList,
          { ...action.local, position: state.mapCenter },
        ],
      };
    case ActionType.ADD_NAVIGATION_LIST_ERROR:
      return {
        ...state,
        navigationListIsLoading: false,
        navigationListError: action.error,
      };

    case ActionType.DELETE_NAVIGATION_LIST_START:
      return {
        ...state,
        navigationListIsLoading: true,
        navigationListError: null,
      };
    case ActionType.DELETE_NAVIGATION_LIST_SUCCESS:
      newNavigationList = state.navigationList;
      deleteIndex = newNavigationList.findIndex(item => item.id === action.local);

      if (deleteIndex !== -1) {
        newNavigationList = newNavigationList
          .filter((item, index) => item && index !== deleteIndex);
      }

      return {
        ...state,
        navigationListIsLoading: false,
        navigationList: newNavigationList,
      };
    case ActionType.DELETE_NAVIGATION_LIST_ERROR:
      return {
        ...state,
        navigationListIsLoading: false,
        navigationListError: action.error,
      };

    case ActionType.REORDER_NAVIGATION_LIST_START:
      return {
        ...state,
        navigationListIsLoading: true,
        navigationListError: null,
      };
    case ActionType.REORDER_NAVIGATION_LIST_SUCCESS:
      return {
        ...state,
        navigationListIsLoading: false,
        navigationList: [
          ...action.local,
        ],
      };
    case ActionType.REORDER_NAVIGATION_LIST_ERROR:
      return {
        ...state,
        navigationListIsLoading: false,
        navigationListError: action.error,
      };

    case ActionType.MOVE_MAP_START:
      return {
        ...state,
        mapCenterChanging: true,
        mapCenterChangingError: null,
      };
    case ActionType.MOVE_MAP_SUCCESS:
      return {
        ...state,
        mapCenterChanging: false,
        mapCenter: action.local,
      };
    case ActionType.MOVE_MAP_ERROR:
      return {
        ...state,
        mapCenter: [null, null],
        mapCenterChanging: false,
        mapCenterChangingError: action.error,
      };

    case ActionType.MOVE_PLACE_MARK_START:
      return {
        ...state,
        navigationListIsLoading: true,
        navigationListError: null,
      };
    case ActionType.MOVE_PLACE_MARK_SUCCESS:
      changeItem = newNavigationList.findIndex(placeMark => placeMark.id === action.local.id);

      if (changeItem !== -1) {
        newNavigationList[changeItem] = { ...action.local };
      }

      return {
        ...state,
        navigationListIsLoading: false,
        navigationList: [
          ...newNavigationList,
        ],
      };
    case ActionType.MOVE_PLACE_MARK_ERROR:
      return {
        ...state,
        navigationListIsLoading: false,
        navigationListError: action.error,
      };

    default:
      return state;
  }
}
