/**
 * Tiny wrapper around Google Analytics script to ensure
 * compatibility with Turbolinks
 */

export default {
  /**
   * This method is supposed to be called once every page reload.
   * It will setup GA tracker regardless of what type of app we're using (SPA or Page-reload)
   *
   * @param {String} analyticsId
   */
  load: function load(analyticsId) {
    /* eslint-disable */
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', analyticsId, 'auto');
    /* eslint-enable */

    this.listenPageView();
  },

  /**
   * This method will be called after GA script is embeded on this page and it will
   * start tracking analytics events on either Turbolinks page:change event or
   * once for page-reload applications
   */
  listenPageView: function listenPageView() {
    // If Turbolinks is supported, set up a callback to track pageviews on page:change.
    // If it isn't supported, just track the pageview now.
    // eslint-disable-next-line no-undef
    if (typeof Turbolinks !== 'undefined' && Turbolinks.supported) {
      document.addEventListener('page:change', () => {
        this.track(window.location.pathname);
      }, true);
    } else {
      this.track(window.location.pathname);
    }
  },

  /**
   * Sends the hit to GA if we're not in local mode.
   */
  track: function track(url) {
    if (!this.isLocalRequest()) {
      // eslint-disable-next-line no-undef
      ga('send', 'pageview', url);
    } else {
      console.log(`[GA] Sending pageview from URL "${url}"`); // eslint-disable-line no-console
    }
  },

  /**
   * Detects whether this is a local request.
   *
   * @return {Boolean}
   */
  isLocalRequest: function isLocalRequest() {
    return document.domain.indexOf('local.') !== -1 || document.domain.indexOf('localhost') !== -1 || document.domain.indexOf('0.0.0.0') !== -1;
  },
};
