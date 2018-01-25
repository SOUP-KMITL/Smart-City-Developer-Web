import { combineReducers } from 'redux';
import reducer from './user.js';


const allReducers = combineReducers({
  user: reducer,
})

export default allReducers;
