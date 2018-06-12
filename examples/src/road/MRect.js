import { scope } from './MScope';
import { MPoint } from './MPoint';

export class MRect {
    constructor(p, w, h, dontKeepOriginal){
        this.position = p;
        this.width = w;
        this.height = h;

        this.halfWidth = w / 2;
        this.halfHeight = h / 2;
    }

    topLeft() {
        return new MPoint(
            this.position.x - this.width / 2,
            this.position.y - this.height / 2
        );
    } 

    topRight() {
        return new MPoint(
            this.position.x + this.width / 2,
            this.position.y - this.height / 2
        );
    }

    bottomLeft() {
        return new MPoint(
            this.position.x - this.width / 2,
            this.position.y + this.height / 2
        );
    }

    bottomRight() {
        return new MPoint(
            this.position.x + this.width / 2,
            this.position.y + this.height / 2
        );
    }
}