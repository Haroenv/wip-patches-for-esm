"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useConfigure = useConfigure;

var _connectConfigure = _interopRequireDefault(require("instantsearch.js/es/connectors/configure/connectConfigure"));

var _useConnector = require("./useConnector");

function useConfigure(props) {
  return (0, _useConnector.useConnector)(_connectConfigure.default, {
    searchParameters: props
  });
}