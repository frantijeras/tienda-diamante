// Direct check of how Next.js handles env with this setup

const path = require('path');
const fs = require('fs');

// First, load the config
const configFile = path.join(__dirname, 'config.production.json');
const config = JSON.parse(fs.readFileSync(configFile, 'utf-8'));

// Set in process.env
Object.entries(config).forEach(([key, value]) => {
  process.env[key] = value;
});

console.log('Hash after set:', (process.env.ADMIN_PASSWORD_HASH || 'NOT SET').substring(0, 10));
console.log('Hash length:', (process.env.ADMIN_PASSWORD_HASH || '').length);

// Now load Next.js env loader
const nextDir = path.join(__dirname, 'node_modules', 'next');
const envLoader = require(path.join(nextDir, 'dist', 'lib', 'load-env-config'));

async function test() {
  await envLoader.loadEnvConfig(__dirname, false, console);
  console.log('Hash after loadEnvConfig:', (process.env.ADMIN_PASSWORD_HASH || 'NOT SET').substring(0, 10));
  console.log('Hash length:', (process.env.ADMIN_PASSWORD_HASH || '').length);
}
test();
