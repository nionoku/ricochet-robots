import { GameState } from './constants/game-state';

class GameStateController {
  private _state: GameState = GameState.MOVE_DISABLED;

  setState(state: GameState): void {
    this._state = state;
  }

  get state(): GameState {
    return this._state;
  }
}

export {
  GameStateController,
};
