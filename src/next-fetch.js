(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@feizheng/next-js-core2');
  var NxDataTransform = nx.DataTransform || require('@feizheng/next-data-transform');
  var NxAbstractRequest = nx.AbstractRequest || require('@feizheng/next-abstract-request');
  var nxContentType = nx.contentType || require('@feizheng/next-content-type');
  var nxDeepAssign = nx.deepAssign || require('@feizheng/next-deep-assign');
  var nxParam = nx.param || require('@feizheng/next-param');
  var nxDelay = nx.delay || require('@feizheng/next-delay');

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
