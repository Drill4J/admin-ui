import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import styles from './dashboard-section.module.scss';

interface Props {
  className?: string;
  graph?: React.ReactNode | React.ReactNode[];
  info?: React.ReactNode;
  label?: React.ReactNode;
  additionalInfo?: React.ReactNode;
}

const dashboardSection = BEM(styles);

export const DashboardSection = dashboardSection(({
  className, graph, info, label, additionalInfo,
}: Props) => (
  <div className={className}>
    <Info>
      <Label>{label}</Label>
      <MainInfo>{info}</MainInfo>
      <AdditionalInfo>{additionalInfo}</AdditionalInfo>
    </Info>
    <Graph>{graph}</Graph>
  </div>
));

const Label = dashboardSection.label('div');
const Info = dashboardSection.info('div');
const MainInfo = dashboardSection.mainInfo('div');
const AdditionalInfo = dashboardSection.additionalInfo('div');
const Graph = dashboardSection.graph('div');
