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
        this.#board = new Array(Gameboard.SIZE).fill(null).map(() => new Array(Gameboard.SIZE).fill(null));
        this.#hitTrack = new Array(Gameboard.SIZE).fill(null).map(() => new Array(Gameboard.SIZE).fill(null));
    }

    placeShip(x, y, direction, model) {
        const ship = new Ship(model);

        const boardCopy = JSON.parse(JSON.stringify(this.#board));
        const shipPositions = [];
        

        if(direction === "horizontal") {
            if(y + ship.length > Gameboard.SIZE) throw new Error("Out of bounds");

            for(let i = 0; i < ship.length; i++) {

                if(boardCopy[x][y + i] !== null) throw new Error("Cell occupied");

                boardCopy[x][y + i] = ship;
                shipPositions.push([x, y + i]);
            }
        } 

        else if (direction === "vertical") {
            if(x + ship.length > Gameboard.SIZE) throw new Error("Out of bounds");

            for(let i = 0; i < ship.length; i++) {

                if(boardCopy[x + i][y] !== null) throw new Error("Cell occupied");

                boardCopy[x][y + i] = ship;
                shipPositions.push([x + 1, y]);
            }
        }

        this.#shipCache.set(ship, shipPositions);

        this.#board = boardCopy;
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
