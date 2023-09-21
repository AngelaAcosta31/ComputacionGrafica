var scene = null,
    camera = null,
    renderer = null,
    Floors = null,
    controls = null;
    

const size = 50,
      //stats = null,
    divisions = 50;

//SONIDOS:Background, gano, perdio, recolectar cosas
//IMAGEN DE DISEÑO EN PNG DE 1920X1080 DE PANTALLA DE GANAR Y OTRA DE PERDER

/* Ajustar el tamaño de la ventana del navegador */
window.addEventListener( 'resize', onWindowResize, false );

function createThreeJs() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdedede);
    camera = new THREE.PerspectiveCamera( 
                                    75,    // Field of view (arriba o abajo)
                                    window.innerWidth / window.innerHeight, // Aspect Ratio 16:9 
                                    0.1, // Near 
                                    1000 ); // Far

    renderer = new THREE.WebGLRenderer({canvas: document.getElementById("app")});
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    camera.position.set(0,8,0);
    controls.update();

    // Grid Helper
    const gridHelper = new THREE.GridHelper( size, divisions );
    scene.add( gridHelper );

    // Axes Helper
    const axesHelper = new THREE.AxesHelper( 5 );
    scene.add( axesHelper );

    // To call
    createLights("AmbientLight");
    createLights("PointLight");
    animate();
    loadObjMtl("../models/OBJ_MTL/personaje/", "MarioBros.mtl", "MarioBros.obj");
   // stats = new THREE.Stats();
}

function animate() {
	requestAnimationFrame( animate );
    controls.update();
   // stats.update();
	renderer.render( scene, camera );
}

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function loadObjMtl(path, nameMTL, nameOBJ){

    //1.Load MTL (Texture)
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setResourcePath(path);
    mtlLoader.setPath(path);
    mtlLoader.load(nameMTL, function (material) {
        material.preload();

        // 2. Load OBJ (Mesh)
        var objLoader = new THREE.OBJLoader();
        objLoader.setPath(path);
        objLoader.setMaterials(material);
        objLoader.load(nameOBJ, function (object) {
            scene.add(object);
            object.position.x=0;
        });

    });

}

