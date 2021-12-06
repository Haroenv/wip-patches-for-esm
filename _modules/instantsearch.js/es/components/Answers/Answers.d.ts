/** @jsx h */
import { h } from 'preact';
import type { AnswersCSSClasses, AnswersTemplates } from '../../widgets/answers/answers.js';
import type { ComponentCSSClasses, Hits } from '../../types/index.js';
export declare type AnswersComponentCSSClasses = ComponentCSSClasses<AnswersCSSClasses>;
export declare type AnswersComponentTemplates = Required<AnswersTemplates>;
export declare type AnswersProps = {
    hits: Hits;
    isLoading: boolean;
    cssClasses: AnswersComponentCSSClasses;
    templateProps: {
        [key: string]: any;
        templates: AnswersComponentTemplates;
    };
};
declare const Answers: ({ hits, isLoading, cssClasses, templateProps, }: AnswersProps) => h.JSX.Element;
export default Answers;
