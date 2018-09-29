import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, List, Avatar } from 'antd';
import { Pie, Gauge, TagCloud } from 'components/Charts';
import { EChart, WaterWave } from 'components/ECharts';
import { LineBox, autoHeight } from 'components/UserInterface';
import Trend from 'components/Trend';
import numeral from 'numeral';
import moment from 'moment';
import Authorized from '../../utils/Authorized';
import styles from './index.less';
import { chart1, chart2, l1_liquidfill, l2_pie } from './echartConfig'

const { Secured } = Authorized;

const targetTime = new Date().getTime() + 3900000;

// use permission as a parameter
const havePermissionAsync = new Promise(resolve => {
  // Call resolve on behalf of passed
  setTimeout(() => resolve(), 1000);
});

@Secured(havePermissionAsync)
@connect(({}) => ({
  // monitor,
  // station,
  // loading: loading.models.station,
}))
export default class Dashboard extends PureComponent {

  render_l1_card = (name) => (
    <LineBox style={{ height: 100 }}>
      <EChart option={l1_liquidfill(name)} style={{ width: 100, float: 'left' }}/>
      <div className={styles.l1_content}>
        <div className={styles.l1_data}>{numeral(1200.134).format('0,0')}</div>
        <div className={styles.l1_side}>
          <Trend flag='up' style={{ marginRight: 8 }}>
            <span className={styles.l1_trend}>周同比 16.3%</span>
          </Trend>
          <Trend flag='down'>
            <span className={styles.l1_trend}>日环比 17.3%</span>
          </Trend>
          <span className={styles.l1_trend}>单位：ppm</span>
        </div>
      </div>
    </LineBox>
  );

  render() {
    const ColResponsivePropsL1 = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 8,
      xxl: 8,
      style: { marginBottom: 24 },
    };

    const list = [{
      id: 1,
      content: '今日SO2浓度走势',
      type: 'common',
      time: '1980-12-07 12:33'
    }, {
      id: 2,
      content: 'test2',
      type: 'alarm',
      time: '1980-12-07 12:33'
    }, {
      id: 3,
      content: 'test2',
      type: 'common',
      time: '1980-12-07 12:33'
    }, {
      id: 4,
      content: 'test2',
      type: 'common',
      time: '1980-12-07 12:33'
    }, {
      id: 5,
      content: 'test2',
      type: 'common',
      time: '1980-12-07 12:33'
    }, {
      id: 6,
      content: 'test2',
      type: 'common',
      time: '1980-12-07 12:33'
    }, {
      id: 7,
      content: 'test2',
      type: 'common',
      time: '1980-12-07 12:33'
    }

    ];

    const ListContent = ({ data: { logo, content, time } }) => (
      <Fragment>
        <Avatar src={logo} shape='square' size={48} style={{ marginRight: 8 }}/>
        <div className={styles.l2_list_item_content}>
          <div>{content}</div>
          <div>{time}</div>
        </div>
      </Fragment>
    );

    return (
      <div className={styles.main} style={{ height: 1024, width: 1024 }}>
      {/*<div className={styles.main} style={{ height: '100%', width: '100%' }}>*/}
        <div className={styles.header}>
          <div className={styles.bg_header}>
            <div className={styles.t_title}>
              SF6气体监测系统
            </div>
          </div>
        </div>
        <Row gutter={24} style={{ marginBottom: 36 }}>
          <Col {...ColResponsivePropsL1}>
            {this.render_l1_card('SO2')}
          </Col>
          <Col {...ColResponsivePropsL1}>
            {this.render_l1_card('HF')}
          </Col>
          <Col {...ColResponsivePropsL1}>
            {this.render_l1_card('H2S')}
          </Col>
          <Col {...ColResponsivePropsL1}>
            {this.render_l1_card('CO')}
          </Col>
          <Col {...ColResponsivePropsL1}>
            {this.render_l1_card('微水')}
          </Col>
          <Col {...ColResponsivePropsL1}>
            {this.render_l1_card('粉尘')}
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={6}>
            <LineBox style={{ height: 600 }} title='最近上报事件'>
              <List
                style={{ marginTop: 24 }}
                size='large'
                rowKey='id'
                loading={false}
                dataSource={list}
                renderItem={(item, i) => (
                  <div className={styles.l2_list_item}>
                    <List.Item className={styles[`l2_list_item_${item.type}`]}>
                      <ListContent data={item}/>
                    </List.Item>
                  </div>
                )}
              />
            </LineBox>
          </Col>
          <Col span={18}>
            <Row gutter={24} style={{ marginBottom: 36 }}>
              <Col span={12}>
                <LineBox style={{ height: 200 }} title={'气体环境态势'}>
                  <EChart option={l2_pie}/>
                </LineBox>
              </Col>
              <Col span={12}>
                <LineBox style={{ height: 200 }} title={'温湿度监控'}>
                  <EChart option={chart2}/>
                </LineBox>
              </Col>
            </Row>
            <LineBox style={{ height: 364 }} title={'今日SO2浓度走势'}>
              <EChart option={chart1}/>
            </LineBox>
          </Col>
        </Row>
      </div>
    )
  }
}
