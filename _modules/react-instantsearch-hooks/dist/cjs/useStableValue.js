"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useStableValue = useStableValue;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _lite = require("dequal/lite");

var _react = require("react");

function useStableValue(value) {
  var _useState = (0, _react.useState)(function () {
    return value;
  }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      stableValue = _useState2[0],
      setStableValue = _useState2[1];

  (0, _react.useEffect)(function () {
    if (!(0, _lite.dequal)(stableValue, value)) {
      setStableValue(value);
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [value]);
  return stableValue;
}