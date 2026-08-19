import RandomAIStrategy from "./RandomAIStrategy";
import { Gameboard } from "../Gameboard";

describe("RandomAIStrategy", () => {
    test("attack", () => {
        const gameboard = {
            getHitTrack: () =>
                Array.from({ length: Gameboard.SIZE }, () =>
                    Array(Gameboard.SIZE).fill(Gameboard.UNTRACKED),
                ),
        };

        const strategy = new RandomAIStrategy();
        const result = strategy.attack(gameboard);

        expect(result.x).toBeGreaterThanOrEqual(0);
        expect(result.x).toBeLessThan(Gameboard.SIZE);
        expect(result.y).toBeGreaterThanOrEqual(0);
        expect(result.y).toBeLessThan(Gameboard.SIZE);
    });

    test("throws when there are no available coordinates", () => {
        const gameboard = {
            getHitTrack: () =>
                Array.from({ length: Gameboard.SIZE }, () =>
                    Array(Gameboard.SIZE).fill(Gameboard.MISS),
                ),
        };

        const strategy = new RandomAIStrategy();

        expect(() => strategy.attack(gameboard)).toThrow(
            "No available coordinates",
        );
    });
});
