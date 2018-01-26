import { combineReducers } from 'redux';
import reducer from './user.js';
import { routerReducer } from 'react-router-redux'


const allReducers = combineReducers({
  router: routerReducer,
  userData: reducer,
})

export default allReducers;
