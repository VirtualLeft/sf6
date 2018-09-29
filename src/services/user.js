import { stringify } from 'qs';
import request from '../utils/request';

export async function query(params) {
  return request(`/api/users?${stringify(params)}`);
}

export async function queryCurrent() {
  return request('/api/currentUser');
}
