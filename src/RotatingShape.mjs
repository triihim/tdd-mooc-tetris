export class RotatingShape {
    constructor(shape) {
        this.shape = shape.split(' ').join('') + '\n';
    }

    toString() {
        return this.shape;
    }
}