import GameController from "./GameController";

describe("GameController", () => {
    let controller;

    beforeEach(() => {
        controller = new GameController("Player 1");
    });

    test("ia-move event is dispatched", () => {
        const listener = jest.fn();

        controller.addEventListener("ia-move", listener);
        controller.handlePlayerMove(0, 0);

        expect(listener).toHaveBeenCalledTimes(1);
    });

    test("player-move event is dispatched", () => {
        const listener = jest.fn();
        controller.addEventListener("player-move", listener);

        controller.handleIAMove();

        expect(listener).toHaveBeenCalledTimes(1);
    });
});
