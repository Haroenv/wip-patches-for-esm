/** @jsx h */
import { Component, h } from 'preact';
import type { PaginationCSSClasses, PaginationTemplates } from '../../widgets/pagination/pagination.js';
import type { ComponentCSSClasses } from '../../types/index.js';
export declare type PaginationComponentCSSClasses = ComponentCSSClasses<PaginationCSSClasses>;
export declare type PaginationComponentTemplates = Required<PaginationTemplates>;
export declare type PaginationProps = {
    createURL(value: number): string;
    cssClasses: PaginationComponentCSSClasses;
    currentPage: number;
    templates: PaginationComponentTemplates;
    nbPages?: number;
    pages?: number[];
    isFirstPage: boolean;
    isLastPage: boolean;
    setCurrentPage(value: number): void;
    showFirst?: boolean;
    showLast?: boolean;
    showPrevious?: boolean;
    showNext?: boolean;
};
declare class Pagination extends Component<PaginationProps> {
    static defaultProps: {
        currentPage: number;
        nbPages: number;
        pages: never[];
    };
    private pageLink;
    handleClick: (pageNumber: number, event: MouseEvent) => void;
    private previousPageLink;
    private nextPageLink;
    private firstPageLink;
    private lastPageLink;
    private pages;
    render(): h.JSX.Element;
}
export default Pagination;
