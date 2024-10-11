import { Board } from '../models/board';
import { IController } from './types/controller';
import { BoardMap } from '../models/map';
import mapParts from '../assets/map.json';

class BoardController implements IController {
  private readonly _board = new Board();

  setMap(mapPartsOrder: number[]) {
    const parts = mapPartsOrder.map((index) => mapParts[index]);
    const map = new BoardMap(parts);

    this._board.setMap(map);
  }

  get objects(): Board[] {
    return [
      this._board,
    ];
  }
}

export {
  BoardController,
};
