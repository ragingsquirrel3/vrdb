import React, { Component } from 'react';
import { render } from 'react-dom';

class AFrameScene extends Component {
  render() {
    return <a-entity dangerouslySetInnerHTML={{ __html: this.props.html }} />;
  }
}

export default function writeSceneToDOM (_html) {
  render(<AFrameScene html={_html} />, document.getElementById('dynamicTarget'));
}
