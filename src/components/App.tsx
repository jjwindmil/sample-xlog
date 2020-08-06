import React from "react";
import {Provider} from 'react-redux';

import configure from '../store/configure';
import Button  from "./Button";
import "../styles/index.css";
import Xlog from "./Xlog";

const store = configure();
export default function App(){
  return (
   <Provider store={store}>
     <Button></Button>
     <Xlog></Xlog>
   </Provider>

  )
}
