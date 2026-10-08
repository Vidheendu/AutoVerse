/**
 * ============================================================================
 * AutoVerse VR - 3D Car Showroom Controller
 * Phase 2: First 3D Car + Reusable Car System
 * ============================================================================
 */

// ----------------------------------------------------------------------------
// 1. Reusable Car Configuration System
// ----------------------------------------------------------------------------
/**
 * Global car catalog data structure.
 * Designed to easily accommodate all 7 planned vehicles in subsequent phases:
 * 1. BMW M4 (Implemented in Phase 2)
 * 2. Mercedes-AMG GT
 * 3. Porsche 911
 * 4. Audi R8
 * 5. Lamborghini Huracán
 * 6. Range Rover Sport
 * 7. Ford Mustang
 */
const cars = [
  {
    id: "bmw-m4",
    name: "BMW M4",
    category: "Sports Coupe",
    model: "assets/cars/bmw-m4.glb",
    // Calibrated real-world scale (approx. 4.75m length)
    scale: "0.24 0.24 0.24",
    // Centered atop the showroom turntable (height: 0.25m)
    position: "0.16 0.25 0.15",
    // Angled for an optimal showcase view facing the showroom entrance
    rotation: "0 -35 0"
  }
];

// ----------------------------------------------------------------------------
// 2. Toast Notification Helper
// ----------------------------------------------------------------------------
let toastTimer = null;

function showCarSelectedToast(carName) {
  const toast = document.getElementById('car-toast');
  const toastText = document.getElementById('toast-text');
  if (!toast) return;

  if (toastText) {
    toastText.textContent = `${carName} selected`;
  }
  toast.classList.add('active');

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('active');
  }, 2600);
}

// ----------------------------------------------------------------------------
// 3. Reusable A-Frame Component: car-display
// ----------------------------------------------------------------------------
/**
 * Component that attaches to any A-Frame entity to render, position,
 * scale, and handle click interactions for a vehicle from the car catalog.
 */
function registerCarDisplayComponent() {
  if (typeof AFRAME !== 'undefined' && !AFRAME.components['car-display']) {
    AFRAME.registerComponent('car-display', {
      schema: {
        carId: { type: 'string', default: 'bmw-m4' }
      },

      init: function () {
        const carData = cars.find(c => c.id === this.data.carId) || cars[0];
        this.carData = carData;

        // Apply 3D model path and transformations from config
        this.el.setAttribute('gltf-model', carData.model);
        this.el.setAttribute('scale', carData.scale);
        this.el.setAttribute('position', carData.position);
        this.el.setAttribute('rotation', carData.rotation);

        // Mark entity as clickable for raycaster cursor interaction
        this.el.classList.add('clickable');

        // Handle user click / tap interaction
        this.el.addEventListener('click', (evt) => {
          // Stop propagation to prevent unintended background clicks
          if (evt.detail && evt.detail.cursorEl) {
            evt.stopPropagation();
          }
          showCarSelectedToast(this.carData.name);
          console.log(`🚗 Car Interaction: ${this.carData.name} selected.`);
        });

        // Enhance materials once the 3D glTF model finishes loading
        this.el.addEventListener('model-loaded', () => {
          const mesh = this.el.getObject3D('mesh');
          if (mesh) {
            mesh.traverse((node) => {
              if (node.isMesh && node.material) {
                // Enable realistic shadows and surface highlights
                node.castShadow = true;
                node.receiveShadow = true;
              }
            });
          }
          console.log(`✅ ${this.carData.name} 3D model loaded and calibrated on platform.`);
        });

        this.el.addEventListener('model-error', (err) => {
          console.error(`❌ Failed to load 3D model for ${this.carData.name}:`, err.detail);
        });
      }
    });
  }
}

// ----------------------------------------------------------------------------
// 4. Custom A-Frame Component: Showroom Boundary Limiter
// ----------------------------------------------------------------------------
function registerShowroomBoundaries() {
  if (typeof AFRAME !== 'undefined' && !AFRAME.components['showroom-boundaries']) {
    AFRAME.registerComponent('showroom-boundaries', {
      schema: {
        minX: { type: 'number', default: -18 },
        maxX: { type: 'number', default: 18 },
        minZ: { type: 'number', default: -18 },
        maxZ: { type: 'number', default: 18 }
      },

      tick: function () {
        const pos = this.el.getAttribute('position');
        if (!pos) return;

        let clampedX = Math.min(Math.max(pos.x, this.data.minX), this.data.maxX);
        let clampedZ = Math.min(Math.max(pos.z, this.data.minZ), this.data.maxZ);

        if (clampedX !== pos.x || clampedZ !== pos.z) {
          this.el.setAttribute('position', {
            x: clampedX,
            y: pos.y,
            z: clampedZ
          });
        }
      }
    });
  }
}

// Attempt immediate registration if A-Frame is already loaded
registerCarDisplayComponent();
registerShowroomBoundaries();

// ----------------------------------------------------------------------------
// 5. UI and Scene Lifecycle Initialization on DOM Ready
// ----------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  // Ensure components are registered
  registerCarDisplayComponent();
  registerShowroomBoundaries();

  // DOM Elements
  const introModal = document.getElementById('intro-modal');
  const dismissBtn = document.getElementById('dismiss-overlay-btn');
  const openInfoBtn = document.getElementById('open-info-btn');
  const resetCamBtn = document.getElementById('reset-camera-btn');
  const vrStatusText = document.getElementById('vr-status-text');
  const sceneEl = document.querySelector('a-scene');

  // Optimal camera spawn position facing the main display platform
  const SPAWN_POSITION = { x: 0, y: 0, z: 7.5 };
  const SPAWN_ROTATION = { x: 0, y: 0, z: 0 };

  // --------------------------------------------------------------------------
  // Overlay Visibility & Controls
  // --------------------------------------------------------------------------
  if (dismissBtn && introModal) {
    dismissBtn.addEventListener('click', () => {
      introModal.classList.add('hidden');
    });
  }

  if (openInfoBtn && introModal) {
    openInfoBtn.addEventListener('click', () => {
      introModal.classList.remove('hidden');
    });
  }

  // --------------------------------------------------------------------------
  // Camera Reset Viewpoint
  // --------------------------------------------------------------------------
  if (resetCamBtn) {
    resetCamBtn.addEventListener('click', () => {
      const cameraRig = document.getElementById('camera-rig');
      const cameraHead = document.getElementById('camera-head');

      if (cameraRig) {
        cameraRig.setAttribute('position', `${SPAWN_POSITION.x} ${SPAWN_POSITION.y} ${SPAWN_POSITION.z}`);
      }
      if (cameraHead) {
        cameraHead.setAttribute('rotation', `${SPAWN_ROTATION.x} ${SPAWN_ROTATION.y} ${SPAWN_ROTATION.z}`);
        const lookControls = cameraHead.components && cameraHead.components['look-controls'];
        if (lookControls && lookControls.pitchObject && lookControls.yawObject) {
          lookControls.pitchObject.rotation.x = 0;
          lookControls.yawObject.rotation.y = 0;
        }
      }
    });
  }

  // --------------------------------------------------------------------------
  // WebXR / VR Compatibility Check
  // --------------------------------------------------------------------------
  function checkWebXRSupport() {
    if (navigator.xr && navigator.xr.isSessionSupported) {
      navigator.xr.isSessionSupported('immersive-vr')
        .then((supported) => {
          if (supported && vrStatusText) {
            vrStatusText.textContent = 'VR Ready (Headset Detected)';
          } else if (vrStatusText) {
            vrStatusText.textContent = 'VR Ready';
          }
        })
        .catch(() => {
          if (vrStatusText) vrStatusText.textContent = 'VR Ready';
        });
    } else if (vrStatusText) {
      vrStatusText.textContent = 'VR Ready';
    }
  }

  checkWebXRSupport();

  // --------------------------------------------------------------------------
  // A-Frame Scene Lifecycle Listeners
  // --------------------------------------------------------------------------
  if (sceneEl) {
    sceneEl.addEventListener('loaded', () => {
      console.log('✅ AutoVerse VR Scene initialized.');
      console.log('🏎️ Vehicle System: BMW M4 loaded on central stage.');
    });

    sceneEl.addEventListener('enter-vr', () => {
      console.log('👓 Entered WebXR VR Mode.');
      if (introModal) introModal.classList.add('hidden');
    });

    sceneEl.addEventListener('exit-vr', () => {
      console.log('👓 Exited WebXR VR Mode.');
    });
  }
});
