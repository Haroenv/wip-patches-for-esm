import type { AlgoliaHit } from '../../types/index.js';
export declare function addQueryID<THit extends AlgoliaHit>(hits: THit[], queryID?: string): Array<THit & {
    __queryID?: string;
}>;
