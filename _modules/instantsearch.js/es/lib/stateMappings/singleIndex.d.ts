import type { StateMapping, UiState } from '../../types/index.js';
export default function singleIndexStateMapping<TUiState extends UiState = UiState>(indexName: keyof TUiState): StateMapping<TUiState, TUiState[typeof indexName]>;
