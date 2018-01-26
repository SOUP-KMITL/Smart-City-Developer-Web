import { combineReducers } from 'redux';
import reducer from './user.js';


const allReducers = combineReducers({
  userData: reducer,
})

export default allReducers;
