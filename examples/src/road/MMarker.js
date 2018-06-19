import { scope } from './MScope';
import { MPoint } from './MPoint';

export class MMarker extends MPoint {
    constructor(x, y){
        super(x,y)
        this.name = '';
        this.color = [];
    }   
}