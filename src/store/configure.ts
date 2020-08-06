import {createStore} from "redux";
import rootReducer from "./redux";

export default function configure(){
  const store = createStore(rootReducer, {});
  return store;
}

