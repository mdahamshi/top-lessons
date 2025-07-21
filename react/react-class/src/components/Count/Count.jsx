import './Count.css';
import { Component } from 'react';

export class Count extends Component {
  constructor(props) {
    super(props);
  }

  render() {
  return (
    <div className="count">
      {this.props.children}
    </div>
  );
  }
}