/*!
 =========================================================
 * Paper Dashboard - v1.1.2
 =========================================================
 * Product Page: http://www.creative-tim.com/product/paper-dashboard
 * Copyright 2017 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard/blob/master/LICENSE.md)
 =========================================================

 * Theme dependencies:
 * - jQuery
 * - Bootstrap 3 styles
 * - Bootstrap 3 dropdown JS functionality
 */

// We need bootstrap's dropdown, but we don't want to load the whole bloated
// library which depends on global jQuery dependency insted of as a CommonJS
import Dropdown from './bootstrap-dropdown';

// Theme Styles
import '../../../stylesheets/paper-dashboard-theme/paper-dashboard-theme.scss';

// Hold space for lazy-loading jQuery
let $;

export default {
  state: {
    navbar_menu_visible: false,
    navbar_initialized: false,
  },

  start() {
    /**
     * The whole point of using `require.ensure` is to add a lazy-loaded
      * dependency. This way, webpack will split that dependency into a
      * different chunk and load it at runtime, dynamically, which makes the
      * asset precompilation faster and enables a better performance on the
      * client-side, given that we will be leveraging parallel downloads on the
      * browser, instead a huge file chunk.
      *
     * import() is going to supersed this function, which is specific to
     * webpack.
     *
     * Webpack has `import()` already implemented, but because it hasn't been
     * accepted as a spec, ESLint doesn't parse it properly. So in order to
     * avoid these issues, we will stick with webpack's `require.ensure`
     *
     * When this syntax gets implemented, we just need to add a new plugin to
     * Babel on .babelrc: "syntax-dynamic-import"
     *
     * https://github.com/tc39/proposal-dynamic-import
     * https://webpack.js.org/api/module-methods/#require-ensure
     * https://webpack.js.org/api/module-methods/#import-
     */
    return new Promise((resolve, reject) => {
      require.ensure('jquery', (require) => {
        $ = require('jquery');

        // Activate automatic right-menu show
        $(document).ready(this.activateRightMenuWhenForSmallScreens.bind(this));
        $(window).resize(this.activateRightMenuWhenForSmallScreens.bind(this));

        // Enable bootstrap dropdown JS
        Dropdown($);

        resolve();
      }, reject, 'jquery');
    });
  },

  activateRightMenuWhenForSmallScreens() {
    if ($(window).width() <= 991) {
      this.initRightMenu();
    }
  },

  /**
   * Initializes the right menu feature
   *
   * TODO: Refactor. Ideally, remove jQuery/bootstrap dependency.
   */
  initRightMenu() {
    if (this.state.navbar_initialized) {
      return;
    }

    const $off_canvas_sidebar = $('nav').find('.navbar-collapse').first().clone(true);

    const $sidebar = $('.sidebar');
    const sidebar_bg_color = $sidebar.data('background-color');
    const sidebar_active_color = $sidebar.data('active-color');

    const $logo = $sidebar.find('.logo').first();
    const logo_content = $logo[0].outerHTML;

    let ul_content = '';
    let content_buff = '';

    // set the bg color and active color from the default sidebar to the off canvas sidebar;
    $off_canvas_sidebar.attr('data-background-color',sidebar_bg_color);
    $off_canvas_sidebar.attr('data-active-color',sidebar_active_color);

    $off_canvas_sidebar.addClass('off-canvas-sidebar');

    //add the content from the regular header to the right menu
    $off_canvas_sidebar.children('ul').each(function(){
      content_buff = $(this).html();
      ul_content = ul_content + content_buff;
    });

    // add the content from the sidebar to the right menu
    content_buff = $sidebar.find('.nav').html();
    ul_content = ul_content + '<li class="divider"></li>'+ content_buff;

    ul_content = '<ul class="nav navbar-nav">' + ul_content + '</ul>';

    const navbar_content = '<div class="sidebar-wrapper">' + logo_content + ul_content + '</div>';
    $off_canvas_sidebar.html(navbar_content);

    $('body').append($off_canvas_sidebar);

    const $toggle = $('.navbar-toggle');

    $off_canvas_sidebar.find('a').removeClass('btn btn-round btn-default');
    $off_canvas_sidebar.find('button').removeClass('btn-round btn-fill btn-info btn-primary btn-success btn-danger btn-warning btn-neutral');
    $off_canvas_sidebar.find('button').addClass('btn-simple btn-block');

    $toggle.click(() => {
      if (this.state.navbar_menu_visible) {
        $('html').removeClass('nav-open');
        this.state.navbar_menu_visible = false;
        $('#bodyClick').remove();
        setTimeout(() => {
          $toggle.removeClass('toggled');
        }, 400);
      } else {
        setTimeout(() => {
          $toggle.addClass('toggled');
        }, 430);

        $('<div id="bodyClick"></div>').appendTo('body').click(() => {
          $('html').removeClass('nav-open');
          this.state.navbar_menu_visible = false;
          $('#bodyClick').remove();
          setTimeout(() => {
            $toggle.removeClass('toggled');
          }, 400);
        });

        $('html').addClass('nav-open');
        this.state.navbar_menu_visible = true;
      }
    });

    this.state.navbar_initialized = true;
  },
};
