/*!
 * name: @feizheng/next-fetch
 * description: Abstract for browser or node.
 * homepage: https://github.com/afeiship/next-fetch
 * version: 1.1.0
 * date: 2020-06-14T13:24:28.139Z
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
  var NxAbstractRequest = nx.AbstractRequest || require('@feizheng/next-abstract-request');

  var DEFAULT_OPTIONS = {
    dataType: 'json',
    delay: 0,
    fetch: global.fetch,
    responseType: 'json'
  };

  var NxFetch = nx.declare('nx.Fetch', {
    extends: NxAbstractRequest,
    methods: {
      defaults: function () {
        return DEFAULT_OPTIONS;
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
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxFetch;
  }
})();

//# sourceMappingURL=next-fetch.js.map
