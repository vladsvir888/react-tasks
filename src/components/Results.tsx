import { Component } from 'react';
import type { Character } from '../types';
import ResultsList from './ResultsList';

type Props = {
  results: Character[];
};

export default class Results extends Component<Props> {
  render(): React.ReactNode {
    const list = this.props.results.map((item) => ({
      id: item.id,
      name: item.name,
      description: `${item.gender}, ${item.species}, ${item.status}`,
    }));

    return (
      <div className="results">
        <h1 className="text-3xl font-medium">Search results</h1>
        <div className="pt-2.5">
          <ResultsList list={list} />
        </div>
      </div>
    );
  }
}
