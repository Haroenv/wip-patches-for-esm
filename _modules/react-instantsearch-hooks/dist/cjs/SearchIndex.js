"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Index = Index;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _IndexContext = require("./IndexContext");

var _useIndex = require("./useIndex");

var _excluded = ["children"];

function Index(_ref) {
  var children = _ref.children,
      props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var index = (0, _useIndex.useIndex)(props);

  if (index.getHelper() === null) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(_IndexContext.IndexContext.Provider, {
    value: index
  }, children);
}