import Ship from "./Ship.js";

class Gameboard {
    static SIZE = 10;
    static MISS = "MISS";
    static HIT = "HIT";
    static SUNK = "SUNK";

    #board;
    #hitTrack;

    #shipCache;

    constructor() {
        this.#shipCache = new Map();
        this.#board = new Array(this.SIZE).fill(null).map(() => new Array(this.SIZE).fill(null));
        this.#hitTrack = new Array(this.SIZE).fill(null).map(() => new Array(this.SIZE).fill(null));
    }

    placeShip(x, y, direction, model) {
        const ship = new Ship(model);

        this.#shipCache.set(ship, []);

        if(direction === "horizzontal") {
            if(y + ship.length >= this.SIZE) throw new Error("Out of bounds");

            for(let i = 0; i < ship.length; i++) {
                this.#board[x][y + i] = ship;
                this.#shipCache.get(ship).push([x, y + i]);
            }
        } 

        else if (direction === "vertical") {
            if(x + ship.length >= this.SIZE) throw new Error("Out of bounds");

            for(let i = 0; i < ship.length; i++) {
                this.#board[x + i][y] = ship;
                this.#shipCache.get(ship).push([x + 1, y]);
            }
        }
    }

    receiveAttack(x, y) {
        const ship = this.#board[x][y];
        let hitTrack = this.#hitTrack[x][y];

        if(hitTrack) {
            throw new Error("Already attacked");
        }

        if(ship) {
            ship.hit();    
            if(ship.isSunk()) {
                this.#shipCache.get(ship).forEach(
                    cell => this.#hitTrack[cell[0]][cell[1]] = Gameboard.SUNK
                );
            }
            this.#hitTrack[x][y] = Gameboard.HIT;
            return true;

        }

        this.#hitTrack[x][y] = Gameboard.MISS;
        return false;
    }

}

export default new Gameboard();