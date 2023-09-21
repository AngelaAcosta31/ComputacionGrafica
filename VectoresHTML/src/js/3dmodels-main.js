var scene = null,
    camera = null,
    renderer = null,
    Floors = null,
    controls = null;
let posX=0;
    towerDirection = 1;//la torre de cubos se crea hacia la derecha
const cubes = [];
      size = 20;
      divisions = 20;
      light = null;



/* Ajustar el tamaño de la ventana del navegador */
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

function createThreeJs() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("app") });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    camera.position.set(0, 20, 100);
    controls.update();

    // Cuadrícula
    const gridHelper = new THREE.GridHelper(size, divisions);
    scene.add(gridHelper);

    // Ejes
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

   createCube();
   createLights("PointLight");
    animate();

}


function loadObjMtl(path, nameMTL, nameOBJ){

    //1.Load MTL (Texture)

    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setResourcePath(path);
    mtlLoader.setPath(path);
    mtlLoader.load(nameMTL, function (material){
        material.preload();
    });


    //2. Load OBJ (Mesh)
    var objLoader = new THREE.OBJLoader();
    objLoader.setPath(path);
    objLoader.setMaterials(material);
    objLoader.load(nameOBJ, function (object){
        scene.add(object);
    });

}
