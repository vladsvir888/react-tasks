import { Component, type ReactNode } from 'react';
import type { CharacterSummary } from '../types';

type Props = CharacterSummary;

export default class ResultsItem extends Component<Props> {
  render(): ReactNode {
    return (
      <div className="results-item flex flex-wrap gap-x-4 gap-y-1">
        {this.props.name && <p className="font-bold">{this.props.name}</p>}
        {this.props.description && <p>{this.props.description}</p>}
      </div>
    );
  }
}
