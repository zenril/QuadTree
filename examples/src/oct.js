import  {OPoint, OCube, OSphere, OctTree} from '../../src';


    var ot = new OctTree(new OCube(
        500 / 2, 500 / 2, 500 / 2, //x,y center
        500,500,500  //w,h
    ),8);
    for (let z = 0; z <500; z = z + 50) {
        for (let x = 0; x <500; x = x + 50) {
            for (let y = 0; y <500; y = y + 50) {
                let p = new OPoint({
                    x: x,
                    y: y,
                    z: z
                },
                {});
                ot.insert(p);
            }
        }
    }
    

    var  t = ot.findInRadius(new OSphere({
        x: 200,
        y: 200,
        z: 200,
        r: 150
    }));

var numSpheres = 8;




var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(50, 500 / 400, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(500, 400);
document.body.appendChild(renderer.domElement);

// var geometry = new THREE.SphereGeometry(3, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2);
// var material = new THREE.MeshNormalMaterial();
// var cube = new THREE.Mesh(geometry, material);
// scene.add(cube);
var group = new THREE.Group();


for(var i = 0 ; i < t.length; i++){
    var radius = 12;//increase the radius based the counter
    var sphere = new THREE.Mesh( new THREE.SphereGeometry( 0.2, 26, 18 ), new THREE.MeshLambertMaterial( { color: 0xffffff, shading: THREE.FlatShading, overdraw: true, wireframe:true } ) );
    sphere.position.set(t[i].x / 100,t[i].y / 100,t[i].z / 100);
    group.add( sphere );
 }
 scene.add( group );


camera.position.z = 10;
var angle = 0;
var render = function () {
    requestAnimationFrame(render);

    // camera.position.x = radius * Math.cos( angle );  
    // camera.position.z = radius * Math.sin( angle );
    // angle += 0.01;

    renderer.render(scene, camera);
};

render();

