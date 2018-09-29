import React, {PureComponent} from 'react';
import autoHeight from '../autoHeight';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
// import echarts from 'echarts/lib/echarts';
// import 'echarts/lib/echarts';
let echarts = require('echarts');
import 'echarts-liquidfill'
import styles from '../index.less';

@autoHeight()
export default class EChart extends PureComponent {
  componentDidMount() {
    this.renderChart();
    this.resize();
    window.addEventListener('resize', this.resize);
  }

  @Bind()
  @Debounce(400)
  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize = () => {
    if (!this.node)
      return;
    this.chart.resize();
  };

  renderChart = () => {
    this.chart = echarts.init(this.node);
    const {option} = this.props;
    if (option) {
      this.chart.setOption(option);
    }
  };

  render() {
    const {height} = this.props;
    return (
      <div
        className={styles.chart}
        ref={n => (this.root = n)}
        style={{height}}
      >
        <div ref={n => (this.node = n)} style={{height, width: '100%'}}/>
      </div>
    );
  }
}
