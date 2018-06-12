//import  {QPoint} from '../../src';import { scope } from './road/Scope.js';

class Point {
    constructor(pos, map) {
        this.x = pos.x;
        this.y = pos.y;
        if(map){
            var dim = map.dimensions();
            this.baseX = this.getX(100, 0);
            this.baseY = this.getY(100, 0);
            this.distanceFromLast = null;
        }
        this.map = map;
    }

    intersects(point){
        return (this.distance(point) <= point.r + this.r);
    }
    
    base(){
        return 
    }

    getX(size, offset){
        return this.x * size + offset;
    }

    getY(size, offset){
        return this.y * size + offset;
    }
    
    from(point) {
        
        if(this.distanceFromLast != null) {
            return this.distanceFromLast;
        }
        var a = this;
        var b = point;
        var xd = b.x - a.x;
        var yd = b.baseY  -a.baseY;
        this.distanceFromLast = Math.sqrt( xd * xd + yd *  yd );
    }

    // distance(point) {
    //     var a = this;
    //     var b = point;
    //     var xd = b.x-a.x;
    //     var yd = b.y-a.y;
    //     var zd = b.z-a.z;
    //     return Math.sqrt( xd * xd + yd *  yd + zd * zd);
    // }

    render(dim, rue){
        var x = this.getX(dim.w, dim.tl.x);
        var y = this.getY(dim.h, dim.tl.y);        
        if(rue) { 
            vertex(x, y);
        } else {
            curveVertex(x, y);
        }
        
        
        ellipse(x, y, 3, 3);

        if(this.distanceFromLast){
            fill(0)
            textSize(22);
            text(Math.round(this.distanceFromLast), x + 20, y);
            noFill();
        }
    }
}

class Line {
    constructor(map) {
        this.points = [];
        this.map = map;
    }

    render(dim){

        if(this.points.length == 0){
            return;
        }

        var last = this.points[0];
        var skip = 2;
       
        beginShape();
        last.render(dim);
        this.points.forEach((point,i) => {
            noFill();
            strokeWeight(4);
            stroke(51);

            point.render(dim);
            last = point;
        });
        map.mouse.render(dim);
        map.mouse.render(dim);
        endShape();

        last = this.points[0];
        skip = 2;
        
        beginShape();
        last.render(dim, true);
        this.points.forEach((point,i) => {
            noFill();
            strokeWeight(2);
            stroke(233);
            point.render(dim, true);
            last = point;
        });        
        map.mouse.render(dim, true);
        map.mouse.render(dim, true);
        endShape(); 
    }
}


var  w = window,
    canvasOffset = {
        x : 0,
        y : 0
    };

var img;
var ratio = 1;
var map = {
    lines: [],
    currentLine: new Line(map),
    offset: function(){
        return { 
            x: (windowWidth / 2) - this.home.x,
            y: (windowHeight / 2) - this.home.y
        };
    },
    dimensions: function(){
        var _this = this;
        return {
            w : _this.width,
            h: _this.height,
            o : {
                w : _this.owidth,
                h : _this.oheight,
            },
            c: { x : _this.offset().x, y:  this.offset().y },
            tl : { 
                x: _this.offset().x -  this.width / 2, 
                y: _this.offset().y -  this.height / 2, 
            },
            tr : { 
                x: _this.offset().x +  this.width / 2, 
                y: _this.offset().y -  this.height / 2, 
            },
            bl : { 
                x: _this.offset().x -  this.width / 2, 
                y: _this.offset().y +  this.height / 2, 
            },
            br : { 
                x: _this.offset().x +  this.width / 2, 
                y: _this.offset().y +  this.height / 2,
            }

        };
    },
    home :{
        x: 0,
        y: 0
    },
    mouseDown :{
        x: 0,
        y: 0
    },
    mouse : new Point({x : 0, y: 0}),
    shortcuts : {
        shift : false,
        ctrl : false
    },
    width: 0,
    height:0,
    owidth:0,
    oheight:0,
    factor: 1,
    render : function(){
        imageMode(CENTER);
        image(
            img, 
            this.offset().x, 
            this.offset().y, 
            this.dimensions().w, 
            this.dimensions().h
        );

        this.points();
    },
    points : function(){
        ellipse(
            this.offset().x - this.dimensions().w / 2, 
            this.offset().y - this.dimensions().h / 2, 
            10, 10);

        ellipse(
            this.offset().x + this.dimensions().w / 2, 
            this.offset().y - this.dimensions().h / 2, 
            10, 10);

        ellipse(
            this.offset().x + this.dimensions().w / 2, 
            this.offset().y + this.dimensions().h / 2, 
            10, 10);

        ellipse(
            this.offset().x - this.dimensions().w / 2, 
            this.offset().y + this.dimensions().h / 2, 
            10, 10);

        ellipse(this.offset().x, this.offset().y, 10, 10);
    }
};

w.preload = function() {
    img = loadImage('/img/a2.png');
    console.log(img);
}

w.setup = function() {
    imageMode(CENTER);
    map.height = map.oheight = img.height; 
    map.width = map.owidth = img.width;

    createCanvas(
        windowWidth - canvasOffset.x, 
        windowHeight - canvasOffset.y
    );
}

w.keyPressed = function() {
    if (w.keyCode === w.SHIFT) {
        map.shortcuts.shift = true;
    }

    if(w.keyCode === w.CONTROL){
        map.shortcuts.ctrl = true;
    }
    return false; // prevent default
}

w.keyReleased = function() {

    if (w.key === 'Z' &&  map.shortcuts.ctrl) {
        map.currentLine.points.pop();
    }

    if (w.keyCode === w.SHIFT) {
      map.shortcuts.shift = false;
    }

    if(w.keyCode === w.CONTROL){
        map.shortcuts.ctrl = false;
    }
    return false; // prevent default
}

w.mousePressed = function() {
    
    var tl = map.dimensions().tl,
    c = map.dimensions().c,
    br = map.dimensions().br;

    var xp = w.map(mouseX, tl.x, br.x, 0, 1);
    var yp = w.map(mouseY, tl.y, br.y, 0, 1);
    if(!map.shortcuts.shift){

        var paa = new Point({x:xp, y:yp}, map);

        if(map.currentLine.points.length){
            paa.from(map.currentLine.points[map.currentLine.points.length - 1]);
        }

        map.currentLine.points.push( paa );        
    }

    map.mouseDown.x = mouseX;
    map.mouseDown.y = mouseY;
}

w.mouseDragged = function() {
    if(map.shortcuts.shift){
        map.home.x += map.mouseDown.x - mouseX;
        map.home.y += map.mouseDown.y - mouseY;
    }

    map.mouseDown.x = mouseX;
    map.mouseDown.y = mouseY;
}

w.mouseReleased = function() {
    if(map.shortcuts.shift){
        map.home.x += map.mouseDown.x - mouseX;
        map.home.y += map.mouseDown.y - mouseY;
    }
}

var skip = 2;
w.mouseMoved = function() {
    var tl = map.dimensions().tl,
    c = map.dimensions().c,
    br = map.dimensions().br;

    var xp = w.map(mouseX, tl.x, br.x, 0, 1);
    var yp = w.map(mouseY, tl.y, br.y, 0, 1);

    map.mouse.x = xp;
    map.mouse.y = yp;
}

w.mouseWheel = function(event) {
    map.factor = 0.8;
    if (event.delta < 0) {
        map.factor = 1/map.factor;
    }

    map.width = map.width *  map.factor;
    map.height = map.height *  map.factor;

    var dx = (mouseX - map.dimensions().c.x) * (map.factor - 1),
    dy = (mouseY - map.dimensions().c.y) * (map.factor - 1);

    map.home.x += dx;
    map.home.y += dy;  
} 


w.windowResized = function() {
    resizeCanvas(
        windowWidth - canvasOffset.x, 
        windowHeight - canvasOffset.y
    );
}

w.draw = function() {
    background(255);
    map.render();
    var tl = map.dimensions().tl,
    c = map.dimensions().c,
    br = map.dimensions().br;
    
    map.currentLine.render( map.dimensions() );
}