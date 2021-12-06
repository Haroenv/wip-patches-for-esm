import type { PlainSearchParameters } from 'algoliasearch-helper';
import type { ConfigureRelatedItemsConnectorParams, ConfigureRelatedItemsWidgetDescription } from '../../connectors/configure-related-items/connectConfigureRelatedItems.js';
import type { WidgetFactory } from '../../types/index.js';
export declare type ConfigureRelatedItemsWidget = WidgetFactory<ConfigureRelatedItemsWidgetDescription & {
    $$widgetType: 'ais.configureRelatedItems';
}, ConfigureRelatedItemsConnectorParams, ConfigureRelatedItemsWidgetParams>;
export declare type ConfigureRelatedItemsWidgetParams = PlainSearchParameters;
declare const configureRelatedItems: ConfigureRelatedItemsWidget;
export default configureRelatedItems;
