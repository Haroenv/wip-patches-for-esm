function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import connectDynamicWidgets from '../../connectors/dynamic-widgets/connectDynamicWidgets.js';
import { component } from '../../lib/suit.js';
import { createDocumentationMessageGenerator, getContainerNode, getWidgetAttribute } from '../../lib/utils/index.js';
var withUsage = createDocumentationMessageGenerator({
  name: 'dynamic-widgets'
});
var suit = component('DynamicWidgets');

function createContainer(rootContainer) {
  var container = document.createElement('div');
  container.className = suit({
    descendantName: 'widget'
  });
  rootContainer.appendChild(container);
  return container;
}

var dynamicWidgets = function dynamicWidgets(widgetParams) {
  var _ref = widgetParams || {},
      containerSelector = _ref.container,
      transformItems = _ref.transformItems,
      widgets = _ref.widgets,
      fallbackWidget = _ref.fallbackWidget;

  if (!containerSelector) {
    throw new Error(withUsage('The `container` option is required.'));
  }

  if (!(widgets && Array.isArray(widgets) && widgets.every(function (widget) {
    return typeof widget === 'function';
  }))) {
    throw new Error(withUsage('The `widgets` option expects an array of callbacks.'));
  }

  var userContainer = getContainerNode(containerSelector);
  var rootContainer = document.createElement('div');
  rootContainer.className = suit();
  var containers = new Map();
  var connectorWidgets = [];
  var makeWidget = connectDynamicWidgets(function (_ref2, isFirstRender) {
    var attributesToRender = _ref2.attributesToRender;

    if (isFirstRender) {
      userContainer.appendChild(rootContainer);
    }

    attributesToRender.forEach(function (attribute) {
      if (!containers.has(attribute)) {
        return;
      }

      var container = containers.get(attribute);
      rootContainer.appendChild(container);
    });
  }, function () {
    userContainer.removeChild(rootContainer);
  });
  var widget = makeWidget({
    transformItems: transformItems,
    widgets: connectorWidgets,
    fallbackWidget: typeof fallbackWidget === 'function' ? function (_ref3) {
      var attribute = _ref3.attribute;
      var container = createContainer(rootContainer);
      containers.set(attribute, container);
      return fallbackWidget({
        attribute: attribute,
        container: container
      });
    } : undefined
  });
  return _objectSpread(_objectSpread({}, widget), {}, {
    init: function init(initOptions) {
      widgets.forEach(function (cb) {
        var container = createContainer(rootContainer);
        var childWidget = cb(container);
        var attribute = getWidgetAttribute(childWidget, initOptions);
        containers.set(attribute, container);
        connectorWidgets.push(childWidget);
      });
      widget.init(initOptions);
    },
    $$widgetType: 'ais.dynamicWidgets'
  });
};

export default dynamicWidgets;