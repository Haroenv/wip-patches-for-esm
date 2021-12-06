import connectRefinementList from 'instantsearch.js/es/connectors/refinement-list/connectRefinementList.js';
import { useConnector } from './useConnector.js';
export function useRefinementList(props) {
  return useConnector(connectRefinementList, props);
}
