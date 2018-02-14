import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import reducer from './user.js';
import notify from './notify.js';


const allReducers = combineReducers({
  userData: reducer,
  notify: notify,
  router: routerReducer,
})

export default allReducers;
