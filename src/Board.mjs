const EMPTY_CELL = '.';

export class Board {
  width;
  height;
  state;
  fallingBlock;
  stableBlocks

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.initialise();
  }

  initialise() {
    this.state = [];
    this.stableBlocks = [];
    this.fallingBlock = null;
    for(let row = 0; row < this.height; row++) {
      this.state[row] = [];
      for(let col = 0; col < this.width; col++) {
        this.state[row][col] = EMPTY_CELL;
      }
    }
  }

  hasFalling() {
    return !!this.fallingBlock;
  } 

  isColliding() {
    for(let row = this.fallingBlock.row; row < this.fallingBlock.row + this.fallingBlock.sideLength; row++) {
      for(let col = this.fallingBlock.col; col < this.fallingBlock.col + this.fallingBlock.sideLength; col++) {
        const blockRow = row - this.fallingBlock.row;
        const blockCol = col - this.fallingBlock.col;
        if(this.fallingBlock.shape[blockRow][blockCol] !== EMPTY_CELL && this._getCellSymbol(row, col, false) !== EMPTY_CELL) {
          return true;
        }
      }
    }
    return false;
  } 
  
  isOutOfBounds() {
    for(let row = this.fallingBlock.row; row < this.fallingBlock.row + this.fallingBlock.sideLength; row++) {
      for(let col = this.fallingBlock.col; col < this.fallingBlock.col + this.fallingBlock.sideLength; col++) {
        const blockRow = row - this.fallingBlock.row;
        const blockCol = col - this.fallingBlock.col;
        if(this.fallingBlock.shape[blockRow][blockCol] !== EMPTY_CELL) {
          if(row < 0 || row >= this.height || col < 0 || col >= this.width) {
            return true;
          }
        }
      }
    }
    return false;
  }

  drop(block) {
    if(this.hasFalling()) throw new Error('already falling');
    this.fallingBlock = { 
      shape: block.shape,
      sideLength: block.sideLength,
      row: 0, 
      col: Math.floor((this.width - block.sideLength) / 2)
    };
    this._updateBoardState();
  }

  tick() {
    if(this.hasFalling()) {
      this.fallingBlock.row++;
      if(this.isOutOfBounds() || this.isColliding()) {
        this.fallingBlock.row--; // Went too far.
        this.stableBlocks.push(this.fallingBlock);
        this.fallingBlock = null;
      }
    }
    this._updateBoardState();
  }

  _getCellSymbol(row, col, includeFallingBlock = true) {
    if(this.fallingBlock !== null && includeFallingBlock) {
      if(row >= this.fallingBlock.row && row < this.fallingBlock.row + this.fallingBlock.sideLength
        && col >= this.fallingBlock.col && col < this.fallingBlock.col + this.fallingBlock.sideLength) {
          const blockRow = row - this.fallingBlock.row;
          const blockCol = col - this.fallingBlock.col;
          return this.fallingBlock.shape[blockRow][blockCol];
      }
    }

    for(const block of this.stableBlocks) {
      if(row >= block.row && row < block.row + block.sideLength
        && col >= block.col && col < block.col + block.sideLength) {
          const blockRow = row - block.row;
          const blockCol = col - block.col;
          return block.shape[blockRow][blockCol];
      }
    }
    
    return EMPTY_CELL;
  }

  _updateBoardState() {
    for(let row = 0; row < this.height; row++) {
      for(let col = 0; col < this.width; col++) {
        this.state[row][col] = this._getCellSymbol(row, col);
      }
    }
  }

  toString() {
    let board = '';
    for(let row = 0; row < this.height; row++) {
      for(let col = 0; col < this.width; col++) {
        board += this.state[row][col];
      }
      board += '\n';
    }
    return board;
  }
}
