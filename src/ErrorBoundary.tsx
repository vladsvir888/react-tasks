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

  render() {
    if (this.state.hasError) {
      return (
        <h1 className="font-bold text-red-600 p-2.5">
          Oops, something went wrong.
        </h1>
      );
    }

    return this.props.children;
  }
}
