import { Component } from 'react';

type Props = {
  makeError: () => void;
};

export default class ErrorButton extends Component<Props> {
  render(): React.ReactNode {
    return (
      <button
        className="error-button cursor-pointer mt-5 bg-slate-200 hover:bg-slate-300 px-3 py-1 text-black rounded-md transition"
        onClick={this.props.makeError}
      >
        Make an error
      </button>
    );
  }
}
