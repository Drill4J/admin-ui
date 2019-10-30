import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import styles from './build-updates.module.scss';
import { Icons } from '../../../../../../components';

interface Props {
  className?: string;
  newBuild?: any;
}

const buildUpdates = BEM(styles);

export const BuildUpdates = buildUpdates(({ className, newBuild: { buildDiff } }: Props) => (
  <div className={className}>
    <Title>Build updates</Title>
    <Content>
      <div>
        <ItemsGroup>
          <IconsWrapper type="modified">
            <Icons.Edit height={16} width={16} />
          </IconsWrapper>
          <MethodsType>MODIFIED</MethodsType>
        </ItemsGroup>
        <MethodsCount>{buildDiff.mod}</MethodsCount>
      </div>
      <div>
        <ItemsGroup>
          <IconsWrapper type="new">
            <Icons.Add height={16} width={16} />
          </IconsWrapper>
          <MethodsType>NEW</MethodsType>
        </ItemsGroup>
        <MethodsCount>{buildDiff.new}</MethodsCount>
      </div>
      <div>
        <ItemsGroup>
          <IconsWrapper type="deleted">
            <Icons.Delete height={16} width={16} />
          </IconsWrapper>
          <MethodsType>DELETED</MethodsType>
        </ItemsGroup>
        <MethodsCount>{buildDiff.del}</MethodsCount>
      </div>
    </Content>
  </div>
));

const Title = buildUpdates.title('div');
const Content = buildUpdates.content('div');
const IconsWrapper = buildUpdates.iconsWrapper('div');
const MethodsType = buildUpdates.methodsType('span');
const MethodsCount = buildUpdates.methodsCount('div');
const ItemsGroup = buildUpdates.itemsGroup('div');
