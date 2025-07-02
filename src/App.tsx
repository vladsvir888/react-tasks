import { Component } from 'react';
import TopControls from './components/TopControls';
import Results from './components/Results';

export default class App extends Component {
  render(): React.ReactNode {
    return (
      <div className="p-2.5">
        <TopControls />
        <Results />
      </div>
    );
  }
}
