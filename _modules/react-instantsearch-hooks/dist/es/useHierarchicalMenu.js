import connectHierarchicalMenu from 'instantsearch.js/es/connectors/hierarchical-menu/connectHierarchicalMenu.js';
import { useConnector } from './useConnector.js';
export function useHierarchicalMenu(props) {
  return useConnector(connectHierarchicalMenu, props);
}
