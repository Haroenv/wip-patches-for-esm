import algoliasearch from 'algoliasearch/lite';
import { Hit as AlgoliaHit } from '@algolia/client-search';
import { InstantSearch } from 'react-instantsearch-hooks';
import { Highlight } from '../components/Highlight';
import { Hits } from '../components/Hits';
import { SearchBox } from '../components/SearchBox';

const client = algoliasearch('latency', '6be0576ff61c053d5f9a3225e2a90f76');

type HitProps = {
  hit: AlgoliaHit<{
    name: string;
    price: number;
  }>;
};

function Hit({ hit }: HitProps) {
  return (
    <>
      <Highlight hit={hit} attribute="name" className="Hit-label" />
      <span className="Hit-price">${hit.price}</span>
    </>
  );
}

export default function Home() {
  return (
    <InstantSearch searchClient={client} indexName="instant_search">
      <SearchBox />
      <Hits hitComponent={Hit} />
    </InstantSearch>
  );
}
