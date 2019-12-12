import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Panel } from 'layouts';
import { Icons } from 'components';

import styles from './build-updates.module.scss';

interface Props {
  className?: string;
  buildDiff?: { [methodType: string]: number };
}

const buildUpdates = BEM(styles);

export const BuildUpdates = buildUpdates(({ className, buildDiff = {} }: Props) => (
  <div className={className}>
    <Title>Build updates</Title>
    <Content>
      {Object.keys(buildDiff).map((methodType, index) => (
        <div key={index}>
          <Panel>
            <IconsWrapper type={methodType}>{getMethodsIcon(methodType)}</IconsWrapper>
            <MethodsType>{methodType}</MethodsType>
          </Panel>
          <MethodsCount>{buildDiff[methodType]}</MethodsCount>
        </div>
      ))}
    </Content>
  </div>
));

const Title = buildUpdates.title('div');
const Content = buildUpdates.content('div');
const IconsWrapper = buildUpdates.iconsWrapper('div');
const MethodsType = buildUpdates.methodsType('span');
const MethodsCount = buildUpdates.methodsCount('div');

function getMethodsIcon(methodType?: string) {
  switch (methodType) {
    case 'new':
      return <Icons.Add height={16} width={16} />;
    case 'modified':
      return <Icons.Edit height={15} width={16} viewBox="0 0 15 16" />;
    default:
      return <Icons.Delete height={16} width={16} />;
  }
}
