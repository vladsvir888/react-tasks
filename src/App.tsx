import { Component } from 'react';
import TopControls from './components/TopControls';
import Results from './components/Results';
import type { Character, Info } from './types';
import Skeleton from './components/Skeleton';
import { cacheKey, cacheUtil } from './utils/local-storage';
import Pagination from './components/Pagination';

type State = {
  results?: Character[];
  loading: boolean;
  error?: string;
  info?: Info;
  counter: number;
};

export default class App extends Component {
  state: State = {
    results: undefined,
    loading: false,
    error: undefined,
    info: undefined,
    counter: 1,
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

      if (data.error) {
        this.setState({
          error: data.error,
        });
      } else {
        this.setState({
          results: data.results,
          info: data.info,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({
        loading: false,
      });
    }
  };
  render(): React.ReactNode {
    const isEmptySearch = !cacheUtil.get(
      cacheKey.reactClassComponentsSearchTerm
    );

    return (
      <div className="p-2.5">
        <TopControls fetchData={this.fetchData} />
        <div className="pt-2.5">
          {this.state.loading && <Skeleton />}
          {this.state.results && <Results results={this.state.results} />}
          {this.state.error && <p>{this.state.error}</p>}
        </div>
        {isEmptySearch && this.state.info && (
          <Pagination
            fetchData={this.fetchData}
            counter={this.state.counter}
            incrementCounter={this.incrementCounter}
            decrementCounter={this.decrementCounter}
            {...this.state.info}
          />
        )}
      </div>
    );
  }
}
