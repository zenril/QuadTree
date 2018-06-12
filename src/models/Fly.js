import * as tf from '@tensorflow/tfjs';

class Fly {

    static get gravity() {
        return 0.5;
    }

    static get maxG() {
        return 7;
    }

    applyVerticleForce(f){
        var v = this.vy + f;

        if(v > 0){
            this.vy = Math.min(v, Fly.maxG);
        } else {
            this.vy = Math.max(v, -Fly.maxG);
        }
         
    }

    applyHorizontalForce(f){
        var v = this.vx + f;
        
        if(v > 0){
            this.vx = Math.min(v, Fly.maxG);
        } else {
            this.vx = Math.max(v, -Fly.maxG);
        } 
         
    }

    think() {
                // Define input, which has a size of 5 (not including batch dimension).
        //const input = tf.randomUniform([2, 2])

        const input = tf.input({shape: [5]});

        // First dense layer uses relu activation.
        const denseLayer1 = tf.layers.dense({units: 10, activation: 'relu'});
        // Second dense layer uses softmax activation.
        const denseLayer2 = tf.layers.dense({units: 2, activation: 'softmax'});

        // Obtain the output symbolic tensor by applying the layers on the input.
        const output = denseLayer2.apply(denseLayer1.apply(input));

        // Create the model based on the inputs.
        const model = tf.model({inputs: input, outputs: output});

        // The model can be used for training, evaluation and prediction.
        // For example, the following line runs prediction with the model on
        // some fake data.
        model.predict(tf.ones([2, 5])).print();

        
    }


    horizontalDrag(){
        //var v = this.vx;
        this.vx = this.vx * 0.95;
        // if(v < 0){
        //     this.vx += 0.1;
        // } else if(v > 0) {
        //     this.vx -= 0.1;
        // } 
         
    }

    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.vy = 0; 
        this.vx = 0;
        this.r = 5;
    }

    stablize() {
        this.y += this.vy;
        this.x += this.vx;
        this.applyVerticleForce(Fly.gravity);
        this.horizontalDrag();
    }

    up(f) {
        this.applyVerticleForce(- f);
    }

    right(f) {
        this.applyHorizontalForce(f);
    }

    left(f) {
        this.applyHorizontalForce(- f);
    }

    turn(f){
        //this.xf = Math.min(this.xf + (f || 20), 20);
    }
}


export { Fly };