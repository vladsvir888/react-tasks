import { Component } from 'react';
import TopControls from './components/TopControls';
import Results from './components/Results';
import type { Character, Info } from './types';
import Skeleton from './components/Skeleton';
import { cacheKey, cacheUtil } from './utils/local-storage';
import Pagination from './components/Pagination';
import ErrorButton from './components/ErrorButton';

type State = {
  results?: Character[];
  loading: boolean;
  error?: string;
  info?: Info;
  counter: number;
  hasError: boolean;
};

export default class App extends Component {
  state: State = {
    results: undefined,
    loading: false,
    error: undefined,
    info: undefined,
    counter: 1,
    hasError: false,
  };
  componentDidMount(): void {
    const name = cacheUtil.get(cacheKey.reactClassComponentsSearchTerm);
    this.fetchData(name);
  }
  incrementCounter = (): void => {
    this.setState({
      counter: this.state.counter + 1,
    });
  };
  decrementCounter = (): void => {
    this.setState({
      counter: this.state.counter - 1,
    });
  };
  fetchData = async (name?: string, page?: number): Promise<void> => {
    try {
      this.setState({
        results: undefined,
        loading: true,
        error: undefined,
        info: undefined,
      });

      const queryName = `${name ? `?name=${name}` : ''}`;
      const queryPage = `${page ? `?page=${page}` : ''}`;
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/character/${queryName}${queryPage}`
      );
      const data = await response.json();

      if (data.results) {
        this.setState({
          results: data.results,
          info: data.info,
        });
      } else {
        this.setState({
          error: data.error || 'Oops, something went wrong.',
        });
      }
    } catch (err) {
      console.log(err);
      if (err instanceof Error) {
        this.setState({
          error: err.message,
        });
      }
    } finally {
      this.setState({
        loading: false,
      });
    }
  };
  makeError = (): void => {
    this.setState({
      hasError: true,
    });
  };
  render(): React.ReactNode {
    if (this.state.hasError) {
      throw new Error('Error for catching in ErrorBoundary');
    }

    const isEmptySearch = !cacheUtil.get(
      cacheKey.reactClassComponentsSearchTerm
    );

    return (
      <div className="p-2.5">
        <TopControls fetchData={this.fetchData} />
        <section className="pt-2.5">
          {this.state.loading && <Skeleton />}
          {this.state.results && <Results results={this.state.results} />}
          {this.state.error && <p>{this.state.error}</p>}
        </section>
        {isEmptySearch && this.state.info && (
          <Pagination
            fetchData={this.fetchData}
            counter={this.state.counter}
            incrementCounter={this.incrementCounter}
            decrementCounter={this.decrementCounter}
            {...this.state.info}
          />
        )}
        <ErrorButton makeError={this.makeError} />
      </div>
    );
  }
}
