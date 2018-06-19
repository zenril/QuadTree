import { scope } from './road/MScope';
import { MMap } from './road/MMap';
import { MRange } from './road/MRange';
import { MPoint } from './road/MPoint';

import React from 'react';
import ReactDOM from 'react-dom';
import { Interface } from './road/Interface';

import style from './css/interface.scss';

var w = window;
scope.map = null;

var img;
w.preload = function() {
    img = loadImage('/src/img/map.jpg');
}

w.setup = function() {
    scope.map = new MMap({
        image : img
    });
    scope.map.loadLines();
    createCanvas(windowWidth, windowHeight);
};

w.windowResized = function() {
    resizeCanvas(
        windowWidth,
        windowHeight
    );
}

w.draw = function(){
    //background("#99774c");
    scope.map.update();

    clear();
    scope.map.mouse( 
        new MPoint(mouseX, mouseY),
        mouseButton
    );    
    scope.map.draw();

    ReactDOM.render(<Interface />, document.getElementById("interface")); 
}

w.keyPressed = function() {
    return scope.map.keyDown(w.keyCode, window.key);
}
w.keyReleased = function() {
    return scope.map.keyUp(w.keyCode, window.key);
}

w.doubleClicked = function() 
{
    if(mouseX > windowWidth - scope.map.openWidth){
        return true;
    }

    scope.map.doubleClick();
}

w.mousePressed = function() {
    if(mouseX > windowWidth - scope.map.openWidth){
        return true;
    }
    
    scope.map.click();
    scope.map.startMove();
    scope.map.addToCurrent();
}

w.mouseReleased = function() {
    scope.map.endMove();
}

w.mouseDragged = function() {
    scope.map.dragMove();
}

w.mouseWheel = function(event) {
    if(mouseX > windowWidth - scope.map.openWidth){
        return true;
    }
    scope.map.scroll(event.delta);
} 