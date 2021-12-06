export declare type HitAttributeHighlightResult = {
    value: string;
    matchLevel: 'none' | 'partial' | 'full';
    matchedWords: string[];
    fullyHighlighted?: boolean;
};
export declare type HitHighlightResult = {
    [attribute: string]: HitAttributeHighlightResult | HitAttributeHighlightResult[] | HitHighlightResult[] | HitHighlightResult;
};
export declare type HitAttributeSnippetResult = Pick<HitAttributeHighlightResult, 'value' | 'matchLevel'>;
export declare type HitSnippetResult = {
    [attribute: string]: HitAttributeSnippetResult[] | HitSnippetResult[] | HitAttributeSnippetResult | HitSnippetResult;
};
export declare type GeoLoc = {
    lat: number;
    lng: number;
};
export declare type AlgoliaHit = {
    [attribute: string]: any;
    objectID: string;
    _highlightResult?: HitHighlightResult;
    _snippetResult?: HitSnippetResult;
    _rankingInfo?: {
        promoted: boolean;
        nbTypos: number;
        firstMatchedWord: number;
        proximityDistance?: number;
        geoDistance: number;
        geoPrecision?: number;
        nbExactWords: number;
        words: number;
        filters: number;
        userScore: number;
        matchedGeoLocation?: {
            lat: number;
            lng: number;
            distance: number;
        };
    };
    _distinctSeqID?: number;
    _geoLoc?: GeoLoc;
};
export declare type Hit = {
    __position: number;
    __queryID?: string;
} & AlgoliaHit;
export declare type Hits = Hit[];
export declare type EscapedHits<THit = Hit> = THit[] & {
    __escaped: boolean;
};
export declare type FacetHit = {
    value: string;
    highlighted: string;
    count: number;
    isRefined: boolean;
};
export declare type FacetRefinement = {
    value: string;
    type: 'conjunctive' | 'disjunctive' | 'exclude';
};
export declare type NumericRefinement = {
    value: number[];
    type: 'numeric';
    operator: string;
};
export declare type Refinement = FacetRefinement | NumericRefinement;
