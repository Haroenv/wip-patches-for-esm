"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isMetadataEnabled = isMetadataEnabled;
exports.createMetadataMiddleware = createMetadataMiddleware;

var _utils = require("../lib/utils");

function extractPayload(widgets, instantSearchInstance, payload) {
  var parent = instantSearchInstance.mainIndex;
  var initOptions = {
    instantSearchInstance: instantSearchInstance,
    parent: parent,
    scopedResults: [],
    state: parent.getHelper().state,
    helper: parent.getHelper(),
    createURL: parent.createURL,
    uiState: instantSearchInstance._initialUiState,
    renderState: instantSearchInstance.renderState,
    templatesConfig: instantSearchInstance.templatesConfig,
    searchMetadata: {
      isSearchStalled: instantSearchInstance._isSearchStalled
    }
  };
  widgets.forEach(function (widget) {
    var widgetParams = {};

    if (widget.getWidgetRenderState) {
      var renderState = widget.getWidgetRenderState(initOptions);

      if (renderState && renderState.widgetParams) {
        // casting, as we just earlier checked widgetParams exists, and thus an object
        widgetParams = renderState.widgetParams;
      }
    } // since we destructure in all widgets, the parameters with defaults are set to "undefined"


    var params = Object.keys(widgetParams).filter(function (key) {
      return widgetParams[key] !== undefined;
    });
    payload.widgets.push({
      type: widget.$$type,
      widgetType: widget.$$widgetType,
      params: params
    });

    if (widget.$$type === 'ais.index') {
      extractPayload(widget.getWidgets(), instantSearchInstance, payload);
    }
  });
}

function isMetadataEnabled() {
  return (0, _utils.safelyRunOnBrowser)(function (_ref) {
    var window = _ref.window;
    return window.navigator.userAgent.indexOf('Algolia Crawler') > -1;
  }, {
    fallback: function fallback() {
      return false;
    }
  });
}
/**
 * Exposes the metadata of mounted widgets in a custom
 * `<meta name="instantsearch:widgets" />` tag. The metadata per widget is:
 * - applied parameters
 * - widget name
 * - connector name
 */


function createMetadataMiddleware() {
  return function (_ref2) {
    var instantSearchInstance = _ref2.instantSearchInstance;
    var payload = {
      widgets: []
    };
    var payloadContainer = document.createElement('meta');
    var refNode = document.querySelector('head');
    payloadContainer.name = 'instantsearch:widgets';
    return {
      onStateChange: function onStateChange() {},
      subscribe: function subscribe() {
        // using setTimeout here to delay extraction until widgets have been added in a tick (e.g. Vue)
        setTimeout(function () {
          var client = instantSearchInstance.client;
          payload.ua = client.transporter && client.transporter.userAgent ? client.transporter.userAgent.value : client._ua;
          extractPayload(instantSearchInstance.mainIndex.getWidgets(), instantSearchInstance, payload);
          payloadContainer.content = JSON.stringify(payload);
          refNode.appendChild(payloadContainer);
        }, 0);
      },
      unsubscribe: function unsubscribe() {
        payloadContainer.remove();
      }
    };
  };
}