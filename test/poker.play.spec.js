'use strict';
const Poker = require("../component/game/poker.js");
const PP = require('../component/game/poker.play.js');
const assert = require('assert');
const Pair = PP.Pair;
const Triplet = PP.Triplet;
const Bomb = PP.Bomb;
const Color = PP.Color;
const Straight = PP.Straight;
const FullHouse = PP.FullHouse;
const StraightFlush = PP.StraightFlush;


describe("Poker.Play", () => {
  const straigtFlushHand = [
    {suit: "Spade", value: "Jack"},
    {suit: "Spade", value: "As"},
    {suit: "Spade", value: 10},
    {suit: "Spade", value: "Queen"},
    {suit: "Spade", value: "King"}
  ];

  const colorHand = [
    {suit: "Spade", value: "Jack"},
    {suit: "Spade", value: "As"},
    {suit: "Spade", value: 1},
    {suit: "Spade", value: 8},
    {suit: "Spade", value: 3}
  ];

  const bombHand = [
    {suit: "Spade", value: "Jack"},
    {suit: "Heart", value: "Jack"},
    {suit: "Clover", value: "Jack"},
    {suit: "Diamand", value: "Jack"},
  ]

  const straightHand = [
    {suit: "Spade", value: "Jack"},
    {suit: "Heart", value: "As"},
    {suit: "Clover", value: 10},
    {suit: "Spade", value: "Queen"},
    {suit: "Spade", value: "King"}
  ]

  const pairHand = [
    {suit: "Spade", value: "Jack"},
    {suit: "Heart", value: "Jack"}
  ]

  const tripletHand = [
    {suit: "Spade", value: "As"},
    {suit: "Spade", value: "As"},
    {suit: "Spade", value: "As"},
  ]

  const fullHouseHand = [
    {suit: "Spade", value: "Jack"},
    {suit: "Heart", value: "As"},
    {suit: "Diamond", value: "As"},
    {suit: "Diamond", value: "Jack"},
    {suit: "Heart", value: "Jack"}
  ]


  const randomHand = (excluded) => {
    const originalChoices = [
      straigtFlushHand,
      straightHand,
      bombHand,
      pairHand,
      colorHand,
    ]

    const availableChoices = originalChoices.filter((hand) => excluded.indexOf(hand) === -1)
    const choiceIndex = parseInt(Math.random() * availableChoices.length);
    return availableChoices[choiceIndex];
  }

  describe("Bomb", () => {
    it("accept bomb hand", () => {
      assert.equal(true, Bomb.validatePlay(bombHand));
    })

    it("doesn't accept non bomb hand", () => {
      assert.equal(false, Bomb.validatePlay(randomHand([bombHand])));
      assert.equal(false, Bomb.validatePlay(randomHand([bombHand])));
      assert.equal(false, Bomb.validatePlay(randomHand([bombHand])));
    })
  })

  describe("Straight", () => {
    const excludedHand = [
      straigtFlushHand,
      straightHand
    ]
    it("accept straight flush", () => {
      assert.equal(true, Straight.validatePlay(straigtFlushHand));
    })

    it("accept straigt hand", () => {
      assert.equal(true, Straight.validatePlay(straightHand));
   })

    it("doesn't accept non straight hand", () => {
      assert.equal(false, Straight.validatePlay(randomHand(excludedHand)));
      assert.equal(false, Straight.validatePlay(randomHand(excludedHand)));
      assert.equal(false, Straight.validatePlay(randomHand(excludedHand)));
    })
  })

  describe("Color", () => {
    const excludedHand = [
      straigtFlushHand,
      colorHand
    ]
    it("accept straight flush", () => {
      assert.equal(true, Color.validatePlay(straigtFlushHand));
    })

    it("accept color hand", () => {
      assert.equal(true, Color.validatePlay(colorHand));
    })

    it("doesn't accept non straight hand", () => {
      assert.equal(false, Color.validatePlay(randomHand(excludedHand)));
      assert.equal(false, Color.validatePlay(randomHand(excludedHand)));
      assert.equal(false, Color.validatePlay(randomHand(excludedHand)));
    })
  })

  describe("StraightFlush", () => {
    const excludedHand = [
      straigtFlushHand,
    ]
    it("accept straight flush", () => {
      assert.equal(true, StraightFlush.validatePlay(straigtFlushHand));
    })

    it("doesn't accept non straigt flush hand", () => {
      assert.equal(false, StraightFlush.validatePlay(randomHand(excludedHand)));
      assert.equal(false, StraightFlush.validatePlay(randomHand(excludedHand)));
      assert.equal(false, StraightFlush.validatePlay(randomHand(excludedHand)));
    })
  })

})
