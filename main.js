import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// 1. Lenis Smooth Scroll Setup
const lenis = new Lenis({
    duration: 1.3, // Scroll ki speed (jitna zyada, utna smooth)
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth movement logic
});

// Lenis ko GSAP ScrollTrigger ke saath sync karna zaroori hai
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);


// GSAP Register ()
gsap.registerPlugin(ScrollTrigger);

// 2. Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ 
    canvas: document.querySelector('.webgl'), 
    antialias: true,
    alpha: true 
});

// !!! THE FIXES !!!
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Quality safe
renderer.outputColorSpace = THREE.SRGBColorSpace; // Correcting Colors
renderer.toneMapping = THREE.ACESFilmicToneMapping; // Cinematic Look
renderer.toneMappingExposure = 1.8; // Safe Exposure Value

// 3. Simple Lighting Setup ()
// Ambient Light for basic visibility
const ambientLight = new THREE.AmbientLight(0xffffff, 2); 
scene.add(ambientLight);

// Directional Light to create highlights
const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// 4. Model Loading with Material Update
const loader = new GLTFLoader();
let carModel; // Global variable defined upar

loader.load(
    'assests/free_porsche_911_carrera_4s.glb', // car file name
    (gltf) => {
        carModel = gltf.scene;
        scene.add(carModel);
        
        console.log("Model Load ho gaya! 100%");

        // Car ko center aur upar set karne ke liye
        carModel.position.set(0, 0, 0); // car position x,y,z se
        carModel.scale.set(1.5, 1.5, 1.5); // Safe scale

        // Material Update: Colors ko high-def banane ke liye
        carModel.traverse((node) => {
            if (node.isMesh && node.material) {
                node.material.envMapIntensity = 3; // Chamak badhegi
            }
        });

        // --- GSAP Timeline ( scroll animation) ---
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 3, // Smoothness
            }
        });

        tl.to(carModel.rotation, { y: Math.PI * 2, duration: 3 })
          .to(carModel.position, { x: 2, duration: 3 }, "-=1")
          .to(carModel.position, { y: 0.5, duration: 3 }); // Final y offset (upra karne ke liye)

    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    }
);

// Camera default position
camera.position.z = 5;

// 5. Animation Loop (Error hatao!)
function animate() {
    requestAnimationFrame(animate);

    if (carModel) {
        // Yahan extra rotation hata do, let GSAP handle it
    }

    renderer.render(scene, camera);
}
animate();

// Window Resize Logic (Fixes screen issues)
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});