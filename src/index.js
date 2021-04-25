(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var NxDataTransform = nx.DataTransform || require('@jswork/next-data-transform');
  var NxAbstractRequest = nx.AbstractRequest || require('@jswork/next-abstract-request');
  var NxInterceptor = nx.Interceptor || require('@jswork/next-interceptor');
  var nxContentType = nx.contentType || require('@jswork/next-content-type');
  var nxDeepAssign = nx.deepAssign || require('@jswork/next-deep-assign');
  var nxParam = nx.param || require('@jswork/next-param');
  var nxToAction = nx.toAction || require('@jswork/next-to-action');
  var nxCancelableFetch = nx.cancelableFetch || require('@jswork/next-cancelable-fetch');

  var DEFAULT_OPTIONS = {
    dataType: 'json',
    responseType: 'json',
    cancelable: false,
    interceptors: [],
    response: nx.stubValue,
    fetch: global.fetch
  };

  var NxFetch = nx.declare('nx.Fetch', {
    extends: NxAbstractRequest,
    methods: {
      init: function (inOptions) {
        this.base(inOptions);
        this.interceptor = new NxInterceptor({ items: this.options.interceptors });
      },
      defaults: function () {
        return DEFAULT_OPTIONS;
      },
      request: function (inMethod, inUrl, inData, inOptions) {
        var self = this;
        var options = nx.mix(null, this.options, inOptions);
        var httpRequest = options.cancelable ? nxCancelableFetch : options.fetch;
        var isGET = String(inMethod).toLowerCase() === 'get';
        var body = isGET ? null : NxDataTransform[options.dataType](inData);
        var path = isGET ? nxParam(inData, inUrl) : inUrl;
        var headers = { 'Content-Type': nxContentType(options.dataType) };
        var config = nxDeepAssign({ method: inMethod, body: body, headers: headers }, options);
        var responseHandler = options.responseType
          ? nxToAction(options.responseType)
          : nx.stubValue;

        var requestOpts = this.interceptor.compose({ url: path, config }, 'request');

        return new Promise(function (resolve, reject) {
          httpRequest(path, config)
            .then(responseHandler)
            .then(function (response) {
              var params = nx.mix({ data: response }, requestOpts);
              var composeRes = self.interceptor.compose(params, 'response');
              var res = self.options.response(composeRes);
              resolve(res);
            })
            .catch(reject);
        });
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxFetch;
  }
})();
