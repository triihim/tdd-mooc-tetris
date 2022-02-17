export class RotatingShape {
    constructor(shape) {
        const rows = shape.split('\n');
        this.sideLength = rows.length;
        this.shape = rows.reduce((shape, row) => shape.concat(row.trim()), []);
    }

    rotateRight() { return this._rotate('RIGHT'); }
    rotateLeft() { return this._rotate('LEFT'); }

    _rotate(direction) {
        const newShape = [...Array(this.sideLength)].map(e => Array(this.sideLength));
        for(let row = 0; row < this.sideLength; row++) 
            for(let col = 0; col < this.sideLength; col++) 
                newShape[row][col] = direction === 'LEFT' ? 
                    this.shape[col][this.sideLength - row - 1] :
                    this.shape[this.sideLength - col - 1][row];
        return new RotatingShape(newShape.map(row => row.join('')).join('\n'));
    }

    toString() { return this.shape.join('\n') + '\n'; }
}