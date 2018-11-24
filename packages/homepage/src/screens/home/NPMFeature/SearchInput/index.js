import React from 'react';
import styled from 'styled-components';

import Input from './Input';
import Hit from './Hit';

import algoliaImage from './algolia.svg';
import { searchFacets } from '../../../../utils/algolia';

const Legend = styled.div`
  display: flex;

  justify-content: space-between;

  margin-bottom: 0.5rem;

  color: white;
`;

// eslint-disable-next-line
export default class SearchInput extends React.PureComponent {
  state = {
    hits: [],
  };

  componentDidMount() {
    this.searchQuery('');
  }

  searchQuery = (query: string) => {
    searchFacets({
      facet: 'npm_dependencies.dependency',
      query,
      hitsPerPage: 3,
    }).then(({ facetHits }) => {
      this.setState({
        hits: facetHits,
      });
    });
  };

  render() {
    return (
      <div style={{ width: '100%' }}>
        <Input searchQuery={this.searchQuery} />
        <Legend>
          <div>Dependency</div>
          <div>Sandbox Count</div>
        </Legend>
        {this.state.hits.map((hit, i) => <Hit key={i} hit={hit} />)}
        <a
          href="https://www.algolia.com/?utm_source=algoliaclient&utm_medium=website&utm_content=codesandbox.io&utm_campaign=poweredby"
          target="_blank"
          rel="noreferrer noopener"
        >
          <img
            alt="Algolia"
            style={{ marginTop: '1rem' }}
            width={160}
            src={algoliaImage}
          />
        </a>
      </div>
    );
  }
}
