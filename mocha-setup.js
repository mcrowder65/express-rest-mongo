const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
chai.config.includeStack = true;

global.expect = chai.expect;
