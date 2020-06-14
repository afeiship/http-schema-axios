(function () {
  var nx = require('@feizheng/next-js-core2');
  var NxFetch = require('../src/next-fetch');
  var nodeFetch = require('node-fetch');
  const http = NxFetch.getInstance({ fetch: nodeFetch });

  describe('NxFetch.methods', function () {
    test('get should return status: 200', function (done) {
      http.get('http://t.weather.sojson.com/api/weather/city/101030100').then(res => {
        expect(res.status).toBe(200);
        done();
      })
    });
  });
})();
