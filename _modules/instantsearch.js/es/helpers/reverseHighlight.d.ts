import type { Hit } from '../types/index.js';
export declare type ReverseHighlightOptions = {
    attribute: string | string[];
    highlightedTagName?: string;
    hit: Partial<Hit>;
    cssClasses?: Partial<{
        highlighted: string;
    }>;
};
export default function reverseHighlight({ attribute, highlightedTagName, hit, cssClasses, }: ReverseHighlightOptions): string;