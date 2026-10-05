import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

const assetsDir = path.join(process.cwd(), 'assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// CRC32 implementation for PNG chunks
function makeCrcTable() {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      if (c & 1) {
        c = 0xedb88320 ^ (c >>> 1);
      } else {
        c = c >>> 1;
      }
    }
    table[n] = c >>> 0;
  }
  return table;
}

const crcTable = makeCrcTable();

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function createChunk(type, data) {
  const len = data.length;
  const buf = Buffer.alloc(8 + len + 4);
  buf.writeUInt32BE(len, 0);
  buf.write(type, 4, 4, 'ascii');
  data.copy(buf, 8);
  const typeAndData = buf.subarray(4, 8 + len);
  const crc = crc32(typeAndData);
  buf.writeUInt32BE(crc, 8 + len);
  return buf;
}

function generatePng(width, height, r, g, b, a = 255) {
  // PNG Signature
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  // IHDR Chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // Bit depth
  ihdrData[9] = 6; // Color type (RGBA)
  ihdrData[10] = 0; // Compression
  ihdrData[11] = 0; // Filter
  ihdrData[12] = 0; // Interlace
  const ihdrChunk = createChunk('IHDR', ihdrData);

  // IDAT Chunk (Raw Scanlines)
  const rowSize = 1 + width * 4;
  const rawScanlines = Buffer.alloc(rowSize * height);
  for (let y = 0; y < height; y++) {
    const offset = y * rowSize;
    rawScanlines[offset] = 0; // None filter
    for (let x = 0; x < width; x++) {
      const px = offset + 1 + x * 4;
      rawScanlines[px] = r;
      rawScanlines[px + 1] = g;
      rawScanlines[px + 2] = b;
      rawScanlines[px + 3] = a;
    }
  }

  const compressedData = zlib.deflateSync(rawScanlines);
  const idatChunk = createChunk('IDAT', compressedData);

  // IEND Chunk
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// Generate valid 1024x1024 CareFlow PNG assets (#0f172a dark slate blue)
const iconPng = generatePng(1024, 1024, 15, 23, 42, 255);
const faviconPng = generatePng(128, 128, 15, 23, 42, 255);

const files = [
  { name: 'icon.png', buf: iconPng },
  { name: 'adaptive-icon.png', buf: iconPng },
  { name: 'splash.png', buf: iconPng },
  { name: 'favicon.png', buf: faviconPng },
];

files.forEach(({ name, buf }) => {
  const filePath = path.join(assetsDir, name);
  fs.writeFileSync(filePath, buf);
  console.log(`[CareFlow] Generated 1024x1024 PNG asset: ${name}`);
});
