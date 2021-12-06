"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePagination = usePagination;

var _connectPagination = _interopRequireDefault(require("instantsearch.js/es/connectors/pagination/connectPagination"));

var _useConnector = require("./useConnector");

function usePagination(props) {
  return (0, _useConnector.useConnector)(_connectPagination.default, props);
}