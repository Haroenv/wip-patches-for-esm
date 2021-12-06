import connectConfigure from 'instantsearch.js/es/connectors/configure/connectConfigure.js';
import { useConnector } from './useConnector.js';
export function useConfigure(props) {
  return useConnector(connectConfigure, {
    searchParameters: props
  });
}
