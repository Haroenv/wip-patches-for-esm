import { withInsights } from '../../lib/insights.js';
import connectHits from './connectHits.js';
var connectHitsWithInsights = withInsights(connectHits);
export default connectHitsWithInsights;
