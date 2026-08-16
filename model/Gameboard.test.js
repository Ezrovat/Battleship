import gameboard from "./Gameboard.js";
import {size} from "./Gameboard.js";
import {models} from "./Ship.js";
import {Gameboard} from "./Gameboard.js";



describe("Gameboard main flow", () => {

    let placeShipTests = [];
    let receiveAttackTests = [];
    let occupiedCellsTotal;

    beforeAll(() => {
        placeShipTests = [
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

        occupiedCellsTotal = placeShipTests.
        filter( 
            test => test.expected === "OK"
        ).reduce(
            (total, test) => total + models[test.input.model], 0
        );

        placeShipTests.filter(test => test.expected === "OK").forEach(test => {
            const modelLenght = models[test.input.model];
            for(let i = 0; i < modelLenght; i++) {
                let input;
                if(test.input.direction === "horizontal") {
                    input = {x: test.input.x, y: test.input.y + i};
                    receiveAttackTests.push(
                        {input, expected: true},
                        {input, expected: "Already attacked"}
                    );
                } 
                else if (test.input.direction === "vertical") {
                    input = {x: test.input.x + i, y: test.input.y};
                    receiveAttackTests.push(
                        {input, expected: true},
                        {input, expected: "Already attacked"}
                    );
                }

            }
        })

    });

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

    test("Receive Attack", () => {
        receiveAttackTests.forEach(test => {
            if(typeof test.expected === "boolean") { 
                expect(
                    gameboard.receiveAttack(test.input.x, test.input.y)
                ).toBe(test.expected);
            }
            else 
                expect(
                    () => gameboard.receiveAttack(test.input.x, test.input.y)
                ).toThrow(test.expected);
        })
        
        
    });

    test("Miss count", () => {
        let missCount = 0;

        for(let i = 0; i < size; i++) {
            let result;
            for(let j = 0; j < size; j++) {
                try {
                    result = gameboard.receiveAttack(i, j);
                } catch(e) {
                    if(e.message === "Already attacked") result = true;
                }
                
                if(!result) missCount++;
            }
        }

        expect(missCount).toBe(size * size - occupiedCellsTotal);
    });


     


    
});

/*describe("Gameboard isolated tests", () => {
    beforeEach(() => {
        gameboard = new Gameboard();
    })
});*/