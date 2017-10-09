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
