import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.resolve(projectRoot, 'dist');
const indexHtmlPath = path.resolve(distDir, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
  console.error('dist/index.html does not exist. Run vite build first.');
  process.exit(1);
}

const indexContent = fs.readFileSync(indexHtmlPath, 'utf-8');

// 1. Create 404.html (Fallback served by Render and static hosts for any unmatched route)
fs.writeFileSync(path.resolve(distDir, '404.html'), indexContent);
console.log('  ✓ Created dist/404.html (SPA universal fallback)');

// 2. Pre-generate known SPA route index files for zero-delay HTTP 200 responses
const routes = [
  'courses',
  'playground',
  'bookmarks',
  'curriculum',
  path.join('courses', 'javascript-mastery'),
  path.join('courses', 'javascript-mastery', 'learn'),
];

for (const route of routes) {
  const routeDir = path.resolve(distDir, route);
  fs.mkdirSync(routeDir, { recursive: true });
  fs.writeFileSync(path.resolve(routeDir, 'index.html'), indexContent);
  console.log(`  ✓ Created dist/${route}/index.html`);
}

console.log('🎉 SPA route fallbacks generated successfully!');
