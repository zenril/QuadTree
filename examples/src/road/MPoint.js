import { scope } from './MScope';

export class MPoint {
    constructor(x, y){
        this.x = x || 0;
        this.y = y || 0;
        this.data = {};
    }

    add(point){
        this.x += point.x;
        this.y += point.y;
        return this;
    }

    sub(point){
        this.x -= point.x;
        this.y -= point.y;
        return this;
    }

    expand(p){
        this.x = this.x * p.width;
        this.y = this.y * p.height;
        return this;
    }

    set(x,y){
        this.x = x;
        this.y = y;
        return this;
    }

    copy(){
        return new MPoint(this.x, this.y);
    }

    from(point, cache) {
        
        if(cache && this.data[cache] != null) {
            return this.data[cache];
        }

        var a = this;
        var b = point;
        var xd = b.x - a.x;
        var yd = b.y - a.y;
        if(cache){
            return this.data[cache] = Math.sqrt( xd * xd + yd *  yd );
        }

        return Math.sqrt( xd * xd + yd * yd );
    }
}