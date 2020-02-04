import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import styles from './section.module.scss';

interface Props {
  className?: string;
  graph?: React.ReactNode | React.ReactNode[];
  info?: React.ReactNode;
  label?: React.ReactNode;
  additionalInfo?: React.ReactNode;
}

const section = BEM(styles);

export const Section = section(({
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

const Label = section.label('div');
const Info = section.info('div');
const MainInfo = section.mainInfo('div');
const AdditionalInfo = section.additionalInfo('div');
const Graph = section.graph('div');
