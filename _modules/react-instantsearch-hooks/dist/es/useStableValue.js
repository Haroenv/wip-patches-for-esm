import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { dequal } from 'dequal/lite';
import { useEffect, useState } from 'react';
export function useStableValue(value) {
  var _useState = useState(function () {
    return value;
  }),
      _useState2 = _slicedToArray(_useState, 2),
      stableValue = _useState2[0],
      setStableValue = _useState2[1];

  useEffect(function () {
    if (!dequal(stableValue, value)) {
      setStableValue(value);
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [value]);
  return stableValue;
}