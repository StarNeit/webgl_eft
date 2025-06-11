let model;

const logoScene = new THREE.Scene();

const CENTER_X = window.innerWidth / 2;
const CENTER_Y = window.innerHeight / 2;

// Create Camera
const logoCamera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.01, 200);
logoCamera.position = 5;

// Create logoRenderer
const logoRenderer = new THREE.WebGLRenderer({ alpha: true });
logoRenderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('logo').appendChild(logoRenderer.domElement);

// Create Light
const ambientLight = new THREE.AmbientLight(0xcccccc, 0.2);
ambientLight.position.set(0, 80, 20);
logoScene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1); // Light with radius
pointLight.position.set(0, 90, -50);
logoScene.add(pointLight);

// const axesHelper = new THREE.AxesHelper(5);
// logoScene.add(axesHelper);
//
// const gridHelper = new THREE.GridHelper(100, 100);
// logoScene.add(gridHelper);

const pivot = new THREE.Object3D();

// logoScene.add(pivot);

const gltfLoader = new THREE.GLTFLoader();
gltfLoader.load('assets/sd-logo.gltf', function (gltf) {
  const obj = gltf.scene;
  obj.rotation.set(0, 0, 0);
  obj.scale.setScalar( 150 );
  const box = new THREE.Box3().setFromObject(obj);
  const center = box.getCenter(new THREE.Vector3());
  obj.position.sub(center);
  model = obj;
  pivot.add(model);
  logoScene.add(pivot);
}, undefined, function (error) {
  console.error(error);
});

function animate() {
  requestAnimationFrame(animate);

  logoRenderer.render(logoScene, logoCamera);
}
animate();

logoCamera.position.set(0, 100, 0); // Move the logoCamera back a bit
logoCamera.lookAt(0,0,0);
const CAMERA_Y_ZOOM_UNIT = 1;
const CAMERA_X_POSITION_UNIT = 7 / ((100 - 4) / CAMERA_Y_ZOOM_UNIT);

function cameraZoomIn() {
  const { x, y, z } = logoCamera.position;

  if (x <= 7 && y >= 1) {
    logoCamera.position.x += CAMERA_X_POSITION_UNIT;
    logoCamera.position.y -= CAMERA_Y_ZOOM_UNIT;
  }
}

function cameraZoomOut() {
  const { x, y } = logoCamera.position;

  if (x >= 0 && y <= 100) {
    logoCamera.position.x -= CAMERA_X_POSITION_UNIT;
    logoCamera.position.y += CAMERA_Y_ZOOM_UNIT;
  }
}

let lastScrollTop = 0;

document.addEventListener('scroll', (event) => {
  const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScrollTop > lastScrollTop) {
    cameraZoomIn();
  } else {
    cameraZoomOut();
  }

  lastScrollTop = currentScrollTop <=0 ? 0 : currentScrollTop;
});


const ROTATE_X_UNIT = 0.32 / CENTER_X;
const ROTATE_Y_UNIT = 0.26 / CENTER_Y;

document.addEventListener('mousemove', (event) => {
  if (logoCamera.position.y > 70) {
    pivot.rotation.z = -((event.offsetX - CENTER_X) * ROTATE_X_UNIT);
    pivot.rotation.x = ((event.offsetY - CENTER_Y) * ROTATE_Y_UNIT);
  } else {
    pivot.rotation.z = 0;
    pivot.rotation.x = 0;
  }
});