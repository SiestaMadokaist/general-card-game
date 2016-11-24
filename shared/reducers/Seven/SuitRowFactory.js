import Immutable from 'immutable';
class SuitRowFactory {

  static construct(suit, top=7, bottom=7, available=false){
    return Immutable.Map({
      suit, top, bottom, available
    })
  }


  static suits(){
    return ["DIAMOND", "CLOVER", "HEARTS", "SPADE"];
  }

  static suitInverse(suitId){
    return this.suits()[suitId];
  }

  static suitName(suitrow){
    return this.suitInverse(suitrow.get("suit"));
  }

  static validSuit(msuitrow){
    return this.suitName(msuitrow) !== undefined;
  }
}

module.exports = {
  ImmutableDefault: Immutable.fromJS(SuitRowFactory.construct(3)),
  SuitRowFactory: SuitRowFactory
}
