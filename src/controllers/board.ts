import { Board } from '../models/board';
import { IController } from './types/controller';
import { BoardMap } from '../models/map';
import mapParts from '../assets/map.json';

class BoardController implements IController {
  private readonly _map = new BoardMap(mapParts);

  private readonly _board = new Board(this._map);

  get objects(): Board[] {
    return [
      this._board,
    ];
  }
}

export {
  BoardController,
};
