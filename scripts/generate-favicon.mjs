/**
 * Generates favicon.png (32x32) and apple-icon.png (180x180)
 * using pure Node.js — no external dependencies required.
 */

import zlib from 'node:zlib';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

// CRC32 table
const crcTable = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    t[n] = c;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xFF] ^ (c >>> 8);
  return (c ^ 0xFFFFFFFF) >>> 0;
}

function makeChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeB = Buffer.from(type, 'ascii');
  const crcBuf = Buffer.concat([typeB, data]);
  const crc = crc32(crcBuf);
  const crcOut = Buffer.alloc(4);
  crcOut.writeUInt32BE(crc >>> 0, 0);
  return Buffer.concat([len, typeB, data, crcOut]);
}

function writePNG(filePath, width, height, getPixel) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;  // bit depth
  ihdr[9] = 2;  // color type: RGB
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const raw = Buffer.alloc(height * (1 + width * 3));
  for (let y = 0; y < height; y++) {
    raw[y * (1 + width * 3)] = 0;
    for (let x = 0; x < width; x++) {
      const [r, g, b] = getPixel(x, y, width, height);
      const offset = y * (1 + width * 3) + 1 + x * 3;
      raw[offset] = Math.max(0, Math.min(255, Math.round(r)));
      raw[offset + 1] = Math.max(0, Math.min(255, Math.round(g)));
      raw[offset + 2] = Math.max(0, Math.min(255, Math.round(b)));
    }
  }

  const compressed = zlib.deflateSync(raw);
  const ihdrChunk = makeChunk('IHDR', ihdr);
  const idatChunk = makeChunk('IDAT', compressed);
  const iend = makeChunk('IEND', Buffer.alloc(0));

  writeFileSync(filePath, Buffer.concat([sig, ihdrChunk, idatChunk, iend]));
  console.log(`Written: ${filePath}`);
}

function getPixel(x, y, w, h) {
  const cx = w / 2, cy = h / 2;
  const dx = x - cx, dy = y - cy;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const radius = w * 0.38;
  const glowRadius = w * 0.48;

  // Background: dark navy #1a1530
  let r = 26, g = 21, b = 48;

  // Glow halo
  if (dist < glowRadius) {
    const t = Math.max(0, 1 - dist / glowRadius);
    const glow = t * t * 0.5;
    r = r + (255 - r) * glow * 0.4;
    g = g + (100 - g) * glow * 0.2;
    b = b + (0 - b) * glow * 0.1;
  }

  // Orange circle with radial gradient
  if (dist < radius) {
    const t = dist / radius;
    r = 255 - t * 30;
    g = 122 - t * 90;
    b = 0;
    // Inner highlight
    if (dist < radius * 0.35) {
      const hl = (1 - dist / (radius * 0.35)) * 0.25;
      r = r + (255 - r) * hl;
      g = g + (200 - g) * hl;
      b = b + 80 * hl;
    }
  }

  // "io" text — rendered as white pixels using a simple bitmap approach
  // Normalize coords to a 32x32 virtual canvas
  const nx = (x / w) * 32;
  const ny = (y / h) * 32;

  if (isIOText(nx, ny)) {
    r = 255; g = 255; b = 255;
  }

  return [r, g, b];
}

function isIOText(x, y) {
  // "i" column: x 10.5–13.5, y 9.5–22.5 (with dot at y 7–9)
  const inI = x >= 10.5 && x <= 13.5;
  const inIDot = inI && y >= 7 && y <= 9;
  const inIBody = inI && y >= 10.5 && y <= 22.5;

  // "o" — hollow rounded rect: x 15.5–21.5, y 10–22.5
  const inOX = x >= 15.5 && x <= 21.5;
  const inOY = y >= 10 && y <= 22.5;
  const inOBorder =
    inOX && inOY &&
    (x <= 17 || x >= 20 || y <= 11.5 || y >= 21);

  return inIDot || inIBody || inOBorder;
}

writePNG(join(publicDir, 'favicon.png'), 32, 32, getPixel);
writePNG(join(publicDir, 'apple-icon.png'), 180, 180, getPixel);

console.log('Done!');
