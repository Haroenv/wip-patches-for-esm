import connectSortBy from 'instantsearch.js/es/connectors/sort-by/connectSortBy.js';
import { useConnector } from './useConnector.js';
export function useSortBy(props) {
  return useConnector(connectSortBy, props);
}
