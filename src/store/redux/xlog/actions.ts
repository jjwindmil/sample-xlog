import { createAction } from 'typesafe-actions';

export const TEST = 'xlog/TEST';

//parameter string을 받아오는걸 로 바꿈
export const test = createAction(TEST)<string>();
