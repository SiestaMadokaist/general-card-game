const Card = require("./card.js");
const SUIT = require("./suit.js")
const _ = require("lodash");

describe("component/seven/card", () => {
    const sevenSpade = Card.toCard({value: 7, suit: SUIT.SPADE});
    const eightSpade = Card.toCard({value: 8, suit: SUIT.SPADE});
    const sixSpade = Card.toCard({value: 6, suit: SUIT.SPADE});
    const aceSpade = Card.toCard({value: 1, suit: SUIT.SPADE});
    const kingSpade = Card.toCard({value: 13, suit: SUIT.SPADE});
    const jackSpade = Card.toCard({value: 11, suit: SUIT.SPADE});
    const queenSpade = Card.toCard({value: 12, suit: SUIT.SPADE});
    const sevenDiamond = Card.toCard({value: 7, suit: SUIT.DIAMOND});
    const joker = Card.fromValue(53);

    describe(".suitName", () => {
        it("is correct", () => {
            expect(eightSpade.suitName()).toBe("SPADE");
        })
    })

    describe(".toString", () => {
        it("is correct", () => {
            expect(`${eightSpade}`).toContain("SPADE");
            expect(`${eightSpade}`).toContain("8");
        })
    })

    describe(".isPredecessor", () => {
        test("return true if the number is one level lower", () => {
            const testcase = () => {
                const above = Math.floor(Math.random() * 10) + 2;
                const cardTop = Card.toCard({value: above, suit: SUIT.SPADE});
                const cardBottom = Card.toCard({value: above - 1, suit: SUIT.SPADE});
                expect(cardBottom.isPredecessor(cardTop)).toBe(true);
            };
            _.range(9).map(testcase);
        })

        it("return true for any card if it itself is joker", () => {
            expect(joker.isPredecessor(sevenSpade)).toBe(true);
            expect(joker.isPredecessor(eightSpade)).toBe(true);
        })

        test("return false if the card is of different suit", () => {
            expect(sevenDiamond.isPredecessor(eightSpade)).toBe(false);
        })

        test("return false if the card has difference of two or more", () => {
            expect(sixSpade.isPredecessor(eightSpade)).toBe(false);
        })
    })

    describe(".isBelowSeven", () => {
        it("return true if the value is less than seven", () => {
            expect(sixSpade.isBelowSeven()).toBe(true);
        })

        it("throw error for joker", () => {
            expect(() => { joker.isBelowSeven() }).toThrow();
        })

        it("return false otherwise", () => {
            expect(eightSpade.isBelowSeven()).toBe(false);
        })
    })

    describe(".isAboveSeven", () => {
        it("return true if the value is less than seven", () => {
            expect(sixSpade.isAboveSeven()).toBe(false);
        })

        it("throw error for joker", () => {
            expect(() => { joker.isAboveSeven() }).toThrow();
        })

        it("return false otherwise", () => {
            expect(eightSpade.isAboveSeven()).toBe(true);
        })
    })

    describe(".isSeven", () => {
        it("return false if it is not joker and value is not 7", () => {
            expect(sixSpade.isSeven()).toBe(false);
            expect(eightSpade.isSeven()).toBe(false);
        })

        it("return true if its value is 7", () => {
            expect(sevenSpade.isSeven()).toBe(true);
            expect(sevenDiamond.isSeven()).toBe(true);
        })

        it("return false if it is joker", () => {
            expect(joker.isSeven()).toBe(false);
        })
    })

    describe(".isJack", () => {
        it("return false if it is not joker or jack", () => {
            expect(sixSpade.isJack()).toBe(false);
            expect(eightSpade.isJack()).toBe(false);
            expect(sevenSpade.isJack()).toBe(false);
            expect(kingSpade.isJack()).toBe(false);
        })

        it("return true if it is jack", () => {
            expect(jackSpade.isJack()).toBe(true);
        })

        it("return true if it is joker", () => {
            expect(joker.isJack()).toBe(true);
        })
    })

    describe(".isQueen", () => {
        it("return false if it is not joker or queen", () => {
            expect(sixSpade.isQueen()).toBe(false);
            expect(eightSpade.isQueen()).toBe(false);
            expect(sevenSpade.isQueen()).toBe(false);
            expect(kingSpade.isQueen()).toBe(false);
        })

        it("return true if it is queen", () => {
            expect(queenSpade.isQueen()).toBe(true);
        })

        it("return true if it is joker", () => {
            expect(joker.isQueen()).toBe(true);
        })
    })

    describe(".isKing", () => {
        it("return false if it is not joker or king", () => {
            expect(sixSpade.isKing()).toBe(false);
            expect(eightSpade.isKing()).toBe(false);
            expect(sevenSpade.isKing()).toBe(false);
        })

        it("return true if it is king", () => {
            expect(kingSpade.isKing()).toBe(true);
        })

        it("return true if it is joker", () => {
            expect(joker.isKing()).toBe(true);
        })
    })

    describe(".isAce", () => {
        it("return false if it is not joker or king", () => {
            expect(sixSpade.isAce()).toBe(false);
            expect(eightSpade.isAce()).toBe(false);
            expect(sevenSpade.isAce()).toBe(false);
        })

        it("return true if it is king", () => {
            expect(aceSpade.isAce()).toBe(true);
        })

        it("return true if it is joker", () => {
            expect(joker.isAce()).toBe(true);
        })
    })

    describe(".isJoker", () => {
        it("return false for a normal card", () => {
            expect(sixSpade.isJoker()).toBe(false);
            expect(kingSpade.isJoker()).toBe(false);
            expect(aceSpade.isJoker()).toBe(false);
        })

        it("return true for joker", () => {
            expect(joker.isJoker()).toBe(true);
        })
    })

    describe(".value", () => {
        it("return its value for normal card", () => {
            expect(sixSpade.value()).toBe(6);
            expect(sevenSpade.value()).toBe(7);
            expect(eightSpade.value()).toBe(8);
        })

        it("raise an error for joker", () => {
            expect(() => { joker.value() }).toThrowError(Error);
        })
    })

    describe(".suit", () => {
        it("return the suit for normal card", () => {
            expect(sixSpade.suit()).toBe(SUIT.SPADE);
        })

        it("throw error for joker", () => {
            expect(() => { joker.suit()}).toThrowError(Error);
        })
    })

    describe(".isSuccessor", () => {

        test("return true if the number is one level higher", () => {
            const testcase = () => {
                const bottom = Math.floor(Math.random() * 10) + 1;
                const cardBottom = Card.toCard({value: bottom, suit: SUIT.SPADE});
                const cardTop = Card.toCard({value: bottom + 1, suit: SUIT.SPADE});
                expect(cardTop.isSuccessor(cardBottom)).toBe(true);
            };
            _.range(9).map(testcase);
        })

        test("return true for ACE to KING", () => {
            expect(aceSpade.isSuccessor(kingSpade)).toBe(true);
        });

        test("return false for different suit", () => {
            expect(eightSpade.isSuccessor(sevenDiamond)).toBe(false);
        })

        test("return false if differences is too far", () => {
            expect(eightSpade.isSuccessor(sixSpade)).toBe(false);
        })

        test("return true for JOKER to KING", () => {
            expect(joker.isSuccessor(kingSpade)).toBe(true);
        })

        test("return true for JOKER to anyNumber", () => {
            const testcase = () => {
                const randomValue = Math.floor(Math.random() * 10) + 1
                const randomCard = Card.toCard({value: randomValue, suit: SUIT.SPADE});
                expect(joker.isSuccessor(randomCard)).toBe(true);
            }
            _.range(9).map(testcase)
        })
    })

    describe("#fromValue", () => {
        it("return correct card on normal behavior", () => {
            expect(Card.fromValue(0).suit()).toBe(SUIT.DIAMOND);
            expect(Card.fromValue(0).isAce()).toBe(true);
            expect(Card.fromValue(51).suit()).toBe(SUIT.SPADE);
            expect(Card.fromValue(51).isKing()).toBe(true);
        })

        it("return imaginary card if params < 0", () => {
            expect(() => { Card.fromValue(-1).suit() }).toThrowError(Error);
            expect(Card.fromValue(-1).value()).toBe(14);
            expect(Card.fromValue(-1).isJoker()).toBe(false);
        })

        it("return joker if params >= NORMAL_CARD_LIMIT", () => {
            expect(Card.fromValue(52).isJoker()).toBe(true);
        })


    })
})
