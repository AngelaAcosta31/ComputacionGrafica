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

function createGeometry() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = [
        new THREE.MeshBasicMaterial({ color: 0xff0000, opacity: 0.5, transparent: true, wireframe: false}), // Cara frontal
        new THREE.MeshBasicMaterial({ color: 0x00ff00, opacity: 0.5, transparent: true, wireframe: false }), // Cara posterior
        new THREE.MeshBasicMaterial({ color: 0x0000ff, opacity: 0.5, transparent: true, wireframe: false }), // Cara superior
        new THREE.MeshBasicMaterial({ color: 0xffff00, opacity: 0.5, transparent: true, wireframe: false }), // Cara inferior
        new THREE.MeshBasicMaterial({ color: 0xff00ff, opacity: 0.5, transparent: true, wireframe: false}), // Cara izquierda
        new THREE.MeshBasicMaterial({ color: 0x00ffff, opacity: 0.5, transparent: true, wireframe: false})  // Cara derecha
    ];
 /*  const material =  new THREE.MeshStandardMaterial({ color:  0x00ff00, roughness:0.5, metalness:1 });
    return new THREE.Mesh(geometry,material);*/
   
}

function createCube() {
    let floorsNumber = document.getElementById("Floors").value;

    for (let i = 1; i <= floorsNumber; i++) {
        const cube = createGeometry();
        cube.position.set(posX-2, i-1, 0);
        scene.add(cube);
        //se agrega el nuevo cubo al arreglo 
        cubes.push(cube);

    }
    //avanzar la posicion horizontal para la siguiente torre de cubos
    posX += 2;
    
}
function deleteCube(){
    let floorsNumber = parseInt(document.getElementById("Floors").value);
   //Elimina cada cubo
   /* if(cubes.length>0){
       const lastCube = cubes.pop();
       scene.remove(lastCube);
       posX-=2;
    }*/

    //Elimina toda la torre de cubos
    // Verifica si hay suficientes cubos para eliminar
   if (cubes.length >= floorsNumber) {
        for (let i = 0; i < floorsNumber; i++) {
            const removedCube = cubes.pop();
            scene.remove(removedCube);
        }
    } else {
        alert("No hay suficientes cubos para eliminar.");
    }   
    
}
function createLights(typeLight){
    
    switch (typeLight){
        case "PointLight": 
            //PointLight( color : Integer, intensity : Float, distance : Number, decay : Float )
            light = new THREE.PointLight( 0xffffff, 1, 100 );
            light.position.set( 0, 10, 0 );
            scene.add( light );
            const sphereSize = 1;
            const pointLightHelper = new THREE.PointLightHelper( light, sphereSize );
            scene.add( pointLightHelper );
           break;
        case "AmbientLight":
            //AmbientLight( color : Integer, intensity : Float )
            light = new THREE.AmbientLight( 0xffffff ); // soft white light
            scene.add( light ); 
           break;
        case "SpotLight":
            // SpotLight( color : Integer, intensity : Float, distance : Float, angle : Radians, penumbra : Float, decay : Float )
            light = new THREE.SpotLight( 0xffffff );
            spotLight.position.set( 100, 1000, 100 );
            scene.add( light ); 
           break;
    }

}