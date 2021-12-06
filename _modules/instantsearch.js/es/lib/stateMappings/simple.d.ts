import type { UiState, StateMapping } from '../../types/index.js';
export default function simpleStateMapping<TUiState extends UiState = UiState>(): StateMapping<TUiState, TUiState>;
