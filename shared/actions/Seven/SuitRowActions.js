exports.REPLACE = "SEVEN.SUITROW.REPLACE"
/*
 * @params suit {Integer}
 * 0 => Diamond
 * 1 => Clover
 * 2 => Hearts
 * 3 => Spade
 */
exports.replace  = function replace(suit, newState){
  return {
    type: REPLACE,
    suit,
    newState
  }
}
