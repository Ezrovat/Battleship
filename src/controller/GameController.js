import Player from "../model/Player.js";
import RandomAIStrategy from "../model/strategies/RandomAIStrategy.js";

class GameController extends EventTarget {
    #player;
    #iaPlayer;

    constructor(playerName) {
        super();
        this.#player = new Player(playerName);
        this.#iaPlayer = new Player("Player 2", new RandomAIStrategy());
    }

    handlePlayerMove(x, y) {
        try {
            const result = this.#iaPlayer.receiveAttack(x, y);

            this.dispatchEvent(
                new CustomEvent("ia-move", { detail: { x, y, result } }),
            );
        } catch (e) {
            if (e.message !== "Already attacked") throw e;

            this.dispatchEvent(
                new CustomEvent("player-move", {
                    detail: { x, y, error: e.message },
                }),
            );
        }
    }

    handleIAMove() {
        const { x, y } = this.#iaPlayer.attack(this.#player.gameboard);

        const result = this.#player.receiveAttack(x, y);
        this.dispatchEvent(
            new CustomEvent("player-move", { detail: { x, y, result } }),
        );
    }

    getPlayerBoardHitTrack() {
        return this.#player.gameboard.getHitTrack();
    }

    getIABoardHitTrack() {
        return this.#iaPlayer.gameboard.getHitTrack();
    }
}

export default GameController;
