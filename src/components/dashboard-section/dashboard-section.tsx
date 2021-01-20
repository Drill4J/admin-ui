/*
 * Copyright 2020 EPAM Systems
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
