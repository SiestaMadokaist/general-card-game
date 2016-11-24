exports.REPLACE = "SEVEN.SUITROW.REPLACE"
exports.replace  = function replace(suit, state){
  return {
    type: SUITROW_SET,
    suit,
    state
  }
}
