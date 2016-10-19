'use strict';
const Poker = require("../component/game/poker.js");
const PP = require('../component/game/poker/play.js');
const PH = require("./poker.play.hand.spec.js");
const assert = require('assert');
const Pair = PP.Pair;
const Triplet = PP.Triplet;
const Bomb = PP.Bomb;
const Flush = PP.Flush;
const Straight = PP.Straight;
const FullHouse = PP.FullHouse;
const StraightFlush = PP.StraightFlush;
describe("Poker.Play", () => {

  describe("Pair", () =>{
    const excludedHand = [
      PH.pairHand
    ];
    it("accept pair hand", () => {
      assert.equal(true, Pair.validatePlay(PH.pairHand));
    });

    it("doesn't accept no hand", () => {
      assert.equal(false, Pair.validatePlay(PH.noHand2));
    });

    it("doesn't accept non pair hand", () => {
      assert.equal(false, Pair.validatePlay(PH.randomHand(excludedHand)));
      assert.equal(false, Pair.validatePlay(PH.randomHand(excludedHand)));
      assert.equal(false, Pair.validatePlay(PH.randomHand(excludedHand)));
      assert.equal(false, Pair.validatePlay(PH.randomHand(excludedHand)));
    });
  });

  describe("TripletHand", () =>{
    const excludedHand = [
      PH.tripletHand
    ];
    it("accept triplet hand", () => {
      assert.equal(true, Triplet.validatePlay(PH.tripletHand));
    });

    it("doesn't accept no hand", () => {
      assert.equal(false, Triplet.validatePlay(PH.noHand3));
    });

    it("doesn't accept non triplet hand", () => {
      assert.equal(false, Triplet.validatePlay(PH.randomHand(excludedHand)));
      assert.equal(false, Triplet.validatePlay(PH.randomHand(excludedHand)));
      assert.equal(false, Triplet.validatePlay(PH.randomHand(excludedHand)));
      assert.equal(false, Triplet.validatePlay(PH.randomHand(excludedHand)));
    });
  });

  describe("Bomb", () => {
    it("accept bomb hand", () => {
      assert.equal(true, Bomb.validatePlay(PH.bombHand));
    });

    it("doesn't accept no hand", () => {
      assert.equal(false, Bomb.validatePlay(PH.noHand4));
    });

    it("doesn't accept non bomb hand", () => {
      assert.equal(false, Bomb.validatePlay(PH.randomHand([PH.bombHand])));
      assert.equal(false, Bomb.validatePlay(PH.randomHand([PH.bombHand])));
      assert.equal(false, Bomb.validatePlay(PH.randomHand([PH.bombHand])));
    })
  })

  describe("Straight", () => {
    const excludedHand = [
      PH.cyclicStraightFlushHand,
      PH.straightFlushHand,
      PH.straightHand
    ]
    it("accept straight flush", () => {
      assert.equal(true, Straight.validatePlay(PH.straightFlushHand));
    });

    it("doesn't accept no hand", () => {
      assert.equal(false, Straight.validatePlay(PH.noHand5));
    });

    it("accept straigt hand", () => {
      assert.equal(true, Straight.validatePlay(PH.straightHand));
    });

    it("doesn't accept non straight hand", () => {
      assert.equal(false, Straight.validatePlay(PH.randomHand(excludedHand)));
      assert.equal(false, Straight.validatePlay(PH.randomHand(excludedHand)));
      assert.equal(false, Straight.validatePlay(PH.randomHand(excludedHand)));
    });
  });

  describe("Flush", () => {
    const excludedHand = [
      PH.cyclicStraightFlushHand,
      PH.straightFlushHand,
      PH.colorHand
    ]
    it("doesn't accept no hand", () => {
      assert.equal(false, Flush.validatePlay(PH.noHand5));
    });

    it("accept straight flush", () => {
      assert.equal(true, Flush.validatePlay(PH.straightFlushHand));
    });

    it("accept color hand", () => {
      assert.equal(true, Flush.validatePlay(PH.colorHand));
    });

    it("doesn't accept non straight hand", () => {
      assert.equal(false, Flush.validatePlay(PH.randomHand(excludedHand)));
      assert.equal(false, Flush.validatePlay(PH.randomHand(excludedHand)));
      assert.equal(false, Flush.validatePlay(PH.randomHand(excludedHand)));
    });
  });

  describe("StraightFlush", () => {
    const excludedHand = [
      PH.cyclicStraightFlushHand,
      PH.straightFlushHand,
    ];

    it("doesn't accept no hand", () => {
      assert.equal(false, StraightFlush.validatePlay(PH.noHand5));
    });

    it("accept straight flush", () => {
      assert.equal(true, StraightFlush.validatePlay(PH.straightFlushHand));
    });

    it("doesn't accept non straigt flush hand", () => {
      assert.equal(false, StraightFlush.validatePlay(PH.randomHand(excludedHand)));
      assert.equal(false, StraightFlush.validatePlay(PH.randomHand(excludedHand)));
      assert.equal(false, StraightFlush.validatePlay(PH.randomHand(excludedHand)));
    });
  });

});
