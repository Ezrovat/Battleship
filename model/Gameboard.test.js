import { size } from "./Gameboard.js";
import { models } from "./Ship.js";
import { Gameboard } from "./Gameboard.js";

describe("Gameboard main flow", () => {
    test("places ships and handles the main attack flow", () => {
        const gameboard = new Gameboard();
        const placeShipTests = [
            {
                input: {
                    x: 0,
                    y: 0,
                    direction: "horizontal",
                    model: "Carrier",
                },
                expected: "OK",
            },
            {
                input: { x: 0, y: 0, direction: "vertical", model: "Carrier" },
                expected: "Cell occupied",
            },
            {
                input: {
                    x: 9,
                    y: 0,
                    direction: "vertical",
                    model: "Submarine",
                },
                expected: "Out of bounds",
            },
            {
                input: {
                    x: 0,
                    y: 9,
                    direction: "horizontal",
                    model: "Submarine",
                },
                expected: "Out of bounds",
            },
            {
                input: {
                    x: 1,
                    y: 5,
                    direction: "horizontal",
                    model: "Carrier",
                },
                expected: "OK",
            },
            {
                input: {
                    x: 6,
                    y: 0,
                    direction: "vertical",
                    model: "Battleship",
                },
                expected: "OK",
            },
            {
                input: {
                    x: 0,
                    y: 3,
                    direction: "horizontal",
                    model: "Destroyer",
                },
                expected: "Cell occupied",
            },
            {
                input: {
                    x: 0,
                    y: 2,
                    direction: "vertical",
                    model: "Submarine",
                },
                expected: "Cell occupied",
            },
            {
                input: {
                    x: 1,
                    y: 8,
                    direction: "horizontal",
                    model: "Carrier",
                },
                expected: "Out of bounds",
            },
            {
                input: {
                    x: 9,
                    y: 5,
                    direction: "vertical",
                    model: "Destroyer",
                },
                expected: "Out of bounds",
            },
            {
                input: {
                    x: 9,
                    y: 8,
                    direction: "horizontal",
                    model: "Destroyer",
                },
                expected: "OK",
            },
        ];

        const successfulPlacements = placeShipTests.filter(
            (test) => test.expected === "OK",
        );

        successfulPlacements.forEach((test) => {
            expect(
                gameboard.placeShip(
                    test.input.x,
                    test.input.y,
                    test.input.direction,
                    test.input.model,
                ),
            ).toBeUndefined();
        });

        placeShipTests
            .filter((test) => test.expected !== "OK")
            .forEach((test) => {
                expect(() =>
                    gameboard.placeShip(
                        test.input.x,
                        test.input.y,
                        test.input.direction,
                        test.input.model,
                    ),
                ).toThrow(test.expected);
            });

        const occupiedCellsTotal = successfulPlacements.reduce(
            (total, test) => total + models[test.input.model],
            0,
        );

        successfulPlacements.forEach((test) => {
            const shipLength = models[test.input.model];

            for (let i = 0; i < shipLength; i++) {
                const input =
                    test.input.direction === "horizontal"
                        ? { x: test.input.x, y: test.input.y + i }
                        : { x: test.input.x + i, y: test.input.y };

                expect(gameboard.receiveAttack(input.x, input.y)).toBe(true);
                expect(() => gameboard.receiveAttack(input.x, input.y)).toThrow(
                    "Already attacked",
                );
            }
        });

        let missCount = 0;

        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                let result;

                try {
                    result = gameboard.receiveAttack(i, j);
                } catch (e) {
                    if (e.message === "Already attacked") result = true;
                    else throw e;
                }

                if (result === false) missCount++;
            }
        }

        expect(missCount).toBe(size * size - occupiedCellsTotal);
    });
});

describe("Gameboard isolated tests", () => {
    let gameboard;
    beforeEach(() => {
        gameboard = new Gameboard();
    });

    test("Check input out of bounds", () => {
        expect(() => gameboard.receiveAttack(-1, 0)).toThrow("Out of bounds");
        expect(() => gameboard.receiveAttack(size, 0)).toThrow("Out of bounds");
        expect(() => gameboard.receiveAttack(0, -1)).toThrow("Out of bounds");
        expect(() => gameboard.receiveAttack(0, size)).toThrow("Out of bounds");
    });

    test("Already Attacked Miss", () => {
        expect(gameboard.receiveAttack(0, 0)).toBe(false);
        expect(() => gameboard.receiveAttack(0, 0)).toThrow("Already attacked");
    });

    test("Already Attacked Hit", () => {
        gameboard.placeShip(0, 0, "horizontal", "Carrier");
        expect(gameboard.receiveAttack(0, 0)).toBe(true);
        expect(() => gameboard.receiveAttack(0, 0)).toThrow("Already attacked");
    });

    test("Hit track", () => {
        const model = "Carrier";

        gameboard.placeShip(0, 0, "horizontal", model);
        expect(gameboard.getHitTrack()[0][0]).toBe(null);
        gameboard.receiveAttack(1, 0);
        expect(gameboard.getHitTrack()[1][0]).toBe(Gameboard.MISS);

        for (let i = 0; i < size; i++) {
            gameboard.receiveAttack(0, i);
            if (i < models[model] - 1)
                expect(gameboard.getHitTrack()[0][i]).toBe(Gameboard.HIT);
        }

        gameboard.printHitTrack();

        let j = 0;
        for (; j < models[model]; j++) {
            expect(gameboard.getHitTrack()[0][j]).toBe(Gameboard.SUNK);
        }
        for (; j < size; j++) {
            expect(gameboard.getHitTrack()[0][j]).toBe(Gameboard.MISS);
        }
    });
});
