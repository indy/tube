define([], function() {

  return function () {

    // the PQueue constructor accepts 2 optional paramaters:
    // the first is a comparison function used in sorting 
    // the priority queue
    // the second is an identity function used by the 'contains'
    // method

    var nodes = [];

    var compFn;
    if(arguments.length > 0) {
      // constructor specified comparison function
      compFn = arguments[0];
    } else {
      compFn = function (a, b) {
        return b.priority - a.priority;
      }
    }

    var identFn;
    if(arguments.length > 1) {
      identFn = arguments[1];
    } else {
      identFn = function (node, obj){
        return node === obj;
      }
    }

    this.debug = function() {
      return nodes;
    };

    this.push = function (node) {
      nodes.push(node);
    };

    this.length = function () {
      return nodes.length;
    };

    this.pop = function () {
      if(nodes.length === 0) {
        return undefined;
      }
      nodes.sort(compFn);
      var node = nodes[0];
      nodes = nodes.slice(1);
      return node;
    };

    this.contains = function (obj) {
      return nodes.some(function(n) {
        return identFn(n, obj);
      });
    }

  };

});
