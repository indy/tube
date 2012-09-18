require.config({
  shim: {
  },
  // tests should keep the same base url as the app
  baseUrl: '../app/scripts',

  // prefix all spec requires with spec
  paths: {
    spec: '../../test/spec'
  }
});

