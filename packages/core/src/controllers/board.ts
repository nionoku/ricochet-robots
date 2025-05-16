import { Board } from '../models/board';
import { BoardMap } from '../models/map';
import mapParts from '../assets/map.json';
import tokensInfo from '../assets/tokens.json';
import type { TokenInfo } from '../models/types/token';
import type { IController } from './types/controller';

class BoardController implements IController {
  private readonly _board = new Board();

  setMap(mapPartsOrder: number[]) {
    const parts = mapPartsOrder.map((index) => mapParts[index]);
    const tokens = mapPartsOrder.map((index) => tokensInfo[index]);

    const map = new BoardMap(parts, tokens as TokenInfo[][]);

    this._board.setMap(map);
  }

  get board(): Board {
    return this._board;
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
