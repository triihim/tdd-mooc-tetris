import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
    constructor(initialShape, currentOrientationIndex, numberOfOrientations, possibleOrientations) {
        if(initialShape !== null) {
            const shape = new RotatingShape(initialShape);
            this.currentOrientationIndex = currentOrientationIndex;
            this.possibleOrientations = [
                shape,
                shape.rotateRight(),
                shape.rotateRight().rotateRight(),
                shape.rotateRight().rotateRight().rotateRight(),
            ].slice(0, numberOfOrientations);
        } else {
            this.currentOrientationIndex = (currentOrientationIndex + numberOfOrientations) % numberOfOrientations;
            this.possibleOrientations = possibleOrientations;
        }
    }

    static get T_SHAPE() {
        return new Tetromino('.T.\nTTT\n...', 0, 4);
    }

    static get I_SHAPE () {
        return new Tetromino('.....\n.....\nIIII.\n.....\n.....', 0, 2);
    }

    static get O_SHAPE() {
        return new Tetromino('.OO\n.OO\n...', 0, 1);
    }

    rotateRight() {
        return new Tetromino(null, this.currentOrientationIndex + 1, this.possibleOrientations.length, this.possibleOrientations);
    }

    rotateLeft() {
        return new Tetromino(null, this.currentOrientationIndex - 1, this.possibleOrientations.length, this.possibleOrientations);
    }

    toString() {
        return this.possibleOrientations[this.currentOrientationIndex].toString();
    }

    get shape() {
        return this.possibleOrientations[this.currentOrientationIndex];
    }
}