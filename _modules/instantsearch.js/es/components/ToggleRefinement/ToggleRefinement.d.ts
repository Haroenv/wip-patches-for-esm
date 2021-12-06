/** @jsx h */
import { h } from 'preact';
import type { ToggleRefinementRenderState, ToggleRefinementValue } from '../../connectors/toggle-refinement/connectToggleRefinement.js';
import type { PreparedTemplateProps } from '../../lib/utils/prepareTemplateProps.js';
import type { ComponentCSSClasses } from '../../types/index.js';
import type { ToggleRefinementTemplates, ToggleRefinementCSSClasses } from '../../widgets/toggle-refinement/toggle-refinement.js';
export declare type ToggleRefinementComponentCSSClasses = ComponentCSSClasses<ToggleRefinementCSSClasses>;
export declare type ToggleRefinementComponentTemplates = Required<ToggleRefinementTemplates>;
export declare type ToggleRefinementProps = {
    currentRefinement: ToggleRefinementValue;
    refine: ToggleRefinementRenderState['refine'];
    cssClasses: ToggleRefinementComponentCSSClasses;
    templateProps: PreparedTemplateProps<ToggleRefinementComponentTemplates>;
};
declare const ToggleRefinement: ({ currentRefinement, refine, cssClasses, templateProps, }: ToggleRefinementProps) => h.JSX.Element;
export default ToggleRefinement;
