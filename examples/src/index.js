import  {QPoint, QCircle, QRectangle, QuadTree} from '../../src';

QuadTree.sub('create', function(qt){
    //console.log('a');
    // window.stroke(255);
    // window.noFill();
    // window.strokeWeight(0.5);
    // window.rectMode(CENTER);
    // window.rect(qt.boundary.x, qt.boundary.y, qt.boundary.w * 2, qt.boundary.h * 2);
});

QuadTree.sub('peek', function(qt){
    //console.log('a');
    window.stroke(255,0,0);
    window.noFill();
    window.strokeWeight(0.5);
    window.rectMode(window.CENTER);
    window.rect(qt.boundary.x, qt.boundary.y, qt.boundary.w * 2, qt.boundary.h * 2);
});

QuadTree.sub('point', function(qt, point){
    //console.log('a');
    // window.stroke(255,255,0);
    // window.fill(255,255,0);
    // window.strokeWeight(1);
    // window.rectMode(window.CENTER);
    // window.rect(point.x, point.y, 2, 2);
});

QuadTree.sub('found', function(qt, point){
    //console.log('a');
    window.stroke(255);
    window.fill(0,0,255);
    window.strokeWeight(1);
    window.rectMode(window.CENTER);
    window.rect(point.x, point.y, 1, 1);
});

QuadTree.sub('intersects', function(qt, point){
    //console.log('a');
    // window.stroke(0,255,255);
    // window.noFill();
    // window.strokeWeight(1);
    // window.ellipseMode(window.CENTER); // Set ellipseMode to CENTER
    // window.ellipse(point.x, point.y, point.r * 2, point.r * 2);

});

window.setup = function() {
    window.createCanvas(1500, 1500);
    background(0);

    window.qtree = new QuadTree(new QRectangle(
        250 + 500 / 2, 250 + 500 / 2, //x,y center
        500,500  //w,h
    ), 4);
    for (let y = 250; y <250 + 500; y = y + (500 / 150)) {
        for (let x = 250; x <250 + 500; x = x + (500 / 150)) {
            let p = new QPoint({
                x: 250 + Math.random() * 500,
                y: 250 + Math.random() * 500
            },
            {});
            qtree.insert(p);
        }
    }

    window.QCircle = QCircle;


}

