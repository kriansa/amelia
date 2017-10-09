/**
 * Loads .env file with settings and keys from various vendors
 */
const Dotenv = require('dotenv');
const fs = require('fs');

// Load .env settings
(function loadDotEnvFile() {
  const fileString = fs.readFileSync('.env', { encoding: 'utf-8' });
  // Ensure that it works with `export` suffix on variables
  const parsedObj = Dotenv.parse(fileString.replace(/export\s+/g, ''));

  Object.entries(parsedObj)
    .forEach(([key, value]) => { if (!process.env[key]) process.env[key] = value; });
}());
