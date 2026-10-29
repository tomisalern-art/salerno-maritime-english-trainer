import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { dirname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = resolve(root, 'dist');
const manifest = JSON.parse(await readFile(new URL('manifest.json', import.meta.url), 'utf8'));
const inside = (base, name) => {
  const path = resolve(base, name);
  if (!path.startsWith(resolve(base) + sep)) throw new Error(`Invalid file path: ${name}`);
  return path;
};

await rm(output, { recursive: true, force: true });
for (const [name, expected] of Object.entries(manifest.files)) {
  const sources = expected.parts || [name];
  const buffers = [];
  for (const source of sources) buffers.push(await readFile(inside(root, source)));
  const data = Buffer.concat(buffers);
  if (data.length !== expected.bytes || createHash('sha256').update(data).digest('hex') !== expected.sha256) {
    throw new Error(`Integrity check failed: ${name}`);
  }
  const destination = inside(output, name);
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, data);
}
console.log(`SALERNO ${manifest.version}: ${Object.keys(manifest.files).length} files verified and prepared.`);
