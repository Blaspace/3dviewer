// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Show loading indicator
  document.getElementById("loading").style.display = "block";

  // Scene setup
  const scene = new THREE.Scene();

  // Camera setup
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 0.1);

  // Renderer setup
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.getElementById("container").appendChild(renderer.domElement);

  // Controls setup
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.rotateSpeed = -0.3; // Reverse the rotation direction if needed

  // Create 360° sphere
  const geometry = new THREE.SphereGeometry(500, 60, 40);
  geometry.scale(-1, 1, 1); // Invert the sphere to render inside

  // Texture setup
  const textureLoader = new THREE.TextureLoader();

  // Replace with your 360° image path
  // Image should be equirectangular projection (2:1 aspect ratio)
  const imageUrl = "https://threejs.org/examples/textures/2294472375_24a3b8ef46_o.jpg";

  textureLoader.load(
    imageUrl,
    function (texture) {
      // Hide loading indicator when texture is loaded
      document.getElementById("loading").style.display = "none";

      const material = new THREE.MeshBasicMaterial({
        map: texture,
      });

      const sphere = new THREE.Mesh(geometry, material);
      scene.add(sphere);
    },
    undefined,
    function (error) {
      console.error("Error loading texture:", error);
      document.getElementById("loading").textContent =
        "Error loading image";
    }
  );

  // Handle window resize
  window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }

  animate();
});