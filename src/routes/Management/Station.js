import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Button, Icon, List } from 'antd';

import Ellipsis from 'components/Ellipsis';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './Station.less';

@connect(({ station, loading }) => ({
  station,
  loading: loading.models.station,
}))
export default class CardList extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'station/get',
    });
  }

  render() {
    const { station: { station }, loading } = this.props;

    const content = (
      <div className={styles.pageHeaderContent}>
        <p>
          接入系统的全部电站列表。
        </p>
        <div className={styles.contentLink}>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg" />{' '}
            快速开始
          </a>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg" />{' '}
            产品简介
          </a>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg" />{' '}
            产品文档
          </a>
        </div>
      </div>
    );

    const extraContent = (
      <div className={styles.extraImg}>
        <img
          alt="这是一个标题"
          src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png"
        />
      </div>
    );

    return (
      <PageHeaderLayout title="电站列表" content={content} extraContent={extraContent}>
        <div className={styles.cardList}>
          <List
            rowKey="id"
            loading={loading}
            grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
            dataSource={['', ...station]}
            renderItem={item =>
              item ? (
                <List.Item key={item.id}>
                  <Card hoverable className={styles.card} actions={[<a>编辑站点</a>, <a>历史事件</a>]}>
                    <Card.Meta
                      avatar={<img alt="" className={styles.cardAvatar} src={item.avatar} />}
                      title={<a href={`/#/dashboard/monitor/${item.id}`}>{item.name}</a>}
                      description={
                        <Ellipsis className={styles.item} lines={3}>
                          <p>联系人：    {item.contact}</p>
                          <p>联系人电话： {item.contact_phone}</p>
                        </Ellipsis>
                      }
                    />
                  </Card>
                </List.Item>
              ) : (
                <List.Item>
                  <Button type="dashed" className={styles.newButton}>
                    <Icon type="plus" /> 新增电站
                  </Button>
                </List.Item>
              )
            }
          />
        </div>
      </PageHeaderLayout>
    );
  }
}
