interface Action<T> {
  payload: T
}


export function* getData(){
  console.log("get Data");
}
