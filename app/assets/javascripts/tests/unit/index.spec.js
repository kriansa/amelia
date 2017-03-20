import { expect } from 'chai';
import App from '../../applications/home/index.vue';

it('this test is purely for testing purposes', (done) => {
  setTimeout(done, 400);

  expect(App).to.not.equal(false);
  expect(1).to.equal(1);
}).timeout(500);
