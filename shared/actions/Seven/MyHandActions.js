const INITIALIZE = "SEVEN.MY_HAND.INITIALIZE";
const JUST_RESET = "SEVEN.MY_HAND.JUST_RESET";

exports.INITIALIZE = INITIALIZE;
exports.JUST_RESET = JUST_RESET;

/*
 * @params cards {Array<Object>}
 * @params cards.*.suit {Integer}
 * @params cards.*.value {Integer}
 */
exports.initialize = function initialize(cards){
  return {
    type: INITIALIZE,
    cards
  }
}

exports.justResetHand = function justResetHand(){
  return {
    type: JUST_RESET
  }
}
