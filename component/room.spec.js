const Seven = require("./game/seven.js");
const SUIT = require("./game/seven/suit.js");
const Player = require("./player.js");
const Room = require("./room.js");
const $assert = require("underscore.assert");

describe("room", () => {
  context(".play", () =>{
    const world = {}
    beforeEach(() => {
      world.p1 = new Player("ramadoka");
      world.p2 = new Player("eric");
      world.p3 = new Player("hongerboy");
      world.p4 = new Player("walesa");
      world.p5 = new Player("lowell");
      world.room = new Room(Seven, "seven-spec", 4);
      world.p1.join(world.room);
      world.p2.join(world.room);
      world.p3.join(world.room);
      world.p4.join(world.room);
    });
    it("select the player with 7 spade as the first player", () => {
      world.room.start({cardLimit: 52});
      const starter = world.room.game().activePlayer();
      expect(starter.cards().filter(card => card.isSevenSpade()).length)
        .toBe(1);
    })
  })

  context(".play", () => {
    const world = {}
    beforeEach(() => {
      world.p1 = new Player("ramadoka");
      world.p2 = new Player("eric");
      world.p3 = new Player("hongerboy");
      world.p4 = new Player("walesa");
      world.p5 = new Player("lowell");
      world.room = new Room(Seven, "seven-spec", 4);
      world.p1.join(world.room);
      world.p2.join(world.room);
      world.p3.join(world.room);
      world.p4.join(world.room);
    });
    it("set the next player as active", () => {
      world.room.start({cardLimit: 54});
      const starter = world.room.game().activePlayer();
      const starterId = world.room.game().activePlayerId();
      const sevenSpade = starter.cards().filter((card) => card.isSevenSpade())[0];
      const sevenSpadeIdx = starter.cards().indexOf(sevenSpade);
      starter.playOne(sevenSpadeIdx, {direction: 0, suit: SUIT.SPADE});
      expect(world.room.game().activePlayerId()).toBe((starterId + 1) % 4);
    });

    it("remove the card from the player`s hand", () => {
      world.room.start({cardLimit: 54});
      const starter = world.room.game().activePlayer();
      const starterId = world.room.game().activePlayerId();
      const sevenSpade = starter.cards().filter((card) => card.isSevenSpade())[0];
      const sevenSpadeIdx = starter.cards().indexOf(sevenSpade);
      starter.playOne(sevenSpadeIdx, {direction: 1, suit: SUIT.SPADE});
      expect(starter.cards().indexOf(sevenSpade))
        .toBe(-1)
    })
  })
  context(".start", () => {
    context("validation", () => {
      const world = {};
      it("throw error if the player joining is less than the targeted", () => {
        world.p1 = new Player("ramadoka");
        world.p2 = new Player("eric");
        world.room = new Room(Seven, "seven-spec", 4)
        world.p1.join(world.room);
        world.p2.join(world.room);
        expect(() => {
          world.room.game().start()
        }).toThrowError($assert.AssertionError);
      })
    })
  })

  context(".start", () => {
    const world = {}
    beforeEach(() => {
      world.p1 = new Player("ramadoka");
      world.p2 = new Player("eric");
      world.p3 = new Player("hongerboy");
      world.p4 = new Player("walesa");
      world.p5 = new Player("lowell");
      world.room = new Room(Seven, "seven-spec", 4);
      world.room.addPlayer(world.p1);
      world.room.addPlayer(world.p2);
      world.room.addPlayer(world.p3);
      world.room.addPlayer(world.p4);
    });
    it("divide card equally", () => {
      world.room.start({cardLimit: 52});
      expect(world.p1.cards().length).toBe(13)
      expect(world.p2.cards().length).toBe(13)
      expect(world.p3.cards().length).toBe(13)
      expect(world.p4.cards().length).toBe(13)
    });
    it("divide card almost equally", () => {
      world.room.start({cardLimit: 54});
      expect(world.p1.cards().length).toBe(14)
      expect(world.p2.cards().length).toBe(14)
      expect(world.p3.cards().length).toBe(13)
      expect(world.p4.cards().length).toBe(13)
    })
    it("divide the deck randomly", () =>{
      expect(world.p1.cards().sort((card) => card.toValue()) == world.p1.cards)
        .toBe(false)
    })
  })

  context(".addPlayer", () =>{
    const world = {}
    beforeEach(() => {
      world.p1 = new Player("ramadoka");
      world.p2 = new Player("eric");
      world.p3 = new Player("hongerboy");
      world.p4 = new Player("walesa");
      world.p5 = new Player("lowell");
      world.room = new Room(Seven, "seven-spec", 4)
    })
    it("doesnt throw when the user is less than playerLimit", () =>{
      expect(world.room.addPlayer(world.p1)).toBe(undefined);
      expect(world.room.addPlayer(world.p2)).toBe(undefined);
      expect(world.room.addPlayer(world.p3)).toBe(undefined);
      expect(world.room.addPlayer(world.p4)).toBe(undefined);
    })
    it("throws when the fifth player join", () => {
      expect(world.room.addPlayer(world.p1)).toBe(undefined);
      expect(world.room.addPlayer(world.p2)).toBe(undefined);
      expect(world.room.addPlayer(world.p3)).toBe(undefined);
      expect(world.room.addPlayer(world.p4)).toBe(undefined);
      expect(() => {
        world.room.addPlayer(world.p5)
      }).toThrowError($assert.AssertionError);
    })
    it("throw when the same user join twice", () => {
      expect(world.room.addPlayer(world.p1)).toBe(undefined);
      expect(() => {
        world.room.addPlayer(world.p1)
      }).toThrowError($assert.AssertionError);
    })
  })

})
