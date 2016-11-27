const INITIALIZE = "SEVEN.MY_HAND.INITIALIZE";

exports.INITIALIZE = INITIALIZE;

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
