import { Component } from 'react';
import TopControls from './components/TopControls';
import Results from './components/Results';
import type { Character } from './types';
import Skeleton from './components/Skeleton';

type State = {
  results: Character[] | null;
  loading: boolean;
  error?: string;
};

export default class App extends Component {
  state: State = {
    results: null,
    loading: false,
    error: undefined,
  };
  componentDidMount(): void {
    this.fetchData();
  }
  fetchData = async (name?: string): Promise<void> => {
    try {
      this.setState({
        results: null,
        loading: true,
        error: null,
      });
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/character/${name ? `?name=${name}` : ''}`
      );
      const data = await response.json();
      if (data.error) {
        this.setState({
          error: data.error,
        });
      } else {
        this.setState({
          results: data.results,
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
    return (
      <div className="p-2.5">
        <TopControls fetchData={this.fetchData} />
        <div className="pt-2.5">
          {this.state.loading && <Skeleton />}
          {this.state.results && <Results results={this.state.results} />}
          {this.state.error && <p>{this.state.error}</p>}
        </div>
      </div>
    );
  }
}
