const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('backgroundCanvas').appendChild(renderer.domElement);
renderer.setClearColor("rgb(24, 24, 27)", 1);

const POINT_COUNT = 10000;
const WAVE_WIDTH = 50;
const WAVE_DEPTH = 50;
const POINT_SIZE = 0.1;
let WAVE_SPEED = 0.5;
let clicks = 0;


//spike extremity
const MAX_SPIKE_HEIGHT = 5; 
//spike interval count
const SPIKE_INTERVAL = 3.0; 
const SPIKES_PER_BURST = 100;

// create pointcloud
const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(POINT_COUNT * 3);
const colors = new Float32Array(POINT_COUNT * 3);

for (let i = 0; i < POINT_COUNT; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * WAVE_WIDTH;
    positions[i3 + 2] = (Math.random() - 0.5) * WAVE_DEPTH;

    colors[i3] = Math.random() * 0.2;
    colors[i3 + 1] = Math.random() * 0.3 + 0.2;
    colors[i3 + 2] = Math.random() * 0.5 + 0.5;
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const material = new THREE.PointsMaterial({
    size: POINT_SIZE,
    vertexColors: true,
    transparent: true,
    opacity: 0.8
});

const points = new THREE.Points(geometry, material);
scene.add(points);

const activeSpikes = [];
let lastSpikeTime = 0;

camera.position.z = 10;
camera.position.y = 5;
camera.lookAt(0, 0, 0);

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

window.addEventListener('click', (event) => {
    console.log("Click");
    
    WAVE_SPEED += 0.1;
});

let time = 0;
function animate() {
    requestAnimationFrame(animate);
    
    time += 0.01;
    
    const positions = geometry.attributes.position.array;
    
    for (let i = 0; i < POINT_COUNT; i++) {
        const i3 = i * 3;
        const x = positions[i3];
        const z = positions[i3 + 2];
        
        let waveHeight = Math.sin(x * 0.5 + time * WAVE_SPEED) * 
                        Math.cos(z * 0.5 + time * WAVE_SPEED) * 2;
        positions[i3 + 1] = waveHeight;
    }
    
    for (let s = 0; s < activeSpikes.length; s++) {
        const spike = activeSpikes[s];
        const i3 = spike.index * 3;
        
        const progress = spike.duration / spike.maxDuration;
        const spikeHeight = spike.height * 
                            Math.sin(progress * Math.PI); 
        
        positions[i3 + 1] += spikeHeight;
        
        spike.duration--;
        
        if (spike.duration <= 0) {
            activeSpikes.splice(s, 1);
            s--;
        }
    }
    
    if (time - lastSpikeTime > SPIKE_INTERVAL) {
        lastSpikeTime = time;
        
        for (let i = 0; i < SPIKES_PER_BURST; i++) {
            const randomIndex = Math.floor(Math.random() * POINT_COUNT);
            
            activeSpikes.push({
                index: randomIndex,
                height: 0.5 + Math.random() * (MAX_SPIKE_HEIGHT - 0.5), // At least 0.5 height
                duration: 30 + Math.random() * 20, // Longer, smoother spikes
                maxDuration: 30 + Math.random() * 20
            });
        }
    }
    points.rotation.y = time * 0.1;

    if (clicks > 0) {
        WAVE_SPEED -= 0.1;
        clicks -= 1;
    }
    
    console.log(clicks);
    
    geometry.attributes.position.needsUpdate = true;
    renderer.render(scene, camera);
}

animate();