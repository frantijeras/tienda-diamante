// server.js — Production entry point
// Loads config.production.json into process.env and runs Next.js in-process
const fs = require('fs');
const path = require('path');

const configFile = path.join(__dirname, 'config.production.json');
if (fs.existsSync(configFile)) {
  const config = JSON.parse(fs.readFileSync(configFile, 'utf-8'));
  Object.entries(config).forEach(([key, value]) => {
    process.env[key] = value;
  });
}

const PORT = process.env.PORT || '3002';
process.env.PORT = PORT;

// Run Next.js in-process
const { nextStart } = require(path.join(__dirname, 'node_modules', 'next', 'dist', 'cli', 'next-start'));
nextStart({ port: parseInt(PORT, 10) }, __dirname);
