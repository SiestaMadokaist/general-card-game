import Immutable from 'immutable'
import { TodoActions } from 'actions'
const defaultState = new Immutable.List();
function todoReducer(state = defaultState, action){
  switch(action.type){
    case TodoActions.CREATE_TODO:
      return state.concat(action.text);
    case TodoActions.EDIT_TODO:
      return state.set(action.id, action.text);
    case TodoActions.DELETE_TODO:
      return state.delete(action.id)
    default:
       return state;
  }
}

export default todoReducer;
