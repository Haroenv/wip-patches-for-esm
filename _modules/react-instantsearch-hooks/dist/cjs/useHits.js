"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useHits = useHits;

var _connectHits = _interopRequireDefault(require("instantsearch.js/es/connectors/hits/connectHits"));

var _useConnector = require("./useConnector");

function useHits(props) {
  return (0, _useConnector.useConnector)(_connectHits.default, props);
}