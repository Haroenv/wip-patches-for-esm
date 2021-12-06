"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRefinementList = useRefinementList;

var _connectRefinementList = _interopRequireDefault(require("instantsearch.js/es/connectors/refinement-list/connectRefinementList"));

var _useConnector = require("./useConnector");

function useRefinementList(props) {
  return (0, _useConnector.useConnector)(_connectRefinementList.default, props);
}