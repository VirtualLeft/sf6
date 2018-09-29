import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Button,
  Modal,
  message,
  Badge,
  Divider,
} from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './User.less';

const FormItem = Form.Item;
const TextArea = Input.TextArea;
const confirm = Modal.confirm;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const privilegeMap = ['default', 'processing', 'success', 'error'];
const privilege = ['已禁用', '普通用户', '管理员', '异常用户'];

const UserForm = Form.create()(props => {
  const { modalStatus, form, handleUserAdd, handleUserUpdate, handleModalStatusChange } = props;
  const isAdd = () => modalStatus.user === null;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      if (isAdd())
        handleUserAdd(fieldsValue);
      else
        handleUserUpdate(fieldsValue);
    });
  };
  const title = isAdd() ? '新建用户' : '编辑用户';
  const initValue = isAdd() ? {name: "", privilege: "1", desc: ""} : modalStatus.user;
  return (
    <Modal
      title = {title}
      visible={modalStatus.visible}
      onOk={okHandle}
      onCancel={() => handleModalStatusChange()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="用户名">
        {form.getFieldDecorator('usr_name', {
          initialValue: initValue.name,
          rules: [{ required: true, message: '用户名不能为空！' }],
        })(<Input id="a" placeholder="请输入用户名" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="密码">
        {form.getFieldDecorator('usr_pwd', {
          rules: [
            { required: true, message: '密码不能为空！' },
            { max: 12, message: '密码长度应小于12位'},
            { min: 8, message: '密码长度应大于8位'},
          ],
        })(<Input type="password" placeholder="请输入密码（8-12位）" autoComplete="new-password" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="用户权限">
        {form.getFieldDecorator('usr_priv', {
          initialValue: initValue.privilege,
          rules: [{ required: true, message: 'Please input some description...' }],
        })(
          <Select>
            <Option value='0'>已禁用</Option>
            <Option value='1'>普通用户</Option>
            <Option value='2'>管理员</Option>
          </Select>
        )}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="用户描述">
        {form.getFieldDecorator('desc', {
          initialValue: initValue.desc,
          rules: [],
        })(
          <TextArea />
        )}
      </FormItem>
    </Modal>
  );
});

@connect(({ userm, loading }) => ({
  userm,
  loading: loading.models.userm,
}))
@Form.create()
export default class User extends PureComponent {
  state = {
    modalStatus: {
      visible: false,
      user: null,
    },
    selectedRows: [],
    formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'userm/fetch',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'userm/fetch',
      payload: params,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'userm/fetch',
      payload: {},
    });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'userm/fetch',
        payload: values,
      });
    });
  };

  handleModalStatusChange = (flag, user=null, e=null) => {
    if (e !== null)
      e.preventDefault();
    this.setState({
      modalStatus: {
        visible: !!flag,
        user,
      },
    });
  };

  showDeleteConfirm = (user, e, handleUserDelete) => {
    e.preventDefault();
    confirm({
      title: '是否确认删除该用户?',
      content: user.name,
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        handleUserDelete(user);
      },
    });
  };

  showDisableConfirm = (user, e, handleUserUpdate) => {
    e.preventDefault();
    confirm({
      title: '是否确认禁用该用户?',
      content: user.name,
      okText: '确认',
      cancelText: '取消',
      onOk() {
        handleUserUpdate({id: user.id, privilege: '0'});
      },
    });
  };

  handleUserAdd = fields => {
    this.props.dispatch({
      type: 'userm/add',
      payload: {
        description: fields.desc,
      },
    });

    message.success('用户添加成功');
    this.setState({
      modalStatus: {
        visible: false,
        user: null,
      },
    });
  };

  handleUserUpdate = fields => {
    console.log(fields);
    message.success('用户更新成功');
    this.setState({
      modalStatus: {
        visible: false,
        user: null,
      },
    });
  };

  handleUserDelete = (user) => {
    console.log(user);
    message.success('用户删除成功');
    this.setState({
      modalStatus: {
        visible: false,
        user: null,
      },
    });
  };

  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="姓名">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="用户权限">
              {getFieldDecorator('privilege')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">已禁用</Option>
                  <Option value="1">普通用户</Option>
                  <Option value="2">管理员</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }


  renderForm() {
    return this.renderSimpleForm();
  }

  render() {
    const { userm: { data }, loading } = this.props;
    const { selectedRows, modalStatus} = this.state;
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
      },
      {
        title: '描述',
        dataIndex: 'desc',
        // needTotal: true,
      },
      {
        title: '用户权限',
        dataIndex: 'privilege',
        filters: [
          {
            text: privilege[0],
            value: 0,
          },
          {
            text: privilege[1],
            value: 1,
          },
          {
            text: privilege[2],
            value: 2,
          },
          {
            text: privilege[3],
            value: 3,
          },
        ],
        onFilter: (value, record) => record.privilege.toString() === value,
        render(val) {
          return <Badge status={privilegeMap[val]} text={privilege[val]} />;
        },
      },
      {
        title: '上次登录时间',
        dataIndex: 'lastLogin',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '操作',
        render: (val, record) => (
          <Fragment>
            <a href="" onClick={e => this.handleModalStatusChange(true, record, e)}>修改</a>
            <Divider type="vertical" />
            <a href="" onClick={e => this.showDisableConfirm(record, e, this.handleUserUpdate)}>禁用</a>
            <Divider type="vertical" />
            <a href="" onClick={e => this.showDeleteConfirm(record, e, this.handleUserDelete)}>删除</a>
          </Fragment>
        ),
      },
    ];

    const parentMethods = {
      handleUserAdd: this.handleUserAdd,
      handleModalStatusChange: this.handleModalStatusChange,
      handleUserUpdate: this.handleUserUpdate,
    };

    return (
      <PageHeaderLayout title="用户管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalStatusChange(true)}>
                新建
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  <Button>批量删除</Button>
                </span>
              )}
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <UserForm {...parentMethods} modalStatus={modalStatus} />
      </PageHeaderLayout>
    );
  }
}
