import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Icons } from '../../../../components';

import styles from './no-plugins-stub.module.scss';

interface Props {
  className?: string;
}

const noPluginsStub = BEM(styles);

export const NoPluginsStub = noPluginsStub(({ className }: Props) => (
  <div className={className}>
    <Icon height={164} width={164} />
    <Title>No plugins installed</Title>
    <SubTitle>There are no plugins installed on this agent at the moment.</SubTitle>
  </div>
));

const Icon = noPluginsStub.icon(Icons.Plugins);
const Title = noPluginsStub.title('div');
const SubTitle = noPluginsStub.subTitle('div');
