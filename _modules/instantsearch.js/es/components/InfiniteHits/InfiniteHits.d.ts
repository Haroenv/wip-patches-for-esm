/** @jsx h */
import { h } from 'preact';
import type { SearchResults } from 'algoliasearch-helper';
import type { ComponentCSSClasses, Hits } from '../../types/index.js';
import type { InfiniteHitsCSSClasses, InfiniteHitsTemplates } from '../../widgets/infinite-hits/infinite-hits.js';
import type { SendEventForHits, BindEventForHits } from '../../lib/utils/index.js';
export declare type InfiniteHitsComponentCSSClasses = ComponentCSSClasses<InfiniteHitsCSSClasses>;
export declare type InfiniteHitsComponentTemplates = Required<InfiniteHitsTemplates>;
export declare type InfiniteHitsProps = {
    cssClasses: InfiniteHitsComponentCSSClasses;
    hits: Hits;
    results: SearchResults;
    hasShowPrevious: boolean;
    showPrevious: () => void;
    showMore: () => void;
    templateProps: {
        [key: string]: any;
        templates: InfiniteHitsComponentTemplates;
    };
    isFirstPage: boolean;
    isLastPage: boolean;
    sendEvent: SendEventForHits;
    bindEvent: BindEventForHits;
};
declare const InfiniteHits: ({ results, hits, bindEvent, hasShowPrevious, showPrevious, showMore, isFirstPage, isLastPage, cssClasses, templateProps, }: InfiniteHitsProps) => h.JSX.Element;
export default InfiniteHits;
