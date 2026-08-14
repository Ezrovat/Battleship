class Ship {
    #hits;

    static MODELS = {
        "Carrier": 5,
        "Battleship": 4,
        "Cruiser": 3,
        "Submarine": 3,
        "Destroyer": 2
    }

    constructor(model) {
        this.length = Ship.MODELS[model];
        this.#hits = 0;
    }


    hit() {
        this.#hits++;
    }

    isSunk() {
        return this.#hits === this.length;
    }
}

export default Ship;
export const models = Ship.MODELS;