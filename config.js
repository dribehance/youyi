'use strict';

module.exports = function(config) {

  /**
   * The output directory.
   *
   * @property config.dest
   * @type {String}
   */
  config.dest = 'www';

  /**
   * Whether to inject cordova script
   * into html.
   *
   * @property config.cordova
   * @type {Boolean}
   */
  config.cordova = false;



  //
  // Development web server
  //

  /**
   * Development server config.
   *
   * @type {Boolean}
   * @property config.server
   *
   * @example Disable development server
   *   config.server = false;
   */

  /**
   * The host name where to bind development server.
   *
   * @property config.server.host
   * @type {String}
   */
  config.server.host = 'localhost';

  /**
   * The port where development server will to listen.
   *
   * @property config.server.port
   * @type {String}
   */
  config.server.port = '9000';



  //
  // Weinre Remote debug server
  //

  /**
   * Weinre server config.
   *
   * @type {Boolean}
   * @property config.weinre
   *
   * @example Disable weinre
   *   config.weinre = false;
   */

  /**
   * The host name to which weinre will be bound.
   * @type {String}
   */
  config.weinre.boundHost = 'localhost';


  /**
  * The port where weinre server will to listen.
   * @type {String}
   */
  config.weinre.httpPort = 9001;



  //
  // Sources
  //

  /**
   * Less sources
   *
   * @property config.less.src
   * @type {Array}
   *
   * @default
   * 	 ['./src/less/app.less', './src/less/responsive.less']
   */

  // config.less.src.push('src/less/mystyle.less');

  /**
   * Less search paths
   *
   * @property config.less.paths
   * @type {Array}
   *
   * @default
   * 	 ['./src/less', './bower_components']
   */

  // config.less.paths.push('./vendor/less');



  //
  // 3rd party components
  //

  /**
   * Vendor Javascripts
   *
   * @property config.vendor.js
   * @type {Array}
   */

   // config.vendor.js.push('.bower_components/mylib/mylib.js');
   // by dribehance <dribehance.kksdapp.com>
   /**
    * [lib]
    * support escaping of variable content
    * repository:https://github.com/dribehance/angular-translate.git 
    */
   config.vendor.js.push('./bower_components/angular-sanitize/angular-sanitize.min.js');
   /**
    * [module:flow]
    * support file upload
    * repository:https://github.com/dribehance/ng-flow.git
    */
   config.vendor.js.push('./bower_components/ng-flow/dist/ng-flow-standalone.js');
   /**
    * [module:timer]
    * support countdown
    * repository:https://github.com/dribehance/angular-timer.git
    */
   config.vendor.js.push('./bower_components/angular-timer/dist/angular-timer.min.js');
   config.vendor.js.push('./bower_components/humanize-duration/humanize-duration.js');
   config.vendor.js.push('./bower_components/momentjs/moment.js');
   /**
    * [module:n3-pie-chart]
    * support chart
    * repository:https://github.com/dribehance/pie-chart.git 
    */
   config.vendor.js.push('./bower_components/d3/d3.min.js');
   config.vendor.js.push('./bower_components/pie-chart/dist/pie-chart.min.js');
   /**
    * [module:LocalStorageModule]
    * support localStorage
    * repository:https://github.com/dribehance/angular-local-storage.git 
    */
   config.vendor.js.push('./bower_components/angular-local-storage/dist/angular-local-storage.min.js');
   /**
    * [lib]
    * support carousel
    * repository:https://github.com/dribehance/OwlCarousel.git 
    */
   config.vendor.js.push('./bower_components/OwlCarousel/owl-carousel/owl.carousel.min.js');
   /**
    * [lib]
    * identity-card validation
    * repository:https://github.com/dribehance/china-identity-card.git
    */
   config.vendor.js.push('./node_modules/china-identity-card/validate.js');
   /**
    * [lib]
    * support html5 date/time/week
    * repository:https://github.com/dribehance/date-polyfill.git 
    */
   config.vendor.js.push('./bower_components/date-polyfill/date-polyfill.min.js');
   /**
    * [lib]
    * support i18n
    * repository:https://github.com/dribehance/angular-translate.git 
    */
   config.vendor.js.push('./bower_components/angular-translate/angular-translate.min.js');
   // translate language offer by server
   // config.vendor.js.push('./bower_components/angular-translate-loader-url/angular-translate-loader-url.min.js');
   // translate language offer by static file
   config.vendor.js.push('./bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js');
  /**
   * Vendor Fonts
   *
   * @property config.vendor.fonts
   * @type {Array}
   */

   // config.vendor.fonts.push('.bower_components/mylib/fonts/**/*');

  /**
   * Vendor Css (prepended on compile time)
   *
   * @property config.vendor.css.prepend
   * @type {Array}
   */

  // config.vendor.css.prepend.push('.bower_components/mylib/mylib.css');

  /**
   * Vendor Css (appended on compile time)
   *
   * @property config.vendor.css.append
   * @type {Array}
   */

  // config.vendor.css.append.push('.bower_components/mylib/mylib.css');

};
