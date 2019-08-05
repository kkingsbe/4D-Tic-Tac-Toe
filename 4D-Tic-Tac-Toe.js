var camera, scene, renderer, controls;
var meshes = {};
var materials = {};

init();
animate();

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setSize( window.innerWidth, window.innerHeight );
  controls = new THREE.OrbitControls( camera, renderer.domElement );
  document.body.appendChild(renderer.domElement);

  camera.position.z = 11;
  camera.position.y = 3;
  controls.update();

  meshes.board = new THREE.Mesh(
    new THREE.BoxGeometry(9,3,9),
    new THREE.MeshBasicMaterial()
  );

  scene.add(meshes.board);
}

function animate() {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
  controls.update();
  // Siezure mode ACTIVATE
  //meshes.board.material.color.setHex(Math.random() * 0xffffff);
}

document.onkeydown = function (e) {
  e = e || window.event;
  console.log(e);
  if(e.key == "w") camera.translateZ(-0.2);
  if(e.key == "s") camera.translateZ(0.2);
  if(e.key == "a") camera.translateX(-0.2);
  if(e.key == "d") camera.translateX(0.2);
  if(e.key == "Shift") camera.translateY(0.2);
  if(e.key == "Control") camera.translateY(-0.2);
};
