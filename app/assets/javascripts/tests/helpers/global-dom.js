/**
 * This module is a helper in order to test modules that requires DOM access
 * such as globally available `window` or `document`.
 *
 * You should use it wrapping it around your `DOM`-dependent module. Example:
 *
 * ```js
 *  it('test feature', function() {
 *    const cleanup = require('../helpers/global-dom')('<html></html>', { url: '/sign_in' });
 *    const myModule = require('my-module');
 *
 *    // Test myModule
 *
 *    cleanup();
 *  })
 * ```
 *
 * It **WILL NOT** work with `import` statement. If you want to use `import`,
 * please, use as the following:
 *
 * ```js
 *  import cleanup from '../helpers/register-global-dom'
 *  import 'my-module'
 *
 *  // ...
 * ```
 *
 * The only drawback of using it like that is that you can't customize the HTML
 * nor the URI that you want to stub. Also, the global variables will remain
 * through all the script and you will have little control of them.
 */
module.exports = function globalJsDOM(html, options) {
  const defaultHtml = `<!doctype html><html>
    <head><meta charset="utf-8"></head>
    <body></body></html>`;

  const jsDomOptions = Object.assign({
    url: `${process.env.BASE_URL}/index?query=1#hashstr`,
    referrer: process.env.BASE_URL,
    contentType: 'text/html',
    userAgent: 'JSDOM',
    includeNodeLocations: false,
  }, options);

  // Loads JSDOM and injects it globally
  // eslint-disable-next-line global-require
  const cleanup = require('jsdom-global')(html || defaultHtml, jsDomOptions);

  // Set the document.domain, since JSDOM.url doesn't
  document.domain = `${window.location.protocol}://${window.location.host}`;

  return cleanup;
};
