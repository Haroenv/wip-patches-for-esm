import type { HighlightedParts } from '../../types/index.js';
export default function reverseHighlightedParts(parts: HighlightedParts[]): {
    isHighlighted: boolean;
    value: string;
}[];
