import {put, takeEvery, fork} from 'redux-saga/effects';
import * as XlogActions from '../redux/xlog/actions';
import * as XlogSaga from './xlog';
export default function* rootSaga(){
  yield fork(handleXlog);
}

function* handleXlog(){
  yield takeEvery(XlogActions.getData, XlogSaga.getData);
}
