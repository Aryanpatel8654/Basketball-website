import * as THREE from 'three';

export function generateBasketballTextures() {
  const width = 2048;
  const height = 1024;

  // 1. Create the tileable pebble canvases
  const pebbleSize = 64;
  const pebbleCanvas = document.createElement('canvas');
  pebbleCanvas.width = pebbleSize;
  pebbleCanvas.height = pebbleSize;
  const pCtx = pebbleCanvas.getContext('2d');

  // Grayscale pebble canvas for bump/heightmap
  const pebbleBumpCanvas = document.createElement('canvas');
  pebbleBumpCanvas.width = pebbleSize;
  pebbleBumpCanvas.height = pebbleSize;
  const pbCtx = pebbleBumpCanvas.getContext('2d');

  // Generate random pebbles on the tileable canvas
  // Background for diffuse: leather orange
  pCtx.fillStyle = '#E65100'; // Deep orange base
  pCtx.fillRect(0, 0, pebbleSize, pebbleSize);

  // Background for bump: middle gray (128)
  pbCtx.fillStyle = '#808080';
  pbCtx.fillRect(0, 0, pebbleSize, pebbleSize);

  // Draw pebbles (around 80 small dots per tile)
  const numPebbles = 60;
  // Seeded pseudo-random generator to make it deterministic
  let seed = 42;
  function random() {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  }

  for (let i = 0; i < numPebbles; i++) {
    const px = random() * pebbleSize;
    const py = random() * pebbleSize;
    const radius = 1.5 + random() * 2.0;

    // Draw on diffuse canvas (slightly lighter orange pebbles with darker borders)
    pCtx.save();
    // Shadow/Border
    pCtx.beginPath();
    pCtx.arc(px, py, radius + 0.5, 0, Math.PI * 2);
    pCtx.fillStyle = '#BF360C'; // Very deep red-orange
    pCtx.fill();

    // Body
    pCtx.beginPath();
    pCtx.arc(px, py, radius, 0, Math.PI * 2);
    // Highlight gradient
    const grad = pCtx.createRadialGradient(px - radius * 0.3, py - radius * 0.3, 0, px, py, radius);
    grad.addColorStop(0, '#FF8F00'); // Light orange highlight
    grad.addColorStop(1, '#FF6D00'); // Standard orange
    pCtx.fillStyle = grad;
    pCtx.fill();
    pCtx.restore();

    // Draw on bump canvas (white dome on dark background)
    pbCtx.save();
    const bumpGrad = pbCtx.createRadialGradient(px, py, 0, px, py, radius + 1);
    bumpGrad.addColorStop(0, '#ffffff'); // Peak height
    bumpGrad.addColorStop(0.7, '#d0d0d0');
    bumpGrad.addColorStop(1, '#808080'); // Base height
    pbCtx.beginPath();
    pbCtx.arc(px, py, radius + 1, 0, Math.PI * 2);
    pbCtx.fillStyle = bumpGrad;
    pbCtx.fill();
    pbCtx.restore();
  }

  // 2. Create the main canvases
  const diffuseCanvas = document.createElement('canvas');
  diffuseCanvas.width = width;
  diffuseCanvas.height = height;
  const dCtx = diffuseCanvas.getContext('2d');

  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = width;
  bumpCanvas.height = height;
  const bCtx = bumpCanvas.getContext('2d');

  const roughnessCanvas = document.createElement('canvas');
  roughnessCanvas.width = width;
  roughnessCanvas.height = height;
  const rCtx = roughnessCanvas.getContext('2d');

  // Fill main canvases with the tileable patterns
  const diffusePattern = dCtx.createPattern(pebbleCanvas, 'repeat');
  dCtx.fillStyle = diffusePattern;
  dCtx.fillRect(0, 0, width, height);

  const bumpPattern = bCtx.createPattern(pebbleBumpCanvas, 'repeat');
  bCtx.fillStyle = bumpPattern;
  bCtx.fillRect(0, 0, width, height);

  // Fill roughness with a base texture (moderate roughness: gray ~ 180)
  rCtx.fillStyle = '#b4b4b4';
  rCtx.fillRect(0, 0, width, height);

  // 3. Process pixels to draw the basketball black seams mathematical curves
  const dImgData = dCtx.getImageData(0, 0, width, height);
  const bImgData = bCtx.getImageData(0, 0, width, height);
  const rImgData = rCtx.getImageData(0, 0, width, height);

  const dData = dImgData.data;
  const bData = bImgData.data;
  const rData = rImgData.data;

  // Seam width parameters
  const seamHalfWidth = 0.024;
  const blurWidth = 0.012;
  const saddleA = 0.65; // Saddle curve parameter

  for (let v = 0; v < height; v++) {
    const phi = (v / height) * Math.PI;
    const sinPhi = Math.sin(phi);
    const cosPhi = Math.cos(phi);

    for (let u = 0; u < width; u++) {
      const theta = (u / width) * Math.PI * 2;

      // Map 2D UV coordinate to 3D point on the unit sphere
      const x = sinPhi * Math.cos(theta);
      const y = cosPhi;
      const z = sinPhi * Math.sin(theta);

      // Distance to vertical seam (x = 0)
      const d1 = Math.abs(x);

      // Distance to horizontal seam (y = 0)
      const d2 = Math.abs(y);

      // Distance to saddle-shaped seams: z = saddleA * (x^2 - y^2)
      // distance is approximately |z - A*(x^2 - y^2)| / length(grad)
      const saddleDiff = z - saddleA * (x * x - y * y);
      const gradX = -2 * saddleA * x;
      const gradY = 2 * saddleA * y;
      const gradZ = 1;
      const gradLen = Math.sqrt(gradX * gradX + gradY * gradY + gradZ * gradZ);
      const d3 = Math.abs(saddleDiff) / gradLen;

      // Minimum distance to any seam
      const minD = Math.min(d1, d2, d3);

      const idx = (v * width + u) * 4;

      if (minD < seamHalfWidth + blurWidth) {
        // Compute blending factor
        // t = 0 inside the seam, t = 1 outside
        let t = 1;
        if (minD <= seamHalfWidth - blurWidth) {
          t = 0;
        } else {
          t = (minD - (seamHalfWidth - blurWidth)) / (2 * blurWidth);
          // Clamp
          t = Math.max(0, Math.min(1, t));
        }

        // Apply smooth step transition
        t = t * t * (3 - 2 * t);

        // Seam styling (very dark gray/black)
        const seamR = 15;
        const seamG = 15;
        const seamB = 15;
        
        // Seam is recessed, so bump is black/dark (low value)
        const seamBump = 60; // recessed

        // Seam is rubber, which is shinier than pebbled leather
        const seamRoughness = 70; // lower roughness = shinier

        // 1. Interpolate diffuse color
        dData[idx] = THREE.MathUtils.lerp(seamR, dData[idx], t);
        dData[idx + 1] = THREE.MathUtils.lerp(seamG, dData[idx + 1], t);
        dData[idx + 2] = THREE.MathUtils.lerp(seamB, dData[idx + 2], t);

        // 2. Interpolate bump/height
        bData[idx] = THREE.MathUtils.lerp(seamBump, bData[idx], t);
        bData[idx + 1] = THREE.MathUtils.lerp(seamBump, bData[idx + 1], t);
        bData[idx + 2] = THREE.MathUtils.lerp(seamBump, bData[idx + 2], t);

        // 3. Interpolate roughness
        rData[idx] = THREE.MathUtils.lerp(seamRoughness, rData[idx], t);
        rData[idx + 1] = THREE.MathUtils.lerp(seamRoughness, rData[idx + 1], t);
        rData[idx + 2] = THREE.MathUtils.lerp(seamRoughness, rData[idx + 2], t);
      }
    }
  }

  // Put image data back to canvases
  dCtx.putImageData(dImgData, 0, 0);
  bCtx.putImageData(bImgData, 0, 0);
  rCtx.putImageData(rImgData, 0, 0);

  // 4. Create Three.js CanvasTextures
  const diffuseMap = new THREE.CanvasTexture(diffuseCanvas);
  const bumpMap = new THREE.CanvasTexture(bumpCanvas);
  const roughnessMap = new THREE.CanvasTexture(roughnessCanvas);

  // Set texture properties for best rendering
  diffuseMap.colorSpace = THREE.SRGBColorSpace;
  diffuseMap.wrapS = THREE.RepeatWrapping;
  diffuseMap.wrapT = THREE.ClampToEdgeWrapping;
  
  bumpMap.wrapS = THREE.RepeatWrapping;
  bumpMap.wrapT = THREE.ClampToEdgeWrapping;

  roughnessMap.wrapS = THREE.RepeatWrapping;
  roughnessMap.wrapT = THREE.ClampToEdgeWrapping;

  return { diffuseMap, bumpMap, roughnessMap };
}
