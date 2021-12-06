import React from 'react';
import type { UseInstantSearchProps } from './useInstantSearch.js';
export declare type InstantSearchProps = UseInstantSearchProps & {
    children?: React.ReactNode;
};
export declare function InstantSearch({ children, ...props }: InstantSearchProps): JSX.Element | null;
