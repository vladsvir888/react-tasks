import { Component, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.log(error.message);
  }

  reset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-2.5">
          <h1 className="font-bold text-red-600">
            Oops, something went wrong.
          </h1>
          <button
            className="cursor-pointer mt-2.5 bg-slate-200 hover:bg-slate-300 px-3 py-1 text-black rounded-md transition"
            onClick={this.reset}
          >
            Reset
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
