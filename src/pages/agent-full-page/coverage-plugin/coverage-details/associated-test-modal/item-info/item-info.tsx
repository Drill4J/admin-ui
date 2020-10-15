import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { OverflowText } from '@drill4j/ui-kit';

import styles from './item-info.module.scss';

interface Props {
  className?: string;
  children?: React.ReactNode;
  packageName?: string;
  testClassName?: string;
  methodName?: string;
}

const itemInfo = BEM(styles);

export const ItemInfo = itemInfo(({
  className, packageName, testClassName, methodName,
}: Props) => (
  <div className={className}>
    <Content>
      {packageName && (
        <ItemWrapper>
          <Label>Package</Label>
          <Value title={packageName}>{packageName}</Value>
        </ItemWrapper>
      )}
      {testClassName && (
        <ItemWrapper>
          <Label>Class</Label>
          <Value title={testClassName}>{testClassName}</Value>
        </ItemWrapper>
      )}
      {methodName && (
        <ItemWrapper>
          <Label>Method</Label>
          <Value title={methodName}>{methodName}</Value>
        </ItemWrapper>
      )}
    </Content>
  </div>
));

const Content = itemInfo.content('div');
const ItemWrapper = itemInfo.itemWrapper('div');
const Label = itemInfo.label('span');
const Value = itemInfo.value(OverflowText);
