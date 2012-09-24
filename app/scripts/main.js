require.config({
  shim: {
    'vendor/d3.v2.min': {
            //These script dependencies should be loaded before loading
            //d3.js
            // deps: ['underscore', 'jquery'],
            //Once loaded, use the global 'Backbone' as the
            //module value.
            exports: 'd3'
        }
  },

  paths: {
    hm: 'vendor/hm',
    esprima: 'vendor/esprima',
    jquery: 'vendor/jquery.min'
  }
});
 
require(['app'], function(app) {
  app.init();
});
