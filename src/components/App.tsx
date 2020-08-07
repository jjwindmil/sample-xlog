import React from "react";
import {Provider} from 'react-redux';

import configure from '../store/configure';
import Button  from "./Button";
import "../styles/index.css";
import Xlog from "./Xlog";
import D3Sample from "./D3Sample";

const store = configure();
export default function App(){
  return (
   <Provider store={store}>
     <Button></Button>
     <Xlog></Xlog>
     <hr/>
     <D3Sample/>
   </Provider>

  )
}
