/** @jsx h */
import { h } from 'preact';
import type { SearchResults } from 'algoliasearch-helper';
import type { BindEventForHits, SendEventForHits } from '../../lib/utils/index.js';
import type { ComponentCSSClasses, Hits as HitsArray } from '../../types/index.js';
import type { HitsCSSClasses, HitsTemplates } from '../../widgets/hits/hits.js';
import type { PreparedTemplateProps } from '../../lib/utils/prepareTemplateProps.js';
export declare type HitsComponentCSSClasses = ComponentCSSClasses<HitsCSSClasses>;
export declare type HitsComponentTemplates = Required<HitsTemplates>;
export declare type HitsProps = {
    results: SearchResults;
    hits: HitsArray;
    sendEvent?: SendEventForHits;
    bindEvent?: BindEventForHits;
    cssClasses: HitsComponentCSSClasses;
    templateProps: PreparedTemplateProps<HitsComponentTemplates>;
};
declare const Hits: {
    ({ results, hits, bindEvent, cssClasses, templateProps, }: HitsProps): h.JSX.Element;
    defaultProps: {
        results: {
            hits: never[];
        };
        hits: never[];
    };
};
export default Hits;