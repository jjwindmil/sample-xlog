import {useDispatch} from 'react-redux';
import {useCallback} from 'react';

import * as xlogActions from '../../store/redux/xlog/actions';

export default function useXlogActions(){
  const dispatch = useDispatch();
  //매번 생성안하고 dispatch 값이 바뀌때마다 실행
  const onTest = useCallback(
    (str: string) => dispatch(xlogActions.test(str)),
    [dispatch]
  );
  return { onTest };
}
