let model;

const logoScene = new THREE.Scene();

// Create Camera
const logoCamera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.01, 200);
logoCamera.position = 5;

// Create logoRenderer
const logoRenderer = new THREE.WebGLRenderer({ alpha: true });
logoRenderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('logo').appendChild(logoRenderer.domElement);

// Create Light
const ambientLight = new THREE.AmbientLight(0xcccccc, 0.2);
ambientLight.position.set(0, 0, 10);// Soft white light
logoScene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1); // Light with radius
pointLight.position.set(0, 0, 20);
logoScene.add(pointLight);

const objLoader = new THREE.OBJLoader();
objLoader.load('assets/SearchDigitalLogo.obj', function (obj) {
  obj.rotation.set(89.539, 0, 0.019);
  obj.position.set(-55, -12, 0);
  obj.scale.setScalar( 0.04 );
  model = obj;
  logoScene.add(obj);
}, undefined, function (error) {
  console.error(error);
});

function animate() {
  requestAnimationFrame(animate);

  logoRenderer.render(logoScene, logoCamera);
}
animate();

logoCamera.position.set(-3, 0, 100); // Move the logoCamera back a bit

const CAMERA_Z_ZOOM_UNIT = 1;
const CAMERA_X_POSITION_UNIT = 8.8 / ((100 - 4) / CAMERA_Z_ZOOM_UNIT);
const CAMERA_Y_POSITION_UNIT = 5 / ((100 - 4) / CAMERA_Z_ZOOM_UNIT);

function cameraZoomIn() {
  const { x, y, z } = logoCamera.position;

  if (x <= 5.8 && y <= 5 && z >= 4) {
    logoCamera.position.x += CAMERA_X_POSITION_UNIT;
    logoCamera.position.y += CAMERA_Y_POSITION_UNIT;
    logoCamera.position.z -= CAMERA_Z_ZOOM_UNIT;
  }
}

function cameraZoomOut() {
  const { x, y, z } = logoCamera.position;

  if (x >= -3 && y >= 0 && z <= 100) {
    logoCamera.position.x -= CAMERA_X_POSITION_UNIT;
    logoCamera.position.y -= CAMERA_Y_POSITION_UNIT;
    logoCamera.position.z += CAMERA_Z_ZOOM_UNIT;
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