(function() {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('next-js-core2');

  // add packages:
  require('isomorphic-fetch');

  var NxFetch = nx.declare('nx.Fetch', {
    statics: {
      'get,post,put,delete,patch,options': function(inName) {
        return function() {};
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxFetch;
  }
})();
