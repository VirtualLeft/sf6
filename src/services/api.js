import {stringify} from 'qs';
import request from '../utils/request';
import _ from 'lodash';


export async function addStation(params) {
  let requestUrl = '/api/station';
  return request(requestUrl, {
    method: 'POST',
    body: {
      ..._.omit(params, ['name', 'longitude', 'latitude']),
    },
  });
}

export async function deleteStation(params) {
  const {id} = params;
  let requestUrl = `/api/station/${id}`;
  return request(requestUrl, {
    method: 'DELETE',
  });
}

export async function updateStation(params) {
  const {id} = params;
  let requestUrl = `/api/station/${id}`;
  return request(requestUrl, {
    method: 'PATCH',
    body: {
      ..._.omit(params, ['name', 'longitude', 'latitude']),
    },
  });
}

export async function getStations(params) {
  let requestUrl = '/api/station';
  if (params) {
    const {id} = params;
    requestUrl = `/api/station/${id}`;
  }
  return request(requestUrl);
}

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}
