import React, {PureComponent, Fragment} from 'react';
import {connect} from 'dva';
import {Row, Col, Card, Table} from 'antd';
import numeral from 'numeral';
import {Pie, WaterWave, Gauge, TagCloud} from 'components/Charts';
import {Map} from 'components/ECharts';
import NumberInfo from 'components/NumberInfo';
import CountDown from 'components/CountDown';
import ActiveChart from 'components/ActiveChart';
import Authorized from '../../utils/Authorized';
import styles from './Monitor.less';
import { routerRedux } from 'dva/router';

const {Secured} = Authorized;

const targetTime = new Date().getTime() + 3900000;

// use permission as a parameter
const havePermissionAsync = new Promise(resolve => {
  // Call resolve on behalf of passed
  setTimeout(() => resolve(), 1000);
});
@Secured(havePermissionAsync)
@connect(({monitor, station, loading}) => ({
  monitor,
  station,
  loading: loading.models.station,
}))
export default class Monitor extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'station/get',
    });
  }

  onMapClick = (params, chart) => {
    const {componentType, componentSubType} = params;
    if(componentType == "series" && (componentSubType == "scatter" || componentSubType == "effectScatter"))
      this.props.dispatch(routerRedux.push(`/dashboard/monitor/${params.value[2]}`));
  };

  render() {
    const {station: {station}, loading} = this.props;
    const columns = [
      {
        title: '序号',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '站点名称',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => <a href={`#/dashboard/monitor/${record.id}`}>{text}</a>,
      },
    ];

    let convertData = (data) => {
      let res = [];
      for (let i = 0; i < data.length; i++) {
        res.push({
          name: data[i].name,
          value: [data[i].longitude, data[i].latitude, data[i].id]
        });
      }
      return res;
    };

    const station_scatter = {
      type: 'effectScatter',
      coordinateSystem: 'geo',
      data: convertData(station),
      symbolSize: 20,
      showEffectOn: 'render',
      rippleEffect: {
        brushType: 'stroke'
      },
      hoverAnimation: true,
      label: {
        normal: {
          formatter: '{b}',
          position: 'right',
          show: true,
          backgroundColor: '#00467F'
        }
      },
      itemStyle: {
        normal: {
          color: 'yellow',
          shadowBlur: 10,
          shadowColor: 'yellow'
        }
      },
      zlevel: 1
    };

    return (
      <Fragment>
        <Card loading={loading} title="全国站点分布图" bordered={false} bodyStyle={{padding: 0, paddingRight: 24}}>
          <Row gutter={24}>
            <Col xl={18} lg={24} md={24} sm={24} xs={24} style={{marginBottom: 24}}>
              <div className={styles.mapChart}>
                <Map series={station_scatter} onclick={this.onMapClick} effect={true}/>
              </div>
            </Col>
            <Col xl={6} lg={24} md={24} sm={24} xs={24}>
              <div className={styles.table}>
                <Table
                  rowKey={record => record.id}
                  size="small"
                  columns={columns}
                  dataSource={station}
                  pagination={{
                    style: {marginBottom: 0},
                    pageSize: 30,
                  }}
                />
              </div>
            </Col>
          </Row>

        </Card>

      </Fragment>
    );
  }
}
