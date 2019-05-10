import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import rootReducer from './rootReducer';
import reduxMiddleware from './reduxMiddleware';

const logger = createLogger({
  level: 'info',
  collapsed: false,
  logger: console,
});

export default function configureStore() {
  return createStore(
    rootReducer,
    compose(
      applyMiddleware(
        thunkMiddleware,
        logger,
        reduxMiddleware,
      ),
      // redux - dev-tool
      // eslint-disable-next-line no-underscore-dangle
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    ),
  );
}
