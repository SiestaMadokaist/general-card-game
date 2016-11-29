import Immutable from 'immutable';
import { SuitRowFactory, DIAMOND, CLOVER, HEART, SPADE } from './SuitRowFactory';
import { REPLACE } from "actions/Seven/SuitRowActions";

const defaultState = new Immutable.List()
  .push(SuitRowFactory.construct(DIAMOND))
  .push(SuitRowFactory.construct(CLOVER))
  .push(SuitRowFactory.construct(HEART))
  .push(SuitRowFactory.construct(SPADE))

  /*
   * @params action {Object}
   * @params action.type {String}
   * @params action.suit {Integer}
   * @params action.newState {SuitRow}
   */
export default function suitrowReducer(state = defaultState, action){
  if(action.type !== REPLACE){
    return state;
  }else{
    const targetSuit = action.suit;
    return state.set(targetSuit, action.newState)
  }
}
