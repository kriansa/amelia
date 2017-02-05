/**
 * Global script that is loaded on every page.
 * Here we should have things application-wide
 * such as monitoring or analytics tools, and
 * global behaviors such as Turbolinks
 *
 * This should *not* be used to share inforrmation
 * or code among libraries.
 */
import Turbolinks from 'turbolinks';
import GoogleAnalytics from '../lib/google-analytics';

// Activate turbolinks
Turbolinks.start();

// Starts GA
GoogleAnalytics.load(process.env.GA_ID);
