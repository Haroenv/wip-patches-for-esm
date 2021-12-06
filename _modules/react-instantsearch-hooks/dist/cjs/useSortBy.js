"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSortBy = useSortBy;

var _connectSortBy = _interopRequireDefault(require("instantsearch.js/es/connectors/sort-by/connectSortBy"));

var _useConnector = require("./useConnector");

function useSortBy(props) {
  return (0, _useConnector.useConnector)(_connectSortBy.default, props);
}