import { combineReducers } from 'redux';
import reducer from './user.js';
import { routerReducer } from 'react-router-redux';


const allReducers = combineReducers({
  userData: reducer,
  router: routerReducer,
})

export default allReducers;
