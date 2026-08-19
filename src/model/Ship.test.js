import Ship from "./Ship.js";

describe("Ship", () => {
    let ship;

    beforeEach(() => {
        ship = new Ship("Carrier");
    });

    test("Nave appena creata non è affondata", () => {
        expect(ship.isSunk()).toBe(false);
    });

    test("Nave non affondata dopo un numero insufficiente di colpi", () => {
        for (let i = 0; i < ship.length - 1; i++) ship.hit();
        expect(ship.isSunk()).toBe(false);
    });

    test("Nave affondata dopo un numero sufficiente di colpi", () => {
        for (let i = 0; i < ship.length; i++) ship.hit();
        expect(ship.isSunk()).toBe(true);
    });

    test("Invalid model", () => {
        expect(() => new Ship("Invalid")).toThrow("Invalid model");
    });
});
