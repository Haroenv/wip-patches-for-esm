import type InstantSearch from '../lib/InstantSearch.js';
import type { UiState } from './ui-state.js';
import type { AtLeastOne } from './utils/index.js';
export declare type MiddlewareDefinition<TUiState extends UiState = UiState> = {
    onStateChange(options: {
        uiState: TUiState;
    }): void;
    subscribe(): void;
    unsubscribe(): void;
};
export declare type MiddlewareOptions = {
    instantSearchInstance: InstantSearch;
};
export declare type InternalMiddleware<TUiState extends UiState = UiState> = (options: MiddlewareOptions) => MiddlewareDefinition<TUiState>;
export declare type Middleware = (options: MiddlewareOptions) => AtLeastOne<MiddlewareDefinition>;
