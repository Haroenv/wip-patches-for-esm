"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useIndexContext = useIndexContext;

var _react = require("react");

var _IndexContext = require("./IndexContext");

function useIndexContext() {
  var context = (0, _react.useContext)(_IndexContext.IndexContext);

  if (context === null) {
    throw new Error('`useIndexContext` must be used within `IndexContext.Provider`.');
  }

  return context;
}