export class Board {
  width;
  height;
  state;
  falling;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.state = [];
    for(let row = 0; row < width; row++) {
      this.state[row] = [];
      for(let col = 0; col < height; col++) {
        this.state[row][col] = '.';
      }
    }
  }

  drop(block) {
    this.falling = { color: block.color, row: 0, col: 1 };
    this.state[0][1] = block.color;
  }

  tick() {
    this.state[this.falling.row][this.falling.col] = '.';
    this.falling.row++;
    this.state[this.falling.row][this.falling.col] = this.falling.color;
  }

  toString() {
    let s = '';
    for(let row = 0; row < this.width; row++) {
      for(let col = 0; col < this.height; col++) {
        s += this.state[row][col];
      }
      s += '\n';
    }
    return s;
  }
}
