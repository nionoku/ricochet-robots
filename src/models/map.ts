import { BoxGeometry, Group, Mesh, MeshBasicMaterial, PlaneGeometry, Texture } from 'three';
import { MapParts } from './types/map';
import tokensInfo from '../assets/tokens.json';
import { WALL_WIDTH, WALL_HEIGHT, MAP_SIZE, MAP_CELL_SIZE, WALL_TOP, CELL_SIZE_HALF, CELL_SIZE } from './constants/map';
import { Token } from './token';
import { TextureLoader } from '../utils/textures';
import { TokenInfo } from './types/token';

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
  new BoxGeometry(MAP_SIZE * MAP_CELL_SIZE, WALL_HEIGHT, WALL_TOP),
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

class BoardMap extends Mesh {
  constructor(parts: MapParts) {
    const textures = TextureLoader.Textures;
    
    super();

    this.name = 'map';
    // add map parts with walls on board
    this.add(...this.makeWalls(parts, textures.get('map')));
  }

  private makeWalls(parts: MapParts, map: Texture): Mesh[] {
    return parts.map((part, pi) => {
      const tokens = tokensInfo[pi].map((token) => new Token(token as TokenInfo));

      const walls = part.flatMap((column, ci, { length: cs }) => {
        return column.reduce<Mesh[]>((columnWalls, cell, ri, { length: rs }) => {
          return [...columnWalls, ...this.makeCellWalls({ cell, ci, cs, ri, rs })];
        }, []);
      });

      // board bottom side
      const bottomSide = SIDE_TEMPLATE.clone();
      bottomSide.position.set(0.5 - CELL_SIZE_HALF + WALL_HEIGHT / 2, 1 - CELL_SIZE_HALF, 0);
      // board right side
      const rightSide = SIDE_TEMPLATE.clone();
      rightSide.rotation.z = 90 * (Math.PI / 180);
      rightSide.position.set(1 - CELL_SIZE_HALF, 0.5 - CELL_SIZE_HALF - WALL_HEIGHT / 2, 0);

      // rotate tokens to face
      tokens.forEach((it) => {
        it.rotation.z = pi * 90 * (Math.PI / 180);
      });

      const cells = new Group();
      // centring group
      cells.position.set(CELL_SIZE_HALF, -CELL_SIZE_HALF, 0);
      cells.rotation.x = Math.PI;
      cells.add(...walls, bottomSide, rightSide, ...tokens);

      const planeGeometry = new PlaneGeometry();
      // centring plane around left top
      planeGeometry.translate(0.5, -0.5, 0);
      const plane = new Mesh(planeGeometry, new MeshBasicMaterial({ map }));
      plane.name = `part_${pi}`;
      plane.rotation.z = pi * 90 * (Math.PI / 180) * -1;
      plane.add(cells);

      return plane;
    });
  }

  // eslint-disable-next-line sonarjs/cognitive-complexity
  private makeCellWalls(info: { cell: number, ci: number, cs: number, ri: number, rs: number }) {
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
    if (info.cell >> 0 & 1 && !lastInColumn) {
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
    if (((info.cell >> 0 & 3) === 3) && !lastInRow && !lastInColumn) {
      const corner = CORNER_TEMPLATE.clone();
      corner.name = 'corner';

      corner.position.set(info.ri * CELL_SIZE + CELL_SIZE_HALF, info.ci * CELL_SIZE + CELL_SIZE_HALF, 0);

      walls.push(corner);
    }

    // left-bottom corner
    if ((info.cell >> 3 & 1) & (info.cell >> 0 & 1) && !lastInColumn) {
      const corner = CORNER_TEMPLATE.clone();
      corner.name = 'corner';

      corner.position.set(info.ri * CELL_SIZE - CELL_SIZE_HALF, info.ci * CELL_SIZE + CELL_SIZE_HALF, 0);

      walls.push(corner);
    }

    return walls;
  }
}

export {
  BoardMap,
};