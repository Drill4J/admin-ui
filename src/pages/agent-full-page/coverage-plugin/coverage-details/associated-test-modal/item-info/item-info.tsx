import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import styles from './item-info.module.scss';

interface Props {
  className?: string;
  children?: React.ReactNode;
  packageName?: string;
  testClassName?: string;
  methodName?: string;
}

const itemInfo = BEM(styles);

export const ItemInfo = itemInfo(({ className, packageName, testClassName, methodName }: Props) => (
  <div className={className}>
    <Content>
      {packageName && (
        <ItemWrapper>
          <Label>Package</Label>
          <Value>{packageName}</Value>
        </ItemWrapper>
      )}
      {testClassName && (
        <ItemWrapper>
          <Label>Class</Label>
          <Value>{testClassName}</Value>
        </ItemWrapper>
      )}
      {methodName && (
        <ItemWrapper>
          <Label>Method</Label>
          <Value>{methodName}</Value>
        </ItemWrapper>
      )}
    </Content>
  </div>
));

const Content = itemInfo.content('div');
const ItemWrapper = itemInfo.itemWrapper('div');
const Label = itemInfo.label('div');
const Value = itemInfo.value('div');
