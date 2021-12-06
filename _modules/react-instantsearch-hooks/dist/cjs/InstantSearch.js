"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstantSearch = InstantSearch;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _IndexContext = require("./IndexContext");

var _InstantSearchContext = require("./InstantSearchContext");

var _useInstantSearch = require("./useInstantSearch");

var _excluded = ["children"];

function InstantSearch(_ref) {
  var children = _ref.children,
      props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var search = (0, _useInstantSearch.useInstantSearch)(props);

  if (!search.started) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(_InstantSearchContext.InstantSearchContext.Provider, {
    value: search
  }, /*#__PURE__*/_react.default.createElement(_IndexContext.IndexContext.Provider, {
    value: search.mainIndex
  }, children));
}