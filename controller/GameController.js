import Player from "../model/Player.js";
import Gameboard from "../model/Gameboard.js";
import RandomAIStrategy from "../model/strategies/RandomAIStrategy.js";

class GameController extends EventTarget {



    constructor(playerName) {
        super();
        this.#player = new Player(playerName);
        this.#iaPlayer = new Player("Player 2", new RandomAIStrategy());
        this.#currentPlayer = Math.floor(Math.random() * 2) === 0 ? this.#player1 : this.#player2;
    }

    placeShip(x, y) {

    }


}