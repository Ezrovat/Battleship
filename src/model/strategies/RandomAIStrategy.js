import { Gameboard } from "../Gameboard";

class RandomAIStrategy {
    constructor() {}

    attack(gameboard) {
        const availableCoordinates = [];

        for (let i = 0; i < Gameboard.SIZE; i++) {
            for (let j = 0; j < Gameboard.SIZE; j++) {
                if (gameboard.getHitTrack()[i][j] === Gameboard.UNTRACKED) {
                    availableCoordinates.push({ x: i, y: j });
                }
            }
        }

        if (availableCoordinates.length === 0) {
            throw new Error("No available coordinates");
        }

        const randomIndex = Math.floor(
            Math.random() * availableCoordinates.length,
        );
        return availableCoordinates[randomIndex];
    }
}

export default RandomAIStrategy;
