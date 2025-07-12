import { Component } from 'react';

type Props = {
  loading: boolean;
};

export default class Skeleton extends Component<Props> {
  render(): React.ReactNode {
    return (
      <>
        {this.props.loading && (
          <div className="skeleton animate-pulse w-[320px]">
            <div className="h-[700px] bg-slate-200 w-full rounded-sm" />
          </div>
        )}
      </>
    );
  }
}
