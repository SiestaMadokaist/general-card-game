import Immutable from 'immutable';
import { SuitRowFactory } from './SuitRowFactory';
import { REPLACE } from "actions/Seven/SuitRowActions";

const defaultState = new Immutable.List()
  .push(SuitRowFactory.construct(0))
  .push(SuitRowFactory.construct(1))
  .push(SuitRowFactory.construct(2))
  .push(SuitRowFactory.construct(3))

export default function suitrowReducer(state = defaultState, action){
  if(action.type !== REPLACE){
    return state;
  }else{
    const targetSuit = action.suit;
    return state;
  }
}
