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

        const randomIndex = Math.floor(Math.random() * availableCoordinates.length);
        return availableCoordinates[randomIndex];
    }
}