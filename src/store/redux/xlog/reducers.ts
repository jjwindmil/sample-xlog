import {createReducer} from 'typesafe-actions';
import {XlogActions, XlogState } from './types';
import {TEST} from "./actions";

const initialState = {
  xlog:[],
  profile:[],
}

const state = createReducer<XlogState, XlogActions>(initialState, {
  [TEST] : (state, action) =>{
    //parameter는 action의 payload에 들어있음
    const {payload} = action;
    console.log(state);
    console.log(payload);
    return state;
  }
});

export default state;
