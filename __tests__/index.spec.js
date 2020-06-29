(function () {
  var nx = require('@feizheng/next-js-core2');
  var NxFetch = require('../src/next-fetch');
  var nodeFetch = require('node-fetch');
  const http = NxFetch.getInstance({ fetch: nodeFetch });

  describe('NxFetch.methods', function () {
    test('get should return res.login === afeiship', function (done) {
      http.get('https://api.github.com/users/afeiship').then(res => {
        expect(res.login).toBe('afeiship');
        done();
      })
    });
  });
})();
