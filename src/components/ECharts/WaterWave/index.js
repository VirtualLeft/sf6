import React, { PureComponent } from 'react';
import autoHeight from '../autoHeight';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import styles from './index.less';
import echarts from 'echarts/lib/echarts';
import 'echarts-liquidfill'

@autoHeight()
export default class WaterWave extends PureComponent {
  state = {
    radio: 1,
  };

  componentDidMount() {
    this.renderChart();
    this.resize();

    window.addEventListener('resize', this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  @Bind()
  @Debounce(400)
  resize = () => {
    const { height } = this.props;
    const { offsetWidth } = this.root.parentNode;
    this.setState({
      radio: offsetWidth < height ? offsetWidth / height : 1,
    });
    this.chart.resize();
  };

  renderChart = () => {
    this.chart = echarts.init(this.node);
    const {color, data, title, shape, outline, radius} = this.props;
    let option = {
      series: [{
        center: ['50%', '50%'],
        radius: radius || '85%',
        type: 'liquidFill',
        data: [{
          value: data,
          direction: 'left',
          itemStyle: {
            color: color || '#294D99',
          }
        }],
        itemStyle: {
          shadowBlur: 0
        },
        backgroundStyle: {
          color: '#E3F7FF',
        },
        shape: shape || "circle",
        outline: {
          show: !!outline,
          borderDistance: 0,
          itemStyle: {
            borderWidth: 3,
            borderColor: color || '#294D99',
            // shadowBlur: 20,
            // shadowColor: 'rgba(255, 0, 0, 1)'
          }
        },
        label: {
          show: true,
          color: color || '#294D99',
          insideColor: '#fff',
          fontSize: 38,
        // {a} refers to series name, {b} to data name, and {c} to data value.
          formatter: param => title + "\n" + param.value * 100 + 'ppm',
          align: 'center',
          baseline: 'middle',
          position: 'inside'
        },
      }],
    };
    this.chart.setOption(option)
  };

  render() {
    const { radio } = this.state;
    const { width, height } = this.props;
    return (
      <div
        className={styles.waterWave}
        ref={n => (this.root = n)}
        style={{ width: width ? width : "", transform: `scale(${radio})` }}
      >
        <div ref={n => (this.node = n)} style={{ width: width || height, height, overflow: 'hidden' }} />
      </div>
    );
  }
}
