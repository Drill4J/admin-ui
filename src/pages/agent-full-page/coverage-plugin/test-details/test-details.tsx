import * as React from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';
import {
  Icons, Panel, Column, Table,
} from '@drill4j/ui-kit';

import { capitalize, percentFormatter } from 'utils';
import { AssociatedTests } from 'types/associated-tests';
import { MethodCoveredByTest } from 'types/method-covered-by-test';
import { NoTestsStub } from './no-tests-stub';
import { CoveredMethodsByTestSidebar } from './covered-methods-by-test-sidebar';
import { DurationCell } from './duration-cell';
import { CompoundCell } from '../compound-cell';

import styles from './test-details.module.scss';

interface Props {
  className?: string;
  testsUsages: AssociatedTests[];
  coveredMethodsByTest: MethodCoveredByTest[];
}

const testDetails = BEM(styles);

export const TestDetails = testDetails(
  ({
    className, testsUsages, coveredMethodsByTest,
  }: Props) => {
    const [selectedTest, setSelectedTest] = React.useState('');
    return (
      <div className={className}>
        {testsUsages.length > 0 ? (
          <>
            <Title>
              Tests
            </Title>
            <Table
              data={testsUsages.map(({ tests = [], testType }) => tests.map((test) => ({ ...test, testType }))).flat()}
              idKey="testType"
              columnsSize="medium"
              expandedContentKey="tests"
            >
              <Column
                name="testName"
                label="Name"
                Cell={({ item }) => (
                  <CompoundCell pathKey="id" nameKey="testName" item={item} icon={<Icons.Test height={16} width={16} />} />
                )}
              />
              <Column
                name="testType"
                label="Test type"
                Cell={({ value }) => (
                  <TableCell>
                    {capitalize(value)}
                  </TableCell>
                )}
              />
              <Column
                name="stats"
                label="Status"
                Cell={({ value: testStatus }) => (
                  <StatusCell type={testStatus?.result}>
                    {capitalize(testStatus?.result)}
                  </StatusCell>
                )}
              />
              <Column
                name="coverage"
                HeaderCell={() => <div style={{ textAlign: 'right' }}>Coverage, %</div>}
                Cell={({ value }) => (
                  <CoverageCell>
                    {value === 0 && (
                      <CoverageIcon
                        title="Test didn't cover any methods. Make sure the test is actual or modify/delete it."
                      >
                        <Icons.UncoveredMethods />
                      </CoverageIcon>
                    )}
                    {percentFormatter(value)}
                  </CoverageCell>
                )}
              />
              <Column
                name="methodCalls"
                HeaderCell={() => <div style={{ textAlign: 'right' }}>Methods covered</div>}
                Cell={({ value, item: { id = '' } = {} }) => (
                  <MethodCallsCell
                    onClick={() => {
                      setSelectedTest(id);
                    }}
                    data-test="test-actions:view-curl:id"
                    clickable={Boolean(value)}
                  >
                    {value}
                  </MethodCallsCell>
                )}
              />
              <Column
                name="stats"
                HeaderCell={() => <div style={{ textAlign: 'right', paddingRight: '8px' }}>Duration</div>}
                Cell={({ value }) => (
                  <DurationCell value={value?.duration} />
                )}
              />,
            </Table>
          </>
        ) : (
          <NoTestsStub />
        )}
        {Boolean(selectedTest) && (
          <CoveredMethodsByTestSidebar
            isOpen={Boolean(selectedTest)}
            onToggle={() => setSelectedTest('')}
            testId={selectedTest}
            coveredMethods={coveredMethodsByTest}
          />
        )}
      </div>
    );
  },
);

const Title = testDetails.title(Panel);
const TableCell = testDetails.tableCell('span');
const CoverageCell = testDetails.coverageCell('span');
const CoverageIcon = testDetails.coverageIcon('span');
const StatusCell = testDetails.statusCell('span');
const MethodCallsCell = testDetails.methodCallsCell(
  div({ onClick: () => {} } as { clickable?: boolean }),
);
