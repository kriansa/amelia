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
     * Eventually, function-like `import` will be accepted as a JS feature. For
     * now, it's still in stage-3 of the TC39 process. If we wanted to use it,
     * we would just need to turn it on Babel and make ESLint aware of it by
     * using eslint-babel plugin. That's too much overhead for now, IMHO.
     * Webpack provides us a good short-term solution for that, which is
     * `System.import` and it will suit us until we have `import`.
     *
     * https://github.com/tc39/proposal-dynamic-import
     * https://webpack.js.org/api/module-methods/#require-ensure
     * https://webpack.js.org/api/module-methods/#import-
     */
    return System.import('jquery').then((jquery) => {
      $ = jquery;

      // Activate automatic right-menu show
      $(document).ready(this.activateRightMenuWhenForSmallScreens.bind(this));
      $(window).resize(this.activateRightMenuWhenForSmallScreens.bind(this));

      // Enable bootstrap dropdown JS
      Dropdown($);
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
  /* eslint-disable */
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
