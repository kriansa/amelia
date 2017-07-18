/**
 * Global script that is loaded on every page.
 *
 * Here we should have things application-wide
 * such as monitoring or analytics tools, and
 * global behaviors such as Turbolinks
 *
 * This should *not* be used to share information
 * or code among components.
 */
import Turbolinks from 'turbolinks';
import GoogleAnalytics from './google-analytics';
import Theme from './theme';

// Activate turbolinks
Turbolinks.start();

// Starts GA
GoogleAnalytics.load(process.env.GA_ID);

// Start theme functionality
Theme.activate();
