const SET = "SEVEN.PLAYER.HAND.SET";
const INITIALIZE = "SEVEN.PLAYER.HAND.INITIALIZE";

exports.SET = SET;
exports.INITIALIZE = INITIALIZE;

exports.initialize = function initialize(playerCount){
  return {
    playerCount,
    type: INITIALIZE
  }
}

exports.set = function set(playerId, availableCount, closedCount, values){
  return {
    playerId,
    availableCount,
    closedCount,
    values,
    type: SET
  };
}
