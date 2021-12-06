import connectSearchBox from 'instantsearch.js/es/connectors/search-box/connectSearchBox.js';
import { useConnector } from './useConnector.js';
export function useSearchBox(props) {
  return useConnector(connectSearchBox, props);
}
