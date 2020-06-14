/*!
 * name: @feizheng/next-fetch
 * description: Abstract for browser or node.
 * homepage: https://github.com/afeiship/next-fetch
 * version: 1.0.0
 * date: 2020-06-14T12:43:45.292Z
 * license: MIT
 */

(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@feizheng/next-js-core2');
  var NxDataTransform = require('@feizheng/next-data-transform');
  var nxContentType = require('@feizheng/next-content-type');
  var nxDeepAssign = require('@feizheng/next-deep-assign');
  var nxParam = require('@feizheng/next-param');
  var nxDelay = require('@feizheng/next-delay');
  var nxStubSingleton = nx.stubSingleton || require('@feizheng/next-stub-singleton');

  var DEFAULT_OPTIONS = {
    dataType: 'json',
    delay: 0,
    fetch: global.fetch,
    responseType: 'json'
  };

  var NxFetch = nx.declare('nx.Fetch', {
    statics: nx.mix(null, nxStubSingleton()),
    methods: {
      init: function (inOptions) {
        this.options = nx.mix(null, DEFAULT_OPTIONS, inOptions);
      },
      request: function (inUrl, inMethod, inData, inOptions) {
        var options = nx.mix(null, this.options, inOptions);
        var isGET = inMethod === 'get';
        var body = isGET ? null : NxDataTransform[options.dataType](inData);
        var url = isGET ? nxParam(inData, inUrl) : inUrl;
        var headers = { 'Content-Type': nxContentType(options.dataType) };
        var config = nxDeepAssign({ method: inMethod, body: body, headers: headers }, options);
        var responseHandler = function (res) {
          return options.responseType ? res[options.responseType]() : res;
        };

        return options.delay
          ? options
            .fetch(url, config)
            .then(nxDelay(options.delay))
            .then(responseHandler)
          : options.fetch(url, config).then(responseHandler);
      },
      'get,post,put,patch,delete,head': function (inMethod) {
        return function (inUrl, inData, inOptions) {
          return this.request(inUrl, inMethod, inData, inOptions);
        };
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxFetch;
  }
})();

//# sourceMappingURL=next-fetch.js.map
