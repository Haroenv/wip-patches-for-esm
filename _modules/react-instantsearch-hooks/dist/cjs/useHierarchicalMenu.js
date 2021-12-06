"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useHierarchicalMenu = useHierarchicalMenu;

var _connectHierarchicalMenu = _interopRequireDefault(require("instantsearch.js/es/connectors/hierarchical-menu/connectHierarchicalMenu"));

var _useConnector = require("./useConnector");

function useHierarchicalMenu(props) {
  return (0, _useConnector.useConnector)(_connectHierarchicalMenu.default, props);
}