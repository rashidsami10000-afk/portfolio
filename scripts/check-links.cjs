const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', 'dist');
const problems = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.html')) check(full);
  }
}

function check(file) {
  const html = fs.readFileSync(file, 'utf8');
  for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url = m[1];
    if (url.startsWith('/') && !url.startsWith('/portfolio')) {
      problems.push(`${path.relative(root, file)} -> ${url}`);
    }
  }
}

walk(root);
console.log(problems.length ? problems.join('\n') : 'All internal links are base-prefixed.');
