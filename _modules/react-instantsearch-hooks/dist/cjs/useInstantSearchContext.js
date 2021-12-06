"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useInstantSearchContext = useInstantSearchContext;

var _react = require("react");

var _InstantSearchContext = require("./InstantSearchContext");

function useInstantSearchContext() {
  var context = (0, _react.useContext)(_InstantSearchContext.InstantSearchContext);

  if (context === null) {
    throw new Error('Hooks must be used inside the <InstantSearch /> component.\n\n' + 'They are not compatible with the `react-instantsearch-core` and `react-instantsearch-dom` packages, so make sure to use the <InstantSearch /> component from `react-instantsearch-hooks`.');
  }

  return context;
}