import { Component } from 'react';
import SearchInput from './SearchInput';
import SearchButton from './SearchButton';

type Props = {
  fetchData: (name?: string) => Promise<void>;
};

type State = {
  query: string;
};

export default class TopControls extends Component<Props, State> {
  state = {
    query: '',
  };
  handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    this.props.fetchData(this.state.query);
  };
  setQuery = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      query: event.target.value.trim(),
    });
  };
  resetQuery = (): void => {
    this.setState({
      query: '',
    });
    this.props.fetchData();
  };
  render(): React.ReactNode {
    return (
      <div className="top-controls">
        <form
          className="flex items-center gap-x-2"
          onSubmit={this.handleSubmit}
        >
          <SearchInput
            query={this.state.query}
            setQuery={this.setQuery}
            resetQuery={this.resetQuery}
          />
          <SearchButton />
        </form>
      </div>
    );
  }
}
