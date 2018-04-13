class Point {
    constructor(pos, data) {
        this.x = pos.x;
        this.y = pos.y;
        this.r = pos.r || 0;
        this.data = data;
    }

    intersects(point){
        return (this.distance(point) <= point.r + this.r);
    }

    distance(point) {
        var a = this.x - point.x;
        var b = this.y - point.y;
        return Math.sqrt( a*a + b*b );
    }
}

class Circle {
    constructor(pos, data) {
        this.x = pos.x;
        this.y = pos.y;
        this.r = pos.r || 0;
        this.data = data;
    }

    intersects(point){
        return (this.distance(point) <= point.r + this.r);
    }

    distance(point) {
        var a = this.x - point.x;
        var b = this.y - point.y;
        return Math.sqrt( a*a + b*b );
    }
}

class Rectangle {
    constructor(x,y,w,h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    contains(point) {
        return (
            point.x >= this.x - this.w &&
            point.x < this.x + this.w &&
            point.y >= this.y - this.h &&
            point.y < this.y + this.h
        );
    }
}

class QuadTree {
    constructor(boundary, capacity){
        this.boundary = boundary;
        this.capacity = capacity;
        this.points = [];
        this.divisions = null;
    }

    peek(fn) {
        if(this.divisions) {
            for (let x = 0; x < this.divisions.length; x++) {
                for (let y = 0; y < this.divisions[x].length; y++) {
                    fn(this.divisions[x][y]);
                }
            }
            return true;
        }
        return false;
    }

    insert(point) {
        if(!this.boundary.contains(point)) return;
        if(this.points.length < this.capacity){
            this.points.push(point);
        } else {
            if(!this.divisions) {
                this.subdivide();
            }

            this.peek(function(qTree){
                qTree.insert(point);
            });
        }
    }

    findPoints(refPoint, fn, ret) {

        if(!ret) ret = [];
        if(!this.intersectsWithPoint(refPoint)){
            return ret;
        }

        if(this.divisions) {
            this.peek(function(qTree){
                qTree.findPoints(refPoint, fn, ret);
            });
        }

        if(this.points.length){
            for (let p = 0; p < this.points.length; p++) {
                const element = this.points[p];
                if(fn(element)){
                    ret.push(element);
                }
            }
        }

        return ret;
    }

    intersectsWithPoint(point){
        var rectX = this.boundary.x - this.boundary.w/2;
        var rectY = this.boundary.y - this.boundary.h/2;
        var deltaX = point.x - Math.max(rectX, Math.min(point.x, rectX + this.boundary.w));
        var deltaY = point.y - Math.max(rectY, Math.min(point.y, rectY + this.boundary.h));
        return (deltaX * deltaX + deltaY * deltaY) < (point.r * point.r);
    }

    findInRadius(refPoint, r) {
        console.log('a');
        refPoint.r = r || refPoint.r;
        return this.findPoints(refPoint, function(point){
            return refPoint.intersects(point);
        });
    }

    subdivide() {

        this.divisions = [[null,null],[null,null]];

        let x = this.boundary.x;
        let y = this.boundary.y;
        let w = this.boundary.w;
        let h = this.boundary.h;

        this.divisions[1][0] = (new QuadTree(
            new Rectangle(x + w/2, y - h/2, w/2, h/2),
            this.capacity
        ));

        this.divisions[0][0] = (new QuadTree(
            new Rectangle(x - w/2, y - h/2, w/2, h/2),
            this.capacity
        ));

        this.divisions[1][1] = (new QuadTree(
            new Rectangle(x + w/2, y + h/2, w/2, h/2),
            this.capacity
        ));

        this.divisions[0][1] = (new QuadTree(
            new Rectangle(x - w/2, y + h/2, w/2, h/2),
            this.capacity
        )); 
    }
}

let qtree = new QuadTree(new Rectangle(
    250,250, //x,y center
    500,500  //w,h
), 4);

for (let i = 0; i < 50; i++) {
    let p = new Point({
        x: Math.random() * 500, 
        y: Math.random() * 500}, 
        {}
    );
    qtree.insert(p);
}

qtree.findInRadius(new Circle({
    x:250,y:250,
    r:200
}));

export {Point, QuadTree, Rectangle, Circle};