import { scope } from './MScope';

export class MLine {
    constructor(opts){
        this.points = [];
        this.selected = [23,240,13];
        this.color = [255,255,255];
        this.color2 = [0,0,0];
        this.length = 0;
    }

    render(doLastTwice){

        var length = 0;

        if(this.points.length == 0){
            return;
        }

        var last = this.points[0];
        var lExpanded = last.copy().expand(scope.map.imageBounds);
        var skip = 2;

        var tl = scope.map.bounds.topLeft();
        var br = scope.map.bounds.bottomRight();
        var bounds = scope.map.bounds;

        curveVertex(
            window.map( last.x,0,1,tl.x,br.x),
            window.map( last.y,0,1,tl.y,br.y)
        );

        this.points.forEach((point,i) => {

            var cExpanded = point.copy().expand(scope.map.imageBounds);
            length += cExpanded.from(lExpanded, 'length');
            
            last = point;
            lExpanded = cExpanded;
            

            ellipse(
                window.map( point.x,0,1,tl.x,br.x),
                window.map( point.y,0,1,tl.y,br.y),
            4, 4);

            curveVertex(
                window.map( point.x,0,1,tl.x,br.x),
                window.map( point.y,0,1,tl.y,br.y)
            );
            
        });
        
        var lx = window.map( last.x,0,1,tl.x,br.x);
        var ly = window.map( last.y,0,1,tl.y,br.y);
        if(doLastTwice){
            curveVertex(
                lx,ly
            );
        }

        fill(0)
        textSize(22);

        var l = this.length / scope.map.measure.distanceExpanded();

        text(l * scope.map.baseMeasure, lx + 20,ly);
        noFill();

        

        this.length = length;
    }
};