import { BoxGeometry, Group, Mesh, MeshBasicMaterial, PlaneGeometry, Texture } from 'three';
import { TextureLoader } from '../loaders/textures';
import type { MapParts } from './types/map';
import { WALL_WIDTH, WALL_HEIGHT, MAP_CELL_SIZE, WALL_TOP, CELL_SIZE_HALF, CELL_SIZE, MAP_CELLS_COUNT } from './constants/map';
import type { TokenInfo } from './types/token';
import { Token } from './token';

const SIDE_MATERIAL = new MeshBasicMaterial({ color: '#B0BEC5' });
const TOP_MATERIAL = new MeshBasicMaterial({ color: '#607D8B' });
const WALL_MATERIALS = [
  SIDE_MATERIAL,
  SIDE_MATERIAL,
  SIDE_MATERIAL,
  SIDE_MATERIAL,
  TOP_MATERIAL,
  TOP_MATERIAL,
];

const BOX_TEMPLATE = new Mesh(
  new BoxGeometry(WALL_WIDTH + WALL_HEIGHT, WALL_WIDTH + WALL_HEIGHT, 0.1),
  WALL_MATERIALS,
);

const SIDE_TEMPLATE = new Mesh(
  new BoxGeometry(MAP_CELLS_COUNT * MAP_CELL_SIZE, WALL_HEIGHT, WALL_TOP),
  WALL_MATERIALS,
);

const WALL_TEMPLATE = new Mesh(
  new BoxGeometry(WALL_WIDTH, WALL_HEIGHT, WALL_TOP),
  WALL_MATERIALS,
);

const CORNER_TEMPLATE = new Mesh(
  new BoxGeometry(WALL_HEIGHT, WALL_HEIGHT, WALL_TOP),
  WALL_MATERIALS,
);

class BoardMap extends Group {
  constructor(parts: MapParts, tokens: TokenInfo[][]) {
    const textures = TextureLoader.Textures;

    super();

    this.name = 'map';
    // add map parts with walls on board
    this.add(...this.makeWalls(parts, tokens, textures.get('board')));
  }

  private makeWalls(parts: MapParts, tokens: TokenInfo[][], map?: Texture): Mesh[] {
    return parts.map((part, pi) => {
      const walls = part.flatMap((column, ci, { length: cs }) => {
        return column.reduce<Mesh[]>((columnWalls, cell, ri, { length: rs }) => {
          return [...columnWalls, ...this.makeCellWalls({
            cell,
            ci,
            cs,
            ri,
            rs,
          })];
        }, []);
      });

      // board bottom side
      const bottomSide = SIDE_TEMPLATE.clone();
      bottomSide.position.set(0.5 - CELL_SIZE_HALF + WALL_HEIGHT / 2, 1 - CELL_SIZE_HALF, 0);
      // board right side
      const rightSide = SIDE_TEMPLATE.clone();
      rightSide.rotation.z = 90 * (Math.PI / 180);
      rightSide.position.set(1 - CELL_SIZE_HALF, 0.5 - CELL_SIZE_HALF - WALL_HEIGHT / 2, 0);

      const cellsGroup = this.cellsGroup();
      cellsGroup.add(...walls, bottomSide, rightSide);

      const tokensGroup = this.tokensGroup(tokens, pi);
      const plane = this.plane(pi, map);

      plane.add(cellsGroup, tokensGroup);

      return plane;
    });
  }

  // eslint-disable-next-line sonarjs/cognitive-complexity
  private makeCellWalls(info: {
    cell: number
    ci: number
    cs: number
    ri: number
    rs: number
  }) {
    const walls: Mesh[] = [];

    const firstInColumn = info.ci === 0;
    const firstInRow = info.ri === 0;
    const lastInColumn = info.ci === info.cs - 1;
    const lastInRow = info.ri === info.rs - 1;

    if (info.cell === 15) {
      const box = BOX_TEMPLATE.clone();
      box.name = 'box';

      box.position.set(info.ri * CELL_SIZE, info.ci * CELL_SIZE, 0);
      walls.push(box);

      // box is fully figure, skip next checks
      return walls;
    }

    // left wall
    if (info.cell >> 3 & 1 && firstInRow) {
      const wall = WALL_TEMPLATE.clone();
      wall.name = 'wall';

      wall.rotation.z = 90 * (Math.PI / 180);
      wall.position.set(info.ri * CELL_SIZE - CELL_SIZE_HALF, info.ci * CELL_SIZE, 0);

      walls.push(wall);
    }

    // top wall
    if (info.cell >> 2 & 1 && firstInColumn) {
      const wall = WALL_TEMPLATE.clone();
      wall.name = 'wall';

      wall.position.set(info.ri * CELL_SIZE, info.ci * CELL_SIZE - CELL_SIZE_HALF, 0);

      walls.push(wall);
    }

    // right wall
    if (info.cell >> 1 & 1 && !lastInRow) {
      const wall = WALL_TEMPLATE.clone();
      wall.name = 'wall';

      wall.rotation.z = 90 * (Math.PI / 180);
      wall.position.set(info.ri * CELL_SIZE + CELL_SIZE_HALF, info.ci * CELL_SIZE, 0);

      walls.push(wall);
    }

    // bottom wall
    if (Math.trunc(info.cell) & 1 && !lastInColumn) {
      const wall = WALL_TEMPLATE.clone();
      wall.name = 'wall';

      wall.position.set(info.ri * CELL_SIZE, info.ci * CELL_SIZE + CELL_SIZE_HALF, 0);

      walls.push(wall);
    }

    // left-top corner
    if ((info.cell >> 2 & 3) === 3) {
      const corner = CORNER_TEMPLATE.clone();
      corner.name = 'corner';

      corner.position.set(info.ri * CELL_SIZE - CELL_SIZE_HALF, info.ci * CELL_SIZE - CELL_SIZE_HALF, 0);

      walls.push(corner);
    }

    // right-top corner
    if ((info.cell >> 1 & 3) === 3 && !lastInRow) {
      const corner = CORNER_TEMPLATE.clone();
      corner.name = 'corner';

      corner.position.set(info.ri * CELL_SIZE + CELL_SIZE_HALF, info.ci * CELL_SIZE - CELL_SIZE_HALF, 0);

      walls.push(corner);
    }

    // right-bottom corner
    if (((Math.trunc(info.cell) & 3) === 3) && !lastInRow && !lastInColumn) {
      const corner = CORNER_TEMPLATE.clone();
      corner.name = 'corner';

      corner.position.set(info.ri * CELL_SIZE + CELL_SIZE_HALF, info.ci * CELL_SIZE + CELL_SIZE_HALF, 0);

      walls.push(corner);
    }

    // left-bottom corner
    if ((info.cell >> 3 & 1) & (Math.trunc(info.cell) & 1) && !lastInColumn) {
      const corner = CORNER_TEMPLATE.clone();
      corner.name = 'corner';

      corner.position.set(info.ri * CELL_SIZE - CELL_SIZE_HALF, info.ci * CELL_SIZE + CELL_SIZE_HALF, 0);

      walls.push(corner);
    }

    return walls;
  }

  private tokensGroup(tokens: TokenInfo[][], index: number): Group {
    const tokensGroup = new Group();
    const tokensModels = tokens[index].map((info) => {
      const token = new Token(info);
      token.rotation.z = index * 90 * (Math.PI / 180);

      return token;
    });

    tokensGroup.add(...tokensModels);

    return tokensGroup;
  }

  private cellsGroup(): Group {
    const cellsGroup = new Group();
    // centring group
    cellsGroup.position.set(CELL_SIZE_HALF, -CELL_SIZE_HALF, 0);
    cellsGroup.rotation.x = Math.PI;

    return cellsGroup;
  }

  private plane(index: number, map?: Texture): Mesh {
    const planeGeometry = new PlaneGeometry();
    // centring plane around left top
    planeGeometry.translate(0.5, -0.5, 0);
    const plane = new Mesh(planeGeometry, new MeshBasicMaterial({ map }));
    plane.name = `part_${index}`;
    plane.rotation.z = index * 90 * (Math.PI / 180) * -1;

    return plane;
  }
}

export {
  BoardMap,
};
