import * as THREE from 'three'

const canvas = document.querySelector('canvas.glcanvas')


// we need 4 elements to rendere something on screen.
/* 
    1. Scene
    2. Object
    3. Camera
    4. Renderer
*/

// 1. scene
const scene = new THREE.Scene()

// 2. Object is nothing but a Mesh which is a combination of Material and Geometry.

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 'purple' })

const mesh = new THREE.Mesh(geometry, material)

// we need to add it to the scene.
scene.add(mesh)


// 3. camera
// we need width and height for aspect ratio to pass a arg for camera.

const sizes = {
    width: 800,
    height: 600
}

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 2000);
camera.position.z = 3

scene.add(camera);

// AxesHelper
// const axesHelper = new THREE.AxesHelper(3);
// scene.add(axesHelper)

// positioning
// mesh.position.x = 2
// mesh.position.y = 1
// mesh.position.z = -0.2
// mesh.position.set(2, 1, -0.2)

// scaling
// mesh.scale.x = 2
// mesh.scale.y = 2
// mesh.scale.z = 2
// mesh.scale.set(2, 2, 2)

// 4. renderer

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)

// now call the renderer with scene and camera
renderer.render(scene, camera)

