export class Block {
  color;

  constructor(color) {
    this.color = color;
  }

  get shape() {
    return [[this.color]];
  }

  get sideLength() {
    return 1;
  }
}
