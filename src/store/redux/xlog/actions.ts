import { createAction } from 'typesafe-actions';
import { SetDataParam } from './types';

export const TEST = 'xlog/TEST';
export const GET_DATA = 'xlog/GET_DATA';
export const SET_DATA = 'xlog/SET_DATA';

//parameter string을 받아오는걸 로 바꿈
export const test = createAction(TEST)<string>();
export const getData = createAction(GET_DATA)();
export const setData = createAction(SET_DATA)<SetDataParam>();
