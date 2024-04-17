import * as THREE from 'three'
import GUI from 'lil-gui';
import gsap from 'gsap';

// lets add controls, so we can rotate and move the camera using our mouse.
// we need orbit controls an inbuild control class.
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const canvas = document.querySelector('canvas.glcanvas')

// debug UI
const gui = new GUI({
    width: 340,
    title: 'Debug UI',
    closeFolders: true
});
gui.close()

const debugObject = {}
debugObject.color = '#914b4b'

// addFolder
const cubeFolder = gui.addFolder("Cube Properties")
cubeFolder.close()

const propFolder = gui.addFolder("Positions")
propFolder.close()



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

const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
const material = new THREE.MeshBasicMaterial({ color: debugObject.color, wireframe: true })

const mesh = new THREE.Mesh(geometry, material)

// we need to add it to the scene.
scene.add(mesh)

// gui.add(mesh.position, 'y', -3, 3, 0.01)
// or
propFolder.add(mesh.position, 'y')
    .min(-3)
    .max(3)
    .step(0.01)

    propFolder.add(mesh.position, 'x')
    .min(-2)
    .max(2)
    .step(0.01)

gui.add(mesh, 'visible')

gui.add(material, 'wireframe')


debugObject.spin = () => {
    const tween = gsap.to(mesh.rotation, {
        duration: 1,
        y: mesh.rotation.y + Math.PI * 2,
       
    })
}

gui.add(debugObject, 'spin')


debugObject.subdivision = 2;

cubeFolder.add(debugObject, 'subdivision')
    .min(1)
    .max(20)
    .step(1)
    .onFinishChange(() => {
        mesh.geometry.dispose()
        mesh.geometry = new THREE.BoxGeometry(
            1, 1, 1, 
            debugObject.subdivision, debugObject.subdivision, debugObject.subdivision 
        )
    })

// gui.addColor(material, 'color')
//     .onChange((value) => {
//         console.log('color changed', value.getHexString())
//         console.log('color changed in hsl', value.getHSL(target))
//     })


gui.addColor(debugObject, 'color')
    .onChange(() => {
        material.color.set(debugObject.color)
    })


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