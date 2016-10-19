'use strict';
const _ = require("lodash");
const assert = require('assert');
const Poker = require('../component/game/poker.js').Poker;
const PR = require("../component/game/poker/play.js").PokerRule;
const PH = require("./poker.play.hand.spec.js");

describe("Poker", () => {
  const cardPools = _.range(52).map((i) => [PR.representCard(i), i]);
  const inverseCard = (card) => {
    const cp = cardPools.filter((xpcard) => {
      const pcard = xpcard[0];
      const index = xpcard[1];
      return pcard.value == card.value && pcard.suit == card.suit;
    })
    if(cp.length == 0){
      throw card;
    }
    return cp[0][1];
  }

  describe(".selectPlay", () => {
    const excluded = [
      PH.noHand2,
      PH.noHand3,
      PH.noHand4,
      PH.noHand5,
      PH.pairHand
    ];

    it("return pair given pair", () => {
      const poker = new Poker();
      const play = poker.selectPlay(PH.pairHand.map(inverseCard));
      assert.equal("Pair", play.name());
    });

    it("doesn't return pair given other hand", () => {
      const poker = new Poker();
      const play = () => poker.selectPlay(PH.randomHand(excluded).map(inverseCard));
      assert.notEqual("Pair", play().name());
      assert.notEqual("Pair", play().name());
      assert.notEqual("Pair", play().name());
    });

    it("return triplet given triplet", () => {
      const poker = new Poker();
      const play = poker.selectPlay(PH.tripletHand.map(inverseCard));
      assert.equal("Triplet", play.name());
    });

    it("return straightFlush given straight flush", () => {
      const poker = new Poker();
      const play = poker.selectPlay(PH.straightFlushHand.map(inverseCard));
      assert.equal("StraightFlush", play.name());
    })

    it("return single given single", () => {
      const poker = new Poker();
      const play = poker.selectPlay(PH.singleHand.map(inverseCard));
      assert.equal("Single", play.name());
    })

  });
});
