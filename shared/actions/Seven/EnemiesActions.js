const INITIALIZE = "SEVEN.ENEMIES.INITIALIZE";
exports.INITIALIZE = INITIALIZE;

/*
 *
 */
exports.initialize = function initialize(knownState){
  return {
    type: INITIALIZE,
    knownState
  }
}
