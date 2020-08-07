import {createStore, compose, applyMiddleware} from "redux";
import rootReducer from "./redux";
import applySagaMiddleWare from "redux-saga"
import rootSaga from "./saga";

const sagaMiddle = applySagaMiddleWare();

export default function configure(){
  const store = createStore(rootReducer, {}, compose(applyMiddleware(sagaMiddle)));
  sagaMiddle.run(rootSaga);
  return store;
}

