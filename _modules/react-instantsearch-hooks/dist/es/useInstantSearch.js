import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["suppressExperimentalWarning"];
import instantsearch from 'instantsearch.js/es/index.js';
import { useEffect, useMemo, version as ReactVersion } from 'react';
import { useForceUpdate } from './useForceUpdate.js';
import { useStableValue } from './useStableValue.js';
import { warn } from './utils/index.js';
import version from './version.js';
export function useInstantSearch(_ref) {
  var _ref$suppressExperime = _ref.suppressExperimentalWarning,
      suppressExperimentalWarning = _ref$suppressExperime === void 0 ? false : _ref$suppressExperime,
      props = _objectWithoutProperties(_ref, _excluded);

  var stableProps = useStableValue(props);
  var search = useMemo(function () {
    return instantsearch(stableProps);
  }, [stableProps]);
  var forceUpdate = useForceUpdate();
  useEffect(function () {
    process.env.NODE_ENV !== 'production' ? warn(suppressExperimentalWarning, 'This version is experimental and not production-ready.\n\n' + 'Please report any bugs at https://github.com/algolia/react-instantsearch/issues/new?template=Bug_report_Hooks.md&labels=Scope%3A%20Hooks\n\n' + '(To disable this warning, pass `suppressExperimentalWarning` to <InstantSearch />.)') : void 0;
  }, [suppressExperimentalWarning]);
  useEffect(function () {
    if (typeof stableProps.searchClient.addAlgoliaAgent === 'function') {
      stableProps.searchClient.addAlgoliaAgent("react (".concat(ReactVersion, ")"));
      stableProps.searchClient.addAlgoliaAgent("react-instantsearch (".concat(version, ")"));
      stableProps.searchClient.addAlgoliaAgent("react-instantsearch-hooks (".concat(version, ")"));
    }
  }, [stableProps.searchClient]);
  useEffect(function () {
    search.start();
    forceUpdate();
    return function () {
      search.dispose();
      forceUpdate();
    };
  }, [search, forceUpdate]);
  return search;
}
