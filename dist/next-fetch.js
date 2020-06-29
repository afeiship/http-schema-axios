/*!
 * name: @feizheng/next-fetch
 * description: Abstract for browser or node.
 * homepage: https://github.com/afeiship/next-fetch
 * version: 1.3.6
 * date: 2020-06-29T03:16:12.828Z
 * license: MIT
 */

(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@feizheng/next-js-core2');
  var NxDataTransform = nx.DataTransform || require('@feizheng/next-data-transform');
  var NxAbstractRequest = nx.AbstractRequest || require('@feizheng/next-abstract-request');
  var nxContentType = nx.contentType || require('@feizheng/next-content-type');
  var nxDeepAssign = nx.deepAssign || require('@feizheng/next-deep-assign');
  var nxParam = nx.param || require('@feizheng/next-param');
  var nxToAction = nx.toAction = require('@feizheng/next-to-action');
  var RETURN_VALUE = function (value) { return value; };

  var DEFAULT_OPTIONS = {
    dataType: 'json',
    fetch: global.fetch,
    responseType: 'json'
  };

  var NxFetch = nx.declare('nx.Fetch', {
    extends: NxAbstractRequest,
    methods: {
      defaults: function () {
        return DEFAULT_OPTIONS;
      },
      request: function (inMethod, inUrl, inData, inOptions) {
        var options = nx.mix(null, this.options, inOptions);
        var isGET = inMethod === 'get';
        var body = isGET ? null : NxDataTransform[options.dataType](inData);
        var url = isGET ? nxParam(inData, inUrl) : inUrl;
        var headers = { 'Content-Type': nxContentType(options.dataType) };
        var config = nxDeepAssign({ method: inMethod, body: body, headers: headers }, options);
        var responseHandler = options.responseType ? nxToAction(options.responseType) : RETURN_VALUE;
        return options.fetch(url, config).then(responseHandler);
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxFetch;
  }
})();

//# sourceMappingURL=next-fetch.js.map
