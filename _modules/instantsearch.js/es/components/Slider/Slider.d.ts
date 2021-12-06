/** @jsx h */
import { h, Component } from 'preact';
import type { RangeBoundaries } from '../../connectors/range/connectRange.js';
import type { RangeSliderCssClasses, RangeSliderWidgetParams } from '../../widgets/range-slider/range-slider.js';
import type { ComponentCSSClasses } from '../../types/index.js';
export declare type RangeSliderComponentCSSClasses = ComponentCSSClasses<RangeSliderCssClasses>;
export declare type SliderProps = {
    refine(values: RangeBoundaries): void;
    min?: number;
    max?: number;
    values: RangeBoundaries;
    pips?: boolean;
    step?: number;
    tooltips?: RangeSliderWidgetParams['tooltips'];
    cssClasses: RangeSliderComponentCSSClasses;
};
declare class Slider extends Component<SliderProps> {
    private get isDisabled();
    private handleChange;
    private computeDefaultPitPoints;
    private computeSnapPoints;
    private createHandleComponent;
    render(): h.JSX.Element;
}
export default Slider;
