'use strict';
let exportable = {};

exportable.passHand = []

exportable.singleHand = [
  {suit: "Spade", value: "Jack"},
]
exportable.straightFlushHand = [
  {suit: "Spade", value: "Jack"},
  {suit: "Spade", value: "As"},
  {suit: "Spade", value: 10},
  {suit: "Spade", value: "Queen"},
  {suit: "Spade", value: "King"}
];

exportable.noHand2 = [
  {suit: "Heart", value: "Jack"},
  {suit: "Spade", value: "As"},
]

exportable.noHand3 = [
  {suit: "Heart", value: "Jack"},
  {suit: "Clover", value: 10},
  {suit: "Spade", value: "Queen"},
]

exportable.noHand4 = [
  {suit: "Heart", value: "Jack"},
  {suit: "Spade", value: "As"},
  {suit: "Clover", value: 10},
  {suit: "Spade", value: "Queen"},
]

exportable.noHand5 = [
  {suit: "Heart", value: "Jack"},
  {suit: "Spade", value: "As"},
  {suit: "Clover", value: 10},
  {suit: "Spade", value: 8},
  {suit: "Spade", value: "King"}
]

exportable.colorHand = [
  {suit: "Spade", value: "Jack"},
  {suit: "Spade", value: "As"},
  {suit: "Spade", value: "Queen"},
  {suit: "Spade", value: 8},
  {suit: "Spade", value: 3}
];

exportable.bombHand = [
  {suit: "Spade", value: "Jack"},
  {suit: "Heart", value: "Jack"},
  {suit: "Clover", value: "Jack"},
  {suit: "Diamond", value: "Jack"},
]

exportable.straightHand = [
  {suit: "Spade", value: "Jack"},
  {suit: "Heart", value: "As"},
  {suit: "Clover", value: 10},
  {suit: "Spade", value: "Queen"},
  {suit: "Spade", value: "King"}
]

exportable.pairHand = [
  {suit: "Spade", value: "Jack"},
  {suit: "Heart", value: "Jack"}
]

exportable.tripletHand = [
  {suit: "Spade", value: "As"},
  {suit: "Heart", value: "As"},
  {suit: "Clover", value: "As"},
]

exportable.fullHouseHand = [
  {suit: "Spade", value: "Jack"},
  {suit: "Heart", value: "As"},
  {suit: "Diamond", value: "As"},
  {suit: "Diamond", value: "Jack"},
  {suit: "Heart", value: "Jack"}
]

exportable.cyclicStraightFlushHand = [
  {suit: "Spade", value: 3},
  {suit: "Spade", value: "As"},
  {suit: "Spade", value: 2},
  {suit: "Spade", value: "Queen"},
  {suit: "Spade", value: "King"}
]

exportable.randomHand = (excluded) => {
  const originalChoices = [
    exportable.noHand2,
    exportable.noHand3,
    exportable.noHand4,
    exportable.noHand5,
    exportable.cyclicStraightFlushHand,
    exportable.straightFlushHand,
    exportable.straightHand,
    exportable.bombHand,
    exportable.tripletHand,
    exportable.pairHand,
    exportable.colorHand,
  ]
  const availableChoices = originalChoices.filter((hand) => excluded.indexOf(hand) === -1)
  const choiceIndex = parseInt(Math.random() * availableChoices.length);
  return availableChoices[choiceIndex];
}

for(var key in exportable){
  exports[key] = exportable[key];
}
