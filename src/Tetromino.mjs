import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino extends RotatingShape {
    constructor(shape) {
        super(shape);
    }

    static get T_SHAPE() {
        return new Tetromino('.T.\nTTT\n...');
    }
}