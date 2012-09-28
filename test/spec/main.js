require.config({
  shim: {
  },
  // tests should keep the same base url as the app
  baseUrl: '../app/scripts',

  // prefix all spec requires with spec
  paths: {
    spec: '../../test/spec',
    runner: '../../test/runner'
  }
});

require(['runner/jasmine',
         'spec/pqueue.test', 
         'spec/network.test', 
         'spec/tube.test'], 
        function(jasmine, pq, n, t) {
          jasmine();
});

