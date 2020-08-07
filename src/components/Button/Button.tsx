import React, {useState} from 'react';
import {Button, Input} from "antd";
import useXlogActions from "../../hooks/xlog/useXlogActions";
export default function ButtonComp(){
  const [value, setValue] = useState("");
  const { onTest , onGetData} = useXlogActions();

  const onClick = (e:any) =>{
    e.preventDefault();
    //onTest(value);
    onGetData();
  };
  return (
    <>
      {/*<Input value={value} onChange={(e)=>setValue(e.target.value)}></Input>*/}
      <Button onClick={onClick}>Get Data</Button>
    </>
  );
}
