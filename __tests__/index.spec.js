(function () {
  const NxFetch = require('../src');
  const nodeFetch = require('node-fetch');
  const http = new NxFetch({
    fetch: nodeFetch,
    interceptors: [{ type: 'response', fn: (data) => nx.get(data, 'data') }]
  });

  jest.setTimeout(30000);

  describe('NxFetch.methods', function () {
    test('get should return res.login === afeiship', function (done) {
      http.get('https://api.github.com/users/afeiship').then((res) => {
        expect(res.login).toBe('afeiship');
        done();
      });
    });

    test('request with a full object url', (done) => {
      http.get({ url: 'https://api.github.com/users/afeiship', method: 'get' }).then((res) => {
        expect(res.repos_url).toBe('https://api.github.com/users/afeiship/repos');
        done();
      });
    });

    test('request with timeout should be reject/cancel(false) able will no be attached', (done) => {
      const res = http
        .get('https://api.github.com/users/afeiship', { timeout: 10 })
        .catch((error) => {
          expect(error.type).toBe('timeout');
          expect(typeof res.cancel).toBe('undefined');
        })
        .finally(() => {
          done();
        });
    });

    test('request with canclable should have cancel method in promise prototype', () => {
      const res = http.get('https://api.github.com/users/afeiship', { cancelable: true });
      expect(typeof res.cancel).toBe('function');
    });

    test('request with transform should transform single request', (done) => {
      http
        .get('https://api.github.com/users/afeiship', {
          transformRequest: (options) => {
            options.url = options.url + `?ts=${Date.now()}`;
            return options;
          },
          transformResponse: (options) => {
            return { username: options.login };
          }
        })
        .then((res) => {
          expect(res).toEqual({ username: 'afeiship' });
        })
        .finally((e) => {
          done();
        });
    });
  });
})();
