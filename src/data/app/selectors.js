import { createSelector } from 'reselect';
import { Selector } from '../../utils';

export const selectConnection = Selector.getRootBranch('app');

export const selectIsSidebarOpen = createSelector(selectConnection, state => Selector
  .validate(state.isSidebarOpen, 'boolean'));
