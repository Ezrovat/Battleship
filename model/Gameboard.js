import Ship from "./Ship.js";

class Gameboard {
    static SIZE = 10;
    static MISS = "MISS";
    static HIT = "HIT";
    static UNTRACKED = "UNTRACKED";
    static SUNK = "SUNK";

    #board;
    #hitTrack;
    #shipCache;

    constructor() {
        this.#shipCache = new Map();
        this.#board = new Array(Gameboard.SIZE)
            .fill(null)
            .map(() => new Array(Gameboard.SIZE).fill(null));
        this.#hitTrack = new Array(Gameboard.SIZE)
            .fill(null)
            .map(() => new Array(Gameboard.SIZE).fill(Gameboard.UNTRACKED));
    }

    placeShip(x, y, direction, model) {
        this.#checkInputOutOfBound(x, y);

        const ship = new Ship(model);

        const boardCopy = this.#board.map((row) => [...row]);
        const shipPositions = [];

        if (direction === "horizontal") {
            if (y + ship.length > Gameboard.SIZE)
                throw new Error("Out of bounds");

            for (let i = 0; i < ship.length; i++) {
                if (boardCopy[x][y + i] !== null)
                    throw new Error("Cell occupied");

                boardCopy[x][y + i] = ship;
                shipPositions.push([x, y + i]);
            }
        } else if (direction === "vertical") {
            if (x + ship.length > Gameboard.SIZE)
                throw new Error("Out of bounds");

            for (let i = 0; i < ship.length; i++) {
                if (boardCopy[x + i][y] !== null)
                    throw new Error("Cell occupied");

                boardCopy[x + i][y] = ship;
                shipPositions.push([x + i, y]);
            }
        }

        this.#shipCache.set(ship, shipPositions);

        this.#board = boardCopy;
    }

    receiveAttack(x, y) {
        this.#checkInputOutOfBound(x, y);

        const ship = this.#board[x][y];
        const hitTrack = this.#hitTrack[x][y];

        if (hitTrack !== Gameboard.UNTRACKED) {
            throw new Error("Already attacked");
        }

        if (ship) {
            ship.hit();
            if (ship.isSunk()) {
                this.#shipCache
                    .get(ship)
                    .forEach(
                        (cell) =>
                            (this.#hitTrack[cell[0]][cell[1]] = Gameboard.SUNK),
                    );
                return true;
            }
            this.#hitTrack[x][y] = Gameboard.HIT;
            return true;
        }

        this.#hitTrack[x][y] = Gameboard.MISS;
        return false;
    }

    getHitTrack() {
        return this.#hitTrack.map((row) => [...row]);
    }

    gameOver() {
        if(this.#shipCache.size === 0) throw new Error("No ship");
        let result = true;
        this.#shipCache.keys().forEach((ship) => {
            if (!ship.isSunk()) result = false;   
        })

        return result;

    }

    printHitTrack() {
        console.log(this.#hitTrack.map((row) => row.join(" ")).join("\n"));
    }

    #checkInputOutOfBound(x, y) {
        if (x < 0 || x >= Gameboard.SIZE || y < 0 || y >= Gameboard.SIZE) {
            throw new Error("Out of bounds");
        }
    }
}

export default new Gameboard();
export const size = Gameboard.SIZE;
export { Gameboard };
