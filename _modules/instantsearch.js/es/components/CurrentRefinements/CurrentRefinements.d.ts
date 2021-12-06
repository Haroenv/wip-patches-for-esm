/** @jsx h */
import { h } from 'preact';
import type { CurrentRefinementsConnectorParamsItem } from '../../connectors/current-refinements/connectCurrentRefinements.js';
import type { CurrentRefinementsCSSClasses } from '../../widgets/current-refinements/current-refinements.js';
import type { ComponentCSSClasses } from '../../types/index.js';
export declare type CurrentRefinementsComponentCSSClasses = ComponentCSSClasses<CurrentRefinementsCSSClasses>;
export declare type CurrentRefinementsProps = {
    items: CurrentRefinementsConnectorParamsItem[];
    cssClasses: CurrentRefinementsComponentCSSClasses;
};
declare const CurrentRefinements: ({ items, cssClasses }: CurrentRefinementsProps) => h.JSX.Element;
export default CurrentRefinements;
