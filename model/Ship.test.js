import Ship from "./Ship.js";

describe("Ship", () => {
    let ship;
    const LENGHT = 3;

    beforeEach(() => {
        ship = new Ship(LENGHT);
    })

    test("Nave appena creata non è affondata", () => {
        expect(ship.isSunk()).toBe(false);
    })

    test("Nave non affondata dopo un numero insufficiente di colpi", () => {
        for(let i = 0; i < LENGHT - 1; i++) ship.hit();
        expect(ship.isSunk()).toBe(false);
    })

    test("Nave affondata dopo un numero sufficiente di colpi", () => {
        for(let i = 0; i < LENGHT; i++) ship.hit();
        expect(ship.isSunk()).toBe(true);
    })
})