import React, {PureComponent} from 'react';
import autoHeight from '../autoHeight';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/map';
import 'echarts/lib/chart/scatter';
import 'echarts/lib/chart/effectScatter';
import 'echarts/lib/component/visualMap';
import 'echarts/lib/component/geo';
import chinaJson from 'assets/china.json';
import styles from '../index.less';

@autoHeight()
export default class Map extends PureComponent {
  componentDidMount() {
    echarts.registerMap('china', chinaJson);
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
    if (!this.node)
      return;
    this.chart.resize();
  };


  renderChart = () => {
    this.chart = echarts.init(this.node);
    const {option, series, onclick} = this.props;
    let mapName = this.props.mapName || 'china';
    let mapFeatures = echarts.getMap(mapName).geoJson.features;
    let geoCoordMap = {};
    let mapColorData = [];
    mapFeatures.forEach(function (v) {
      // 地区名称
      let name = v.properties.name;
      // 地区经纬度
      geoCoordMap[name] = v.properties.cp;
      mapColorData.push({
        name: name,
        value: Math.round(Math.random() * 200 + 10)
      })
    });

    let real_option = option ? option : {
      geo: {
        show: true,
        map: mapName,
        label: {
          normal: {
            show: false
          },
          emphasis: {
            show: false,
          }
        },
        zoom: 1.2,
        // roam: true,
        itemStyle: {
          normal: {
            areaColor: '#031525',
            borderColor: '#097bba',
          },
          emphasis: {
            areaColor: '#2B91B7',
          }
        }
      },
      visualMap: {
        show: false,
        min: 0,
        max: 500,
        left: 'left',
        top: 'bottom',
        text: ['高', '低'],
        calculable: true,
        seriesIndex: [0],
        inRange: {
          // color: ['#3B5077', '#031525'] // 蓝黑
          // color: ['#ffc0cb', '#800080'] // 红紫
          // color: ['#3C3B3F', '#605C3C'] // 黑绿
          //  color: ['#0f0c29', '#302b63', '#24243e'] // 黑紫黑
          // color: ['#23074d', '#cc5333'] // 紫红
          //   color: ['#00467F', '#A5CC82'] // 蓝绿
          // color: ['#1488CC', '#2B32B2'] // 浅蓝
          color: ['#00467F', '#A5CC82', '#ffc0cb'] // 蓝绿红
          // color: ['#00467F', '#A5CC82'] // 蓝绿
          // color: ['#00467F', '#A5CC82'] // 蓝绿
          // color: ['#00467F', '#A5CC82'] // 蓝绿

        }
      },
      series: [
        // scatterSeries,
        {
          type: 'map',
          map: mapName,
          geoIndex: 0,
          aspectScale: 0.75, //长宽比
          showLegendSymbol: false, // 存在legend时显示
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false,
              textStyle: {
                color: '#fff'
              }
            }
          },
          roam: true,
          itemStyle: {
            normal: {
              areaColor: '#031525',
              borderColor: '#3B5077',
            },
            emphasis: {
              areaColor: '#2B91B7'
            }
          },
          animation: false,
          data: mapColorData
        },
      ]
    };
    this.chart.on('click', (params) => onclick(params, this.chart));
    real_option.series.push(series);
    this.chart.setOption(real_option);
  };

  render() {
    const {height} = this.props;
    return (
      <div
        className={styles.chart}
        ref={n => (this.root = n)}
        style={{height}}
      >
        <div ref={n => (this.node = n)} style={{height}}/>
      </div>
    );
  }
}
