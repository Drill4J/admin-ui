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
