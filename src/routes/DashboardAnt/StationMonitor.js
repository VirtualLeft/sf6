import React, {PureComponent, Fragment} from 'react';
import {connect} from 'dva';
import {Row, Col, Card, Tooltip, Icon, Tabs} from 'antd';
import numeral from 'numeral';
import {Pie, Gauge, TagCloud, Field, ChartCard, Bar, MiniProgress} from 'components/Charts';
import {WaterWave, Line} from 'components/ECharts';
import NumberInfo from 'components/NumberInfo';
import CountDown from 'components/CountDown';
import ActiveChart from 'components/ActiveChart';
import Trend from 'components/Trend';
import Authorized from '../../utils/Authorized';
import styles from './StationMonitor.less';
import moment from 'moment';

const {Secured} = Authorized;
const {TabPane} = Tabs;

// use permission as a parameter
const havePermissionAsync = new Promise(resolve => {
  // Call resolve on behalf of passed
  setTimeout(() => resolve(), 1000);
});
@Secured(havePermissionAsync)
@connect(({monitor, loading}) => ({
  monitor,
  loading: loading.models.monitor,
}))
export default class StationMonitor extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'monitor/fetchTags',
    });
  }

  wsinit = () => {
    const wsUri = `ws://${window.location.host}/ws/station/`;
  };

  render() {
    const {monitor, loading} = this.props;
    const ColResponsivePropsHead = {
      xs: 24,
      sm: 24,
      md: 24,
      lg: 24,
      xl: 24,
      xxl: 12,
      style: {marginBottom: 24},
    };

    const ColResponsivePropsFoot = {
      xs: 24,
      sm: 24,
      md: 24,
      lg: 24,
      xl: 12,
      xxl: 12,
      style: {marginBottom: 24},
    };

    const ColResponsivePropsWaterWave = {
      xs: 24,
      sm: 24,
      md: 12,
      lg: 12,
      xl: 8,
      xxl: 8,
      style: {marginBottom: 24},
    };
    const t = moment();
    const data = [];
    for(let i = 0; i < 1000; i++) {
      data.push([moment(t).add(i, 's').format(), 100 + Math.random()])
    }
    const testSeries = [{
      name: '模拟数据',
      type: 'line',
      showSymbol: false,
      hoverAnimation: false,
      data: data
    }];

    return (
      <Fragment>
        <Row gutter={24}>
          <Col {...ColResponsivePropsHead}>
            <Card loading={loading} bordered={false} bodyStyle={{padding: 0, minHeight: 628}}
                  style={{marginBottom: 24}}>
              <div className={styles.salesCard}>
                <Tabs size="large" tabBarStyle={{marginBottom: 0}}>
                  <TabPane tab="今日统计" key="day">
                    <div className={styles.salesBar}>
                      <Line height={550} series={testSeries}/>
                    </div>
                  </TabPane>
                  <TabPane tab="本周统计" key="week">
                    <Row>
                      <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                        <div className={styles.salesBar}>
                          <Bar height={200} title="销售额趋势" data={[]}/>
                        </div>
                      </Col>
                      <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                        <div className={styles.salesRank}>
                          <h4 className={styles.rankingTitle}>门店销售额排名</h4>
                          <ul className={styles.rankingList}>
                            <li key={1}>
                              <span className={styles.active}>{1}</span>
                              <span>{"123"}</span>
                              <span>{456}</span>
                            </li>
                          </ul>
                        </div>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tab="本月统计" key="mouth">
                    <Row>
                      <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                        <div className={styles.salesBar}>
                          <Bar height={200} title="销售额趋势" data={[]}/>
                        </div>
                      </Col>
                      <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                        <div className={styles.salesRank}>
                          <h4 className={styles.rankingTitle}>门店销售额排名</h4>
                          <ul className={styles.rankingList}>
                            <li key={1}>
                              <span className={styles.active}>{1}</span>
                              <span>{"123"}</span>
                              <span>{456}</span>
                            </li>
                          </ul>
                        </div>
                      </Col>
                    </Row>
                  </TabPane>
                </Tabs>
              </div>
            </Card>
          </Col>
          <Col {...ColResponsivePropsHead}>
            <Row gutter={24}>
              <Col {...ColResponsivePropsWaterWave}>
                <ChartCard
                  bordered={false}
                  title="一氧化碳"
                  action={
                    <Tooltip title="实时数据">
                      <Icon type="info-circle-o"/>
                    </Tooltip>
                  }
                  // total={() => numeral(10).format('0,0') + " ppm"}
                  footer={<Field label="距离警戒阈值" value={`${numeral(70).format('0,0')} ppm`}/>}
                  contentHeight={208}
                >
                  <Card
                    loading={loading}
                    bordered={false}
                    bodyStyle={{padding: 0, textAlign: 'center', fontSize: 0}}
                  >
                    <WaterWave
                      outline={true}
                      data={10 / 100}
                      height={200}
                      title='CO'
                    />
                  </Card>
                </ChartCard>
              </Col>
              <Col {...ColResponsivePropsWaterWave}>
                <ChartCard
                  bordered={false}
                  title="一氧化碳"
                  action={
                    <Tooltip title="实时数据">
                      <Icon type="info-circle-o"/>
                    </Tooltip>
                  }
                  // total={() => numeral(10).format('0,0') + " ppm"}
                  footer={<Field label="距离警戒阈值" value={`${numeral(70).format('0,0')} ppm`}/>}
                  contentHeight={208}
                >
                  <Card
                    loading={loading}
                    bordered={false}
                    bodyStyle={{padding: 0, textAlign: 'center', fontSize: 0}}
                  >
                    <WaterWave
                      outline={true}
                      data={10 / 100}
                      height={200}
                      title='CO'
                    />
                  </Card>
                </ChartCard>
              </Col>
              <Col {...ColResponsivePropsWaterWave}>
                <ChartCard
                  bordered={false}
                  title="一氧化碳"
                  action={
                    <Tooltip title="实时数据">
                      <Icon type="info-circle-o"/>
                    </Tooltip>
                  }
                  // total={() => numeral(10).format('0,0') + " ppm"}
                  footer={<Field label="距离警戒阈值" value={`${numeral(70).format('0,0')} ppm`}/>}
                  contentHeight={208}
                >
                  <Card
                    loading={loading}
                    bordered={false}
                    bodyStyle={{padding: 0, textAlign: 'center', fontSize: 0}}
                  >
                    <WaterWave
                      outline={true}
                      data={10 / 100}
                      height={200}
                      title='CO'
                    />
                  </Card>
                </ChartCard>
              </Col>
              <Col {...ColResponsivePropsWaterWave}>
                <ChartCard
                  bordered={false}
                  title="一氧化碳"
                  action={
                    <Tooltip title="实时数据">
                      <Icon type="info-circle-o"/>
                    </Tooltip>
                  }
                  // total={() => numeral(10).format('0,0') + " ppm"}
                  footer={<Field label="距离警戒阈值" value={`${numeral(70).format('0,0')} ppm`}/>}
                  contentHeight={208}
                >
                  <Card
                    loading={loading}
                    bordered={false}
                    bodyStyle={{padding: 0, textAlign: 'center', fontSize: 0}}
                  >
                    <WaterWave
                      outline={true}
                      data={10 / 100}
                      height={200}
                      title='CO'
                    />
                  </Card>
                </ChartCard>
              </Col>
              <Col {...ColResponsivePropsWaterWave}>
                <ChartCard
                  bordered={false}
                  title="一氧化碳"
                  action={
                    <Tooltip title="实时数据">
                      <Icon type="info-circle-o"/>
                    </Tooltip>
                  }
                  // total={() => numeral(10).format('0,0') + " ppm"}
                  footer={<Field label="距离警戒阈值" value={`${numeral(70).format('0,0')} ppm`}/>}
                  contentHeight={208}
                >
                  <Card
                    loading={loading}
                    bordered={false}
                    bodyStyle={{padding: 0, textAlign: 'center', fontSize: 0}}
                  >
                    <WaterWave
                      outline={true}
                      data={10 / 100}
                      height={200}
                      title='CO'
                    />
                  </Card>
                </ChartCard>
              </Col>
              <Col  {...ColResponsivePropsWaterWave}>
                <ChartCard
                  bordered={false}
                  title="一氧化碳"
                  action={
                    <Tooltip title="实时数据">
                      <Icon type="info-circle-o"/>
                    </Tooltip>
                  }
                  // total={() => numeral(10).format('0,0') + " ppm"}
                  footer={<Field label="距离警戒阈值" value={`${numeral(70).format('0,0')} ppm`}/>}
                  contentHeight={208}
                >
                  <Card
                    loading={loading}
                    bordered={false}
                    bodyStyle={{padding: 0, textAlign: 'center', fontSize: 0}}
                  >
                    <WaterWave
                      outline={true}
                      data={10 / 100}
                      height={200}
                      title='CO'
                    />
                  </Card>
                </ChartCard>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col {...ColResponsivePropsFoot}>
            <ChartCard
              bordered={false}
              title="温度"
              action={
                <Icon type="info-circle-o"/>
              }
              total="78%"
              footer={
                <Field label="今日最高值" value={numeral(1234).format('0,0')}/>
              }
              contentHeight={46}
            >
              <MiniProgress percent={78} strokeWidth={8} target={80} color="#13C2C2"/>
            </ChartCard>
          </Col>
          <Col {...ColResponsivePropsFoot}>
            <ChartCard
              bordered={false}
              title="湿度"
              action={
                <Icon type="info-circle-o"/>
              }
              total="78%"
              footer={
                <Field label="今日最高值" value={numeral(1234).format('0,0')}/>
              }
              contentHeight={46}
            >
              <MiniProgress percent={78} strokeWidth={8} target={80} color="#13C2C2"/>
            </ChartCard>
          </Col>
        </Row>
      </Fragment>
    );
  }
}
