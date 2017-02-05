var expect = require('chai').expect;

it('should take less than 500ms', function(done) {
  this.timeout(500);
  setTimeout(done, 800);
});
