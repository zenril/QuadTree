import  {QPoint, QCircle, QRectangle, QuadTree} from '../../src';

QuadTree.sub('create', function(qt){
    //console.log('a');
    // window.stroke(255);
    // window.noFill();
    // window.strokeWeight(0.5);
    // window.rectMode(CENTER);
    // window.rect(qt.boundary.x, qt.boundary.y, qt.boundary.w * 2, qt.boundary.h * 2);
});

// QuadTree.sub('peek', function(qt){
//     //console.log('a');
//     window.stroke(255,0,0);
//     window.noFill();
//     window.strokeWeight(0.5);
//     window.rectMode(window.CENTER);
//     window.rect(qt.boundary.x, qt.boundary.y, qt.boundary.w * 2, qt.boundary.h * 2);
// });

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

// QuadTree.sub('intersects', function(qt, point){
//     //console.log('a');
//     // window.stroke(0,255,255);
//     // window.noFill();
//     // window.strokeWeight(1);
//     // window.ellipseMode(window.CENTER); // Set ellipseMode to CENTER
//     // window.ellipse(point.x, point.y, point.r * 2, point.r * 2);

// });

window.setup = function() {
    window.createCanvas(500, 500);
    background(0);

    window.qtree = new QuadTree(new QRectangle(
        500 / 2, 500 / 2, //x,y center
        500,500  //w,h
    ), 4);

    var is = 0;
    for (let y = 0; y <100000; y = y + 1) {
        //for (let x = 0; x <1500; x = x + (1500 / 350)) {
            let p = new QPoint({
                x: Math.random() * 500,
                y: Math.random() * 500
            },
            {});
            qtree.insert(p);
            is++;
       // }
    }

    console.log(is);
    window.QCircle = QCircle;

   // 
}



window.mouseClicked = function(e) {
    var  t = window.qtree.findInRadius(new window.QCircle({
        x: e.layerX,
        y: e.layerY,
        r: 20
    }));

    console.log(t);
}

