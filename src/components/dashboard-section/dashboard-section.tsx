import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { spacesToDashes } from 'utils';

import styles from './dashboard-section.module.scss';

interface Props {
  className?: string;
  graph?: React.ReactNode | React.ReactNode[];
  info?: React.ReactNode;
  label?: string;
  additionalInfo?: React.ReactNode;
}

const dashboardSection = BEM(styles);

export const DashboardSection = dashboardSection(({
  className, graph, info, label = '', additionalInfo,
}: Props) => (
  <div className={className}>
    <Info>
      <Label>{label}</Label>
      <MainInfo data-test={`dashboard:${spacesToDashes(label)}:main-info`}>{info}</MainInfo>
      <AdditionalInfo data-test={`dashboard:${spacesToDashes(label)}:additional-info`}>{additionalInfo}</AdditionalInfo>
    </Info>
    <Graph>{graph}</Graph>
  </div>
));

const Label = dashboardSection.label('div');
const Info = dashboardSection.info('div');
const MainInfo = dashboardSection.mainInfo('div');
const AdditionalInfo = dashboardSection.additionalInfo('div');
const Graph = dashboardSection.graph('div');
