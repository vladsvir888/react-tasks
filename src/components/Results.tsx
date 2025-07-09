import { Component } from 'react';
import type { Character } from '../types';
import ResultsItem from './ResultsItem';
import Skeleton from './Skeleton';

type Props = {
  results: Character[];
  loading: boolean;
  error?: string;
};

export default class Results extends Component<Props> {
  render(): React.ReactNode {
    const list = this.props.results.map((item) => ({
      id: item.id,
      name: item.name,
      description: `${item.gender}, ${item.species}, ${item.status}`,
    }));

    return (
      <div className="results pt-2.5">
        <h1 className="text-3xl font-medium">Search results</h1>
        <div className="pt-2.5">
          {this.props.loading && <Skeleton loading={this.props.loading} />}
          {!!list.length && (
            <ul className="flex flex-col gap-y-2">
              {list.map((item) => (
                <li key={item.id}>
                  <ResultsItem {...item} />
                </li>
              ))}
            </ul>
          )}
          {this.props.error && <p>{this.props.error}</p>}
          {!this.props.error && !list.length && <p>no results</p>}
        </div>
      </div>
    );
  }
}
