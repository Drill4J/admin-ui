import { BEM } from '@redneckz/react-bem-helper';
import { useRef, useState } from 'react';
import VirtualList from 'react-tiny-virtual-list';
import { Icons, Inputs, OverflowText } from '@drill4j/ui-kit';

import { useElementSize } from 'hooks';

import styles from './tests-list.module.scss';

interface Props {
  className?: string;
  associatedTests: Record<string, string[]>;
}

const testsList = BEM(styles);

export const TestsList = testsList(({ className, associatedTests }: Props) => {
  const { AUTO: autoTests = [], MANUAL: manualTests = [] } = associatedTests;
  const node = useRef<HTMLDivElement>(null);
  const [selectedSection, setSelectedSection] = useState('all');
  const { height: testsListHeight } = useElementSize(node);

  const getTests = (): string[] => {
    switch (selectedSection) {
      case 'auto':
        return autoTests;
      case 'manual':
        return manualTests;
      default:
        return [...autoTests, ...manualTests];
    }
  };
  const tests = getTests();

  return (
    <div className={className}>
      <Filter
        items={[
          { value: 'all', label: 'All tests' },
          { value: 'auto', label: `Auto (${autoTests.length})` },
          { value: 'manual', label: `Manual (${manualTests.length})` },
        ]}
        onChange={({ value }) => setSelectedSection(value)}
        value={selectedSection}
      />
      <Content>
        <div ref={node} style={{ height: '100%' }}>
          <VirtualList
            itemSize={56}
            height={Math.floor(testsListHeight)}
            itemCount={tests.length}
            renderItem={({ index, style }) => (
              <TestItem key={tests[index]} style={style as Record<symbol, string>}>
                <TestInfo>
                  <TestItemIcon />
                  <TestName title={tests[index]}>{tests[index]}</TestName>
                </TestInfo>
                <TestId title="&ndash;">&ndash;</TestId>
              </TestItem>
            )}
          />
        </div>
      </Content>
    </div>
  );
});

const Content = testsList.content('div');
const Filter = testsList.filter(Inputs.Dropdown);
const TestItem = testsList.testItem('div');
const TestInfo = testsList.testInfo('div');
const TestName = testsList.testName(OverflowText);
const TestId = testsList.testId(OverflowText);
const TestItemIcon = testsList.testItemIcon(Icons.Test);
