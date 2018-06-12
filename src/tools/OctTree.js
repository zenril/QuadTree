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

class Sphere {
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

class Cube {
    constructor(x,y,z,w,h,l) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        this.h = h;
        this.l = l;
    }

    contains(point) {
        return (
            point.x >= this.x - this.w &&
            point.x < this.x + this.w &&
            point.y >= this.y - this.h &&
            point.y < this.y + this.h &&
            point.z >= this.z - this.l &&
            point.z < this.z + this.l
        );
    }
}
 
class OctTree {
    constructor(boundary, capacity){
        this.boundary = boundary;
        this.capacity = capacity;
        this.points = [];
        this.divisions = null;
        OctTree.trigger('create', [this]);
    }

    static get events (){
        if(!OctTree.event_bindings) {
            OctTree.event_bindings = {
                create : [],
                insert : [],
                peek : [],
                point : [],
                found : [],
                intersects : []
            };
        }
        return OctTree.event_bindings;
    }

    static sub(event, fn){
        OctTree.events[event].push(fn);
    }

    static trigger(event, data){
        OctTree.events[event].forEach(element => {
            element.apply(null, data);
        });
    }

    peek(fn) {
        if(this.divisions) {
            for (let z = 0; z < this.divisions.length; z++) {
                for (let x = 0; x < this.divisions[z].length; x++) {
                    for (let y = 0; y < this.divisions[z][x].length; y++) {
                        fn(this.divisions[z][x][y]);
                    }
                }
            }
            return true;
        }
        return false;
    }

    insert(point) {
        if(!this.boundary.contains(point)) return;
        if(this.points.length < this.capacity){
            OctTree.trigger('point', [this, point]);
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
        let _this = this;
        if(!ret) ret = [];
        if(!_this.intersectsWithPoint(refPoint)){
            return ret;
        }

        OctTree.trigger('peek', [_this]);

        if(_this.divisions) {
            _this.peek(function(qTree){
                qTree.findPoints(refPoint, fn, ret);
            });
        }

        if(_this.points.length){
            for (let p = 0; p < _this.points.length; p++) {
                const element = _this.points[p];
                if(!fn || fn(element)){
                    OctTree.trigger('found', [_this, element]);
                    ret.push(element);
                }
            }
        }

        return ret;
    }

    intersectsWithPoint(point){
        var rectX = this.boundary.x - this.boundary.w/2;
        var rectY = this.boundary.y - this.boundary.h/2;
        var rectZ = this.boundary.y - this.boundary.z/2;


        var deltaX = point.x - Math.max(rectX, Math.min(point.x, rectX + this.boundary.w));
        var deltaY = point.y - Math.max(rectY, Math.min(point.y, rectY + this.boundary.h));
        var deltaZ = point.z - Math.max(rectZ, Math.min(point.z, rectZ + this.boundary.l));
        var intersects = (deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ) < (point.r * point.r * point.r);

        //console.log(rectX, rectY, this.boundary.w, this.boundary.h);
        if(intersects){
            // window.stroke(0,100,155);
            // window.noFill();
            // window.strokeWeight(6.5);
            // window.rectMode(window.CORNER);
            // window.rect(rectX, rectY, this.boundary.w, this.boundary.h);
            OctTree.trigger('intersects', [this, point]);
        } else {
            // window.stroke(133,100,15);
            // window.noFill();
            // window.strokeWeight(1.5);
            // window.rectMode(window.CORNER);
            // window.rect(rectX, rectY, this.boundary.w, this.boundary.h);
        }

        // window.stroke(0,255,255);
        // window.noFill();
        // window.strokeWeight(1);
        // window.ellipseMode(window.CENTER); // Set ellipseMode to CENTER
        // window.ellipse(rectX, rectY, 2,2);

        // window.stroke(255,0,0);
        // window.noFill();
        // window.strokeWeight(1);
        // window.ellipseMode(window.CENTER); // Set ellipseMode to CENTER
        // window.ellipse(this.boundary.x, this.boundary.y, 2,2);

        return intersects;
    }

    findInRadius(refPoint, r) {
        refPoint.r = r || refPoint.r;
        return this.findPoints(refPoint, function(point){
            return refPoint.intersects(point);
        });
    }

    subdivide() {
        //just descriptions these will get overridden
                        //front
        this.divisions= [
                            
                            [
                                //front
                                ['0:left-0top',   '1:right-0top'],
                                ['0:left-1bottom','1:right-1bottom']
                            ],
                            [                        
                                //back
                                ['0:left-0top',   '1:right-0top'],
                                ['0:left-1bottom','1:right-1bottom']
                            ]
                        ];

        let x = this.boundary.x;
        let y = this.boundary.y;
        let z = this.boundary.y;
        let w = this.boundary.w;
        let h = this.boundary.h;
        let l = this.boundary.l;

        let right = 1;
        let left = 0;
        let top = 0;
        let bottom = 1;
        let front = 0;
        let back = 1;

        this.divisions[front][right][top] = (new OctTree(
            new Cube(
                x + w/4,    y - h/4,    z - l/4 , 
                w/2,        h/2,        l/2,
            ),
            this.capacity
        ));

        this.divisions[front][left][top] = (new OctTree(
            new Cube(   
                x - w/4, y - h/4, z - l/4 ,
                w/2, h/2, l/2
            ),
            this.capacity
        ));

        this.divisions[front][right][bottom] = (new OctTree(
            new Cube(
                x + w/4, y + h/4, z - l/4,
                w/2, h/2, l/2
            ),
            this.capacity
        ));

        this.divisions[front][left][bottom] = (new OctTree(
            new Cube(
                x - w/4, y + h/4, z - l/4,
                w/2, h/2, l/2
            ),
            this.capacity
        ));

        this.divisions[back][right][top] = (new OctTree(
            new Cube(
                x + w/4, y - h/4, z + l/4,
                w/2, h/2, l/2
            ),
            this.capacity
        ));

        this.divisions[back][left][top] = (new OctTree(
            new Cube(
                x - w/4, y - h/4, z + l/4,
                w/2, h/2, l/2
            ),
            this.capacity
        ));

        this.divisions[back][right][bottom] = (new OctTree(
            new Cube(
                x + w/4, y + h/4, z + l/4,
                w/2, h/2, l/2
            ),
            this.capacity
        ));

        this.divisions[back][left][bottom] = (new OctTree(
            new Cube(
                x - w/4, y + h/4, z + l/4,
                w/2, h/2, l/2
            ),
            this.capacity
        ));
        
    }
}

export {Point, OctTree, Cube, Sphere};