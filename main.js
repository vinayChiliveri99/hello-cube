import * as THREE from 'three'

// lets add controls, so we can rotate and move the camera using our mouse.
// we need orbit controls an inbuild control class.
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

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
const material = new THREE.MeshBasicMaterial({ color: 'red' })

const mesh = new THREE.Mesh(geometry, material)

// we need to add it to the scene.
scene.add(mesh)


// 3. camera
// we need width and height for aspect ratio to pass a arg for camera.

const sizes = {
    // adjusting to the viewport height and width
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    console.log('window has been resized');
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width/sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
})

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 2000);
camera.position.z = 3

scene.add(camera);

// create controls and instantiate them, it takes camera and canvas as args.
const controls = new OrbitControls(camera, canvas)

// add damping to it, damping will smooth the animation, 
// to make damping work we need to update controls in every frame
controls.enableDamping = true

// initially camera point at the center of the object.
// can modify that so that the camera look at some other point

// controls.target.y = 1


// 4. renderer

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)

// now call the renderer with scene and camera
// renderer.render(scene, camera)

// we need a tick function using requestAnimationFrame, to create the animations.

// to rotate the object at the same speed regardless of the framerate of device
// we can use elapsedtime from Clock class

const clock = new THREE.Clock();


const tick = () => {

    const elapsedtime = clock.getElapsedTime()

    // mesh.rotation.x = elapsedtime
    // mesh.position.y = Math.sin(elapsedtime)

    controls.update()

    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()

window.addEventListener('dblclick', () => {
    if(document.fullscreenElement) {
        document.exitFullscreen()
    } else {
        canvas.requestFullscreen()
    }
})