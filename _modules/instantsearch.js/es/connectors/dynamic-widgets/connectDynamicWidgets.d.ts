import type { SearchResults } from 'algoliasearch-helper';
import type { Connector, Widget } from '../../types/index.js';
export declare type DynamicWidgetsRenderState = {
    attributesToRender: string[];
};
export declare type DynamicWidgetsConnectorParams = {
    /**
     * An array of widgets, displayed in the order defined by `facetOrdering`.
     */
    widgets: Widget[];
    /**
     * Function to return a fallback widget when an attribute isn't found in
     * `widgets`.
     */
    fallbackWidget?(args: {
        /** The attribute name to create a widget for. */
        attribute: string;
    }): Widget;
    /**
     * Function to transform the items to render.
     * The function also exposes the full search response.
     */
    transformItems?(items: string[], metadata: {
        results: SearchResults;
    }): string[];
};
export declare type DynamicWidgetsWidgetDescription = {
    $$type: 'ais.dynamicWidgets';
    renderState: DynamicWidgetsRenderState;
    indexRenderState: {
        dynamicWidgets: DynamicWidgetsRenderState;
    };
};
export declare type DynamicWidgetsConnector = Connector<DynamicWidgetsWidgetDescription, DynamicWidgetsConnectorParams>;
declare const connectDynamicWidgets: DynamicWidgetsConnector;
export default connectDynamicWidgets;