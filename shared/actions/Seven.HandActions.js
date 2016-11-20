const INITIALIZE = "INITIALIZE";
const REMOVE = "REMOVE";

function initialize(cards){
  return {
    type: INITIALIZE,
    cards,
  }
}

function remove(id){
  return {
    type: REMOVE,
    id
  }
}

exports.initialize = initialize;
exports.remove = remove;
exports.INITIALIZE = INITIALIZE;
exports.REMOVE = REMOVE;
