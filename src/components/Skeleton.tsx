import { Component } from 'react';

export default class Skeleton extends Component {
  render(): React.ReactNode {
    return (
      <div className="animate-pulse w-[320px]">
        <div className="h-[700px] bg-slate-200 w-full rounded-sm" />
      </div>
    );
  }
}
