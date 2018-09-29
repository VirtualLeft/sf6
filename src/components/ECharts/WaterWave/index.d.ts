import * as React from 'react';
export interface IWaterWaveProps {
  title: React.ReactNode;
  color?: string;
  data: number;
  radius?: string;
  height: number;
  style?: React.CSSProperties;
  shape?: string;
  outline?: boolean;
}

export default class WaterWave extends React.Component<IWaterWaveProps, any> {}
