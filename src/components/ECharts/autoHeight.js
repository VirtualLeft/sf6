/* autoHeight:
* 若被包裹的组件指定了高度，则以被指定的高度为准
* 若未指定高度，则逐层遍历父组件，取其高度
*/
import React from 'react';

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

const autoHeight = () => WrappedComponent => {
  return class extends React.Component {
    state = {
      computedHeight: 0,
    };

    componentDidMount() {
      const {height} = this.props;
      if (!height) {
        const h = getAutoHeight(this.root);
        // eslint-disable-next-line
        this.setState({computedHeight: h});
      }
    }

    handleRoot = node => {
      this.root = node;
    };

    render() {
      const {height, width, style} = this.props;
      const {computedHeight} = this.state;
      const h = height || computedHeight;
      return (
        <div ref={this.handleRoot} style={{
          ...style,
          width: width || (style && style.width) || '100%',
          height: height || (style && style.height)
        }}>{h > 0 && <WrappedComponent {...this.props} height={h}/>}</div>
      );
    }
  };
};

export default autoHeight;
