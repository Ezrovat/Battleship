import { Gameboard } from "./Gameboard.js";

class Player {
    #gameboard;
    #strategy;
    constructor(name, strategy = null) {
        this.name = name;
        this.#gameboard = new Gameboard();
        this.#strategy = strategy;
    }

    get gameboard() {
        return this.#gameboard;
    }

    attack(gameboard) {
        if (this.#strategy === null) throw new Error("No strategy set");
        return this.#strategy.attack(gameboard);
    }

    receiveAttack(x, y) {
        return this.#gameboard.receiveAttack(x, y);
    }

    setStrategy(strategy) {
        this.#strategy = strategy;
    }
}

export default Player;
