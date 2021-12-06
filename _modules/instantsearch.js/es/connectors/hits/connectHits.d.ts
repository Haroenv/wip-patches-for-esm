import type { SendEventForHits, BindEventForHits } from '../../lib/utils/index.js';
import type { TransformItems, Connector, Hits, Hit, WidgetRenderState } from '../../types/index.js';
import type { SearchResults } from 'algoliasearch-helper';
export declare type HitsRenderState = {
    /**
     * The matched hits from Algolia API.
     */
    hits: Hits;
    /**
     * The response from the Algolia API.
     */
    results?: SearchResults<Hit>;
    /**
     * Sends an event to the Insights middleware.
     */
    sendEvent: SendEventForHits;
    /**
     * Returns a string for the `data-insights-event` attribute for the Insights middleware
     */
    bindEvent: BindEventForHits;
};
export declare type HitsConnectorParams = {
    /**
     * Whether to escape HTML tags from hits string values.
     *
     * @default true
     */
    escapeHTML?: boolean;
    /**
     * Function to transform the items passed to the templates.
     */
    transformItems?: TransformItems<Hit>;
};
export declare type HitsWidgetDescription = {
    $$type: 'ais.hits';
    renderState: HitsRenderState;
    indexRenderState: {
        hits: WidgetRenderState<HitsRenderState, HitsConnectorParams>;
    };
};
export declare type HitsConnector = Connector<HitsWidgetDescription, HitsConnectorParams>;
declare const connectHits: HitsConnector;
export default connectHits;