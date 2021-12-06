/** @jsx h */
import { h } from 'preact';
import type { VoiceSearchCSSClasses, VoiceSearchTemplates } from '../../widgets/voice-search/voice-search.js';
import type { VoiceListeningState } from '../../lib/voiceSearchHelper/types/index.js';
import type { ComponentCSSClasses } from '../../types/index.js';
export declare type VoiceSearchComponentCSSClasses = ComponentCSSClasses<VoiceSearchCSSClasses>;
export declare type VoiceSearchComponentTemplates = Required<VoiceSearchTemplates>;
export declare type VoiceSearchProps = {
    cssClasses: VoiceSearchComponentCSSClasses;
    isBrowserSupported: boolean;
    isListening: boolean;
    toggleListening: () => void;
    voiceListeningState: VoiceListeningState;
    templates: VoiceSearchComponentTemplates;
};
declare const VoiceSearch: ({ cssClasses, isBrowserSupported, isListening, toggleListening, voiceListeningState, templates, }: VoiceSearchProps) => h.JSX.Element;
export default VoiceSearch;
