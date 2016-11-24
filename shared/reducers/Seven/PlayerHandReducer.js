import { SET, INITIALIZE } from 'shared/actions/Seven/HandActions';
import assert from 'underscore.assert';

class PlayerHand {
  /*
   * @params availableCount [Integer]
   * @params closedCount [Integer]
   */
  constructor(availableCount = 0, closedCount = 0, closedCards = new Immutable.List()){
    this.props = {
      availableCount,
      closedCount,
      value
    }
  }
}

const defaultState = new Immutable.List()
  .concat(new PlayerHand())
  .concat(new PlayerHand())
  .concat(new PlayerHand())

export default function playerHandReducer(state = defaultState, action){
  if(action.type == INITIALIZE){
    assert(action.playerCount == 4 || action.playerCount == 3, `playerCount should be either 3 or 4, got ${action.playerCount} instead.`);
    if(action.playerCount == 4){
      return defaultState.concat(new PlayerHand());
    } else (action.playerCount == 3 ){
      return defaultState
    }
  } else if(action.type == HandActions.SET){
    const { playerId, availableCount, closedCount, values} = action;
    const playerHand = state.get(playerId);
    const newHand = new PlayerHand(availableCount, closedCount, values);
    return state.set(playerId, newHand);
  }else {
    return state;
  }
}


