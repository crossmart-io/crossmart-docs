// Downloads the live Crossmart OpenAPI spec into openapi/crossmart.json, which the API
// reference pages are generated from. Run it with `pnpm openapi:sync` after an API release.
//   CROSSMART_OPENAPI_URL=http://localhost:3000/api/docs-json pnpm openapi:sync
import { writeFile } from 'node:fs/promises';

const DEFAULT_SPEC_URL = 'https://api.crossmart.io/api/docs-json';
/** Used in the reference's code samples when the spec names no server of its own. */
const DEFAULT_SERVER = { url: 'https://api.crossmart.io', description: 'Crossmart Cloud' };
const OUTPUT_FILE = new URL('../openapi/crossmart.json', import.meta.url);
const JSON_INDENTATION = 2;

const specUrl = process.env.CROSSMART_OPENAPI_URL ?? DEFAULT_SPEC_URL;
const response = await fetch(specUrl);
if (!response.ok) {
  throw new Error(`Could not download the OpenAPI spec from ${specUrl}: HTTP ${response.status}`);
}

const spec = await response.json();
if (!spec.servers?.length) {
  spec.servers = [DEFAULT_SERVER];
}
await writeFile(OUTPUT_FILE, `${JSON.stringify(spec, null, JSON_INDENTATION)}\n`);
console.log(`Saved ${Object.keys(spec.paths ?? {}).length} paths from ${specUrl}`);
