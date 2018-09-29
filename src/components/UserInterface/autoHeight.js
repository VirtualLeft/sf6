/* eslint eqeqeq: 0 */
import React from 'react';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';

function computeHeight(node) {
  const totalHeight = parseInt(getComputedStyle(node).height, 10);
  const padding =
    parseInt(getComputedStyle(node).paddingTop, 10) +
    parseInt(getComputedStyle(node).paddingBottom, 10);
  return totalHeight - padding;
}

function getAutoHeight(n) {
  if (!n) {
    return 0;
  }

  let node = n;

  let height = computeHeight(node);

  while (!height) {
    node = node.parentNode;
    if (node) {
      height = computeHeight(node);
    } else {
      break;
    }
  }

  return height;
}

const autoHeight = (followParent=false) => WrappedComponent => {
  return class extends React.Component {
    state = {
      computedHeight: 0,
    };

    @Bind()
    // @Debounce(400)
    resize() {
      const { height } = this.props;
      if (!height) {
        const h = getAutoHeight(this.root.parentNode);
        // eslint-disable-next-line
        this.setState({ computedHeight: h });
      }
    }

    componentDidMount() {
      const { height } = this.props;
      if (!height) {
        const h = getAutoHeight(this.root);
        // eslint-disable-next-line
        this.setState({ computedHeight: h });
      }
      if (followParent)
        window.addEventListener('resize', this.resize);
    }

    componentWillUnmount() {
      if (followParent)
        window.removeEventListener('resize', this.resize);
    }

    handleRoot = node => {
      this.root = node;
    };

    handleNode = node => {
      this.node = node;
    };

    render() {
      const { height } = this.props;
      const { computedHeight } = this.state;
      const h = height || computedHeight;
      return (
        <div ref={this.handleRoot}>{h > 0 && <WrappedComponent {...this.props} autoHeight={h} ref={this.handleNode}/>}</div>
      );
    }
  };
};

export default autoHeight;
