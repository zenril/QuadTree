import { scope } from './MScope';
import { MLine } from './MLine';
import { MPoint } from './MPoint';
import { MRange } from './MRange';
import { MRect } from './MRect';


export class MMap {
    constructor(opts) {
        this.lines = [];
        this.markers = [];
        this.current = null;
        this.measure = null;
        this.image = opts.image;
        this.opts = opts;
        this.factor = 0.95;
        this.dragging = false;
        this.canDraw = false;
        this.same = false;
        this.openWidth = 300;
        this.mainWidth = 300;
        this.closeWidth = 40;
        this.baseMeasure = null;
        this.baseUnit = '';
        this.keys = {};

        this.coords = {
            window_center: new MPoint(
                window.innerWidth / 2,
                window.innerHeight / 2
            ),
            center: new MPoint(
                window.innerWidth / 2,
                window.innerWidth / 2
            ),
            click: new MPoint(0, 0),
            rMouseP:  new MPoint(0, 0)
        };

        this.bounds = new MRect(
            this.coords.center,
            this.image.width,
            this.image.height
        );

        this.imageBounds = new MRect(
            new MPoint(this.image.width /2 ,this.image.height /2),
            this.image.width,
            this.image.height
        );
    }

    fireEvent(type, data) {
        window.dispatchEvent(new CustomEvent(type, {
            bubbles: true,
            customData: data
        }));
    }

    listenEvent(event, cb){
        var _this = this;
        window.addEventListener(event, e => cb.call(_this, [e.customData, e, _this]) );
    }

    update(){
        this.openWidth = scope.toolbar.open ? this.mainWidth : this.closeWidth;
    }

    scroll(delta) {
        if (this.dragging) return;
        this.same = false;
        var mouse = this.coords.mouse;
        //generate factor
        var factor = this.factor;
        if (delta < 0) {
            factor = 1 / factor;
        }
        //new width, height
        this.bounds.width = this.bounds.width * factor;
        this.bounds.height = this.bounds.height * factor;
        //new center
        this.coords.center.sub(new MPoint(
            (mouse.x - this.center().x) * (factor - 1),
            (mouse.y - this.center().y) * (factor - 1)
        ));
    }

    undo() {
        if(this.current && this.current.points.length){
            this.current.points.pop();
        }
        if(this.current && !this.current.points.length){
            this.current = null;
        }
    }

    shortcuts(){
        if(this.keys[window.CONTROL] && this.keys["Z"]){
            this.undo();
        }
    }

    saveLines(){
        window.localStorage['save_baseMeasure_1'] =  JSON.stringify(this.baseMeasure);
        window.localStorage['save_baseUnit_1'] =  JSON.stringify(this.baseUnit);
        window.localStorage['save_measure_1'] = JSON.stringify(scope.map.measure);
        window.localStorage['save_lines_1'] = JSON.stringify(scope.map.lines);
    }

    loadLines(){
        var bm = JSON.parse(window.localStorage['save_baseMeasure_1'] || 'null');
        var bu = JSON.parse(window.localStorage['save_baseUnit_1'] || 'null') ;

        if(bm){
            this.baseMeasure = bm;
        }

        if(bu){
            this.baseUnit = bu;
        }

        var measure = JSON.parse( window.localStorage['save_measure_1']  || 'null' );
        if(measure && measure.points && measure.points.origin && measure.points.end){
            this.measure = new MRange(
                new MPoint(measure.points.origin.x,measure.points.origin.y),
                new MPoint(measure.points.end.x,measure.points.end.y)
            );
        }

        var lines = JSON.parse( window.localStorage['save_lines_1'] || 'null' );
        if(lines && lines.length){
            for (let l = 0; l < lines.length; l++) {
                var line = lines[l];
                var mline = new MLine();
                mline.name = line.name;
                for (let p = 0; p < line.points.length; p++) {
                    var point = line.points[p];
                    var mpoint = new MPoint(point.x,point.y);
                    mline.points.push(mpoint);
                }
                this.lines.push(mline);
            }
        }


    }

    keyDown(keyCode, key) {
        if(keyCode){
            this.keys[keyCode] = true;
        }
        if(key){
            this.keys[key] = true;
        }
        var preventDefault = true;

        if(!!this.keys[window.ALT]){
            this.canDraw = false;
        }

        if(!!this.keys[window.SHIFT]){
            this.dragging = true;
        }

        if(keyCode == window.SHIFT || keyCode == window.ALT){
            preventDefault = false;
        }

        this.shortcuts();

        return preventDefault;
    }

    keyUp(keyCode, key) {
        if(keyCode){
            this.keys[keyCode] = false;
        }
        if(key){
            this.keys[key] = false;
        }
        
        if(!this.keys[window.ALT]){
            this.canDraw = this.measure && this.measure.canCalc();
        }

        if(!this.keys[window.SHIFT]){
            this.dragging = false;
        }
        return true;
    }

    click() {
        var mouse = this.coords.mouse;
        this.same = this.coords.click.from(mouse) < 20;
        this.coords.click.set(mouse.x, mouse.y);
    }

    doubleClick() {
        this.lines.push(this.current);
        this.saveLines();

        this.fireEvent('line:new', {
            line : this.current
        });
        this.current = null;
    }

    mouse(p, button) {
        if (p) {
            this.coords.mouse = p;
        }
        
        this.mouseButton = button;
        
        
        var mouse = this.coords.mouse.copy();
        var tl = this.bounds.topLeft();

        var newMouse = mouse.sub(tl);

        var xp = window.map(newMouse.x, 0, this.bounds.width, 0, 1);
        var yp = window.map(newMouse.y, 0, this.bounds.height, 0, 1);
        
        this.coords.rMouseP = new MPoint(
            xp,
            yp
        );
        
        
        return this.coords.mouse;
    }

    center() {
        this.coords.center = this.coords.center || new MPoint(
            this.coords.window_center.x,
            this.coords.window_center.y
        );

        return this.coords.center;
    }

    windowCenter() {
        return this.coords.window_center.set(
            window.innerWidth / 2,
            window.innerHeight / 2
        );
    }

    canDrag() {
        return !!this.keys[window.SHIFT];
    }

    stopDragging() {
        var _this = this;
        clearTimeout(this.dto);

        _this.dragging = false;

    }

    startMove() {
        if (this.canDrag()) {
            this.dragging = true;
            scope.mouseRange = scope.mouseRange || new MRange();
            scope.mouseRange.origin(this.coords.mouse);
        }
    }

    endMove() {
        if (this.canDrag()) {
            scope.mouseRange.end(this.coords.mouse);
            this.coords.center.add(scope.mouseRange.diff());
        }
        this.stopDragging();
    }

    dragMove() {
        this.endMove();
        this.startMove();
    }

    addToCurrent() {       
        if (!!this.keys[window.ALT] || (this.measure && this.measure.points.origin && !this.measure.points.end )) {
            
            this.measure = this.measure || new MRange();
            
            this.canDraw = false;

            if(this.measure && this.measure.canCalc()){
                this.measure = null;
            } else if (!this.measure.points.origin) {
                this.measure.points.origin = this.coords.rMouseP.copy()
            } else if (this.measure.points.origin && !this.measure.points.end) {
                this.measure.points.end = this.coords.rMouseP.copy();
            }

            if(this.measure && this.measure.canCalc()){
                this.canDraw = true;
                this.saveLines();
                this.fireEvent('measure:new', { measure : this.measure });
            }

            return;
        }
        if(!this.measure){
            this.canDraw = false;
        }
        if(this.measure && this.measure.canCalc()){
            this.canDraw = true;
        }

        if(this.canDraw){
            this.addToLine('current');
        }
    }

    addToLine(line) {
        if (this.dragging || this.same) return;

        if (!this[line]) {
            this[line] = new MLine();
        }
        // /console.log(xp,yp);
        this[line].points.push(
            this.coords.rMouseP.copy()
        );
    }

    drawCurrent() {
        var mouse = this.coords.mouse.copy();
        noFill();
        strokeWeight(6);
        stroke.call(null, this.current.color);

        beginShape();
        this.current.render(!this.canDraw);
        if(this.canDraw){
            curveVertex(mouse.x, mouse.y);
            curveVertex(mouse.x, mouse.y);
            ellipse(mouse.x, mouse.y, 4, 4);
        } else {
            
        }
        endShape();

        noFill();
        strokeWeight(3);
        stroke.call(null, this.current.color2);

        beginShape();
        this.current.render(!this.canDraw);
        if(this.canDraw){
            curveVertex(mouse.x, mouse.y);
            curveVertex(mouse.x, mouse.y);
            ellipse(mouse.x, mouse.y, 6, 6);
        }
        
        endShape();
        
    }

    drawLine(line) {

        if(!line) {
            return;
        }
        var color = line.color,
            color2 = line.color2;

        if(line.state.selected){
            color = line.selected;
            color2 = line.selected;
        }
        
        noFill();
        strokeWeight(6);
        stroke.call(null, color);

        beginShape();
        line.render(true);
        endShape();

        noFill();
        strokeWeight(3);
        stroke.call(null, color2);

        beginShape();
        line.render(true);
        endShape();
    }

    draw() {
        curveTightness(-0.01);
        var mouse = this.coords.mouse.copy();
        imageMode(CENTER);

        image(
            this.image,
            this.center().x,
            this.center().y,
            this.bounds.width,
            this.bounds.height 
        );

        //console.log(measure);
        if(this.measure){
            var tl = this.bounds.topLeft();
            var br = this.bounds.bottomRight();

            var x1 = window.map( this.measure.points.origin.x,0,1,tl.x,br.x);
            var y1 = window.map( this.measure.points.origin.y,0,1,tl.y,br.y);
            var x2 = this.measure.canCalc() ? window.map( this.measure.points.end.x,0,1,tl.x,br.x) : mouse.x;
            var y2 = this.measure.canCalc() ? window.map( this.measure.points.end.y,0,1,tl.y,br.y) : mouse.y;
        

            strokeWeight(6);
            stroke.call(null, [50,130,190]);
            line(x1, y1, x2, y2);

            strokeWeight(3);
            stroke.call(null, [255,255,255]);
            line(x1, y1, x2, y2);
        }


        this.lines.forEach((point, i) => {
            this.drawLine(point);
        });

        if (this.current) {
            this.drawCurrent();
        }

        

        
    }
};