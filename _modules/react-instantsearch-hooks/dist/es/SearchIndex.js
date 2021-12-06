import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["children"];
import React from 'react';
import { IndexContext } from './IndexContext.js';
import { useIndex } from './useIndex.js';
export function Index(_ref) {
  var children = _ref.children,
      props = _objectWithoutProperties(_ref, _excluded);

  var index = useIndex(props);

  if (index.getHelper() === null) {
    return null;
  }

  return /*#__PURE__*/React.createElement(IndexContext.Provider, {
    value: index
  }, children);
}
