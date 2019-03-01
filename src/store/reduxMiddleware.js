export const CALL_STORE = 'CALL_STORE';

export default ({ dispatch }) => next => (action) => {
  if (!action || !action[CALL_STORE]) { return next(action); }

  if (action[CALL_STORE].startType) {
    dispatch({
      type: action[CALL_STORE].startType,
    });
  }

  if (action[CALL_STORE].data) {
    const promise = new Promise((resolve) => {
      resolve(action[CALL_STORE].data);
    });

    return promise
      .then(
        (result) => {
          if (action[CALL_STORE].successType) {
            dispatch({
              type: action[CALL_STORE].successType,
              local: result,
            });
          }

          return Promise.resolve(result || true);
        },
        (error) => {
          if (action[CALL_STORE].errorType) {
            dispatch({
              type: action[CALL_STORE].errorType,
              error,
            });
          }

          return Promise.reject(error);
        },
      );
  }

  return {};
};
