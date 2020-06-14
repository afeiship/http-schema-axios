(function() {
  var nx = require('@feizheng/next-js-core2');
  var NxFetch = require('../src/next-fetch');

  describe('NxFetch.methods', function() {
    test('init', function() {
      var data = {
        key: 1,
        value: 2
      };
      expect(!!data).toBe(true);
    });
  });
})();
