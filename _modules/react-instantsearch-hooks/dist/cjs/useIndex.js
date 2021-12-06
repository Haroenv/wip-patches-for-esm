"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useIndex = useIndex;

var _index = _interopRequireDefault(require("instantsearch.js/es/widgets/index/index"));

var _react = require("react");

var _useForceUpdate = require("./useForceUpdate");

var _useIndexContext = require("./useIndexContext");

var _useStableValue = require("./useStableValue");

function useIndex(props) {
  var parentIndex = (0, _useIndexContext.useIndexContext)();
  var stableProps = (0, _useStableValue.useStableValue)(props);
  var indexWidget = (0, _react.useMemo)(function () {
    return (0, _index.default)(stableProps);
  }, [stableProps]);
  var helper = indexWidget.getHelper();
  var forceUpdate = (0, _useForceUpdate.useForceUpdate)();
  (0, _react.useEffect)(function () {
    forceUpdate();
  }, [helper, forceUpdate]);
  (0, _react.useEffect)(function () {
    parentIndex.addWidgets([indexWidget]);
    return function () {
      parentIndex.removeWidgets([indexWidget]);
    };
  }, [parentIndex, indexWidget]);
  return indexWidget;
}