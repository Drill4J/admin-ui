import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import styles from './build-arrived.module.scss';
import { Icons } from '../../../../../../components';

interface Props {
  className?: string;
  newBuild?: any;
}

const buildArrived = BEM(styles);

export const BuildArrived = buildArrived(({ className, newBuild: { prev } }: Props) => {
  return (
    <div className={className}>
      <Content>
        <Title>New build has arrived!</Title>
        <PrevBuild>
          <Icons.Check />
          Previous build: <PrevBuildVersion>{prev.id}</PrevBuildVersion>
        </PrevBuild>
      </Content>
    </div>
  );
});

const Content = buildArrived.content('div');
const Title = buildArrived.title('div');
const PrevBuild = buildArrived.prevBuild('div');
const PrevBuildVersion = buildArrived.prevBuildVersion('span');
