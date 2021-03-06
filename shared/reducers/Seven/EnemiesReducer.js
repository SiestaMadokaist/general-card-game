import {List, fromJS }from 'immutable';
import { INITIALIZE } from 'actions/Seven/EnemiesActions';

// const defaultState = new Immutable.List();
const defaultState = new List()
  .push(fromJS({closedCount: 0, playableCount: 13, playerName: "ramadoka"}))
  .push(fromJS({closedCount: 0, playableCount: 13, playerName: "ramadoka2"}))
  .push(fromJS({closedCount: 0, playableCount: 13, playerName: "ramadoka3"}))

export default function enemiesReducer(state = defaultState, action){
  if(action.type === INITIALIZE){
    return new List(action.knownState);
  } else {
    return state;
  }
}
