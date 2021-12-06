import index from 'instantsearch.js/es/widgets/index/index.js';
import { useEffect, useMemo } from 'react';
import { useForceUpdate } from './useForceUpdate.js';
import { useIndexContext } from './useIndexContext.js';
import { useStableValue } from './useStableValue.js';
export function useIndex(props) {
  var parentIndex = useIndexContext();
  var stableProps = useStableValue(props);
  var indexWidget = useMemo(function () {
    return index(stableProps);
  }, [stableProps]);
  var helper = indexWidget.getHelper();
  var forceUpdate = useForceUpdate();
  useEffect(function () {
    forceUpdate();
  }, [helper, forceUpdate]);
  useEffect(function () {
    parentIndex.addWidgets([indexWidget]);
    return function () {
      parentIndex.removeWidgets([indexWidget]);
    };
  }, [parentIndex, indexWidget]);
  return indexWidget;
}