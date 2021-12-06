import connectHits from 'instantsearch.js/es/connectors/hits/connectHits.js';
import { useConnector } from './useConnector.js';
export function useHits(props) {
  return useConnector(connectHits, props);
}
