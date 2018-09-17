import { createStore, applyMiddleware } from 'redux';
import allReducers from './reducers';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import promise from 'redux-promise-middleware';


// Redux
// Store is all this application data.
const logger = createLogger({});
const store = createStore(
  allReducers,
  {},
  applyMiddleware(logger, thunk, promise()),
);
// Reducer is a function that tells what data to store in store.
//         They take an action adn update part of the application
//         state. Reducers are broken down by parts.
// Provider makes your store/data available to the containers.

export default store;
