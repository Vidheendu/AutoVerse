# AutoVerse VR — User Guide & Operation Manual

Welcome to the **AutoVerse VR** user manual. This document explains how to launch, explore, interact with, and customize vehicles in both Desktop 3D Mode and Immersive WebXR Virtual Reality Mode.

---

## 1. How to Open the Project

AutoVerse VR runs entirely inside your web browser. Because web browsers require a local HTTP server to load 3D models and textures securely, follow one of these simple steps:

### Option A: Using Python (Recommended)
1. Open a terminal or command prompt in the `AutoVerse/3d-car-showroom` folder.
2. Run:
   ```bash
   python -m http.server 8080
   ```
3. Open your browser and go to: `http://localhost:8080`

### Option B: Using VS Code Live Server
1. Open the project folder in Visual Studio Code.
2. Right-click `index.html` inside `3d-car-showroom/`.
3. Click **"Open with Live Server"**.

### Option C: Using Node.js
1. Run `npx serve 3d-car-showroom -l 8080` in your terminal.
2. Open `http://localhost:8080` in your browser.

---

## 2. How to Explore the Showroom (Desktop Mode)

When the application loads, you will be placed at the concierge entrance desk facing down the central showroom floor.

### Movement & View Controls:
- **Look Around**: Click and hold the **Left Mouse Button** anywhere on the 3D screen, then drag your mouse to look up, down, left, or right in full 360°.
- **Walk Around**: Use the **W**, **A**, **S**, **D** keys (or keyboard arrow keys) to walk forward, backward, left, or right across the showroom floor.
- **Showroom Info**: Click the **"Info & Controls"** button in the top-right header to view keyboard shortcuts anytime.
- **Reset View**: Click the **"Reset View"** button in the top-right header to immediately return to the entrance desk.

---

## 3. How to Select Vehicles

There are two easy ways to select and inspect any vehicle:

### Method 1: Using the Showroom Navigation Sidebar
1. Look at the **SHOWROOM** panel on the left side of the screen.
2. Click on any car name (e.g., **BMW M4**, **Porsche 911**, **Audi R8**, etc.).
3. The camera will smoothly glide across the showroom directly to that vehicle's podium.

### Method 2: Clicking in 3D Space
1. Walk up to any car bay in the showroom.
2. Click directly on the 3D vehicle model or its elevated pedestal platform.
3. The vehicle will become selected, the platform spotlight will activate, and the inspection controls will open.

---

## 4. How to View Vehicle Specifications

Once a vehicle is selected:
1. The **Specifications Drawer** will open on the right side of the screen.
2. You can view all official mechanical data:
   - **Price** (ex-showroom)
   - **Engine Type & Displacement**
   - **Horsepower (HP)**
   - **Transmission / Gearbox**
   - **Fuel Type**
   - **Top Speed (km/h)**
   - **0–100 km/h Acceleration Time**
3. To close the specifications panel, click the close button (**✕**) or select another vehicle.

---

## 5. How to Rotate and Zoom the Vehicle

When inspecting a car, use the floating **Inspection Toolbar** at the bottom-center of the screen:

- **Rotate Left**: Click `◀ Rotate Left` to spin the vehicle counter-clockwise.
- **Rotate Right**: Click `Rotate Right ▶` to spin the vehicle clockwise.
- **Zoom In**: Click `+ Zoom In` or scroll the mouse wheel up to get closer to the vehicle details.
- **Zoom Out**: Click `- Zoom Out` or scroll the mouse wheel down to see the wider perspective.
- **Reset Vehicle Angle**: Click `Reset View` on the bottom toolbar to restore the original angle and distance for that specific car.
- **Exit Inspection**: Click `✕ Exit Inspection` to release the car and return to free-roam walk mode.

---

## 6. How to Customize Exterior Paint Colors

AutoVerse VR features real-time Physically Based Rendering (PBR) paint customization:

1. Select a vehicle (e.g., **BMW M4**, **Porsche 911**, or **Audi R8**).
2. Look at the **EXTERIOR COLOR** section inside the right specifications drawer.
3. Click any of the 5 curated color swatches:
   - ⬛ **Black** (Obsidian Gloss)
   - ⬜ **White** (Alpine Pure)
   - 🔴 **Red** (Crimson Metallic)
   - 🔵 **Blue** (Royal Blue)
   - ⚪ **Silver** (Liquid Metal)
4. The vehicle's exterior body panels will instantly update to the chosen color in real time while preserving the windows, headlights, grille, wheels, tires, and interior intact!

---

## 7. How to Enter and Exit WebXR Virtual Reality

If you have a WebXR-compatible VR headset (e.g., **Meta Quest 2 / 3 / Pro**, **Oculus Rift**, **HTC Vive**, or **Valve Index**):

### Entering VR Mode:
1. Open the project URL in your VR headset's browser (e.g., Meta Quest Browser).
2. Make sure you are using `http://localhost` or a secure `https://` connection.
3. Click the **"VR Ready"** button in the top header or click the standard A-Frame **"VR"** goggles icon at the bottom-right corner.
4. Put on your headset to enter the immersive 3D showroom!

### Inside VR:
- **Head Tracking**: Move and rotate your head naturally to look in any direction with true 6DoF depth.
- **Laser Pointer**: Point your hand controller at cars, platform buttons, or floating color spheres.
- **Trigger Click**: Pull the index trigger on your controller to select vehicles or swap colors.
- **Locomotion**: Push the thumbstick forward to move through the showroom.
- **Snap Turn**: Push the right thumbstick left/right to snap turn in 45° increments for maximum comfort.
- **In-World 3D Info Board**: Look at the floating 3D board positioned beside each vehicle bay to view specs and laser-click color spheres directly in 3D space.

### Exiting VR Mode:
- Press the **Oculus / System Menu** button on your controller, or point at the exit button, or remove the headset.

---

## 8. Troubleshooting & Frequently Asked Questions

### Q: Why do 3D models not load when opening `index.html` directly from file explorer?
**A:** Modern browsers enforce CORS (Cross-Origin Resource Sharing) security restrictions that block loading 3D `.glb` files over `file:///` URLs. You **must** run a local static server using Python (`python -m http.server 8080`) or VS Code Live Server.

### Q: Why is `audi-r8.glb` missing after cloning from GitHub?
**A:** `audi-r8.glb` is ~110.6 MB, which exceeds GitHub's 100 MB single file push limit. It is listed in `.gitignore`. If you wish to use the Audi R8 model locally, download the GLB file as instructed in `assets/README.md` and place it in `assets/cars/audi-r8.glb`.

### Q: Why does the "Enter VR" button say VR is unavailable?
**A:** WebXR requires either a secure `https://` origin or `http://localhost` / `127.0.0.1`, along with a WebXR-supported browser and connected VR hardware. If you are on a standard desktop monitor without a VR headset, you can still enjoy the full experience in desktop 3D mode!

### Q: The camera moved unexpectedly. How do I reset it?
**A:** Click the **"Reset View"** button in the top HUD or press `✕ Exit Inspection` at the bottom to return smoothly to the entrance.

---

**Enjoy your experience in AutoVerse VR!**
