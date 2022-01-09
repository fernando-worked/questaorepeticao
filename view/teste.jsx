import { Component } from 'react';
import { render as _render } from 'react-dom';

class MyComponent extends Component {
  render() {
    return <div>Hello World</div>;
  }
}

_render(<MyComponent />, node);