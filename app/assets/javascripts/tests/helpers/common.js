/**
 * This file is globally included on every testcase instance.  It is useful to
 * load constants such as `chai`, `sinon` or any setup phase that we need.  In
 * our case, we need to setup sinon-chai, avoiding repeating a chunk of code
 * across our test files.
 */
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

// Require and load .env vars
require('./dotenv');

// Configure chai to use Sinon-Chai
chai.should();
chai.use(sinonChai);

global.expect = chai.expect;
global.sinon = sinon;
