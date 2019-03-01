export const appState = {
  isSidebarOpen: true,
  appConfigChanging: false,
  appConfigChangingError: null,
};

export const navigationState = {
  navigationList: [],
  navigationListError: null,
  navigationListIsLoading: false,
  mapCenter: [55.75, 37.57],
  mapCenterChanging: false,
  mapCenterChangingError: null,
};

export default {
  app: appState,
  navigation: navigationState,
};
