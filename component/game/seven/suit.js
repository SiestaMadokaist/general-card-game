const SUIT = {
  DIAMOND: 0,
  CLOVER: 1,
  HEART: 2,
  SPADE: 3
}

SUIT.inverse = (i) => {
  return ["DIAMOND", "CLOVER", "HEART", "SPADE"][i]
}

SUIT.MAX = 3
SUIT.MIN = 0

module.exports = SUIT;
