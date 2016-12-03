const SuitRow = require("./suitrow.js");
const Card = require("./card.js");
const SUIT = require("./suit.js");
const assert = require("underscore.assert")

describe("component/game/seven/suitrow", () => {
  const sevenSpade = Card.toCard({value: 7, suit: SUIT.SPADE});
  const eightSpade = Card.toCard({value: 8, suit: SUIT.SPADE});
  const sixSpade = Card.toCard({value: 6, suit: SUIT.SPADE});
  const aceSpade = Card.toCard({value: 1, suit: SUIT.SPADE});
  const kingSpade = Card.toCard({value: 13, suit: SUIT.SPADE});
  const jackSpade = Card.toCard({value: 11, suit: SUIT.SPADE});
  const queenSpade = Card.toCard({value: 12, suit: SUIT.SPADE});
  const sevenDiamond = Card.toCard({value: 7, suit: SUIT.DIAMOND});
  const joker = Card.fromValue(53);

  const world = {}
  describe(".bottom", () => {
    beforeEach(() => {
      world.suitrow = new SuitRow(SUIT.SPADE);
    })

    context("start of game", () => {
      it("return 7", () => {
        expect(world.suitrow.isAvailable()).toBe(false);
        expect(world.suitrow.bottom()).toEqual(sevenSpade);
      })
    })

    context("after 7 is played", () => {
      it("return 7", () => {
        world.suitrow.put(sevenSpade);
        expect(world.suitrow.isAvailable()).toBe(true);
        expect(world.suitrow.bottom()).toEqual(sevenSpade);
      })
    })

    context("after another card is played", () => {
      it("return the lowest card played", () => {
        world.suitrow.put(sevenSpade);
        world.suitrow.put(sixSpade);
        world.suitrow.put(eightSpade);
        expect(world.suitrow.bottom()).toEqual(sixSpade);
      })
    })

    context("on bottomed", () => {
      it("return ace spade", () => {
        world.suitrow.put(sevenSpade);
        world.suitrow.put(sixSpade);
        world.suitrow.put(eightSpade);
        world.suitrow.put(Card.toCard({suit: SUIT.SPADE, value: 5}))
        world.suitrow.put(Card.toCard({suit: SUIT.SPADE, value: 4}))
        world.suitrow.put(Card.toCard({suit: SUIT.SPADE, value: 3}))
        world.suitrow.put(Card.toCard({suit: SUIT.SPADE, value: 2}))
        world.suitrow.putBelow(Card.toCard({suit: SUIT.SPADE, value: 1}))
        expect(world.suitrow.bottom()).toEqual(aceSpade);
      })
    })

  })

  describe(".top", () => {

    beforeEach(() => {
      world.suitrow = new SuitRow(SUIT.SPADE);
    })

    it("return 7 at the start of the game", () => {
      expect(world.suitrow.top()).toEqual(sevenSpade);
    })

    it("still return 7 after the first card is played", () => {
      expect(world.suitrow.top()).toEqual(sevenSpade);
    })
    it("returns the 8 after the eight card played", () => {
      world.suitrow.put(sevenSpade);
      world.suitrow.put(eightSpade);
      expect(world.suitrow.top()).toEqual(eightSpade);
    })
    it("return ace spade after ace is put above", () => {
      world.suitrow.put(sevenSpade);
      world.suitrow.put(eightSpade);
      world.suitrow.put(Card.toCard({suit: SUIT.SPADE, value: 9}));
      world.suitrow.put(Card.toCard({suit: SUIT.SPADE, value: 10}));
      world.suitrow.put(Card.toCard({suit: SUIT.SPADE, value: 11}));
      world.suitrow.put(Card.toCard({suit: SUIT.SPADE, value: 12}));
      world.suitrow.put(Card.toCard({suit: SUIT.SPADE, value: 13}));
      world.suitrow.putAbove(aceSpade);
    })
  })

  describe(".putAbove", () => {
    beforeEach(() => {
      world.suitrow = new SuitRow(SUIT.SPADE)
    })
    it("throws when the next card is too far", () => {
      world.suitrow.putAbove(sevenSpade);
      expect(() => {
        world.suitrow.putAbove(kingSpade);
      }).toThrowError(assert.AssertionError);
    });
    it("throws when the seven isnt played", () => {
      expect(() => {
        world.suitrow.putAbove(eightSpade);
      }).toThrowError(assert.AssertionError);
      expect(() => {
        world.suitrow.putAbove(sixSpade);
      }).toThrowError(assert.AssertionError);
    });
    it("throws when joker is put down as seven", () => {
      expect(() => {
        world.suitrow.putAbove(joker)
      }).toThrowError(assert.AssertionError);
    });
    it("succeed when next card is one difference from the highest card", () => {
      world.suitrow.put(sevenSpade);
      world.suitrow.putAbove(eightSpade);
      world.suitrow.putAbove(Card.toCard({suit: SUIT.SPADE, value: 9}))
    });
    it("succeed to put ace when king is out", () => {
      world.suitrow.put(sevenSpade);
      world.suitrow.putAbove(eightSpade);
      world.suitrow.putAbove(Card.toCard({value: 9, suit: SUIT.SPADE}));
      world.suitrow.putAbove(Card.toCard({value: 10, suit: SUIT.SPADE}));
      world.suitrow.putAbove(Card.toCard({value: 11, suit: SUIT.SPADE}));
      world.suitrow.putAbove(Card.toCard({value: 12, suit: SUIT.SPADE}));
      world.suitrow.putAbove(Card.toCard({value: 13, suit: SUIT.SPADE}));
      world.suitrow.putAbove(aceSpade);
    })

  })
})
