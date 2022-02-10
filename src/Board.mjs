export class Board {
  width;
  height;
  state;
  fallingBlock;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.initialise();
  }

  initialise() {
    this.state = [];
    this.fallingBlock = null;
    for(let row = 0; row < this.width; row++) {
      this.state[row] = [];
      for(let col = 0; col < this.height; col++) {
        this.state[row][col] = '.';
      }
    }
  }

  hasFalling = () => !!this.fallingBlock;
  isColliding = () => this.state[this.fallingBlock.row][this.fallingBlock.col] !== '.';
  isOutOfBounds = () => this.fallingBlock.row >= this.height;

  drop(block) {
    if(this.hasFalling()) throw new Error('already falling');
    this.fallingBlock = { color: block.color, row: 0, col: 1 };
    this.state[0][Math.floor(this.width / 2)] = block.color;
  }

  tick() {
    this.fallingBlock.row++;
    if(this.isOutOfBounds() || this.isColliding()) {
      this.fallingBlock = null;
    } else {
      this.state[this.fallingBlock.row-1][this.fallingBlock.col] = '.';
      this.state[this.fallingBlock.row][this.fallingBlock.col] = this.fallingBlock.color;
    }
  }

  toString() {
    let board = '';
    for(let row = 0; row < this.width; row++) {
      for(let col = 0; col < this.height; col++) {
        board += this.state[row][col];
      }
      board += '\n';
    }
    return board;
  }
}
