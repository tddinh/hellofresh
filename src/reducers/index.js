import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import login from './login';
import recipes from './recipes';

const rootReducer = combineReducers({
  login,
  recipes,
  routing: routerReducer
});

export default rootReducer;