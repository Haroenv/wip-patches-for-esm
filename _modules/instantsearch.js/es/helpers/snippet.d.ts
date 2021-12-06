import type { Hit } from '../types/index.js';
export declare type SnippetOptions = {
    attribute: string | string[];
    highlightedTagName?: string;
    hit: Partial<Hit>;
    cssClasses?: {
        highlighted?: string;
    };
};
export default function snippet({ attribute, highlightedTagName, hit, cssClasses, }: SnippetOptions): string;
