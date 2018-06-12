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

    base(){
        
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
        this.all = [];
        QuadTree.trigger('create', [this]);
    }

    

    static get events (){
        if(!QuadTree.event_bindings) {
            QuadTree.event_bindings = {
                create : [],
                insert : [],
                peek : [],
                point : [],
                found : [],
                intersects : []
            };
        }
        return QuadTree.event_bindings;
    }

    static sub(event, fn){
        QuadTree.events[event].push(fn);
    }

    static trigger(event, data){
        QuadTree.events[event].forEach(element => {
            element.apply(null, data);
        });
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
        this.all.push(point);
        if(this.points.length < this.capacity){
            QuadTree.trigger('point', [this, point]);
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

    insertRandom(data) {
        var p = new Point({
            x: Math.random() * this.boundary.w,
            y: Math.random() * this.boundary.h
        },data);

        this.insert(p);
    }

    findPoints(refPoint, fn, ret) {
        let _this = this;
        if(!ret) ret = [];
        if(!_this.intersectsWithPoint(refPoint)){
            return ret;
        }

        QuadTree.trigger('peek', [_this]);

        if(_this.divisions) {
            _this.peek(function(qTree){
                qTree.findPoints(refPoint, fn, ret);
            });
        }

        if(_this.points.length){
            for (let p = 0; p < _this.points.length; p++) {
                const element = _this.points[p];
                if(!fn || fn(element)){
                    QuadTree.trigger('found', [_this, element]);
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
        var intersects = (deltaX * deltaX + deltaY * deltaY) < (point.r * point.r);

        //console.log(rectX, rectY, this.boundary.w, this.boundary.h);
        if(intersects){
            // window.stroke(0,100,155);
            // window.noFill();
            // window.strokeWeight(6.5);
            // window.rectMode(window.CORNER);
            // window.rect(rectX, rectY, this.boundary.w, this.boundary.h);
            QuadTree.trigger('intersects', [this, point]);
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
        this.divisions = [['0:left-0top',   '1:right-0top'],
                          ['0:left-1bottom','1:right-1bottom']];

        let x = this.boundary.x;
        let y = this.boundary.y;
        let w = this.boundary.w;
        let h = this.boundary.h;

        let right = 1;
        let left = 0;
        let top = 0;
        let bottom = 1;

        this.divisions[right][top] = (new QuadTree(
            new Rectangle(x + w/4, y - h/4, w/2, h/2),
            this.capacity
        ));

        this.divisions[left][top] = (new QuadTree(
            new Rectangle(x - w/4, y - h/4, w/2, h/2),
            this.capacity
        ));

        this.divisions[right][bottom] = (new QuadTree(
            new Rectangle(x + w/4, y + h/4, w/2, h/2),
            this.capacity
        ));

        this.divisions[left][bottom] = (new QuadTree(
            new Rectangle(x - w/4, y + h/4, w/2, h/2),
            this.capacity
        ));
    }
}

export {Point, QuadTree, Rectangle, Circle};