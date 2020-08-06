import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import VirtualList from 'react-tiny-virtual-list';
import { Inputs, OverflowText, Icons } from '@drill4j/ui-kit';

import { useElementSize } from 'hooks';
import { MethodCoveredByTest } from 'types/method-covered-by-test';
import { CoverageRateIcon } from '../../coverage-rate-icon';

import styles from './methods-list.module.scss';

interface Props {
  className?: string;
  coveredMethods: MethodCoveredByTest;
}

const methodsList = BEM(styles);

export const MethodsList = methodsList(({ className, coveredMethods }: Props) => {
  const {
    newMethods = [], modifiedMethods = [], unaffectedMethods = [], allMethods = [],
  } = coveredMethods;
  const [selectedSection, setSelectedSection] = React.useState('all');
  const node = React.useRef<HTMLDivElement>(null);
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
              itemSize={52}
              height={Math.ceil(methodsListHeight)}
              itemCount={methods.length}
              renderItem={({ index, style }) => (
                <Method key={`${methods[index].name}${index}`} style={style as any}>
                  <MethodsListItemIcon>
                    <Icons.Function />
                  </MethodsListItemIcon>
                  <MethodInfo>
                    {methods[index].name}
                    <MethodsPackage>{methods[index].ownerClass}</MethodsPackage>
                  </MethodInfo>
                  <CoverageRateIcon coverageRate={methods[index].coverageRate} />
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
const MethodInfo = methodsList.methodInfo('div');
const MethodsPackage = methodsList.methodPackage(OverflowText);
const MethodsListItemIcon = methodsList.methodIcon('div');
