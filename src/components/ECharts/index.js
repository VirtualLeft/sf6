import numeral from 'numeral';
import Line from './Line';
import Map from './Map';
import WaterWave from './WaterWave';
import EChart from './EChart';

const yuan = val => `¥ ${numeral(val).format('0,0')}`;

const ECharts = {
  yuan,
  WaterWave,
  Line,
};

export {
  ECharts as default,
  EChart,
  yuan,
  Line,
  Map,
  WaterWave,
};
