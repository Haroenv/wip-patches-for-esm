import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["instantSearchInstance", "widgetParams"],
    _excluded2 = ["widgetParams"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { useLayoutEffect, useMemo, useState } from 'react';
import { useIndexContext } from './useIndexContext.js';
import { useInstantSearchContext } from './useInstantSearchContext.js';
import { useStableValue } from './useStableValue.js';
import { createSearchResults } from './utils/createSearchResults.js';
export function useConnector(connector) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var search = useInstantSearchContext();
  var parentIndex = useIndexContext();
  var stableProps = useStableValue(props);
  var widget = useMemo(function () {
    var createWidget = connector(function (connectorState, isFirstRender) {
      // We skip the `init` widget render because:
      // - We rely on `getWidgetRenderState` to compute the initial state before
      //   the InstantSearch.js lifecycle starts.
      // - It prevents UI flashes when updating the widget props.
      if (isFirstRender) {
        return;
      }

      var instantSearchInstance = connectorState.instantSearchInstance,
          widgetParams = connectorState.widgetParams,
          renderState = _objectWithoutProperties(connectorState, _excluded); // eslint-disable-next-line @typescript-eslint/no-use-before-define


      setState(renderState);
    });
    return createWidget(stableProps);
  }, [stableProps, connector]);

  var _useState = useState(function () {
    if (widget.getWidgetRenderState) {
      // The helper exists because we've started InstantSearch.
      var helper = parentIndex.getHelper();
      var results = parentIndex.getResults() || createSearchResults(helper.state);
      var scopedResults = parentIndex.getScopedResults().map(function (scopedResult) {
        var fallbackResults = scopedResult.indexId === parentIndex.getIndexId() ? results : createSearchResults(scopedResult.helper.state);
        return _objectSpread(_objectSpread({}, scopedResult), {}, {
          // We avoid all `results` being `null`.
          results: scopedResult.results || fallbackResults
        });
      }); // We get the widget render state by providing the same parameters as
      // InstantSearch provides to the widget's `render` method.
      // See https://github.com/algolia/instantsearch.js/blob/019cd18d0de6dd320284aa4890541b7fe2198c65/src/widgets/index/index.ts#L604-L617

      // We get the widget render state by providing the same parameters as
      // InstantSearch provides to the widget's `render` method.
      // See https://github.com/algolia/instantsearch.js/blob/019cd18d0de6dd320284aa4890541b7fe2198c65/src/widgets/index/index.ts#L604-L617
      var _widget$getWidgetRend = widget.getWidgetRenderState({
        helper: helper,
        parent: parentIndex,
        instantSearchInstance: search,
        results: results,
        scopedResults: scopedResults,
        state: results._state,
        renderState: search.renderState,
        templatesConfig: search.templatesConfig,
        createURL: parentIndex.createURL,
        searchMetadata: {
          isSearchStalled: search._isSearchStalled
        }
      }),
          widgetParams = _widget$getWidgetRend.widgetParams,
          renderState = _objectWithoutProperties(_widget$getWidgetRend, _excluded2);

      return renderState;
    }

    return {};
  }),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1]; // We use a layout effect to add the widget to the index before the index
  // renders, otherwise it triggers 2 network requests.


  useLayoutEffect(function () {
    parentIndex.addWidgets([widget]);
    return function () {
      parentIndex.removeWidgets([widget]);
    };
  }, [widget, parentIndex]);
  return state;
}