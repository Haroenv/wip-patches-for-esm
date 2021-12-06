"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSearchBox = useSearchBox;

var _connectSearchBox = _interopRequireDefault(require("instantsearch.js/es/connectors/search-box/connectSearchBox"));

var _useConnector = require("./useConnector");

function useSearchBox(props) {
  return (0, _useConnector.useConnector)(_connectSearchBox.default, props);
}