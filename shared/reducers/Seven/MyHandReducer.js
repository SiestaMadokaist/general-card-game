import Immutable from 'immutable';
import MyHandActions from 'actions/Seven/MyHandActions';
import { Card } from './CardFactory';
import _ from 'lodash';

// const defaultState = new Immutable.List();

const cards = _.range(1, 14)
  .map(i => new Card(parseInt(Math.random() * 4), i).toMap())
const defaultState = Immutable.List().concat(cards);

export default function myHandReducer(state = defaultState, action){
  if(action.type === MyHandActions.INITIALIZE){
    return new Immutable.List(action.cards);
  }else if(action.type === MyHandActions.JUST_RESET){
    const cards = _.range(1, 14).map(i => new Card(parseInt(Math.random() * 4), i).toMap());
    return state.pop();
  }else {
    return state;
  }
}
