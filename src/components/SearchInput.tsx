import { Component } from 'react';

export default class SearchInput extends Component {
  render(): React.ReactNode {
    return (
      <div className="search-input relative">
        <input
          name="q"
          type="text"
          placeholder="Search..."
          className="border-slate-300 border rounded-md pl-2 pr-5 py-1"
          required
        />
        <button
          title="Clean query"
          className="cursor-pointer absolute right-1 top-[50%] translate-y-[-50%]"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            width={16}
            height={16}
          >
            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
          </svg>
        </button>
      </div>
    );
  }
}
