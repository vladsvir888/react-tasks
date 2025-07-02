import { Component } from 'react';

export default class Results extends Component {
  render(): React.ReactNode {
    return (
      <div className="results pt-2.5">
        <h1 className="text-3xl font-medium">Search results</h1>
        <ul className="flex flex-col gap-y-2 pt-2.5">
          <li className="flex gap-x-4">
            <p className="font-bold">1. Rick Sanchez</p>
            <div>
              <p>Status: Alive</p>
              <p>Species: Human</p>
              <p>Gender: Male</p>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}
