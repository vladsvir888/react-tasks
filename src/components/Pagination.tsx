import { Component, type ReactNode } from 'react';
import type { Info } from '../types';

type Props = Info & {
  fetchData: (name?: string, page?: number) => Promise<void>;
  decrementCounter: () => void;
  incrementCounter: () => void;
  counter: number;
};

export default class Pagination extends Component<Props> {
  handleClickPrev = async (page: number): Promise<void> => {
    await this.props.fetchData(undefined, page);
    this.props.decrementCounter();
  };
  handleClickNext = async (page: number): Promise<void> => {
    await this.props.fetchData(undefined, page);
    this.props.incrementCounter();
  };
  render(): ReactNode {
    let nextPage: number;
    let prevPage: number;

    if (this.props.next) {
      nextPage = +this.props.next.split('?page=')[1];
    }

    if (this.props.prev) {
      prevPage = +this.props.prev.split('?page=')[1];
    }

    return (
      <div className="pagination flex items-center gap-x-2 pt-2">
        {this.props.prev && (
          <button
            className="cursor-pointer transition hover:text-slate-700"
            onClick={() => this.handleClickPrev(prevPage)}
          >
            Prev
          </button>
        )}
        <p>
          {this.props.counter} of {this.props.pages}
        </p>
        {this.props.next && (
          <button
            className="cursor-pointer transition hover:text-slate-700"
            onClick={() => this.handleClickNext(nextPage)}
          >
            Next
          </button>
        )}
      </div>
    );
  }
}
