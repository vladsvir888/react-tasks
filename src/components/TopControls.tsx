import { Component } from 'react';
import SearchInput from './SearchInput';
import SearchButton from './SearchButton';

export default class TopControls extends Component {
  render(): React.ReactNode {
    return (
      <div className="top-controls">
        <form className="flex items-center gap-x-2">
          <SearchInput />
          <SearchButton />
        </form>
      </div>
    );
  }
}
