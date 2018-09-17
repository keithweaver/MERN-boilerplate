/*
 * This function returns an array of counters. Any element
 * you want to be saved into the store.
 */
export const getCounters = (state = null, action) => {
  console.log('CountersReducer_getCounters', action);
  switch (action.type) {
    case 'COUNTER_LOADED':
      console.log('COUNTER_LOADED', action.payload);
      return action.payload;
      break;
    case 'COUNTER_LOADED_FULFILLED':
      console.log('COUNTER_LOADED_FULFILLED', action.payload);
      return action.payload;
      break;
  }
  return state;
};

// This function lists for the ACTION. Whenever, any action gets
// called. It goes to all reducers.
// This will return the current active counter (selected one).
// State starts as null so if it's not selected. This is where
// you can default user if want.
// It will pass in the action too. You can check the type and
// payload.
// Reducers need to return some piece of data, hence payload.
export const selectedCounter = (state = null, action) => {
  switch (action.type) {
    case 'COUNTER_SELECT':
      return action.payload;
      break;
  }
  return state;
};
