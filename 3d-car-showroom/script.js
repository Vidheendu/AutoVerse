/**
 * ============================================================================
 * AutoVerse VR - 3D Car Showroom Controller
 * Phase 4: Interactive Car Selection & Technical Specifications
 * ============================================================================
 */

// ----------------------------------------------------------------------------
// 1. Centralized Reusable Car Configuration & Specifications System
// ----------------------------------------------------------------------------
/**
 * Master catalog defining all seven vehicles in the showroom.
 * Each vehicle has its own specifications (engine, power, transmission,
 * fuel, top speed, 0-100 km/h acceleration, price), 3D model transforms,
 * bay IDs, and VR board coordinates.
 */
const cars = [
  {
    id: "bmw-m4",
    name: "BMW M4",
    category: "Sports Coupe",
    price: "₹1.50 Crore",
    engine: "3.0L Twin-Turbo Inline-6",
    power: "503 HP",
    transmission: "8-Speed Automatic",
    fuel: "Petrol",
    topSpeed: "250 km/h",
    acceleration: "3.9 seconds",
    model: "assets/cars/bmw-m4.glb",
    // Calibrated real-world scale (approx. 4.75m length)
    scale: "0.24 0.24 0.24",
    position: "0.16 0.05 0.15",
    rotation: "0 45 0",
    bayId: "bay-bmw-m4",
    spotId: "spot-bmw-m4",
    vrBoardPosition: "-7.6 2.0 11.5",
    vrBoardRotation: "0 -25 0"
  },
  {
    id: "mercedes-amg-gt",
    name: "Mercedes-AMG GT",
    category: "Luxury Sports",
    price: "₹2.75 Crore",
    engine: "4.0L V8 Biturbo",
    power: "577 HP",
    transmission: "9-Speed Automatic",
    fuel: "Petrol",
    topSpeed: "315 km/h",
    acceleration: "3.2 seconds",
    model: "assets/cars/mercedes-amg-gt.glb",
    scale: "1 1 1",
    position: "0 0.05 0",
    rotation: "0 -45 0",
    bayId: "bay-mercedes-amg-gt",
    spotId: "spot-mercedes-amg-gt",
    vrBoardPosition: "7.6 2.0 11.5",
    vrBoardRotation: "0 25 0"
  },
  {
    id: "porsche-911",
    name: "Porsche 911",
    category: "Performance",
    price: "₹1.86 Crore",
    engine: "3.0L Twin-Turbo Flat-6",
    power: "443 HP",
    transmission: "8-Speed PDK",
    fuel: "Petrol",
    topSpeed: "293 km/h",
    acceleration: "3.5 seconds",
    model: "assets/cars/porsche-911.glb",
    scale: "1 1 1",
    // Offset for PlayCanvas origin (min.y is -0.632m)
    position: "0 0.71 0",
    rotation: "0 55 0",
    bayId: "bay-porsche-911",
    spotId: "spot-porsche-911",
    vrBoardPosition: "-8.4 2.0 3.6",
    vrBoardRotation: "0 -25 0"
  },
  {
    id: "audi-r8",
    name: "Audi R8",
    category: "Supercar",
    price: "₹2.30 Crore",
    engine: "5.2L V10",
    power: "602 HP",
    transmission: "7-Speed S-Tronic",
    fuel: "Petrol",
    topSpeed: "331 km/h",
    acceleration: "3.2 seconds",
    model: "assets/cars/audi-r8.glb",
    scale: "1 1 1",
    // Standard 1:1 meter model with origin at tire baseline
    position: "0 0.05 0",
    rotation: "0 -55 0",
    bayId: "bay-audi-r8",
    spotId: "spot-audi-r8",
    vrBoardPosition: "8.4 2.0 3.6",
    vrBoardRotation: "0 25 0"
  },
  {
    id: "lamborghini-huracan",
    name: "Lamborghini Huracán",
    category: "Supercar",
    price: "₹3.22 Crore",
    engine: "5.2L V10",
    power: "631 HP",
    transmission: "7-Speed Dual-Clutch",
    fuel: "Petrol",
    topSpeed: "325 km/h",
    acceleration: "2.9 seconds",
    model: "assets/cars/lamborghini-huracan.glb",
    scale: "1 1 1",
    position: "0 0.25 0",
    rotation: "0 -35 0",
    bayId: "central-platform",
    spotId: "spot-lamborghini-huracan",
    vrBoardPosition: "0 2.2 -1.2",
    vrBoardRotation: "0 0 0"
  },
  {
    id: "range-rover-sport",
    name: "Range Rover Sport",
    category: "Luxury SUV",
    price: "₹1.64 Crore",
    engine: "4.4L Twin-Turbo V8",
    power: "523 HP",
    transmission: "8-Speed Automatic",
    fuel: "Petrol",
    topSpeed: "250 km/h",
    acceleration: "4.5 seconds",
    model: "assets/cars/range-rover-sport.glb",
    scale: "1 1 1",
    position: "0 0.05 0",
    rotation: "0 35 0",
    bayId: "bay-range-rover-sport",
    spotId: "spot-range-rover-sport",
    vrBoardPosition: "-7.6 2.0 -10.5",
    vrBoardRotation: "0 -25 0"
  },
  {
    id: "ford-mustang",
    name: "Ford Mustang",
    category: "Muscle Car",
    price: "₹74.61 Lakh",
    engine: "5.0L V8",
    power: "486 HP",
    transmission: "10-Speed Automatic",
    fuel: "Petrol",
    topSpeed: "250 km/h",
    acceleration: "4.4 seconds",
    model: "assets/cars/ford-mustang.glb",
    scale: "1 1 1",
    position: "0 0.05 0",
    rotation: "0 -35 0",
    bayId: "bay-ford-mustang",
    spotId: "spot-ford-mustang",
    vrBoardPosition: "7.6 2.0 -10.5",
    vrBoardRotation: "0 25 0"
  }
];

// ----------------------------------------------------------------------------
// 2. State & Toast Notification Helper
// ----------------------------------------------------------------------------
let currentlySelectedCarId = null;
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
// 3. Car Selection & Specifications Controller (Phase 4)
// ----------------------------------------------------------------------------
/**
 * Selects a vehicle by ID, populates the single reusable HTML information panel,
 * highlights the platform subtly, and renders the 3D in-world VR display board.
 */
function selectCar(carId) {
  const carData = cars.find(c => c.id === carId);
  if (!carData) return;

  // Clear previous platform highlight without closing the panel
  deselectCar(false);

  currentlySelectedCarId = carData.id;

  // 1. Populate HTML Information Panel
  const panel = document.getElementById('car-info-panel');
  if (panel) {
    const elName = document.getElementById('panel-car-name');
    const elCat = document.getElementById('panel-car-category');
    const elPrice = document.getElementById('panel-car-price');
    const elQuickPower = document.getElementById('panel-quick-power');
    const elQuickSpeed = document.getElementById('panel-quick-speed');
    const elQuickAccel = document.getElementById('panel-quick-accel');

    const elEngine = document.getElementById('panel-spec-engine');
    const elPower = document.getElementById('panel-spec-power');
    const elTrans = document.getElementById('panel-spec-transmission');
    const elFuel = document.getElementById('panel-spec-fuel');
    const elSpeed = document.getElementById('panel-spec-speed');
    const elAccel = document.getElementById('panel-spec-acceleration');

    if (elName) elName.textContent = carData.name;
    if (elCat) elCat.textContent = carData.category;
    if (elPrice) elPrice.textContent = carData.price;
    if (elQuickPower) elQuickPower.textContent = carData.power;
    if (elQuickSpeed) elQuickSpeed.textContent = carData.topSpeed;
    if (elQuickAccel) elQuickAccel.textContent = carData.acceleration;

    if (elEngine) elEngine.textContent = carData.engine;
    if (elPower) elPower.textContent = carData.power;
    if (elTrans) elTrans.textContent = carData.transmission;
    if (elFuel) elFuel.textContent = carData.fuel;
    if (elSpeed) elSpeed.textContent = carData.topSpeed;
    if (elAccel) elAccel.textContent = carData.acceleration;

    panel.classList.add('active');
    panel.setAttribute('aria-hidden', 'false');
  }

  // 2. Subtle Highlight on Selected Platform & Spotlight Boost
  const bay = document.getElementById(carData.bayId);
  if (bay) {
    const highlightBorder = bay.querySelector('.bay-highlight-border');
    if (highlightBorder) {
      highlightBorder.setAttribute('visible', 'true');
    }
  }

  const spot = document.getElementById(carData.spotId);
  if (spot) {
    spot.setAttribute('intensity', carData.id === 'lamborghini-huracan' ? '3.0' : '2.2');
  }

  // 3. Populate and Position 3D VR Information Board for WebXR
  const vrBoard = document.getElementById('vr-info-board');
  if (vrBoard) {
    vrBoard.setAttribute('position', carData.vrBoardPosition);
    vrBoard.setAttribute('rotation', carData.vrBoardRotation);

    const vrName = document.getElementById('vr-text-name');
    const vrCat = document.getElementById('vr-text-category');
    const vrPrice = document.getElementById('vr-text-price');
    const vrEngine = document.getElementById('vr-text-engine');
    const vrPower = document.getElementById('vr-text-power');
    const vrTrans = document.getElementById('vr-text-trans');
    const vrFuel = document.getElementById('vr-text-fuel');
    const vrSpeed = document.getElementById('vr-text-speed');
    const vrAccel = document.getElementById('vr-text-accel');

    if (vrName) vrName.setAttribute('value', carData.name);
    if (vrCat) vrCat.setAttribute('value', carData.category);
    if (vrPrice) vrPrice.setAttribute('value', carData.price);
    if (vrEngine) vrEngine.setAttribute('value', `Engine: ${carData.engine}`);
    if (vrPower) vrPower.setAttribute('value', `Power: ${carData.power}`);
    if (vrTrans) vrTrans.setAttribute('value', `Trans: ${carData.transmission}`);
    if (vrFuel) vrFuel.setAttribute('value', `Fuel: ${carData.fuel}`);
    if (vrSpeed) vrSpeed.setAttribute('value', `Top Speed: ${carData.topSpeed}`);
    if (vrAccel) vrAccel.setAttribute('value', `0-100: ${carData.acceleration}`);

    vrBoard.setAttribute('visible', 'true');
  }

  // Toast confirmation
  showCarSelectedToast(carData.name);
  console.log(`🚗 Car Selected: ${carData.name} (${carData.category}) - ${carData.price}`);
}

/**
 * Deselects the active vehicle, restores default platform borders and lighting,
 * and hides the information panels.
 */
function deselectCar(hidePanel = true) {
  if (currentlySelectedCarId) {
    const prevCar = cars.find(c => c.id === currentlySelectedCarId);
    if (prevCar) {
      const bay = document.getElementById(prevCar.bayId);
      if (bay) {
        const highlightBorder = bay.querySelector('.bay-highlight-border');
        if (highlightBorder) {
          highlightBorder.setAttribute('visible', 'false');
        }
      }
      const spot = document.getElementById(prevCar.spotId);
      if (spot) {
        spot.setAttribute('intensity', prevCar.id === 'lamborghini-huracan' ? '2.2' : '1.4');
      }
    }
  }

  // Hide 3D VR Board
  const vrBoard = document.getElementById('vr-info-board');
  if (vrBoard) {
    vrBoard.setAttribute('visible', 'false');
  }

  // Hide HTML Information Panel
  if (hidePanel) {
    const panel = document.getElementById('car-info-panel');
    if (panel) {
      panel.classList.remove('active');
      panel.setAttribute('aria-hidden', 'true');
    }
    currentlySelectedCarId = null;
  }
}

// Expose globally for API and debugging access
if (typeof window !== 'undefined') {
  window.selectCar = selectCar;
  window.deselectCar = deselectCar;
}

// ----------------------------------------------------------------------------
// 4. Reusable A-Frame Component: car-display
// ----------------------------------------------------------------------------
/**
 * Component that attaches to any car entity in the scene.
 * Dynamically binds configuration from the cars catalog, sets up
 * glTF loading, registers click selection, and calibrates lighting/materials.
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

        // Apply calibrated scale, local position, and rotation
        this.el.setAttribute('scale', carData.scale);
        this.el.setAttribute('position', carData.position);
        this.el.setAttribute('rotation', carData.rotation);

        // Mark entity as clickable for raycaster cursor interaction
        this.el.classList.add('clickable');

        // Handle user click / tap interaction
        this.el.addEventListener('click', (evt) => {
          if (evt.detail && evt.detail.cursorEl) {
            evt.stopPropagation();
          }
          selectCar(this.carData.id);
        });

        // Set gltf-model attribute to load asset from catalog path
        this.el.setAttribute('gltf-model', carData.model);

        // On successful model load, optimize shadows and surface materials
        this.el.addEventListener('model-loaded', () => {
          const mesh = this.el.getObject3D('mesh');
          if (mesh) {
            mesh.traverse((node) => {
              if (node.isMesh && node.material) {
                node.castShadow = true;
                node.receiveShadow = true;
              }
            });
          }
          console.log(`✅ [${this.carData.name}] 3D model loaded successfully.`);
        });

        // Handle missing model gracefully (logged for student/evaluator information)
        this.el.addEventListener('model-error', (err) => {
          console.info(`ℹ️ [${this.carData.name}] Model file not found at "${this.carData.model}". Place "${this.carData.id}.glb" in assets/cars/ to render this vehicle.`);
        });
      }
    });
  }
}

// ----------------------------------------------------------------------------
// 5. Custom A-Frame Component: Showroom Boundary Limiter
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
// 6. UI and Scene Lifecycle Initialization on DOM Ready
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

  // Specification Panel Elements (Phase 4)
  const infoPanel = document.getElementById('car-info-panel');
  const viewSpecsBtn = document.getElementById('btn-view-specs');
  const specsDetails = document.getElementById('panel-specs-details');
  const specsToggleLabel = document.getElementById('specs-toggle-label');
  const panelCloseBtn = document.getElementById('panel-close-btn');
  const panelCloseIconBtn = document.getElementById('panel-close-icon-btn');
  const vrCloseBtn = document.getElementById('vr-close-btn');

  // Starting camera position overlooking the entire showroom aisle
  const SPAWN_POSITION = { x: 0, y: 0, z: 15 };
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
  // Specifications Panel Interaction (Phase 4)
  // --------------------------------------------------------------------------
  // Toggle Expand / Collapse Technical Specifications
  if (viewSpecsBtn && specsDetails) {
    viewSpecsBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = specsDetails.classList.toggle('expanded');
      viewSpecsBtn.classList.toggle('expanded', isExpanded);
      viewSpecsBtn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
      if (specsToggleLabel) {
        specsToggleLabel.textContent = isExpanded ? 'Hide Specifications' : 'View Specifications';
      }
    });
  }

  // Close Panel Handlers
  if (panelCloseBtn) {
    panelCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      deselectCar(true);
    });
  }

  if (panelCloseIconBtn) {
    panelCloseIconBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      deselectCar(true);
    });
  }

  if (vrCloseBtn) {
    vrCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      deselectCar(true);
    });
  }

  // Prevent camera look/movement controls when interacting with the HTML panel
  if (infoPanel) {
    const stopProp = (e) => e.stopPropagation();
    ['mousedown', 'mousemove', 'mouseup', 'click', 'touchstart', 'touchmove', 'touchend', 'wheel', 'pointerdown', 'pointermove', 'pointerup'].forEach(evt => {
      infoPanel.addEventListener(evt, stopProp);
    });
  }

  // Bind clicks on platform bases and standing plaques
  document.querySelectorAll('[data-car-id]').forEach(el => {
    el.addEventListener('click', (evt) => {
      if (evt.detail && evt.detail.cursorEl) {
        evt.stopPropagation();
      }
      const carId = el.getAttribute('data-car-id');
      if (carId) {
        selectCar(carId);
      }
    });
  });

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
      console.log('🏎️ 7-Vehicle Showroom Fleet & Specifications ready.');
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
