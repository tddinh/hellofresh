import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';

const reduxRouterMiddleware = routerMiddleware(browserHistory);

export default function configureStore(initialState) {
  const finalCreateStore = compose(
    applyMiddleware(thunk, reduxRouterMiddleware, createLogger()),
      window.devToolsExtension ? window.devToolsExtension() : null
  )(createStore);

  const store = finalCreateStore(
    rootReducer,
    initialState
  );

  return store;
}