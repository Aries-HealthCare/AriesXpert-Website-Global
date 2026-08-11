/**
 * BACK-012 — Website therapist proxy contract tests.
 * Run: npm run test:website-therapist-proxy
 */

import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const BACKEND_ROOT = path.join(ROOT, '..', 'ariesxpert-backend');
const OBSOLETE_RENDER = 'ariesxpert-backend.onrender.com';

function read(rel: string): string {
  return fs.readFileSync(path.join(ROOT, rel), 'utf8');
}

function runConfig(env: NodeJS.ProcessEnv, snippet: string): { status: number; stdout: string; stderr: string } {
  const result = spawnSync(
    'npx',
    ['ts-node', '--transpile-only', '-e', snippet],
    {
      cwd: ROOT,
      env: { ...process.env, ...env },
      encoding: 'utf8',
    },
  );
  return {
    status: result.status ?? 1,
    stdout: result.stdout || '',
    stderr: result.stderr || '',
  };
}

function run() {
  console.log('=== Website Therapist Proxy Contract Tests (BACK-012) ===');

  const configPath = path.join(SRC, 'lib/backend-api-config.ts');
  assert.ok(fs.existsSync(configPath), 'backend-api-config.ts must exist');
  const configSource = fs.readFileSync(configPath, 'utf8');
  assert.ok(configSource.includes('export function getBackendApiBaseUrl'), 'getBackendApiBaseUrl must be exported');
  assert.ok(configSource.includes('export function getWebsiteTherapistsUrl'), 'getWebsiteTherapistsUrl must be exported');
  assert.ok(!configSource.includes(OBSOLETE_RENDER), 'backend-api-config must not reference obsolete Render URL');

  const routeSource = read('src/app/api/therapists/route.ts');
  const serverSource = read('src/services/therapists-server.ts');
  assert.ok(routeSource.includes("from '@/lib/backend-api-config'"), 'route.ts must import shared config');
  assert.ok(serverSource.includes("from '@/lib/backend-api-config'"), 'therapists-server.ts must import shared config');
  assert.ok(!routeSource.includes(OBSOLETE_RENDER), 'route.ts must not reference obsolete Render URL');
  assert.ok(!serverSource.includes(OBSOLETE_RENDER), 'therapists-server.ts must not reference obsolete Render URL');
  assert.ok(routeSource.includes('configurationError'), 'route.ts must expose configurationError on misconfig');

  const backendRoutes = fs.readFileSync(path.join(BACKEND_ROOT, 'src/routes/publicWebsite.routes.ts'), 'utf8');
  assert.ok(backendRoutes.includes('PublicWebsiteRoutes.get("/therapists"'), 'backend must define GET /therapists');

  const mainRoutes = fs.readFileSync(path.join(BACKEND_ROOT, 'src/mainRoutes.ts'), 'utf8');
  assert.ok(mainRoutes.includes('router.use("/v1/website", PublicWebsiteRoutes)'), 'backend must mount /v1/website');

  const classifier = fs.readFileSync(path.join(BACKEND_ROOT, 'src/middleware/route.classifier.ts'), 'utf8');
  assert.ok(classifier.includes('["GET", "/api/v1/website/therapists"]'), 'website therapists route must be public allowlisted');

  const envExample = read('.env.example');
  assert.ok(envExample.includes('BACKEND_API_BASE_URL'), '.env.example must document BACKEND_API_BASE_URL');
  assert.ok(envExample.includes('NEXT_PUBLIC_API_URL'), '.env.example must document NEXT_PUBLIC_API_URL');

  const importPath = './src/lib/backend-api-config.ts';

  const prodFail = runConfig(
    {
      NODE_ENV: 'production',
      BACKEND_API_BASE_URL: '',
      NEXT_PUBLIC_API_BASE_URL: '',
      NEXT_PUBLIC_API_URL: '',
      API_BASE_URL: '',
    },
    `try { require('${importPath}').getBackendApiBaseUrl(); process.exit(2); } catch (e) { if (String(e.message).includes('BACKEND_API_BASE_URL')) process.exit(0); throw e; }`,
  );
  assert.equal(prodFail.status, 0, `production missing env must throw: ${prodFail.stderr}`);

  const devDefault = runConfig(
    {
      NODE_ENV: 'development',
      BACKEND_API_BASE_URL: '',
      NEXT_PUBLIC_API_BASE_URL: '',
      NEXT_PUBLIC_API_URL: '',
      API_BASE_URL: '',
    },
    `const m = require('${importPath}'); console.log(m.getBackendApiBaseUrl());`,
  );
  assert.equal(devDefault.status, 0, devDefault.stderr);
  assert.equal(devDefault.stdout.trim(), 'http://localhost:5001/api/v1');

  const priority = runConfig(
    {
      NODE_ENV: 'development',
      BACKEND_API_BASE_URL: 'https://priority.example.com/api/v1/',
      NEXT_PUBLIC_API_URL: 'https://ignored.example.com/api/v1',
    },
    `const m = require('${importPath}'); console.log(m.getBackendApiBaseUrl());`,
  );
  assert.equal(priority.stdout.trim(), 'https://priority.example.com/api/v1');

  const publicUrl = runConfig(
    {
      NODE_ENV: 'development',
      BACKEND_API_BASE_URL: '',
      NEXT_PUBLIC_API_BASE_URL: '',
      NEXT_PUBLIC_API_URL: 'https://public.example.com/api/v1',
      API_BASE_URL: '',
    },
    `const m = require('${importPath}'); console.log(m.getBackendApiBaseUrl());`,
  );
  assert.equal(publicUrl.stdout.trim(), 'https://public.example.com/api/v1');

  const urlGen = runConfig(
    {
      NODE_ENV: 'development',
      NEXT_PUBLIC_API_URL: 'https://api.example.com/api/v1',
    },
    `const m = require('${importPath}'); const p = new URLSearchParams({ city: 'Mumbai', limit: '50' }); console.log(m.getWebsiteTherapistsUrl(p));`,
  );
  assert.ok(urlGen.stdout.trim().endsWith('/website/therapists?city=Mumbai&limit=50'));

  const apiLib = read('src/lib/api.ts');
  assert.ok(!apiLib.includes(OBSOLETE_RENDER), 'src/lib/api.ts must not reference obsolete Render URL');
  assert.ok(apiLib.includes('api.ariesxpert.com'), 'src/lib/api.ts must default to production API');
  assert.ok(apiLib.includes('onrender.com'), 'src/lib/api.ts must guard against Render in production');

  const leadLegacy = read('src/services/lead-submission.ts');
  assert.ok(leadLegacy.includes('LEGACY_LEAD_SUBMISSION_REMOVED'), 'lead-submission.ts must be gated/disabled');

  console.log('All website therapist proxy contract tests passed.');
}

run();
