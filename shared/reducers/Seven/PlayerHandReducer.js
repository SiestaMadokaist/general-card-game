import { SET, INITIALIZE } from 'shared/actions/Seven/HandActions';
import assert from 'underscore.assert';

class PlayerHand {
  /*
   * @params playableCount {Integer}
   * @params closedCount {Integer}
   * @params closedCards = {Immutable.List}
   */
  static construct(playableCount, closedCount, closedCards = new Immutable.List()){
    return Immutable.fromJS({
      playableCount, closedCount, closedCards
    })
}

const defaultState = Immutable.List()
  .concat(PlayerHand.construct(0, 0))
  .concat(PlayerHand.construct(0, 0))
  .concat(PlayerHand.construct(0, 0))

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
