class Point {
    constructor(pos, data) {
        this.x = pos.x;
        this.y = pos.y;
        this.z = pos.z;
        this.r = pos.r || 0;
        this.data = data;
    }

    intersects(point){
        return (this.distance(point) <= point.r + this.r);
    }

    distance(point) {
        var a = this;
        var b = point;
        var xd = b.x-a.x;
        var yd = b.y-a.y;
        var zd = b.z-a.z;
        return Math.sqrt( xd * xd + yd *  yd + zd * zd);
    }
}

export {Point};