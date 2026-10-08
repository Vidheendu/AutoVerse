/**
 * ============================================================================
 * AutoVerse VR - 3D Car Showroom Controller
 * Phase 5: 360° Car Inspection & View Controls
 * ============================================================================
 */

// ----------------------------------------------------------------------------
// 1. Centralized Reusable Car Configuration & Specifications System
// ----------------------------------------------------------------------------
/**
 * Master catalog defining all seven vehicles in the showroom.
 * Each vehicle has its own specifications (engine, power, transmission,
 * fuel, top speed, 0-100 km/h acceleration, price), 3D model transforms,
 * initial rotation axes, bay center coordinates, inspection camera offsets,
 * and VR board coordinates.
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
    initialRotX: 0,
    initialRotY: 45,
    initialRotZ: 0,
    bayId: "bay-bmw-m4",
    spotId: "spot-bmw-m4",
    bayCenter: { x: -10, y: 0.6, z: 10 },
    inspectionCam: { x: -6.8, y: 1.35, z: 13.2 },
    minZoomDist: 2.6,
    maxZoomDist: 7.2,
    vrBoardPosition: "-7.6 2.0 11.5",
    vrBoardRotation: "0 -25 0",
    // Phase 6: Exterior Material & Color Customization
    bodyMaterials: ["Meshesbody151Mtl"],
    defaultColor: "#1565C0", // Blue
    currentColor: "#1565C0"
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
    initialRotX: 0,
    initialRotY: -45,
    initialRotZ: 0,
    bayId: "bay-mercedes-amg-gt",
    spotId: "spot-mercedes-amg-gt",
    bayCenter: { x: 10, y: 0.6, z: 10 },
    inspectionCam: { x: 6.8, y: 1.35, z: 13.2 },
    minZoomDist: 2.6,
    maxZoomDist: 7.2,
    vrBoardPosition: "7.6 2.0 11.5",
    vrBoardRotation: "0 25 0",
    // Phase 6: Exterior Material & Color Customization
    bodyMaterials: ["paint", "body", "carpaint", "exterior", "chassis"],
    defaultColor: "#B0B0B0", // Silver
    currentColor: "#B0B0B0"
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
    initialRotX: 0,
    initialRotY: 55,
    initialRotZ: 0,
    bayId: "bay-porsche-911",
    spotId: "spot-porsche-911",
    bayCenter: { x: -11, y: 0.7, z: 2 },
    inspectionCam: { x: -7.8, y: 1.35, z: 5.2 },
    minZoomDist: 2.6,
    maxZoomDist: 7.2,
    vrBoardPosition: "-8.4 2.0 3.6",
    vrBoardRotation: "0 -25 0",
    // Phase 6: Exterior Material & Color Customization
    bodyMaterials: ["paint"],
    defaultColor: "#F5F5F5", // White
    currentColor: "#F5F5F5"
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
    initialRotX: 0,
    initialRotY: -55,
    initialRotZ: 0,
    bayId: "bay-audi-r8",
    spotId: "spot-audi-r8",
    bayCenter: { x: 11, y: 0.6, z: 2 },
    inspectionCam: { x: 7.8, y: 1.35, z: 5.2 },
    minZoomDist: 2.6,
    maxZoomDist: 7.2,
    vrBoardPosition: "8.4 2.0 3.6",
    vrBoardRotation: "0 25 0",
    // Phase 6: Exterior Material & Color Customization
    bodyMaterials: ["BodyMaterials(00297F)"],
    defaultColor: "#C62828", // Red
    currentColor: "#C62828"
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
    initialRotX: 0,
    initialRotY: -35,
    initialRotZ: 0,
    bayId: "central-platform",
    spotId: "spot-lamborghini-huracan",
    bayCenter: { x: 0, y: 0.7, z: -5 },
    inspectionCam: { x: 0, y: 1.35, z: -0.5 },
    minZoomDist: 2.6,
    maxZoomDist: 7.5,
    vrBoardPosition: "0 2.2 -1.2",
    vrBoardRotation: "0 0 0",
    // Phase 6: Exterior Material & Color Customization
    bodyMaterials: ["paint", "body", "carpaint", "exterior", "chassis"],
    defaultColor: "#C62828", // Red (Yellow if natural model, otherwise Red)
    currentColor: "#C62828"
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
    initialRotX: 0,
    initialRotY: 35,
    initialRotZ: 0,
    bayId: "bay-range-rover-sport",
    spotId: "spot-range-rover-sport",
    bayCenter: { x: -10, y: 0.8, z: -12 },
    inspectionCam: { x: -6.8, y: 1.45, z: -8.8 },
    minZoomDist: 2.8,
    maxZoomDist: 7.5,
    vrBoardPosition: "-7.6 2.0 -10.5",
    vrBoardRotation: "0 -25 0",
    // Phase 6: Exterior Material & Color Customization
    bodyMaterials: ["paint", "body", "carpaint", "exterior", "chassis"],
    defaultColor: "#111111", // Black
    currentColor: "#111111"
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
    initialRotX: 0,
    initialRotY: -35,
    initialRotZ: 0,
    bayId: "bay-ford-mustang",
    spotId: "spot-ford-mustang",
    bayCenter: { x: 10, y: 0.7, z: -12 },
    inspectionCam: { x: 6.8, y: 1.35, z: -8.8 },
    minZoomDist: 2.6,
    maxZoomDist: 7.2,
    vrBoardPosition: "7.6 2.0 -10.5",
    vrBoardRotation: "0 25 0",
    // Phase 6: Exterior Material & Color Customization
    bodyMaterials: ["paint", "body", "carpaint", "exterior", "chassis"],
    defaultColor: "#C62828", // Red
    currentColor: "#C62828"
  }
];

// ----------------------------------------------------------------------------
// 2. Customizer Palette & Material Configuration (Phase 6)
// ----------------------------------------------------------------------------
const CUSTOMIZER_COLORS = [
  { name: 'Black', hex: '#111111' },
  { name: 'White', hex: '#F5F5F5' },
  { name: 'Red', hex: '#C62828' },
  { name: 'Blue', hex: '#1565C0' },
  { name: 'Silver', hex: '#B0B0B0' }
];

const EXCLUDED_MATERIAL_PATTERNS = [
  'window', 'windshield', 'glass', 'tire', 'tyre', 'wheel', 'rim', 'rubber',
  'light', 'headlight', 'taillight', 'redlight', 'led', 'chrome', 'interior',
  'dash', 'mirror', 'seat', 'brake', 'disc', 'caliper', 'license', 'plate',
  'grill', 'piggrill', 'radiator', 'raidiator', 'logo', 'badge', 'engine',
  'carpet', 'carbon', 'carbonfibre', 'plastic', 'undercarriage', 'axe', 'bolt'
];

// ----------------------------------------------------------------------------
// 3. State & Toast Notification Helper
// ----------------------------------------------------------------------------
let currentlySelectedCarId = null;
let activeInspectionCar = null;
let activeRotationY = 0;
let activeRotationAnimId = null;
let activeCameraAnimId = null;
let isNavGliding = false;
let currentZoomDist = 4.5;
let baselineZoomDist = 4.5;
let toastTimer = null;

function showCarSelectedToast(message) {
  const toast = document.getElementById('car-toast');
  const toastText = document.getElementById('toast-text');
  if (!toast) return;

  if (toastText) {
    toastText.textContent = (message.includes('reset') || message.includes('updated') || message.includes('selected'))
      ? message
      : `${message} selected`;
  }
  toast.classList.add('active');

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('active');
  }, 2600);
}

// ----------------------------------------------------------------------------
// 3. Smooth Vehicle Rotation Animation Helper
// ----------------------------------------------------------------------------
/**
 * Smoothly interpolates the selected car's Y rotation over time without tilting X or Z.
 */
function animateCarRotation(fromY, toY, duration = 320) {
  if (!activeInspectionCar) return;
  const carEl = document.getElementById(`car-${activeInspectionCar.id}`);
  if (!carEl) return;

  const startTime = performance.now();
  if (activeRotationAnimId) {
    cancelAnimationFrame(activeRotationAnimId);
    activeRotationAnimId = null;
  }

  function step(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Smooth quadratic ease-out
    const ease = 1 - Math.pow(1 - progress, 2);
    const curY = fromY + (toY - fromY) * ease;

    carEl.setAttribute('rotation', `${activeInspectionCar.initialRotX} ${curY.toFixed(2)} ${activeInspectionCar.initialRotZ}`);

    if (progress < 1) {
      activeRotationAnimId = requestAnimationFrame(step);
    } else {
      activeRotationY = toY;
      activeRotationAnimId = null;
    }
  }

  activeRotationAnimId = requestAnimationFrame(step);
}

// ----------------------------------------------------------------------------
// 4. Inspection Mode & View Controls (Phase 5)
// ----------------------------------------------------------------------------
/**
 * Enters Inspection Mode for the active car, orienting the desktop camera
 * towards the vehicle and displaying the inspection toolbar.
 */
function enterInspectionMode(carData) {
  activeInspectionCar = carData;
  activeRotationY = carData.initialRotY;

  // Calculate baseline distance between inspection camera and car center
  const dx = carData.inspectionCam.x - carData.bayCenter.x;
  const dz = carData.inspectionCam.z - carData.bayCenter.z;
  currentZoomDist = Math.sqrt(dx * dx + dz * dz);
  baselineZoomDist = currentZoomDist;

  // If in desktop mode (not immersive VR), transition camera towards inspection viewpoint
  // (Skipped if focusOnCar is already performing a smooth navigational glide)
  const sceneEl = document.querySelector('a-scene');
  const isVR = sceneEl && sceneEl.is('vr-mode');
  if (!isVR && !isNavGliding) {
    const cameraRig = document.getElementById('camera-rig');
    const cameraHead = document.getElementById('camera-head');
    if (cameraRig) {
      cameraRig.setAttribute('position', `${carData.inspectionCam.x} ${carData.inspectionCam.y} ${carData.inspectionCam.z}`);
    }
    if (cameraHead) {
      const dx = carData.bayCenter.x - carData.inspectionCam.x;
      const dz = carData.bayCenter.z - carData.inspectionCam.z;
      const lookYaw = Math.atan2(-dx, -dz);
      const lookControls = cameraHead.components && cameraHead.components['look-controls'];
      if (lookControls && lookControls.yawObject && lookControls.pitchObject) {
        lookControls.yawObject.rotation.y = lookYaw;
        lookControls.pitchObject.rotation.x = -0.08;
      }
    }
  }

  // Update inspection panel UI
  const inspectionPanel = document.getElementById('inspection-panel');
  const inspectionCarLabel = document.getElementById('inspection-car-label');
  if (inspectionCarLabel) {
    inspectionCarLabel.textContent = `${carData.name} • ${carData.category}`;
  }
  if (inspectionPanel) {
    inspectionPanel.classList.add('active');
    inspectionPanel.setAttribute('aria-hidden', 'false');
  }

  console.log(`🔍 [AutoVerse Inspection] Active inspection vehicle: ${carData.name}`);
}

/**
 * Rotates the selected car by delta degrees around its vertical Y axis.
 */
function rotateCar(deltaDeg) {
  if (!activeInspectionCar) return;
  const targetY = activeRotationY + deltaDeg;
  animateCarRotation(activeRotationY, targetY, 320);
}

/**
 * Moves camera closer to the selected vehicle along the line of sight (bounded).
 */
function zoomIn() {
  if (!activeInspectionCar) return;
  const sceneEl = document.querySelector('a-scene');
  if (sceneEl && sceneEl.is('vr-mode')) return; // Do not alter headset tracking in VR

  const minD = activeInspectionCar.minZoomDist || 2.6;
  const newDist = Math.max(minD, currentZoomDist - 0.75);
  applyCameraZoomDistance(newDist);
}

/**
 * Moves camera farther from the selected vehicle along the line of sight (bounded).
 */
function zoomOut() {
  if (!activeInspectionCar) return;
  const sceneEl = document.querySelector('a-scene');
  if (sceneEl && sceneEl.is('vr-mode')) return;

  const maxD = activeInspectionCar.maxZoomDist || 7.5;
  const newDist = Math.min(maxD, currentZoomDist + 0.75);
  applyCameraZoomDistance(newDist);
}

/**
 * Recalculates camera coordinates based on inspection radial distance.
 */
function applyCameraZoomDistance(dist) {
  currentZoomDist = dist;
  const car = activeInspectionCar;
  const dx = car.inspectionCam.x - car.bayCenter.x;
  const dz = car.inspectionCam.z - car.bayCenter.z;
  const baseD = Math.sqrt(dx * dx + dz * dz);
  if (baseD === 0) return;

  const dirX = dx / baseD;
  const dirZ = dz / baseD;

  const newCamX = car.bayCenter.x + dirX * dist;
  const newCamZ = car.bayCenter.z + dirZ * dist;

  const cameraRig = document.getElementById('camera-rig');
  if (cameraRig) {
    cameraRig.setAttribute('position', `${newCamX.toFixed(2)} ${car.inspectionCam.y} ${newCamZ.toFixed(2)}`);
  }
}

/**
 * Restores original car rotation, camera distance, and viewpoint for the selected car.
 * The car remains in inspection mode.
 */
function resetCarView() {
  if (!activeInspectionCar) return;

  // Restore original car rotation
  animateCarRotation(activeRotationY, activeInspectionCar.initialRotY, 320);
  activeRotationY = activeInspectionCar.initialRotY;

  // Restore camera position & distance
  const sceneEl = document.querySelector('a-scene');
  if (!sceneEl || !sceneEl.is('vr-mode')) {
    currentZoomDist = baselineZoomDist;
    const cameraRig = document.getElementById('camera-rig');
    const cameraHead = document.getElementById('camera-head');
    if (cameraRig) {
      cameraRig.setAttribute('position', `${activeInspectionCar.inspectionCam.x} ${activeInspectionCar.inspectionCam.y} ${activeInspectionCar.inspectionCam.z}`);
    }
    if (cameraHead) {
      const dx = activeInspectionCar.bayCenter.x - activeInspectionCar.inspectionCam.x;
      const dz = activeInspectionCar.bayCenter.z - activeInspectionCar.inspectionCam.z;
      const lookYaw = Math.atan2(-dx, -dz);
      const lookControls = cameraHead.components && cameraHead.components['look-controls'];
      if (lookControls && lookControls.yawObject && lookControls.pitchObject) {
        lookControls.yawObject.rotation.y = lookYaw;
        lookControls.pitchObject.rotation.x = -0.08;
      }
    }
  }

  showCarSelectedToast(`${activeInspectionCar.name} view reset`);
}

/**
 * Exits Inspection Mode completely: restores the car's original orientation,
 * returns camera to showroom aisle, removes inspection toolbar, and clears selection.
 */
function exitInspectionMode() {
  if (activeCameraAnimId) {
    cancelAnimationFrame(activeCameraAnimId);
    activeCameraAnimId = null;
  }
  isNavGliding = false;

  if (activeInspectionCar) {
    // Restore car's original rotation on platform
    const carEl = document.getElementById(`car-${activeInspectionCar.id}`);
    if (carEl) {
      carEl.setAttribute('rotation', `${activeInspectionCar.initialRotX} ${activeInspectionCar.initialRotY} ${activeInspectionCar.initialRotZ}`);
    }
  }

  // Restore camera to showroom entrance
  const sceneEl = document.querySelector('a-scene');
  if (!sceneEl || !sceneEl.is('vr-mode')) {
    const cameraRig = document.getElementById('camera-rig');
    const cameraHead = document.getElementById('camera-head');
    if (cameraRig) {
      cameraRig.setAttribute('position', '0 0 16.2');
    }
    if (cameraHead) {
      cameraHead.setAttribute('rotation', '0 0 0');
      const lookControls = cameraHead.components && cameraHead.components['look-controls'];
      if (lookControls && lookControls.yawObject && lookControls.pitchObject) {
        lookControls.yawObject.rotation.y = 0;
        lookControls.pitchObject.rotation.x = 0;
      }
    }
  }

  // Hide inspection controls panel
  const inspectionPanel = document.getElementById('inspection-panel');
  if (inspectionPanel) {
    inspectionPanel.classList.remove('active');
    inspectionPanel.setAttribute('aria-hidden', 'true');
  }

  // Close customization studio if open (Phase 6)
  closeCustomizer();

  // Deselect car, hide platform highlight, hide specifications panel and VR board
  deselectCar(true);

  activeInspectionCar = null;
  activeRotationAnimId = null;
  console.log('🚪 Exited Inspection Mode.');
}

// ----------------------------------------------------------------------------
// 5. Showroom Quick Vehicle Navigation & Camera Glider (Phase 7)
// ----------------------------------------------------------------------------
/**
 * Synchronizes the visual active state of the Showroom Quick Navigation buttons.
 */
function updateNavPanelActive(carId) {
  const navButtons = document.querySelectorAll('.nav-car-btn');
  navButtons.forEach(btn => {
    const btnCarId = btn.getAttribute('data-nav-car-id');
    if (carId && btnCarId === carId) {
      btn.classList.add('active');
      btn.setAttribute('aria-current', 'true');
    } else {
      btn.classList.remove('active');
      btn.removeAttribute('aria-current');
    }
  });
}

/**
 * Smoothly navigates and focuses the showroom camera on a target vehicle (Phase 7).
 * Maintains safe exterior viewing distance, exits previous inspection mode if active,
 * smoothly interpolates camera position & orientation, and activates vehicle selection.
 */
function focusOnCar(carId, duration = 650) {
  const carData = cars.find(c => c.id === carId);
  if (!carData) return;

  // 1. If currently inspecting another vehicle, restore its rotation first
  if (activeInspectionCar && activeInspectionCar.id !== carData.id) {
    const prevEl = document.getElementById(`car-${activeInspectionCar.id}`);
    if (prevEl) {
      prevEl.setAttribute('rotation', `${activeInspectionCar.initialRotX} ${activeInspectionCar.initialRotY} ${activeInspectionCar.initialRotZ}`);
    }
    activeInspectionCar = null;
  }

  // 2. In WebXR immersive VR mode, avoid artificial camera translations to prevent nausea
  const sceneEl = document.querySelector('a-scene');
  if (sceneEl && sceneEl.is('vr-mode')) {
    selectCar(carId);
    updateNavPanelActive(carId);
    return;
  }

  // 3. Smooth Camera Navigation in Desktop / Mobile mode
  const cameraRig = document.getElementById('camera-rig');
  const cameraHead = document.getElementById('camera-head');

  if (!cameraRig || !cameraHead) {
    selectCar(carId);
    updateNavPanelActive(carId);
    return;
  }

  // Cancel any in-flight camera navigation animation
  if (activeCameraAnimId) {
    cancelAnimationFrame(activeCameraAnimId);
    activeCameraAnimId = null;
  }

  // Current camera rig position
  const curPos = cameraRig.getAttribute('position') || { x: 0, y: 0, z: 16.2 };
  const startX = typeof curPos.x === 'number' ? curPos.x : (parseFloat(curPos.x) || 0);
  const startY = typeof curPos.y === 'number' ? curPos.y : (parseFloat(curPos.y) || 0);
  const startZ = typeof curPos.z === 'number' ? curPos.z : (parseFloat(curPos.z) || 16.2);

  // Target viewing distance and angles
  const targetX = carData.inspectionCam.x;
  const targetY = carData.inspectionCam.y;
  const targetZ = carData.inspectionCam.z;

  const dx = carData.bayCenter.x - carData.inspectionCam.x;
  const dz = carData.bayCenter.z - carData.inspectionCam.z;
  const targetYaw = Math.atan2(-dx, -dz);
  const targetPitch = -0.08;

  // Current head orientation from look-controls
  let startYaw = 0;
  let startPitch = 0;
  const lookControls = cameraHead.components && cameraHead.components['look-controls'];
  if (lookControls && lookControls.yawObject && lookControls.pitchObject) {
    startYaw = lookControls.yawObject.rotation.y;
    startPitch = lookControls.pitchObject.rotation.x;
  }

  // Calculate shortest circular angle path for yaw
  let deltaYaw = targetYaw - startYaw;
  while (deltaYaw > Math.PI) deltaYaw -= Math.PI * 2;
  while (deltaYaw < -Math.PI) deltaYaw += Math.PI * 2;
  const endYaw = startYaw + deltaYaw;

  isNavGliding = true;
  const startTime = performance.now();

  function glideStep(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Smooth cubic ease-out
    const ease = 1 - Math.pow(1 - progress, 3);

    const curX = startX + (targetX - startX) * ease;
    const curY = startY + (targetY - startY) * ease;
    const curZ = startZ + (targetZ - startZ) * ease;
    cameraRig.setAttribute('position', `${curX.toFixed(3)} ${curY.toFixed(3)} ${curZ.toFixed(3)}`);

    if (lookControls && lookControls.yawObject && lookControls.pitchObject) {
      lookControls.yawObject.rotation.y = startYaw + (endYaw - startYaw) * ease;
      lookControls.pitchObject.rotation.x = startPitch + (targetPitch - startPitch) * ease;
    }

    if (progress < 1) {
      activeCameraAnimId = requestAnimationFrame(glideStep);
    } else {
      activeCameraAnimId = null;
      isNavGliding = false;
      // Final snap to exact coordinates
      cameraRig.setAttribute('position', `${targetX} ${targetY} ${targetZ}`);
      if (lookControls && lookControls.yawObject && lookControls.pitchObject) {
        lookControls.yawObject.rotation.y = targetYaw;
        lookControls.pitchObject.rotation.x = targetPitch;
      }
    }
  }

  activeCameraAnimId = requestAnimationFrame(glideStep);

  // Activate vehicle selection, specifications panel, platform highlight, and inspection controls
  selectCar(carId);
  updateNavPanelActive(carId);
}

// ----------------------------------------------------------------------------
// 6. Car Selection & Specifications Controller (Phase 4 & 5 Integration)
// ----------------------------------------------------------------------------
/**
 * Selects a vehicle by ID. If another vehicle was previously inspected,
 * its original rotation is safely restored. Then enters inspection mode for the new vehicle.
 */
function selectCar(carId) {
  const carData = cars.find(c => c.id === carId);
  if (!carData) return;

  // Multiple Car Safety: if switching vehicles, restore previous vehicle's rotation
  if (activeInspectionCar && activeInspectionCar.id !== carData.id) {
    const prevEl = document.getElementById(`car-${activeInspectionCar.id}`);
    if (prevEl) {
      prevEl.setAttribute('rotation', `${activeInspectionCar.initialRotX} ${activeInspectionCar.initialRotY} ${activeInspectionCar.initialRotZ}`);
    }
  }

  // Clear previous platform highlight without hiding panels
  deselectCar(false);

  currentlySelectedCarId = carData.id;

  // 1. Populate Phase 4 HTML Information Panel
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

  // 3. Populate 3D VR Information Board for WebXR
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

    const sceneEl = document.querySelector('a-scene');
    const isVR = sceneEl && sceneEl.is('vr-mode');
    vrBoard.setAttribute('visible', isVR ? 'true' : 'false');
  }

  // 4. Enter Inspection Mode for this vehicle (Phase 5)
  enterInspectionMode(carData);

  // 5. Update Customization Studio if already open (Phase 6)
  const customizerPanel = document.getElementById('customization-panel');
  if (customizerPanel && customizerPanel.classList.contains('active')) {
    openCustomizer(carData.id);
  }

  // 6. Sync Showroom Navigation Panel (Phase 7)
  updateNavPanelActive(carData.id);

  // Toast confirmation
  showCarSelectedToast(carData.name);
}

/**
 * Clears selection highlights and optionally hides the specifications panel.
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
    closeCustomizer();
    currentlySelectedCarId = null;
    updateNavPanelActive(null);
  }
}

// ----------------------------------------------------------------------------
// 6. Car Color Customization Studio (Phase 6)
// ----------------------------------------------------------------------------
/**
 * Accurately determines if a Three.js material belongs to the exterior body paint
 * of the vehicle based on per-car configuration and strict exclusion lists.
 */
function isBodyMaterial(mat, carData) {
  if (!mat || !mat.name) return false;
  const matName = mat.name;
  const matNameLower = matName.toLowerCase();

  // 1. Explicit car-specific target material matching
  if (carData && carData.bodyMaterials && Array.isArray(carData.bodyMaterials)) {
    const isTarget = carData.bodyMaterials.some(target => 
      matName === target || matNameLower === target.toLowerCase()
    );
    if (isTarget) return true;
  }

  // 2. Strict exclusion filter (windows, wheels, tires, lights, chrome, etc.)
  for (const excluded of EXCLUDED_MATERIAL_PATTERNS) {
    if (matNameLower.includes(excluded)) {
      return false;
    }
  }

  // 3. Fallback heuristic for generic car models
  return matNameLower.includes('paint') || matNameLower.includes('body') || matNameLower.includes('exterior');
}

/**
 * Applies an exterior paint color to the vehicle in real-time.
 * Modifies existing Three.js materials in-place without reloading GLB or scene.
 */
function applyCarColor(carId, colorHex, showToast = true) {
  const carData = cars.find(c => c.id === carId);
  if (!carData) return;

  carData.currentColor = colorHex;

  const carEl = document.getElementById(`car-${carId}`);
  let recoloredCount = 0;

  if (carEl) {
    const mesh = carEl.getObject3D('mesh');
    if (mesh) {
      mesh.traverse((node) => {
        if (node.isMesh && node.material) {
          const mats = Array.isArray(node.material) ? node.material : [node.material];
          mats.forEach((mat) => {
            if (isBodyMaterial(mat, carData)) {
              if (mat.color) {
                mat.color.set(colorHex);
                mat.needsUpdate = true;
                recoloredCount++;
              }
            }
          });
        }
      });
    }
  }

  // Update active state on color swatches
  updateCustomizerSwatches(colorHex);

  const colorDef = CUSTOMIZER_COLORS.find(c => c.hex.toLowerCase() === colorHex.toLowerCase());
  const colorName = colorDef ? colorDef.name : colorHex;

  if (showToast) {
    showCarSelectedToast(`${carData.name} exterior updated to ${colorName}`);
  }

  console.log(`🎨 [AutoVerse Customizer] Applied ${colorName} (${colorHex}) to ${carData.name} (${recoloredCount} mesh materials updated).`);
}

/**
 * Restores the vehicle's original default starting color.
 */
function resetCarColor(carId) {
  const targetId = carId || currentlySelectedCarId || (activeInspectionCar ? activeInspectionCar.id : 'bmw-m4');
  const carData = cars.find(c => c.id === targetId);
  if (!carData) return;

  const defaultHex = carData.defaultColor || '#1565C0';
  applyCarColor(targetId, defaultHex, false);

  const colorDef = CUSTOMIZER_COLORS.find(c => c.hex.toLowerCase() === defaultHex.toLowerCase());
  const colorName = colorDef ? colorDef.name : defaultHex;
  showCarSelectedToast(`${carData.name} color reset to ${colorName}`);
}

/**
 * Displays the customization studio panel for the active or selected vehicle.
 */
function openCustomizer(carId) {
  const targetId = carId || currentlySelectedCarId || (activeInspectionCar ? activeInspectionCar.id : 'bmw-m4');
  const carData = cars.find(c => c.id === targetId);
  if (!carData) return;

  const customizerPanel = document.getElementById('customization-panel');
  const carNameLabel = document.getElementById('customizer-car-name');

  if (carNameLabel) {
    carNameLabel.textContent = `${carData.name} • ${carData.category}`;
  }

  updateCustomizerSwatches(carData.currentColor || carData.defaultColor);

  if (customizerPanel) {
    customizerPanel.classList.add('active');
    customizerPanel.setAttribute('aria-hidden', 'false');
  }

  console.log(`🎨 [AutoVerse Customizer] Opened customization studio for: ${carData.name}`);
}

/**
 * Hides the customization studio panel.
 */
function closeCustomizer() {
  const customizerPanel = document.getElementById('customization-panel');
  if (customizerPanel) {
    customizerPanel.classList.remove('active');
    customizerPanel.setAttribute('aria-hidden', 'true');
  }
}

/**
 * Syncs visual active indicators on color swatch buttons.
 */
function updateCustomizerSwatches(activeHex) {
  if (!activeHex) return;
  const swatches = document.querySelectorAll('.color-swatch-card');
  swatches.forEach(swatch => {
    const swatchColor = swatch.getAttribute('data-color');
    if (swatchColor && swatchColor.toLowerCase() === activeHex.toLowerCase()) {
      swatch.classList.add('active');
      swatch.setAttribute('aria-pressed', 'true');
    } else {
      swatch.classList.remove('active');
      swatch.setAttribute('aria-pressed', 'false');
    }
  });
}

// Expose globally for API, test suites, and debugging access
if (typeof window !== 'undefined') {
  window.cars = cars;
  window.selectCar = selectCar;
  window.deselectCar = deselectCar;
  window.focusOnCar = focusOnCar;
  window.updateNavPanelActive = updateNavPanelActive;
  window.enterInspectionMode = enterInspectionMode;
  window.rotateCar = rotateCar;
  window.zoomIn = zoomIn;
  window.zoomOut = zoomOut;
  window.resetCarView = resetCarView;
  window.exitInspectionMode = exitInspectionMode;
  window.applyCarColor = applyCarColor;
  window.resetCarColor = resetCarColor;
  window.openCustomizer = openCustomizer;
  window.closeCustomizer = closeCustomizer;
  window.CUSTOMIZER_COLORS = CUSTOMIZER_COLORS;
}

// ----------------------------------------------------------------------------
// 6. Reusable A-Frame Component: car-display
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

        // Apply calibrated scale, local position, and initial rotation
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
            // Apply configured vehicle color (Phase 6)
            applyCarColor(this.carData.id, this.carData.currentColor || this.carData.defaultColor, false);
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
// 7. Custom A-Frame Component: Showroom Boundary Limiter
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
// 8. UI and Scene Lifecycle Initialization on DOM Ready
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

  // Inspection Toolbar Elements (Phase 5)
  const inspectionPanel = document.getElementById('inspection-panel');
  const btnRotateLeft = document.getElementById('btn-rotate-left');
  const btnRotateRight = document.getElementById('btn-rotate-right');
  const btnZoomIn = document.getElementById('btn-zoom-in');
  const btnZoomOut = document.getElementById('btn-zoom-out');
  const btnResetView = document.getElementById('btn-reset-view');
  const btnExitInspection = document.getElementById('btn-exit-inspection');
  const dragZone = document.getElementById('inspection-drag-zone');

  // Customization Studio Elements (Phase 6)
  const customizerPanel = document.getElementById('customization-panel');
  const btnOpenCustomizer = document.getElementById('btn-open-customizer');
  const btnInspectCustomize = document.getElementById('btn-inspect-customize');
  const btnCloseCustomizer = document.getElementById('btn-close-customizer');
  const customizerCloseIconBtn = document.getElementById('customizer-close-icon-btn');
  const btnResetColor = document.getElementById('btn-reset-color');
  const colorSwatches = document.querySelectorAll('.color-swatch-card');

  // Showroom Quick Navigation Panel Elements (Phase 7)
  const navPanel = document.getElementById('showroom-nav-panel');
  const btnToggleNav = document.getElementById('btn-toggle-nav');

  // Starting camera position overlooking the entire showroom aisle and entrance
  const SPAWN_POSITION = { x: 0, y: 0, z: 16.2 };
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
  // Camera Reset Viewpoint (Header Button)
  // --------------------------------------------------------------------------
  if (resetCamBtn) {
    resetCamBtn.addEventListener('click', () => {
      // Exit active inspection mode if currently inspecting
      if (activeInspectionCar) {
        exitInspectionMode();
      }

      // Cancel any ongoing glide
      if (activeCameraAnimId) {
        cancelAnimationFrame(activeCameraAnimId);
        activeCameraAnimId = null;
      }
      isNavGliding = false;

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
      updateNavPanelActive(null);
      showCarSelectedToast('Camera reset to Entrance');
    });
  }

  // --------------------------------------------------------------------------
  // Specifications Panel Interaction (Phase 4)
  // --------------------------------------------------------------------------
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

  // Closing specs panel hides specs panel ONLY (inspection mode stays active per Phase 5)
  if (panelCloseBtn) {
    panelCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (infoPanel) {
        infoPanel.classList.remove('active');
        infoPanel.setAttribute('aria-hidden', 'true');
      }
    });
  }

  if (panelCloseIconBtn) {
    panelCloseIconBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (infoPanel) {
        infoPanel.classList.remove('active');
        infoPanel.setAttribute('aria-hidden', 'true');
      }
    });
  }

  if (vrCloseBtn) {
    vrCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      exitInspectionMode();
    });
  }

  // Prevent camera movement while interacting with HTML overlays
  const stopProp = (e) => e.stopPropagation();
  if (infoPanel) {
    ['mousedown', 'mousemove', 'mouseup', 'click', 'touchstart', 'touchmove', 'touchend', 'wheel', 'pointerdown', 'pointermove', 'pointerup'].forEach(evt => {
      infoPanel.addEventListener(evt, stopProp);
    });
  }

  if (inspectionPanel) {
    ['mousedown', 'mouseup', 'click', 'touchstart', 'touchend', 'wheel', 'pointerdown', 'pointerup'].forEach(evt => {
      inspectionPanel.addEventListener(evt, stopProp);
    });
  }

  if (customizerPanel) {
    ['mousedown', 'mousemove', 'mouseup', 'click', 'touchstart', 'touchmove', 'touchend', 'wheel', 'pointerdown', 'pointermove', 'pointerup'].forEach(evt => {
      customizerPanel.addEventListener(evt, stopProp);
    });
  }

  if (navPanel) {
    ['mousedown', 'mousemove', 'mouseup', 'click', 'touchstart', 'touchmove', 'touchend', 'wheel', 'pointerdown', 'pointermove', 'pointerup'].forEach(evt => {
      navPanel.addEventListener(evt, stopProp);
    });
  }

  // --------------------------------------------------------------------------
  // Inspection Toolbar Button Handlers (Phase 5)
  // --------------------------------------------------------------------------
  if (btnRotateLeft) {
    btnRotateLeft.addEventListener('click', (e) => {
      e.stopPropagation();
      rotateCar(30);
    });
  }

  if (btnRotateRight) {
    btnRotateRight.addEventListener('click', (e) => {
      e.stopPropagation();
      rotateCar(-30);
    });
  }

  if (btnZoomIn) {
    btnZoomIn.addEventListener('click', (e) => {
      e.stopPropagation();
      zoomIn();
    });
  }

  if (btnZoomOut) {
    btnZoomOut.addEventListener('click', (e) => {
      e.stopPropagation();
      zoomOut();
    });
  }

  if (btnResetView) {
    btnResetView.addEventListener('click', (e) => {
      e.stopPropagation();
      resetCarView();
    });
  }

  if (btnExitInspection) {
    btnExitInspection.addEventListener('click', (e) => {
      e.stopPropagation();
      exitInspectionMode();
    });
  }

  // --------------------------------------------------------------------------
  // Customization Studio Handlers (Phase 6)
  // --------------------------------------------------------------------------
  if (btnOpenCustomizer) {
    btnOpenCustomizer.addEventListener('click', (e) => {
      e.stopPropagation();
      openCustomizer();
    });
  }

  if (btnInspectCustomize) {
    btnInspectCustomize.addEventListener('click', (e) => {
      e.stopPropagation();
      openCustomizer();
    });
  }

  if (btnCloseCustomizer) {
    btnCloseCustomizer.addEventListener('click', (e) => {
      e.stopPropagation();
      closeCustomizer();
    });
  }

  if (customizerCloseIconBtn) {
    customizerCloseIconBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeCustomizer();
    });
  }

  if (btnResetColor) {
    btnResetColor.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetId = currentlySelectedCarId || (activeInspectionCar ? activeInspectionCar.id : 'bmw-m4');
      resetCarColor(targetId);
    });
  }

  colorSwatches.forEach(swatch => {
    swatch.addEventListener('click', (e) => {
      e.stopPropagation();
      const colorHex = swatch.getAttribute('data-color');
      const targetId = currentlySelectedCarId || (activeInspectionCar ? activeInspectionCar.id : 'bmw-m4');
      if (colorHex && targetId) {
        applyCarColor(targetId, colorHex, true);
      }
    });
  });

  // --------------------------------------------------------------------------
  // Mouse Drag / Touch Swipe to Rotate Car (Phase 5)
  // --------------------------------------------------------------------------
  if (dragZone) {
    let isDragging = false;
    let startX = 0;
    let dragBaseY = 0;

    dragZone.addEventListener('pointerdown', (e) => {
      if (!activeInspectionCar) return;
      isDragging = true;
      startX = e.clientX;
      dragBaseY = activeRotationY;
      try { dragZone.setPointerCapture(e.pointerId); } catch (err) {}
    });

    dragZone.addEventListener('pointermove', (e) => {
      if (!isDragging || !activeInspectionCar) return;
      const deltaX = e.clientX - startX;
      // 0.4 degrees of yaw rotation per pixel moved
      const newY = dragBaseY + (deltaX * 0.4);
      const carEl = document.getElementById(`car-${activeInspectionCar.id}`);
      if (carEl) {
        carEl.setAttribute('rotation', `${activeInspectionCar.initialRotX} ${newY.toFixed(2)} ${activeInspectionCar.initialRotZ}`);
        activeRotationY = newY;
      }
    });

    const endDrag = (e) => {
      if (isDragging) {
        isDragging = false;
        try { dragZone.releasePointerCapture(e.pointerId); } catch (err) {}
      }
    };

    dragZone.addEventListener('pointerup', endDrag);
    dragZone.addEventListener('pointercancel', endDrag);
  }

  // --------------------------------------------------------------------------
  // Showroom Quick Vehicle Navigation Handlers (Phase 7)
  // --------------------------------------------------------------------------
  if (btnToggleNav && navPanel) {
    btnToggleNav.addEventListener('click', (e) => {
      e.stopPropagation();
      const isCollapsed = navPanel.classList.toggle('collapsed');
      btnToggleNav.setAttribute('aria-expanded', (!isCollapsed).toString());
      const icon = btnToggleNav.querySelector('.toggle-icon');
      if (icon) {
        icon.textContent = isCollapsed ? '+' : '−';
      }
    });
  }

  const navCarButtons = document.querySelectorAll('.nav-car-btn');
  navCarButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const carId = btn.getAttribute('data-nav-car-id');
      if (carId) {
        focusOnCar(carId);
      }
    });
  });

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
      console.log('🏎️ 7-Vehicle Fleet & 360° Inspection Controls ready.');
    });

    sceneEl.addEventListener('enter-vr', () => {
      console.log('👓 Entered WebXR VR Mode.');
      if (introModal) introModal.classList.add('hidden');
      const vrBoard = document.getElementById('vr-info-board');
      if (vrBoard && currentlySelectedCarId) {
        vrBoard.setAttribute('visible', 'true');
      }
    });

    sceneEl.addEventListener('exit-vr', () => {
      console.log('👓 Exited WebXR VR Mode.');
      const vrBoard = document.getElementById('vr-info-board');
      if (vrBoard) {
        vrBoard.setAttribute('visible', 'false');
      }
    });
  }
});
