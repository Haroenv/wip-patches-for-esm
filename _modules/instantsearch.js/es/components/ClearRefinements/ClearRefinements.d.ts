/** @jsx h */
import { h } from 'preact';
import type { ClearRefinementsRenderState } from '../../connectors/clear-refinements/connectClearRefinements.js';
import type { ClearRefinementsCSSClasses, ClearRefinementsTemplates } from '../../widgets/clear-refinements/clear-refinements.js';
import type { ComponentCSSClasses } from '../../types/index.js';
import type { PreparedTemplateProps } from '../../lib/utils/prepareTemplateProps.js';
export declare type ClearRefinementsComponentCSSClasses = ComponentCSSClasses<ClearRefinementsCSSClasses>;
export declare type ClearRefinementsComponentTemplates = Required<ClearRefinementsTemplates>;
export declare type ClearRefinementsProps = {
    refine: ClearRefinementsRenderState['refine'];
    cssClasses: ClearRefinementsComponentCSSClasses;
    hasRefinements: ClearRefinementsRenderState['hasRefinements'];
    templateProps: PreparedTemplateProps<ClearRefinementsComponentTemplates>;
};
declare const ClearRefinements: ({ hasRefinements, refine, cssClasses, templateProps, }: ClearRefinementsProps) => h.JSX.Element;
export default ClearRefinements;
