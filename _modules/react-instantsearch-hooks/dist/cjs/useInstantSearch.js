"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useInstantSearch = useInstantSearch;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _instantsearch = _interopRequireDefault(require("instantsearch.js"));

var _react = require("react");

var _useForceUpdate = require("./useForceUpdate");

var _useStableValue = require("./useStableValue");

var _utils = require("./utils");

var _version = _interopRequireDefault(require("./version"));

var _excluded = ["suppressExperimentalWarning"];

function useInstantSearch(_ref) {
  var _ref$suppressExperime = _ref.suppressExperimentalWarning,
      suppressExperimentalWarning = _ref$suppressExperime === void 0 ? false : _ref$suppressExperime,
      props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var stableProps = (0, _useStableValue.useStableValue)(props);
  var search = (0, _react.useMemo)(function () {
    return (0, _instantsearch.default)(stableProps);
  }, [stableProps]);
  var forceUpdate = (0, _useForceUpdate.useForceUpdate)();
  (0, _react.useEffect)(function () {
    process.env.NODE_ENV !== 'production' ? (0, _utils.warn)(suppressExperimentalWarning, 'This version is experimental and not production-ready.\n\n' + 'Please report any bugs at https://github.com/algolia/react-instantsearch/issues/new?template=Bug_report_Hooks.md&labels=Scope%3A%20Hooks\n\n' + '(To disable this warning, pass `suppressExperimentalWarning` to <InstantSearch />.)') : void 0;
  }, [suppressExperimentalWarning]);
  (0, _react.useEffect)(function () {
    if (typeof stableProps.searchClient.addAlgoliaAgent === 'function') {
      stableProps.searchClient.addAlgoliaAgent("react (".concat(_react.version, ")"));
      stableProps.searchClient.addAlgoliaAgent("react-instantsearch (".concat(_version.default, ")"));
      stableProps.searchClient.addAlgoliaAgent("react-instantsearch-hooks (".concat(_version.default, ")"));
    }
  }, [stableProps.searchClient]);
  (0, _react.useEffect)(function () {
    search.start();
    forceUpdate();
    return function () {
      search.dispose();
      forceUpdate();
    };
  }, [search, forceUpdate]);
  return search;
}