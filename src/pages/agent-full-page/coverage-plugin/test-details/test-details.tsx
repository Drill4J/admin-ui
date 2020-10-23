import * as React from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';
import {
  Icons, Panel, Column, Table,
} from '@drill4j/ui-kit';

import { capitalize } from 'utils';
import { AssociatedTests } from 'types/associated-tests';
import { MethodCoveredByTest } from 'types/method-covered-by-test';
import { Cells } from 'components';
import { NoTestsStub } from './no-tests-stub';
import { CoveredMethodsByTestSidebar } from './covered-methods-by-test-sidebar';

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
                Cell={({ item: { id, testName } }) => (
                  <Cells.Compound cellName={testName} cellAdditionalInfo={id} icon={<Icons.Test height={16} width={16} />} />
                )}
                width="40%"
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
                label="Coverage, %"
                Cell={Cells.Coverage}
                align="right"
              />
              <Column
                name="methodCalls"
                label="Methods covered"
                Cell={({ value, item: { id = '' } = {} }) => (
                  <Cells.Clickable
                    onClick={() => {
                      setSelectedTest(id);
                    }}
                    data-test="test-actions:view-curl:id"
                    disabled={!value}
                  >
                    {value}
                  </Cells.Clickable>
                )}
                align="right"
              />
              <Column
                name="stats.duration"
                label="Duration"
                Cell={Cells.Duration}
                align="right"
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
const StatusCell = testDetails.statusCell('span');
