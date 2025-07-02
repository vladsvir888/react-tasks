import { Component } from 'react';

export default class SearchButton extends Component {
  render(): React.ReactNode {
    return (
      <button
        className="search-button cursor-pointer bg-black hover:bg-slate-200 px-3 py-1 text-white hover:text-black rounded-md transition"
        type="submit"
      >
        Submit
      </button>
    );
  }
}
