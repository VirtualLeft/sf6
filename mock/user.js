import { parse } from 'url';
import _ from "lodash";
import moment from "moment";

const user = [
  '付小小',
  '曲丽丽',
  '林东东',
  '周星星',
  '吴加好',
  '朱偏右',
  '鱼酱',
  '乐哥',
  '谭小仪',
  '仲尼',
  '哈哈叻',
];

const privilege = [
  '0',  //禁用
  '1',  //普通
  '2',  //管理员
];

const userDataSource = [];

for (let i = 0; i < 46; i += 1) {
  userDataSource.push({
    key: i,
    id: `${i}`,
    name: user[i % 11],
    desc: 'only for test',
    lastLogin: moment(),
    privilege: privilege[i % 3],
  });
}

export function getUsers(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;
  let dataSource = [...userDataSource];

  if (params.name) {
    dataSource = _.filter(dataSource, data => _.indexOf(data.name, params.name) > 0)
  }

  if (params.privilege) {
    dataSource = _.filter(dataSource, data => data.privilege === params.privilege)
  }

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1,
    },
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}
