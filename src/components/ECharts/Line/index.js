import React, { PureComponent } from 'react';
import autoHeight from '../autoHeight';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/toolbox';
import styles from '../index.less';

@autoHeight()
export default class Line extends PureComponent {
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
    const {series, option} = this.props;
    let real_option = option ? option : {
      xAxis: {
        type: 'time',
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: 'value'
      },
      series: series || []
    };
    this.chart.setOption(real_option)
  };

  render() {
    const { height } = this.props;
    return (
      <div
        className={styles.chart}
        ref={n => (this.root = n)}
        style={{ height }}
      >
        <div ref={n => (this.node = n)} style={{ height }} />
      </div>
    );
  }
}
