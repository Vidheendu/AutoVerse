/**
 * ============================================================================
 * 3D CAR SHOWROOM - JAVASCRIPT CONTROLLER
 * Phase 1: Foundation & Camera Exploration Controls
 * ============================================================================
 */

// ----------------------------------------------------------------------------
// 1. Custom A-Frame Component: Showroom Boundary Limiter
// Keeps the first-person user inside the architectural walls of the showroom.
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
registerShowroomBoundaries();

// ----------------------------------------------------------------------------
// 2. UI and Scene Initialization on DOM Ready
// ----------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  // Ensure boundary component is registered
  registerShowroomBoundaries();

  // DOM Elements
  const introModal = document.getElementById('intro-modal');
  const dismissBtn = document.getElementById('dismiss-overlay-btn');
  const openInfoBtn = document.getElementById('open-info-btn');
  const resetCamBtn = document.getElementById('reset-camera-btn');
  const vrStatusText = document.getElementById('vr-status-text');
  const sceneEl = document.querySelector('a-scene');

  // Initial camera rig spawn position (Facing the central display platform)
  const SPAWN_POSITION = { x: 0, y: 0, z: 12 };
  const SPAWN_ROTATION = { x: 0, y: 0, z: 0 };

  // --------------------------------------------------------------------------
  // 3. Overlay Visibility & Interactivity
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
  // 4. Reset Camera View Button
  // --------------------------------------------------------------------------
  if (resetCamBtn) {
    resetCamBtn.addEventListener('click', () => {
      const cameraRig = document.getElementById('camera-rig');
      const cameraHead = document.getElementById('camera-head');

      if (cameraRig) {
        cameraRig.setAttribute('position', `${SPAWN_POSITION.x} ${SPAWN_POSITION.y} ${SPAWN_POSITION.z}`);
      }
      if (cameraHead) {
        // Reset look direction
        cameraHead.setAttribute('rotation', `${SPAWN_ROTATION.x} ${SPAWN_ROTATION.y} ${SPAWN_ROTATION.z}`);
        // Reset look-controls pitch/yaw internal state if accessible
        const lookControls = cameraHead.components && cameraHead.components['look-controls'];
        if (lookControls && lookControls.pitchObject && lookControls.yawObject) {
          lookControls.pitchObject.rotation.x = 0;
          lookControls.yawObject.rotation.y = 0;
        }
      }
    });
  }

  // --------------------------------------------------------------------------
  // 5. WebXR / VR Compatibility Detection
  // --------------------------------------------------------------------------
  function checkWebXRSupport() {
    if (navigator.xr && navigator.xr.isSessionSupported) {
      navigator.xr.isSessionSupported('immersive-vr')
        .then((supported) => {
          if (supported) {
            if (vrStatusText) vrStatusText.textContent = 'VR Ready (Headset Detected)';
          } else {
            if (vrStatusText) vrStatusText.textContent = 'VR Ready';
          }
        })
        .catch(() => {
          if (vrStatusText) vrStatusText.textContent = 'VR Ready';
        });
    } else {
      if (vrStatusText) vrStatusText.textContent = 'VR Ready';
    }
  }

  checkWebXRSupport();

  // --------------------------------------------------------------------------
  // 6. A-Frame Scene Lifecycle Logging
  // --------------------------------------------------------------------------
  if (sceneEl) {
    sceneEl.addEventListener('loaded', () => {
      console.log('✅ 3D Car Showroom Scene successfully initialized.');
      console.log('🏎️ Showroom layout: Center Stage, 4 Display Bays, Architectural Lighting active.');
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
