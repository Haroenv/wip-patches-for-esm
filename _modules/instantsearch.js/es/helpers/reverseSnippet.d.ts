import type { Hit } from '../types/index.js';
export declare type ReverseSnippetOptions = {
    attribute: string | string[];
    highlightedTagName?: string;
    hit: Partial<Hit>;
    cssClasses?: Partial<{
        highlighted: string;
    }>;
};
export default function reverseSnippet({ attribute, highlightedTagName, hit, cssClasses, }: ReverseSnippetOptions): string;
