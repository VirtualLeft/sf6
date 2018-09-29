import {addStation, deleteStation, updateStation, getStations} from '../services/api';

export default {
  namespace: 'station',

  state: {
    station: [],
  },

  effects: {
    * get({payload}, {call, put}) {
      const response = yield call(getStations, payload);
      yield put({
        type: 'saveStations',
        payload: Array.isArray(response) ? response : [],
      });
    },
    * add({payload}, {call, put}) {
      const response = yield call(addStation, payload);
    }
  },

  reducers: {
    saveStations(state, action) {
      return {
        ...state,
        station: action.payload,
      };
    },
    appendStation(state, action) {
      return {
        ...state,
        station: state.station.concat(action.payload),
      };
    },
  },
};
