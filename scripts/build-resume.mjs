// scripts/build-resume.mjs
// Builds the site, then renders /resume/print/ to public/assets/resume.pdf
// using a local headless Chromium (Edge or Chrome) over the DevTools protocol.
// No extra dependencies.
//
//   npm run resume
//
// The PDF is committed to the repo — GitHub Actions only runs `astro build`,
// so regenerate and commit the file whenever the resume content changes.

import { spawn, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const outFile = path.join(root, 'public', 'assets', 'resume.pdf');
const base = '/portfolio';

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function findBrowser() {
  return [
    process.env.CHROME_PATH,
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ].find((candidate) => candidate && fs.existsSync(candidate));
}

/** Serve dist/ so the base-prefixed URLs and fonts resolve exactly as deployed. */
function serve(dir) {
  const server = http.createServer((req, res) => {
    let pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (pathname.startsWith(base)) pathname = pathname.slice(base.length) || '/';

    let filePath = path.join(dir, pathname);
    if (!filePath.startsWith(dir)) {
      res.writeHead(403).end('Forbidden');
      return;
    }
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }
    if (!fs.existsSync(filePath)) {
      res.writeHead(404).end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': mime[path.extname(filePath)] ?? 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  });

  return new Promise((resolve) => server.listen(0, '127.0.0.1', () => resolve(server)));
}

/** Minimal DevTools client: send(method, params) resolves with the result. */
async function connect(port) {
  let targets;
  for (let attempt = 0; attempt < 100; attempt++) {
    try {
      targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
      if (targets.some((target) => target.type === 'page')) break;
    } catch {
      /* browser still starting */
    }
    await sleep(150);
  }

  const page = targets?.find((target) => target.type === 'page');
  if (!page) throw new Error('Headless browser did not expose a page target.');

  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = () => reject(new Error('Could not connect to the headless browser.'));
  });

  let nextId = 0;
  const pending = new Map();
  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    const entry = pending.get(message.id);
    if (!entry) return;
    pending.delete(message.id);
    message.error ? entry.reject(new Error(message.error.message)) : entry.resolve(message.result);
  };

  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const id = ++nextId;
      pending.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });

  return { send, close: () => ws.close() };
}

console.log('› Building site…');
const build = spawnSync('npx', ['astro', 'build'], {
  cwd: root,
  stdio: 'inherit',
  shell: process.platform === 'win32',
  timeout: 300_000,
});
if (build.error) throw build.error;
if (build.status !== 0) throw new Error(`astro build failed (${build.status}).`);
if (!fs.existsSync(dist)) throw new Error('Build produced no dist/ directory.');

const browserPath = findBrowser();
if (!browserPath) {
  throw new Error('No Chromium browser found. Set CHROME_PATH to the Edge/Chrome executable and rerun.');
}

const server = await serve(dist);
const { port: httpPort } = server.address();
const url = `http://127.0.0.1:${httpPort}${base}/resume/print/`;

const debugPort = 9400 + Math.floor(Math.random() * 400);
const profile = path.join(process.env.TEMP ?? '/tmp', `resume-print-${Date.now()}`);
const child = spawn(
  browserPath,
  [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--no-first-run',
    '--hide-scrollbars',
    `--remote-debugging-port=${debugPort}`,
    `--user-data-dir=${profile}`,
    'about:blank',
  ],
  { stdio: 'ignore' }
);

let client;
try {
  client = await connect(debugPort);
  const { send } = client;

  console.log(`› Rendering ${url}`);
  await send('Page.enable');
  await send('Page.navigate', { url });

  // Wait for the document and the self-hosted webfonts before printing.
  await send('Runtime.evaluate', {
    awaitPromise: true,
    expression: `(async () => {
      await document.fonts.ready;
      if (document.readyState !== 'complete') {
        await new Promise((resolve) => addEventListener('load', resolve, { once: true }));
      }
      return true;
    })()`,
  });

  const { data } = await send('Page.printToPDF', {
    preferCSSPageSize: true,
    printBackground: true,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
  });

  const pdf = Buffer.from(data, 'base64');
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, pdf);

  const pages = Number(pdf.toString('latin1').match(/\/Count\s+(\d+)/)?.[1] ?? 0);
  console.log(`✓ public/assets/resume.pdf — ${Math.round(pdf.length / 1024)} KB, ${pages || '?'} page(s)`);
  if (pages > 1) {
    console.warn('! Resume is longer than one page — trim content in src/data/resume.ts.');
  }
} finally {
  client?.close();
  child.kill();
  server.close();
  try {
    fs.rmSync(profile, { recursive: true, force: true });
  } catch {
    // Chromium can still hold files in its temp profile; the OS cleans it up later.
  }
}
