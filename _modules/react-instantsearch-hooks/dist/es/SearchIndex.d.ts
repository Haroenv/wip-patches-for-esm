import React from 'react';
import type { UseIndexProps } from './useIndex.js';
export declare type IndexProps = UseIndexProps & {
    children?: React.ReactNode;
};
export declare function Index({ children, ...props }: IndexProps): JSX.Element | null;
