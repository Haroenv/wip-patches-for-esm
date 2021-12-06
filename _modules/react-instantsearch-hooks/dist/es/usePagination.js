import connectPagination from 'instantsearch.js/es/connectors/pagination/connectPagination.js';
import { useConnector } from './useConnector.js';
export function usePagination(props) {
  return useConnector(connectPagination, props);
}
