import * as THREE from 'three'

const canvas = document.querySelector('canvas.glcanvas');



// to show something on screen we need 4 elements
/**
 * scene
 * object = (geometry + material)
 * camera
 * renderer
 */

// 1. scene
const scene = new THREE.Scene();

// creating group to manage all objects
const group = new THREE.Group();


// 2. object = combo (geometry, material)

// const geometry = new THREE.BoxGeometry(1,1,1)
// const material = new THREE.MeshBasicMaterial({
//     color: 'red'
// })

// const mesh = new THREE.Mesh(geometry, material)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial( {color: 'purple'})
)

group.add(cube1)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 'red' })
)

cube2.position.x = -1
cube2.position.y = -1

group.add(cube2)

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 'green' })
)

group.add(cube3)
cube3.position.x = 1
cube3.position.y = 1

// 3.camera
const sizes = {
    width: 600,
    height: 800
}

// const camera = new THREE.PerspectiveCamera(fov, aspectratio, near, far);
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 2000);
camera.position.z = 3
group.add(camera);

// 4. renderer
const renderer = new THREE.WebGLRenderer({
    canvas
})

renderer.setSize(sizes.width, sizes.height)
scene.add(group)

renderer.render(scene, camera)