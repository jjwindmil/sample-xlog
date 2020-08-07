import {createReducer} from 'typesafe-actions';
import {XlogActions, XlogState } from './types';
import {TEST, SET_DATA} from "./actions";


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
  },
  [SET_DATA] : (state, action) => {
    const { key, value} = action.payload;

    return {...state,[key]:value};
  }
});

export default state;
