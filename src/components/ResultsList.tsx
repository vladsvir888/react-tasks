import { Component, type ReactNode } from 'react';
import type { CharacterSummary } from '../types';
import ResultsItem from './ResultsItem';

type Props = {
  list: CharacterSummary[];
};

export default class ResultsList extends Component<Props> {
  render(): ReactNode {
    return (
      <ul className="flex flex-col gap-y-2">
        {this.props.list.map((item) => (
          <li key={item.id}>
            <ResultsItem {...item} />
          </li>
        ))}
      </ul>
    );
  }
}
