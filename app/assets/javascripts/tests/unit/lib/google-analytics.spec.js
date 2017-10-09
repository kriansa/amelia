import globalDom from '../../helpers/global-dom';

describe('GoogleAnalytics', () => {
  /**
   * This function loads a fake DOM and then GA so that it can interacts with
   * objects like `window` and `document` on NodeJS.
   *
   * @param {String} initialUrl
   */
  const loadGA = function loadGA(initialUrl) {
    const url = initialUrl || `${process.env.BASE_URL}/index?query=1#hashstr`;

    const domCleanup = globalDom(null, { url });

    // eslint-disable-next-line global-require
    const GoogleAnalytics = require('../../../lib/google-analytics').default;

    return { GoogleAnalytics, domCleanup };
  };

  describe('.load', () => {
    it('tracks the current loaded page', () => {
      const { GoogleAnalytics, domCleanup } = loadGA();
      const stub = sinon.stub(GoogleAnalytics, 'track');

      GoogleAnalytics.load('UA-XXXXX-Y');

      expect(stub).to.have.been.calledWith('/index');

      stub.restore();
      domCleanup();
    });
  });

  describe('.track', () => {
    it('when serving a request as local, logs the tracked URL to the console', () => {
      const { GoogleAnalytics, domCleanup } = loadGA();
      const stub = sinon.stub(console, 'log');

      GoogleAnalytics.track('/home');

      stub.restore(); // Stubbing `console.log` is evil - we must restore is ASAP

      expect(stub).to.have.been.calledWith('[GA] Sending pageview from URL "/home"');
      domCleanup();
    });

    it('when serving remote request, calls GA native tracker with the tracked URL', () => {
      const { GoogleAnalytics, domCleanup } = loadGA();
      const stub = sinon.stub(GoogleAnalytics, 'isLocalRequest').returns(false);
      GoogleAnalytics.load('UA-XXXXX-Y');
      const mock = sinon.mock(window).expects('ga').withExactArgs('send', 'pageview', '/home');

      GoogleAnalytics.track('/home');

      mock.verify();

      stub.restore();
      domCleanup();
    });
  });

  describe('.isLocalRequest', () => {
    it('is true when the domain has a localhost portion', () => {
      const { GoogleAnalytics, domCleanup } = loadGA('http://localhost/index');

      expect(GoogleAnalytics.isLocalRequest()).to.equal(true);

      domCleanup();
    });

    it('is true when the domain has a local. portion', () => {
      const { GoogleAnalytics, domCleanup } = loadGA('http://local.mydomain/index');

      expect(GoogleAnalytics.isLocalRequest()).to.equal(true);

      domCleanup();
    });

    it('is true when the domain has a 0.0.0.0 portion', () => {
      const { GoogleAnalytics, domCleanup } = loadGA('http://0.0.0.0/index');

      expect(GoogleAnalytics.isLocalRequest()).to.equal(true);

      domCleanup();
    });

    it('is false when the domain appears to be non-local', () => {
      const { GoogleAnalytics, domCleanup } = loadGA('http://myremote.com/localhost');

      expect(GoogleAnalytics.isLocalRequest()).to.equal(false);

      domCleanup();
    });
  });
});
