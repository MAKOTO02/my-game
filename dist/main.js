// main.ts: Three.js のエントリポイント
import * as THREE from "three";
import * as CANNON from 'cannon-es';
// シーン・カメラ・レンダラーの初期化.
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// 物理エンジンのワールド設定.
const world = new CANNON.World();
world.gravity.set(0, -9.82, 0);
const rudius = 1;
const sphereBody = new CANNON.Body({
    mass: 1,
    shape: new CANNON.Sphere(rudius),
    position: new CANNON.Vec3(0, 10, 0)
});
world.addBody(sphereBody);
const sphereGeometry = new THREE.SphereGeometry(rudius, 32, 32);
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphereMesh);
// 床を生成.
const groundBody = new CANNON.Body({
    mass: 0,
    shape: new CANNON.Plane(),
    position: new CANNON.Vec3(0, 0, 0)
});
groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
world.addBody(groundBody);
const groundGeometry = new THREE.PlaneGeometry(10, 10);
const groundMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide });
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
groundMesh.rotation.x = -Math.PI / 2;
scene.add(groundMesh);
camera.position.set(0, 5, 15);
const clock = new THREE.Clock();
function animate() {
    requestAnimationFrame(animate);
    world.step(1 / 60, clock.getDelta(), 10);
    renderer.render(scene, camera);
}
animate();
