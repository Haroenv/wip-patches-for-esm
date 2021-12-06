import { withInsights } from '../../lib/insights.js';
import connectInfiniteHits from './connectInfiniteHits.js';
var connectInfiniteHitsWithInsights = withInsights(connectInfiniteHits);
export default connectInfiniteHitsWithInsights;
