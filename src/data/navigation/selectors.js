import { createSelector } from 'reselect';
import { Selector } from '../../utils';

const selectConnection = Selector.getRootBranch('navigation');

export const selectNavigationList = createSelector(selectConnection, state => Selector
  .validate(state.navigationList, 'array'));

export const selectPlaceMarkRoute = createSelector(selectConnection, state => Selector
  .validate(state.navigationList.map(placeMark => placeMark.position), 'array'));
