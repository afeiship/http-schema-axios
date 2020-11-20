(function () {
  const NxFetch = require('../src');
  const nodeFetch = require('node-fetch');
  const http = NxFetch.getInstance({ fetch: nodeFetch });

  jest.setTimeout(30000);

  describe('NxFetch.methods', function () {
    test('get should return res.login === afeiship', function (done) {
      http.get('https://api.github.com/users/afeiship').then((res) => {
        expect(res.login).toBe('afeiship');
        done();
      });
    });
  });
})();
