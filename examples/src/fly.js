import  {Fly, QPoint, QCircle, QRectangle, QuadTree} from '../../src';


let canvasW = 1000;
let canvasH = 1000;
let flys = [];


let  qtree = new QuadTree(new QRectangle(
    canvasW / 2, canvasH / 2, //x,y center
    canvasW,     canvasH  //w,h
), 4);

for (let y = 0; y <10; y = y + 1) {
    qtree.insertRandom({});
}

let fly = new Fly(
    (canvasW / 2),// + (i),
    (canvasH / 2)// + (i)
);


fly.think();

window.setup = function() {
    window.createCanvas(1000, 1000);

    // for (let i = 0; i < 40; i++) {
       
        
    //     flys.push(fly);
    // }

    background(0);
}


window.draw = function(){

    background(0);
    
    // for (let i = 0; i < flys.length; i++) {
    //     let fly = flys[i];

    //     if (mouseIsPressed) {
    //         fly.up(0.9);
    //     }
        
    //     if (keyCode === LEFT_ARROW && keyIsPressed) {
    //         fly.left(1.1);
    //     }
        
    //     if (keyCode === RIGHT_ARROW  && keyIsPressed) {
    //         fly.right(1.1);
    //     }

    //     fly.stablize();
    
        
    //     window.stroke(122,55,25);
    //     window.fill(122,55,255);
    //     window.strokeWeight(1);
    //     window.ellipseMode(window.CENTER); // Set ellipseMode to CENTER
    //     window.ellipse(fly.x, fly.y, fly.r * 2, fly.r * 2);

    // }

}
  
window.mousePressed = function(e) {
    
}
 
