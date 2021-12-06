import type { ConfigureConnectorParams, ConfigureWidgetDescription } from '../../connectors/configure/connectConfigure.js';
import type { Widget } from '../../types/index.js';
/**
 * A list of [search parameters](https://www.algolia.com/doc/api-reference/search-api-parameters/)
 * to enable when the widget mounts.
 */
export declare type ConfigureWidgetParams = ConfigureConnectorParams['searchParameters'];
export declare type ConfigureWidget = (widgetParams: ConfigureWidgetParams) => Widget<ConfigureWidgetDescription & {
    $$widgetType: 'ais.configure';
    widgetParams: ConfigureConnectorParams;
}>;
declare const configure: ConfigureWidget;
export default configure;
