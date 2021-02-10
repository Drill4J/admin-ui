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
import { useRef, useState } from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import VirtualList from 'react-tiny-virtual-list';
import {
  Inputs, Icons,
} from '@drill4j/ui-kit';

import { useElementSize } from 'hooks';
import { MethodCoveredByTest } from 'types/method-covered-by-test';
import { CoverageRateIcon } from 'components';
import 'twin.macro';

import styles from './methods-list.module.scss';

interface Props {
  className?: string;
  methods: { coveredMethods: MethodCoveredByTest, covered: number };
}

const methodsList = BEM(styles);

export const MethodsList = methodsList(({ className, methods: { coveredMethods, covered } }: Props) => {
  const {
    newMethods = [], modifiedMethods = [], unaffectedMethods = [], allMethods = [],
  } = coveredMethods;
  const [selectedSection, setSelectedSection] = useState('all');
  const node = useRef<HTMLDivElement>(null);
  const { height: methodsListHeight } = useElementSize(node);
  const getMethods = () => {
    switch (selectedSection) {
      case 'new':
        return newMethods;
      case 'modified':
        return modifiedMethods;
      case 'unaffected':
        return unaffectedMethods;
      default:
        return allMethods;
    }
  };
  const methods = getMethods();

  return (
    <div className={className}>
      <Filter
        items={[
          { value: 'all', label: 'All methods' },
          { value: 'new', label: `New methods (${newMethods.length})` },
          {
            value: 'modified',
            label: `Modified methods (${modifiedMethods.length})`,
          },
          {
            value: 'unaffected',
            label: `Unaffected methods (${unaffectedMethods.length})`,
          },
        ]}
        onChange={({ value }) => setSelectedSection(value)}
        value={selectedSection}
      />
      <Content>
        <Methods>
          <div ref={node} style={{ height: '100%' }}>
            <VirtualList
              itemSize={56}
              height={Math.ceil(methodsListHeight)}
              itemCount={covered}
              renderItem={({ index, style }) => (
                <Method key={`${methods[index]?.name}${index}`} style={style as Record<symbol, string>}>
                  {methods.length > 0 && (
                    <>
                      <div className="flex items-center w-full h-20px">
                        <div className="flex items-center w-full">
                          <MethodsListItemIcon>
                            <Icons.Function />
                          </MethodsListItemIcon>
                          <MethodName className="text-ellipsis" title={methods[index]?.name as string}>{methods[index]?.name}</MethodName>
                        </div>
                        <CoverageIcon>
                          <CoverageRateIcon coverageRate={methods[index].coverageRate} />
                        </CoverageIcon>
                      </div>
                      <MethodsPackage
                        className="text-ellipsis"
                        title={methods[index].ownerClass}
                      >
                        {methods[index].ownerClass}
                      </MethodsPackage>
                    </>
                  )}
                  {Object.keys(coveredMethods).length === 0 && (
                    <div tw="flex space-x-2 animate-pulse">
                      <div tw="rounded-full bg-monochrome-medium-tint h-6 w-6" />
                      <div tw="flex-1 space-y-4 py-1">
                        <div tw="space-y-2">
                          <div tw="h-4 bg-monochrome-medium-tint rounded w-34" />
                          <div tw="h-3 bg-monochrome-medium-tint rounded" />
                        </div>
                      </div>
                    </div>
                  )}
                </Method>
              )}
            />
          </div>
        </Methods>
      </Content>
    </div>
  );
});

const Content = methodsList.content('div');
const Filter = methodsList.filter(Inputs.Dropdown);
const Methods = methodsList.methods('div');
const Method = methodsList.method('div');
const MethodName = methodsList.methodName('div');
const MethodsPackage = methodsList.methodPackage('div');
const MethodsListItemIcon = methodsList.methodIcon('div');
const CoverageIcon = methodsList.coverageIcon('div');
