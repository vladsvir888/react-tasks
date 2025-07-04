import { Component } from 'react';
import type { Character } from '../types';

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
        <ul className="flex flex-col gap-y-2 pt-2.5">
          {list.map((item) => (
            <li key={item.id} className="flex gap-x-4">
              <p className="font-bold">{item.name}</p>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
