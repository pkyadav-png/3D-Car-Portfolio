🏎️ Interactive 3D Car Experience:

   A high-performance, cinematic 3D web experience featuring a car model with Scroll-Triggered Animations. This project    mimics "Apple-style" smooth transitions and premium 3D rendering.



🌟 Key Features

. High-Fidelity 3D Model: Integrated a detailed .glb car model using Three.js.

. Ultra-Smooth Scrolling: Implemented Lenis Scroll to eliminate browser stutter and provide a fluid user experience.

. Scroll-Triggered Animations: Used GSAP ScrollTrigger to link the car's rotation, position, and scale directly to the user's scroll progress.

. Cinematic Lighting: Configured a studio-grade lighting setup (Ambient, Directional, and Point lights) to achieve a realistic metallic finish.

. Fully Responsive: Optimized the 3D viewport and camera aspect ratio for seamless viewing on Desktop, Tablet, and Mobile devices.



🛠️ Tech Stack

. Three.js: For 3D scene construction and WebGL rendering.

. GSAP (GreenSock): For complex animation timelines and scroll-linked movements.

. Lenis: For modern, decoupled smooth scrolling.

. HTML5 / CSS3 / JavaScript: Core architecture and styling.



🚀 Technical Implementation

. Scene Architecture: Established a virtual 3D environment with a perspective camera and WebGL renderer.

. GLTF Asset Management: Loaded the 3D asset and programmatically adjusted material properties like metalness,     roughness, and envMapIntensity for a glossy showroom finish.

. Animation Logic: Created a synchronized GSAP timeline that updates the car's rotation.y and position.x based on the scrollbar's vertical offset.

. Performance Optimization: Included a responsive resize listener to update the camera's projection matrix, ensuring the model never looks stretched.
