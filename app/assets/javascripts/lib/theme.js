/**
 * Theme script
 *
 * It should export a object containing a `activate` method which enable all
 * the theme features, such as dropdowns or theming misc.
 */

import Paper from './paper-dashboard-theme/paper-dashboard-theme';

export default {
  activate() { Paper.start(); },
};
