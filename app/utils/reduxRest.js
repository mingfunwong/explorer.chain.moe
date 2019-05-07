export const requestTypes = (payload = null) => ({
  usable: false,
  loading: false,
  payload,
  error: false,
});

export const generateReduxRequest = (
  actionType,
  actionPrefix,
  initialPayload = requestTypes().payload,
) => {
  const toHump = name =>
    name.replace(/_(\w)/g, (all, letter) => letter.toUpperCase());
  const ATU = actionType.toUpperCase();
  const atl = actionType.toLowerCase();
  const atH = toHump(atl);

  return {
    constants: {
      [`${ATU}_REQUEST`]: `${actionPrefix}${ATU}_REQUEST`,
      [`${ATU}_SUCCESS`]: `${actionPrefix}${ATU}_SUCCESS`,
      [`${ATU}_FAILURE`]: `${actionPrefix}${ATU}_FAILURE`,
    },
    actions: {
      [`${atH}Request`]: payload => ({
        type: `${actionPrefix}${ATU}_REQUEST`,
        payload,
      }),
      [`${atH}Success`]: payload => ({
        type: `${actionPrefix}${ATU}_SUCCESS`,
        payload,
      }),
      [`${atH}Failure`]: payload => ({
        type: `${actionPrefix}${ATU}_FAILURE`,
        payload,
      }),
    },
    reducer: {
      [`${actionPrefix}${ATU}_REQUEST`]: state =>
        state.setIn([atH, 'loading'], true),
      [`${actionPrefix}${ATU}_SUCCESS`]: (state, action) =>
        state
          .setIn([atH, 'loading'], false)
          .setIn([atH, 'payload'], action.payload)
          .setIn([atH, 'error'], false)
          .setIn([atH, 'usable'], true),
      [`${actionPrefix}${ATU}_FAILURE`]: (state, action) =>
        state
          .setIn([atH, 'loading'], false)
          .setIn([atH, 'payload'], action.payload)
          .setIn([atH, 'error'], false)
          .setIn([atH, 'usable'], false),
    },
    state: {
      [atH]: requestTypes(initialPayload),
    },
  };
};
