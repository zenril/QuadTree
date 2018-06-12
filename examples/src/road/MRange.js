import { scope } from './MScope';
import { MPoint } from './MPoint';

export class MRange {
    constructor(origin, end){
        this.points = {};
        this.origin(origin || null);
        this.end(end || null);
    }
    
    origin(origin){
        this.points.origin = origin;
    }

    end(end){
        this.points.end = end;
    }

    canCalc() {
        return this.points.origin != null && this.points.end != null
    }

    diff(){
        return new MPoint(
            this.canCalc() ? this.points.end.x - this.points.origin.x : 0,
            this.canCalc() ? this.points.end.y - this.points.origin.y : 0
        );
    }

    distance(){
        if(this.canCalc()){
            return this.points.origin.from(this.points.end);
        }
        return 0;
    }

    distanceExpanded(){
        if(this.canCalc()){
            return this.points.origin.copy().expand(scope.map.imageBounds)
                .from(this.points.end.copy().expand(scope.map.imageBounds));
        }
        return 0;
    }
}