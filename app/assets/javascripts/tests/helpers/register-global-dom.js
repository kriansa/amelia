/**
 * Requires global-dom globally so that you can use it with the `import` syntax
 *
 * The drawback of this approach is that you can't customize the parameters to
 * instantiate JSDOM. If you need that, please, use `require` syntax with
 * the `global-dom` script so that you have more control over it.
 */
module.exports = require('./global-dom')();
