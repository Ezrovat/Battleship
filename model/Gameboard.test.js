import gameboard from "./Gameboard.js";
import models from "./Ship.js";



describe("Gameboard", () => {

    const placeShipTests = [
        {
            input: {x: 0, y: 0, direction: "horizontal", model: "Carrier"},
            expected: "OK"
        },
        {
            input: {x: 0, y: 0, direction: "vertical", model: "Carrier"},
            expected: "Cell occupied"
        }, 
        {
            input: {x: 9, y: 0, direction: "vertical", model: "Submarine"},
            expected: "Out of bounds"
        },
        {
            input: {x: 0, y: 9, direction: "horizontal", model: "Submarine"},
            expected: "Out of bounds"
        },
        {
            input: { x: 1, y: 5, direction: "horizontal", model: "Carrier" },
            expected: "OK"
        },
        {
            input: { x: 6, y: 0, direction: "vertical", model: "Battleship" },
            expected: "OK"
        },
        {
            input: { x: 0, y: 3, direction: "horizontal", model: "Destroyer" },
            expected: "Cell occupied"
        },
        {
            input: { x: 0, y: 2, direction: "vertical", model: "Submarine" },
            expected: "Cell occupied"
        },
        {
            input: { x: 1, y: 8, direction: "horizontal", model: "Carrier" },
            expected: "Out of bounds"
        },
        {
            input: { x: 9, y: 5, direction: "vertical", model: "Destroyer" },
            expected: "Out of bounds"
        },
        {
            input: { x: 9, y: 8, direction: "horizontal", model: "Destroyer" },
            expected: "OK"
        }
    ];

    test("Place Ship", () => {
        placeShipTests.forEach(test => {
            if(test.expected === "OK") 
                expect(
                    gameboard.placeShip(test.input.x, test.input.y, test.input.direction, test.input.model)
                ).toBe(undefined);
            else 
                expect(
                    () => gameboard.placeShip(test.input.x, test.input.y, test.input.direction, test.input.model)
                ).toThrow(test.expected);
        })
    });

     


    
});