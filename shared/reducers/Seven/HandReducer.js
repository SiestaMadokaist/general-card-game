import Immutable from 'immutable';
import { HandActions } from 'actions';

const defaultState = new Immutable.List();

export default function handReducer(state = defaultState, action){
  switch(action.type){
    case HandActions.INITIALIZE:
      return new Immutable.List(action.cards);
    case HandActions.REMOVE:
      return state.delete(action.id)
    default: return defaultState;
  }
}
