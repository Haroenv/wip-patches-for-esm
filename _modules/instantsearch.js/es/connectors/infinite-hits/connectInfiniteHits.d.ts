import type { PlainSearchParameters, SearchResults } from 'algoliasearch-helper';
import type { Hits, Connector, TransformItems, Hit, WidgetRenderState } from '../../types/index.js';
import type { SendEventForHits, BindEventForHits } from '../../lib/utils/index.js';
export declare type InfiniteHitsCachedHits = {
    [page: number]: Hits;
};
declare type Read = ({ state, }: {
    state: PlainSearchParameters;
}) => InfiniteHitsCachedHits | null;
declare type Write = ({ state, hits, }: {
    state: PlainSearchParameters;
    hits: InfiniteHitsCachedHits;
}) => void;
export declare type InfiniteHitsCache = {
    read: Read;
    write: Write;
};
export declare type InfiniteHitsConnectorParams = {
    /**
     * Escapes HTML entities from hits string values.
     *
     * @default `true`
     */
    escapeHTML?: boolean;
    /**
     * Enable the button to load previous results.
     *
     * @default `false`
     */
    showPrevious?: boolean;
    /**
     * Receives the items, and is called before displaying them.
     * Useful for mapping over the items to transform, and remove or reorder them.
     */
    transformItems?: TransformItems<Hit>;
    /**
     * Reads and writes hits from/to cache.
     * When user comes back to the search page after leaving for product page,
     * this helps restore InfiniteHits and its scroll position.
     */
    cache?: InfiniteHitsCache;
};
export declare type InfiniteHitsRenderState = {
    /**
     * Loads the previous results.
     */
    showPrevious: () => void;
    /**
     * Loads the next page of hits.
     */
    showMore: () => void;
    /**
     * Indicates whether the first page of hits has been reached.
     */
    isFirstPage: boolean;
    /**
     * Indicates whether the last page of hits has been reached.
     */
    isLastPage: boolean;
    /**
     * Send event to insights middleware
     */
    sendEvent: SendEventForHits;
    /**
     * Returns a string of data-insights-event attribute for insights middleware
     */
    bindEvent: BindEventForHits;
    /**
     * Hits for the current page
     */
    currentPageHits: Hits;
    /**
     * Hits for current and cached pages
     */
    hits: Hits;
    /**
     * The response from the Algolia API.
     */
    results?: SearchResults<Hit>;
};
export declare type InfiniteHitsWidgetDescription = {
    $$type: 'ais.infiniteHits';
    renderState: InfiniteHitsRenderState;
    indexRenderState: {
        infiniteHits: WidgetRenderState<InfiniteHitsRenderState, InfiniteHitsConnectorParams>;
    };
    indexUiState: {
        page: number;
    };
};
export declare type InfiniteHitsConnector = Connector<InfiniteHitsWidgetDescription, InfiniteHitsConnectorParams>;
declare const connectInfiniteHits: InfiniteHitsConnector;
export default connectInfiniteHits;
