import Immutable from 'immutable';
class SuitRow{
  constructor(suit, top, bottom, available){
    this._state = {top, bottom, available}
    this.props = {suit}
  }

  suit(){
    return this.props.suit;
  }

  suitName(){
    return this.suitInverse(this.suit());
  }

  suitInverse(id){
    return ["DIAMOND", "CLOVER", "HEARTS", "SPADE"][id];
  }

}

const defaultState = new Immutable.Map()
  .set("Diamond", new Immutable.List())
  .set("Clover", new Immutable.List())
  .set("HEARTS", new Immutable.List())
  .set("SPADE", new Immutable.List())

export default function suitrowReducer(state = defaultState, action){
  const targetSuit = action.suit;
  const newSuitRow = new SuitRow(action.newState);
  return state.set(targetSuit, newSuitRow);
}
