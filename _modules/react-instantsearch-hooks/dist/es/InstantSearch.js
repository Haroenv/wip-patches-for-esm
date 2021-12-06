import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["children"];
import React from 'react';
import { IndexContext } from './IndexContext.js';
import { InstantSearchContext } from './InstantSearchContext.js';
import { useInstantSearch } from './useInstantSearch.js';
export function InstantSearch(_ref) {
  var children = _ref.children,
      props = _objectWithoutProperties(_ref, _excluded);

  var search = useInstantSearch(props);

  if (!search.started) {
    return null;
  }

  return /*#__PURE__*/React.createElement(InstantSearchContext.Provider, {
    value: search
  }, /*#__PURE__*/React.createElement(IndexContext.Provider, {
    value: search.mainIndex
  }, children));
}
