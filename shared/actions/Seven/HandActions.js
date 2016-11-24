const SET = "SEVEN.PLAYER.HAND.SET";
const INITIALIZE = "SEVEN.PLAYER.HAND.INITIALIZE";

export function initialize(playerCount){
  return {
    playerCount,
    type: INITIALIZE
  }
}
export function set(playerId, availableCount, closedCount, values){
  return {
    playerId,
    availableCount,
    closedCount,
    values,
    type: SET
  };
}
