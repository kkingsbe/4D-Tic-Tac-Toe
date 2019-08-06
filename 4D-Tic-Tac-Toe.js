var camera, scene, renderer, controls;
var meshes = {};
//var materials = {};
var materials = [];

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

  makeSingleBoard(0, 'board1');
  makeSingleBoard(3, 'board2');
  makeSingleBoard(-3, 'board3');
}

function animate() {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
  controls.update();
  // Siezure mode ACTIVATE
  //meshes.board.material.color.setHex(Math.random() * 0xffffff);
}

function makeSingleBoard(z, name)
{
  var geometry = new THREE.BoxGeometry(9,3,9,3,1,3);
  //var geometry = new THREE.PlaneGeometry(3, 3, 3, 3);

  /*
  materials.dark = new THREE.MeshBasicMaterial({
    color: 0x757575
  });
  materials.light = new THREE.MeshBasicMaterial({
    color: 0xe8e8e8
  });
  */
  materials[name] = [];
  materials[name].push(new THREE.MeshBasicMaterial({
    color: 0x757575
  }));
  materials[name].push(new THREE.MeshBasicMaterial({
      color: 0xe8e8e8
  }));

  var materialIndex = 0;
  for(var face = 0; face < geometry.faces.length; face+=2)
  {
    geometry.faces[face].materialIndex = materialIndex;
    if(face + 1 < geometry.faces.length)
    {
      geometry.faces[face+1].materialIndex = materialIndex;
    }
    if(materialIndex == 1) materialIndex = 0;
    else materialIndex = 1;
  }

  meshes[name] = new THREE.Mesh(
    geometry,
    materials[name]
  );

  meshes[name].translateY(z);
  scene.add(meshes[name]);
}
