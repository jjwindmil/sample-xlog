import { combineReducers } from 'redux';

import xlog from "./xlog";

const appReducer = combineReducers({
  xlog
});

const rootReducer = (state:any, action:any )=>{
  return appReducer(state, action);
}

export default rootReducer;

export type RootType = ReturnType<typeof rootReducer>;
