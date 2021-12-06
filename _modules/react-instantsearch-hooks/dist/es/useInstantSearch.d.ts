import type { InstantSearchOptions } from 'instantsearch.js/es/index.js';
export declare type UseInstantSearchProps = InstantSearchOptions & {
    /**
     * Removes the console warning about the experimental version.
     *
     * Note that this warning is only displayed in development mode.
     *
     * @default false
     */
    suppressExperimentalWarning?: boolean;
};
export declare function useInstantSearch({ suppressExperimentalWarning, ...props }: UseInstantSearchProps): import("instantsearch.js/es/lib/InstantSearch").default<{
    [x: string]: Partial<{
        query: string;
    } & {
        configure: import("algoliasearch-helper").PlainSearchParameters;
    } & {
        geoSearch: {
            boundingBox: string;
        };
    } & {
        hierarchicalMenu: {
            [rootAttribute: string]: string[];
        };
    } & {
        hitsPerPage: number;
    } & {
        page: number;
    } & {
        menu: {
            [attribute: string]: string;
        };
    } & {
        numericMenu: {
            [attribute: string]: string;
        };
    } & {
        page: number;
    } & {
        range: {
            [attribute: string]: string;
        };
    } & {
        ratingMenu: {
            [attribute: string]: number;
        };
    } & {
        refinementList: {
            [attribute: string]: string[];
        };
    } & {
        relevantSort: number;
    } & {
        query: string;
    } & {
        sortBy: string;
    } & {
        toggle: {
            [attribute: string]: boolean;
        };
    } & {
        query: string;
    } & {
        places: {
            query: string;
            position: string;
        };
    }>;
}, import("instantsearch.js").UiState>;
