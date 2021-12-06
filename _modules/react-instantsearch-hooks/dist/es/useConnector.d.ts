import type { Connector, WidgetDescription } from 'instantsearch.js/es/index.js';
export declare function useConnector<TProps extends Record<string, unknown>, TDescription extends WidgetDescription>(connector: Connector<TDescription, TProps>, props?: TProps): TDescription['renderState'];
