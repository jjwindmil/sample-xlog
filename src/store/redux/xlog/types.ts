import {ActionType} from 'typesafe-actions';
import * as actions from './actions'

export type XlogActions = ActionType<typeof actions>;

export interface XlogState {
  xlog: any[];
  profile: any[];


}
