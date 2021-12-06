import algoliasearchHelper from 'algoliasearch-helper';
export function createSearchResults(state) {
  var _state$query, _state$page, _state$hitsPerPage;

  return new algoliasearchHelper.SearchResults(state, [{
    query: (_state$query = state.query) !== null && _state$query !== void 0 ? _state$query : '',
    page: (_state$page = state.page) !== null && _state$page !== void 0 ? _state$page : 0,
    hitsPerPage: (_state$hitsPerPage = state.hitsPerPage) !== null && _state$hitsPerPage !== void 0 ? _state$hitsPerPage : 20,
    hits: [],
    nbHits: 0,
    nbPages: 0,
    params: '',
    exhaustiveNbHits: true,
    exhaustiveFacetsCount: true,
    processingTimeMS: 0,
    index: state.index
  }]);
}