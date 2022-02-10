export class Board {
  width;
  height;
  state;

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
    this.state[0][1] = block.color;
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
